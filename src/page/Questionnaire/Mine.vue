<template>
<el-col :span="24" class="main">
  <section class="content-container">
    <template>
      <el-col :span="24" class="toolbar" sytle="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.title" placeholder="问卷标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="questionnaireList" highlight-current-row @selection-change="selsChange" style="width: 100%;" stripe>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="id" label="ID" width="100" sortable></el-table-column>
        <el-table-column prop="title" label="问卷标题" width="200"></el-table-column>
        <el-table-column prop="maxNumber" label="剩余量" width="100" sortable></el-table-column>
        <el-table-column prop="fee" label="费用" width="80" sortable></el-table-column>
        <el-table-column prop="dueDate" label="结束日期" width="150"></el-table-column>
        <el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '商业', value: '商业' }, {text: '学校', value: '学校' }]" :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '商业' ? 'primary' : 'success'"
            disable-transitions>{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作和描述" width="150">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">{{ scope.row.description }}</div>
              <el-button size="small" type="primary" @click="editQustionnair(scope.$index)">编辑</el-button>
            </el-tooltip>
          <el-button size="small" type="danger" @click="deleteQuestionnair(scope.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-button type="danger" size="medium" style="margin-top: 5px;" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      </el-col>
      <el-dialog :visible.sync="isEdit" :close-on-click-model="false" :show-close="false" :close-on-press-escape="false" width="60%" height="auto" class="infinite-list">
        <EditQuestionair :ruleForm="editingQN" style="background-color:white;padding:10px"></EditQuestionair>
        <div>
          <el-button type="primary" size="medium" style="width: 10%; margin-left: 60%; margin-bottom: 10px;" @click="summitEdit">提交</el-button>
          <el-button type="primary" size="medium" style="width: 10%;" @click="resetEdit">重置</el-button>
          <el-button type="warning" size="medium" style="width: 10%;" @click="cancelEdit">取消</el-button>
        </div>
      </el-dialog>
    </template>
  </section>
</el-col>
</template>

<script>
import EditQuestionair from '../components/EditQuestionair'
export default {
  data () {
    return {
      questionnaireList: [
        {
          id: 0,
          title: '问卷1',
          description: '问卷1描述',
          maxNumber: 20,
          fee: 10,
          dueDate: '1111-1-1',
          tag: '学校'
        }, {
          id: 1,
          title: '问卷2',
          description: '问卷2描述',
          maxNumber: 20,
          fee: 10,
          dueDate: '1111-1-1',
          tag: '商业'
        },
        {
          id: 3,
          title: '问卷3',
          description: '问卷3描述',
          maxNumber: 10,
          fee: 50,
          dueDate: '1131-1-1',
          tag: '学校'
        },
        {
          id: 4,
          title: '问卷4',
          description: '问卷4描述',
          maxNumber: 30,
          fee: 4,
          dueDate: '1131-1-1',
          tag: '商业'
        }
      ],
      filters: {
        title: '',
        sponsor: ''
      },
      editingQN: {
        title: '',
        description: '',
        maxNumber: 1,
        fee: 0.01,
        dueDate: '',
        questions: [{
          title: '',
          type: -1,
          options: [{
            value: ''
          }]
        }]
      },
      sels: [],
      isEdit: false
    }
  },
  computed: {
    isCollapse () {
      // 返回./store/index.js中的全局变量
      return this.$store.getters.getIsCollapse
    }
  },
  methods: {
    getFilter () {
      alert('查询条件' + this.filters)
    },
    editQustionnair (index) {
      this.isEdit = true

      // alert('获取问卷' + this.questionnaireList[index].title)
    },
    deleteQuestionnair (index) {
      alert('删除问卷' + this.questionnaireList[index].title)
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    filterTag (value, row) {
      return row.tag === value
    },
    handleCurrentChange () { },
    batchRemove () { },
    summitEdit () {
      alert('summitEdit')
      this.isEdit = false
    },
    resetEdit () {
      alert('resetEdit')
    },
    cancelEdit () {
      this.editingQN = {
        title: '',
        description: '',
        maxNumber: 1,
        fee: 0.01,
        dueDate: '',
        questions: [{
          title: '',
          type: -1,
          options: [{
            value: ''
          }]
        }]
      }
      this.isEdit = false
    }
  },
  components: {
    EditQuestionair
  }
}
</script>

<style lang="scss">
.el-dialog .el-dialog__body {
  padding: 0px;
}
</style>
