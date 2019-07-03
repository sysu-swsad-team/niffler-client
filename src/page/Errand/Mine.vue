<template>
    <el-row class="content-warpper">
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.title" placeholder="活动标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="el-icon-search" @click="getErrandList"> 查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="errandList" highlight-current-row style="width: 100%;" stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="title" label="活动标题" width="200"></el-table-column>
        <el-table-column prop="fee" label="报酬（闲钱币个数）" width="100" sortable></el-table-column>
        <el-table-column prop="finisher" label="接取者" width="100"></el-table-column>
        <el-table-column prop="due_date" label="结束日期" width="200" sortable></el-table-column>
        <el-table-column prop="created_date" label="创建日期" width="200" sortable></el-table-column>
        <el-table-column prop="tag" label="类型" width="100" :filters="[{ text: '快递', value: '快递' }, {text: '外卖', value: '外卖' }]" :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '快递' ? 'primary' : 'success'"
            disable-transitions>{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作和描述" min-width="200" prop="status" :filters="[{text: '进行中', value: 'UNDERWAY'}, {text: '已取消', value: 'CANCELLED'}, {text: '已过期', value: 'CLOSED'}, {text: '被举报', value: 'INVALID'}, {text: '已完成', value: 'QUOTA FULL'}]" :filter-method="filterTask" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">{{ scope.row.description }}</div>
              <el-button v-if="scope.row.status === 'UNDERWAY'" size="small" type="danger" @click="cancelErrand(scope.$index, scope.row)">取消任务</el-button>
              <el-button v-if="scope.row.status === 'CANCELLED'" size="small" type="info">已取消</el-button>
              <el-button v-if="scope.row.status === 'CLOSED'" size="small" type="info">已过期</el-button>
              <el-button v-if="scope.row.status === 'INVALID'" size="small" type="warning">被举报</el-button>
              <el-button v-if="scope.row.status === 'QUOTA FULL'" size="small" type="success">已被接</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
        </el-pagination>
      </el-col>
    </el-row>
</template>

<script>
import Vue from 'vue'
import { queryTask, cancelTask } from '../../api/api'
import querystring from 'querystring'
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level, // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
export default {
  data () {
    return {
      filters: {
        title: ''
      },
      errandList: [ ],
      total: 1
    }
  },
  computed: {
    isCollapse () {
      // 返回./store/index.js中的全局变量
      return this.$store.getters.getIsCollapse
    },
    getUser () {
      return this.$store.getters.getUser
    }
  },
  methods: {
    getTags (tagSet) {
      var str = ''
      for (var i = 0; i < tagSet.length; i++) {
        str = str + tagSet[i]
      }
      return str
    },
    getErrandList () {
      this.listLoading = true
      const queryParams = {
        /* 去除所有空格 */
        title: this.filters.title.replace(/\s*/g, '')
      }
      var params = {
        asIssuer: true,
        type: '跑腿'
      }
      if (queryParams.title !== '') {
        params.title = queryParams.title
      }
      params = '?' + querystring.stringify(params)
      queryTask(params).then(res => {
        if (res.status === 200) {
          this.errandList = []
          for (var i = 0; i < res.data.length; i++) {
            var participantName = ''
            if (res.data[i].participants.length !== 0) {
              participantName = res.data[i].participants[0][1]
            }
            this.errandList.push({
              id: res.data[i].id,
              title: res.data[i].title,
              fee: res.data[i].fee,
              finisher: participantName,
              due_date: this.convertUTCTimeToLocalTime(res.data[i].due_date),
              created_date: this.convertUTCTimeToLocalTime(res.data[i].created_date),
              tag: this.getTags(res.data[i].tag_set),
              description: res.data[i].description,
              status: res.data[i].status
            })
          }
          this.$message({
            message: `获取任务成功`,
            type: 'success'
          })
          this.listLoading = false
        } else {
          this.$message({
            message: `获取任务失败 ${res.data.msg}`,
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
    filterTag (value, row) {
      return row.tag === value
    },
    filterTask (value, row) {
      return row.status === value
    },
    cancelErrand (index, row) {
      // 根据this.errandList[index].id 想后端请求删除的活动，如果返回success，在前端的
      // this.errandList删除对应活动
      event.cancelBubble = true
      this.$confirm('确定取消该任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const params = {
          id: row.id
        }
        cancelTask(params).then(res => {
          if (res.status === 200) {
            this.$message({
              message: '删除成功',
              type: 'success'
            })
          } else {
            this.$message({
              message: `删除失败 ${res.data.msg}`,
              type: 'error'
            })
          }
          this.getErrandList()
        }).catch(err => {
          this.$message({
            message: '删除失败' + err,
            type: 'error'
          })
        })
      })
    },
    handleCurrentChange () { }
  },
  mounted () {
    this.getErrandList()
  }
}
</script>
