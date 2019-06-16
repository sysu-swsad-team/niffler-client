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
      <el-dialog :visible.sync="isEdit" :close-on-click-model="false" :show-close="false" :close-on-press-escape="false" width="60%" height="auto" class="infinite-list" title="问卷编辑">
        <EditQuestionair :ruleForm="editingQN" style="background-color:white;padding:10px"></EditQuestionair>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="medium" @click="summitEdit">提交</el-button>
          <el-button type="primary" size="medium" @click="resetEdit">重置</el-button>
          <el-button type="warning" size="medium" @click="cancelEdit">取消</el-button>
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
      // 从后端根据查询条件获取对应的问卷，放在questionnaireList中
      alert('查询条件' + this.filters)
    },
    editQustionnair (index) {
      // 根据this.questionnaireList[index].id 从后端获取完整问卷，存放在editingQN中
      this.isEdit = true

      // alert('获取问卷' + this.questionnaireList[index].title)
    },
    deleteQuestionnair (index) {
      // 根据this.questionnaireList[index].id 想后端请求删除该问卷，如果返回success，在前端的
      // this.questionnaireList删除对应问卷
      alert('删除问卷' + this.questionnaireList[index].title)
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
    summitEdit () {
      if (this.editingQN.title === '') {
        this.$message.error('请输入问卷标题')
      } else if (this.editingQN.dueDate === '') {
        this.$message.error('请输入问卷截止时间')
      } else {
        // 向后端发送更改信息，成功则返回下面提示
        this.$message({
          message: '问卷更改成功',
          type: 'success'
        })
        this.isEdit = false
      }
    },
    resetEdit () {
      // 使用个临时变量存储更改前问卷，
      alert('resetEdit')
    },
    cancelEdit () {
      // 注意重置问卷
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
