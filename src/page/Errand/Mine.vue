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
      <el-table :data="errandList" highlight-current-row @selection-change="selsChange" style="width: 100%;" stripe>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="title" label="活动标题" width="200"></el-table-column>
        <el-table-column prop="fee" label="报酬" width="80" sortable></el-table-column>
        <el-table-column prop="finisher" label="接取者" width="100"></el-table-column>
        <el-table-column prop="dueDate" label="结束日期" width="150" sortable></el-table-column>
        <el-table-column prop="tag" label="类型" width="100" :filters="[{ text: '快递', value: '快递' }, {text: '外卖', value: '外卖' }]" :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '快递' ? 'primary' : 'success'"
            disable-transitions>{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作和描述" width="150">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">{{ scope.row.description }}</div>
              <el-button size="small" type="danger" @click="deleteErrand(scope.$index)">删除</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
        </el-pagination>
      </el-col>
      <el-col :span="24" class="toolbar">
        <el-button type="danger" size="medium" style="margin-top: 5px;" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      </el-col>
    </el-row>
</template>

<script>
import Vue from 'vue'
import { queryErrand, removeErrand, queryParticipant } from '../../api/api'
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
      sels: [],
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
      console.log('myErrand params:', params)
      queryErrand(params).then(res => {
        console.log('res', res.data)
        if (res.status === 200) {
          // this.errandList = res.data
          // for (var i = 0; i < this.errandList.length; i++) {
          //   this.errandList[i].tag = this.errandList[i].tag_set.toString()
          //   this.errandList[i].issuer = this.errandList[i].tag_set.issuer_first_name
          // }
          for (var i = 0; i < res.data.length; i++) {
            var participantName = ''
            if (res.data[i].participants.length !== 0) {
              participantName = this.getParticipant(res.data[i].participants[0])
            }
            this.errandList.push({
              title: res.data[i].title,
              fee: res.data[i].fee,
              finisher: participantName,
              dueDate: res.data[i].due_date,
              tag: res.data[i].tag_set[0],
              description: res.data[i].description
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
        console.log(err)
        this.$message({
          message: '获取任务失败 ' + err,
          type: 'error'
        })
        this.listLoading = false
      })
    },
    getParticipant (id) {
      var params = {
        id: id
      }
      var participantName = ''
      queryParticipant(params).then(res => {
        console.log('participantName', res.data)
        if (res.status === 200) {
          console.log('get participantName success')
          participantName = res.data.first_name
        } else {
          this.$message({
            message: '获取参与者信息失败',
            type: 'error'
          })
        }
      }).catch(err => {
        console.log(err)
        this.$message({
          message: '获取信息失败' + err,
          type: 'error'
        })
      })
      return participantName
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    filterTag (value, row) {
      return row.tag === value
    },
    batchRemove () {
      // 根据sels中的下标，找到对应问卷的id，传给后端进行删除，返回成功再在前端questionnaireList进行删除
    },
    deleteErrand (index) {
      // 根据this.errandList[index].id 想后端请求删除的活动，如果返回success，在前端的
      // this.errandList删除对应活动
      event.cancelBubble = true
      const params = {
        id: this.errandList[index].id
      }
      console.log(params)
      removeErrand(params).then(res => {
        console.log(res)
        if (res.status === 200) {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getErrandList()
        } else {
          this.$message({
            message: `删除失败 ${res.status} ${res.statusText}`,
            type: 'error'
          })
        }
      }).catch(err => {
        this.$message({
          message: '删除失败' + err,
          type: 'error'
        })
      })
    },
    handleCurrentChange () { }
  },
  mouted () {
    this.getErrandList()
  }
}
</script>
