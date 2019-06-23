<template>
<el-col :span="24" class="main">
  <aside>
    <el-menu default-active="1" class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse"
      :collapse-transition="true">
      <el-menu-item index="1" @click="$router.push('/questionnaire')">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">问卷系统</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/questionnaire/create')">
        <i class="el-icon-menu"></i>
        <span slot="title">创建问卷</span>
      </el-menu-item>
      <el-menu-item index="3" @click="$router.push('/questionnaire/mine')">
        <i class="el-icon-document"></i>
        <span slot="title">我的问卷</span>
      </el-menu-item>
    </el-menu>
  </aside>
  <section class="content-container">
    <PageHead id="page-head"></PageHead>
    <template v-if="this.$route.path === '/questionnaire'">
      <el-col :span="24" class="toolbar" sytle="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.title" placeholder="问卷标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filters.issuer" placeholder="问卷发起者"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="el-icon-search" @click="getQNList"> 查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="questionnaireList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="title" label="问卷标题" width="200"></el-table-column>
        <el-table-column prop="issuer" label="发起者" width="150" sortable></el-table-column>
        <el-table-column prop="remaining_quota" label="剩余量" width="100" sortable></el-table-column>
        <el-table-column prop="fee" label="费用" width="80" sortable></el-table-column>
        <el-table-column prop="due_date" label="结束日期" width="200" sortable></el-table-column>
        <el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '商业', value: '商业' }, {text: '学校', value: '学校' }]" :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '商业' ? 'primary' : 'success'"
            disable-transitions>{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作和描述" width="120">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">{{ scope.row.description }}</div>
              <el-button size="small" type="primary" @click="getQustionnair(scope.$index)">填写问卷</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
        </el-pagination>
      </el-col>

      <el-dialog :visible.sync="isDetail" :close-on-click-model="false" :show-close="true" :close-on-press-escape="true" width="80%" class="infinite-list" title="问卷填写" :center="true">
        <el-divider></el-divider>
        <ShowQuestionnaire :ruleForm="detailQN" :isDisable="true" style="background-color: #eee;padding: 10px;"></ShowQuestionnaire>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="medium" @click.native="commiteAnswer"  style="padding-top: 10px">提交</el-button>
          <el-button type="warning" size="medium" @click.native="isDetail = false"  style="padding-top: 10px">取消</el-button>
        </div>
      </el-dialog>
    </template>
    <router-view v-else></router-view>
  </section>
</el-col>
</template>

<script>
import PageHead from '../components/PageHead'
import ShowQuestionnaire from '../components/ShowQuestionnaire'
import {queryQN, getQNDetail} from '../../api/api'
export default {
  data () {
    return {
      questionnaireList: [
        {
          id: 0,
          title: '问卷1',
          issuer: '发起者1',
          description: '问卷1描述',
          remaining_quota: 20,
          fee: 10,
          due_date: '1111-1-1',
          tag: '学校'
        }, {
          id: 1,
          title: '问卷2',
          issuer: '发起者2',
          description: '问卷2描述',
          remaining_quota: 20,
          fee: 10,
          due_date: '1111-1-1',
          tag: '商业'
        }
      ],
      filters: {
        title: '',
        issuer: ''
      },
      listLoading: false,
      sels: [],
      total: 0,
      isDetail: false,
      detailQN: { }
    }
  },
  computed: {
    isCollapse () {
      // 返回./store/index.js中的全局变量
      return this.$store.getters.getIsCollapse
    }
  },
  methods: {
    getQNList () {
      const queryParams = {
        /* 去除所有空格 */
        title: this.filters.title.replace(/\s*/g, ''),
        issuer: this.filters.issuer.replace(/\s*/g, '')
      }
      var params = ''
      if (queryParams.title !== '' && queryParams.issuer !== '') {
        params += `?title=${queryParams.title}&issuer=${queryParams.issuer}`
      } else {
        if (queryParams.title !== '') {
          params += `?title=${queryParams.title}`
        } else if (queryParams.issuer !== '') {
          params += `?issuer=${queryParams.issuer}`
        }
      }
      console.log('queryQN', params)
      queryQN(params).then(res => {
        if (res.status === 200) {
          console.log(res.data)
          let { count, next, previous, results } = res.data
          console.log('queryQN', count, next, previous)
          this.questionnaireList = results
          for (var i = 0; i < this.questionnaireList.length; i++) {
            this.questionnaireList[i].tag = this.questionnaireList[i].tag_set.toString()
          }
          this.$message({
            message: `获取问卷成功 ${res.status} ${res.statusText}`,
            type: 'success'
          })
        } else {
          this.$message({
            message: `获取问卷失败 ${res.status} ${res.statusText}`,
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '获取问卷失败 ' + err,
          type: 'error'
        })
      })
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
    getQustionnair (index) {
      // 后端先判断该用户是否已填写此问卷，若已填写，则不能再填写，否则，后端返回问卷细节
      // alert('获取问卷' + this.questionnaireList[index].title)
      // 若已填写，
      // this.$message.error('您已填过此问卷')
      // 若未填写。渲染问卷
      // this.isDetail = true
      // this.detailQN = this.questionnaireList[index]
      let params = {
        // email: this.getInfo.email,
        id: this.questionnaireList[index].id
      }
      getQNDetail(params).then(res => {
        console.log(res.data)
        let { code, msg, questionnaire } = res.data
        if (code === 200) {
          this.detailQN = questionnaire
          this.isDetail = true
        } else {
          this.$message({
            // 获取失败的原因（已经填写过？）
            message: msg,
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    filterTag (value, row) {
      return row.tag === value
    },
    handleCurrentChange (val) {
      this.page = val
      this.getQNList()
    },
    commiteAnswer () {
      // 提交问卷答案
      this.$confirm('确定提交问卷吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '问卷已提交'
        })
        this.isDetail = false
      }).catch(() => { })
    }
  },
  components: {
    PageHead,
    ShowQuestionnaire
  },
  mounted () {
    this.getQNList()
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages.scss';
</style>
