<template>
<el-col :span="24" class="main">
  <aside>
    <el-menu default-active="1" class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse"
      :collapse-transition="true">
      <el-menu-item index="1" @click="$router.push('/errand')">
        <i class="el-icon-bicycle"></i>
        <span slot="title">跑腿办事</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/errand/create')">
        <i class="el-icon-s-order"></i>
        <span slot="title">创建订单</span>
      </el-menu-item>
      <el-menu-item index="3" @click="$router.push('/errand/mine')">
        <i class="el-icon-s-claim"></i>
        <span slot="title">我的订单</span>
      </el-menu-item>
    </el-menu>
  </aside>
  <section class="content-container">
    <PageHead id="page-head"></PageHead>
    <template v-if="this.$route.path === '/errand'">
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.title" placeholder="活动标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filters.issuer" placeholder="活动发起者"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="el-icon-search" @click="getErrandList"> 查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="errandList" highlight-current-row v-loading="listLoading" element-loading-text="玩命加载中，请稍等..." element-loading-spinner="el-icon-loading" style="width: 100%;" stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="title" label="活动标题" width="200"></el-table-column>
        <el-table-column prop="issuer" label="发起者" width="150"></el-table-column>
        <el-table-column prop="fee" label="报酬" width="80" sortable></el-table-column>
        <el-table-column prop="dueDate" label="结束时间" width="200" sortable></el-table-column>
        <el-table-column prop="tag" label="类型" width="100" :filters="[{ text: '快递', value: '快递' }, {text: '外卖', value: '外卖' }]" :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '快递' ? 'primary' : 'success'"
            disable-transitions>{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作与描述" min-width="200" fit prop="status" :filters="[{text: '进行中', value: 'UNDERWAY'}, {text: '已取消', value: 'CANCELLED'}, {text: '已过期', value: 'CLOSED'}, {text: '被举报', value: 'INVALID'}, {text: '已完成', value: 'QUOTA FULL'}]" :filter-method="filterTask" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">{{ scope.row.description }}</div>
              <el-button v-if="scope.row.status === 'UNDERWAY'" size="small" type="primary" @click="paticipateErrand(scope.$index, scope.row)">接取</el-button>
              <el-button v-if="scope.row.status === 'CANCELLED'" size="small" type="info">已取消</el-button>
              <el-button v-if="scope.row.status === 'CLOSED'" size="small" type="info">已过期</el-button>
              <el-button v-if="scope.row.status === 'INVALID'" size="small" type="warning">被举报</el-button>
              <el-button v-if="scope.row.status === 'QUOTA FULL'" size="small" type="success">已被接</el-button>
            </el-tooltip>
            <el-button size="small" type="danger" @click="claim(scope.$index, scope.row)">举报</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
        </el-pagination>
      </el-col>
    </template>
    <router-view v-else></router-view>
  </section>
</el-col>
</template>

<script>
import { queryTask, takeInTask, claimTask } from '../../api/api'
import PageHead from '../components/PageHead'
import querystring from 'querystring'
export default {
  data () {
    return {
      filters: {
        title: '',
        issuer: ''
      },
      // 加载页面前从后端获取errandList，当前所有可接受活动（假设每个活动只能一个人接取）
      errandList: [ ],
      listLoading: false,
      total: 0
    }
  },
  computed: {
    isCollapse () {
      // 返回./store/index.js中的全局变量
      return this.$store.getters.getIsCollapse
    },
    getInfo () {
      return this.$store.getters.getInfo
    }
  },
  methods: {
    getErrandList () {
      this.listLoading = true
      const queryParams = {
        /* 去除所有空格 */
        title: this.filters.title.replace(/\s*/g, ''),
        issuer: this.filters.issuer.replace(/\s*/g, '')
      }
      var params = { type: '跑腿' }
      if (queryParams.title !== '') {
        params.title = queryParams.title
      }
      if (queryParams.issuer !== '') {
        params.issuer = queryParams.issuer
      }
      params = '?' + querystring.stringify(params)
      queryTask(params).then(res => {
        if (res.status === 200) {
          this.errandList = []
          for (var i = 0; i < res.data.length; i++) {
            this.errandList.push({
              id: res.data[i].id,
              title: res.data[i].title,
              issuer: res.data[i].issuer_first_name,
              fee: res.data[i].fee,
              finisher: res.data[i].claimers[0],
              dueDate: this.convertUTCTimeToLocalTime(res.data[i].due_date),
              tag: res.data[i].tag_set[0],
              description: res.data[i].description,
              status: res.data[i].status
            })
          }
          this.$message({
            message: `获取任务成功 ${res.status} ${res.statusText}`,
            type: 'success'
          })
          this.listLoading = false
        } else {
          this.$message({
            message: `获取任务失败 ${res.status} ${res.statusText}`,
            type: 'error'
          })
          this.listLoading = false
        }
      }).catch(err => {
        this.$message({
          message: '获取任务失败 ' + err,
          type: 'error'
        })
        this.listLoading = false
      })
    },
    convertUTCTimeToLocalTime (UTCDateString) {
      if (!UTCDateString) {
        return '-'
      }
      function formatFunc (str) {
        return str > 9 ? str : '0' + str
      }
      var date2 = new Date(UTCDateString)
      var year = date2.getFullYear()
      var mon = formatFunc(date2.getMonth() + 1)
      var day = formatFunc(date2.getDate())
      var hour = date2.getHours()
      var noon = hour >= 12 ? 'PM' : 'AM'
      hour = hour >= 12 ? hour - 12 : hour
      hour = formatFunc(hour)
      var min = formatFunc(date2.getMinutes())
      var dateStr = year + '-' + mon + '-' + day + ' ' + hour + ':' + min + ' ' + noon
      return dateStr
    },
    handleSelect (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleCurrentChange () { },
    filterTag (value, row) {
      return row.tag === value
    },
    filterTask (value, row) {
      return row.status === value
    },
    paticipateErrand (index, row) {
      // 接受此任务，后端将该任务的接受者设为当前用户，并设置该任务不能再被其他用户接受。注意处理并发事件
      // 即当此时用户发送接受任务请求时，若在此页面重新渲染前，任务已被其他用户先接取，需返回提示信息，接取任务失败
      this.$confirm('确定接取该任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        /* 注意在表格里获取任务id应该使用row.id (否则排序表格后就乱了) */
        const postParams = {
          task_id: row.id.toString(),
          description: '',
          poll: ''
        }
        takeInTask(postParams).then(res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: `任务接取成功，请按要求在规定时间内完成 (${res.data.msg})`
            })
          } else {
            this.$message({
              message: `接取失败 ${res.status} ${res.data.msg}`,
              type: 'error'
            })
          }
          this.getErrandList()
        }).catch((err) => {
          this.$message({
            message: `接取失败 ${err}`,
            type: 'error'
          })
        })
      }).catch(() => {})
    },
    /* 举报任务 */
    claim (index, row) {
      this.$confirm('确定举报该任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        claimTask({id: row.id}).then(res => {
          if (res.status === 200) {
            this.$message({
              type: 'success',
              message: res.data.msg
            })
          } else {
            this.$message({
              message: `举报失败 ${res.status} ${res.data.msg}`,
              type: 'error'
            })
          }
          this.getErrandList()
        }).catch((err) => {
          this.$message({
            message: `举报失败 ${err}`,
            type: 'error'
          })
        })
      }).catch(() => {})
    }
  },
  components: {
    PageHead
  },
  mounted () {
    this.getErrandList()
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages.scss';
</style>
