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
      <el-table :data="questionnaireList" highlight-current-row v-loading="listLoading" element-loading-text="玩命加载中，请稍等..." element-loading-spinner="el-icon-loading" style="width: 100%;" stripe >
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="title" label="问卷标题" width="200"></el-table-column>
        <el-table-column prop="issuer" label="发起者" width="150" sortable></el-table-column>
        <el-table-column prop="remaining_quota" label="剩余量" width="100" sortable></el-table-column>
        <el-table-column prop="fee" label="报酬" width="80" sortable></el-table-column>
        <el-table-column prop="due_date" label="结束日期" width="200" sortable></el-table-column>
        <el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '商业', value: '商业' }, {text: '学校', value: '学校' }]" :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '商业' ? 'primary' : 'success'"
            disable-transitions>{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作和描述" min-width="200" fit prop="status" :filters="[{text: '进行中', value: 'UNDERWAY'}, {text: '已取消', value: 'CANCELLED'}, {text: '已过期', value: 'CLOSED'}, {text: '被举报', value: 'INVALID'}, {text: '已完成', value: 'QUOTA FULL'}]" :filter-method="filterTask" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">{{ scope.row.description }}</div>
              <el-button v-if="scope.row.status === 'UNDERWAY'"  size="small" type="primary" @click="getQustionnair(scope.$index, scope.row)">填写</el-button>
              <el-button v-if="scope.row.status === 'CANCELLED'" size="small" type="info">已取消</el-button>
              <el-button v-if="scope.row.status === 'CLOSED'" size="small" type="info">已过期</el-button>
              <el-button v-if="scope.row.status === 'INVALID'" size="small" type="warning">被举报</el-button>
              <el-button v-if="scope.row.status === 'QUOTA FULL'" size="small" type="success">已结束</el-button>
            </el-tooltip>
            <el-button size="small" type="danger" @click="claim(scope.$index, scope.row)">举报</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
        </el-pagination>
      </el-col>

      <el-dialog :visible.sync="isDetail" :close-on-click-model="false" :show-close="true" :close-on-press-escape="true" width="80%" title="问卷填写" :center="true">
        <el-divider></el-divider>
        <el-col :span="24" class="content-wrapper">
          <el-form :model="detailQN" label-position="left" label-width="80px" style="font-weight: bold;" >
            <el-form-item label="题目：" prop="title">
              <p>{{ detailQN.title }}</p>
            </el-form-item>
            <el-form-item label="简介：" prop="description">
              <div>{{ detailQN.description }}</div>
            </el-form-item>
            <el-form-item lable-width="10px">
              <el-col :span="7" :offset="1">
                <el-form-item label="每份金额：" label-width="150px">
                  <span>{{ detailQN.fee }} 元</span>
                </el-form-item>
              </el-col>
              <el-col :span="7" :offset="1">
                <el-form-item label="标签：" label-width="80px">
                  <el-tag type="success">学校</el-tag>
                </el-form-item>
              </el-col>
            </el-form-item>
            <el-divider content-position="center">问卷内容</el-divider>
            <el-form-item
              v-for="(question, index) in detailQN.questions" :label="(index + 1) + ''" :key="index">
              <el-form-item v-if="question.type === 0">
                <h6>（单选）{{ question.title }}</h6>
                <el-radio-group v-model="answer[index]">
                  <el-radio v-for="(option, indexP) in question.options" :key="indexP" :label="option.value">{{ option.value }}</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-if="question.type === 1">
                <h6>（多选）{{ question.title }}</h6>
                <el-checkbox-group v-model="answer[index]">
                  <el-checkbox v-for="(option, indexP) in question.options" :key="indexP" :label="indexP + ''">{{ option.value }}</el-checkbox>
                </el-checkbox-group>
              </el-form-item>
              <el-form-item v-if="question.type === 2">
                <h6>（填空）{{ question.title }}</h6>
                <el-input style="margin-bottom: 5px" v-model="answer[index]"></el-input>
              </el-form-item>
            </el-form-item>
          </el-form>
        </el-col>
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
import { queryTask, getQNDetail, claimTask } from '../../api/api'
import querystring from 'querystring'
export default {
  data () {
    return {
      questionnaireList: [ ],
      filters: {
        title: '',
        issuer: ''
      },
      listLoading: false,
      total: 0,
      isDetail: false,
      detailQN: { },
      answer: []
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
      this.listLoading = true
      const queryParams = {
        /* 去除所有空格 */
        title: this.filters.title.replace(/\s*/g, ''),
        issuer: this.filters.issuer.replace(/\s*/g, '')
      }
      var params = { type: '问卷' }
      if (queryParams.title !== '') {
        params.title = queryParams.title
      }
      if (queryParams.issuer !== '') {
        params.issuer = queryParams.issuer
      }
      params = '?' + querystring.stringify(params)
      console.log(params)
      queryTask(params).then(res => {
        if (res.status === 200) {
          console.log(res)
          // this.questionnaireList = res.data
          // for (var i = 0; i < this.questionnaireList.length; i++) {
          //   this.questionnaireList[i].tag = this.questionnaireList[i].tag_set.toString()
          //   this.questionnaireList[i].issuer = this.questionnaireList[i].issuer_first_name
          // }
          this.questionnaireList = []
          for (var i = 0; i < res.data.length; i++) {
            this.questionnaireList.push({
              id: res.data[i].id,
              title: res.data[i].title,
              issuer: res.data[i].issuer_first_name,
              remaining_quota: res.data[i].remaining_quota,
              fee: res.data[i].fee,
              due_date: res.data[i].due_date,
              tag: res.data[i].tag_set.toString(),
              description: res.data[i].description,
              questions: res.data[i].poll,
              status: res.data[i].status
            })
            console.log(res.data[i].due_date)
          }
          console.log('list:', this.questionnaireList)
          this.$message({
            message: `获取问卷成功 ${res.status} ${res.statusText}`,
            type: 'success'
          })
          this.listLoading = false
        } else {
          this.$message({
            message: `获取问卷失败 ${res.status} ${res.statusText}`,
            type: 'error'
          })
          this.listLoading = false
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '获取问卷失败 ' + err,
          type: 'error'
        })
        this.listLoading = false
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
    getQustionnair (index, row) {
      // 后端先判断该用户是否已填写此问卷，若已填写，则不能再填写，否则，后端返回问卷细节
      // alert('获取问卷' + this.questionnaireList[index].title)
      // 若已填写，
      // this.$message.error('您已填过此问卷')
      // 若未填写。渲染问卷
      // this.isDetail = true
      // this.detailQN = this.questionnaireList[index]
      let params = {
        // email: this.getInfo.email,
        id: row.id
      }
      console.log(params)
      getQNDetail(params).then(res => {
        console.log('data in get', res.data)
        this.answer = []
        if (res.status === 200) {
          this.detailQN = {
            id: res.data.questionnaire.id,
            title: res.data.questionnaire.title,
            description: res.data.questionnaire.description,
            maxNumber: res.data.questionnaire.participant_quota,
            fee: res.data.questionnaire.fee,
            dueDate: res.data.questionnaire.due_date,
            questions: JSON.parse(res.data.questionnaire.poll)
          }
          for (var i = 0; i < this.detailQN.questions.length; i++) {
            if (this.detailQN.questions[i].type === 1) {
              this.answer.push([])
            } else {
              this.answer.push('')
            }
          }
          console.log(this.detailQN)
          this.isDetail = true
        } else {
          this.$message({
            // 获取失败的原因（已经填写过？）
            message: res.data.msg,
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
      })
    },
    /* 举报任务 */
    claim (index, row) {
      this.$confirm('确定举报该问卷吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        claimTask({id: row.id}).then(res => {
          console.log('msg', res.data.msg)
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
        }).catch((err) => {
          this.$message({
            message: `举报失败 ${err}`,
            type: 'error'
          })
        })
      }).catch(() => {})
    },
    filterTag (value, row) {
      return row.tag === value
    },
    filterTask (value, row) {
      return row.status === value
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
        console.log('answer:', this.answer)
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
