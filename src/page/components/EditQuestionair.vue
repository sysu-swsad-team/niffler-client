<template>
  <el-col :span="24" class="content-wrapper">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-position="left" label-width="80px">
      <el-form-item label="题目" prop="title">
        <el-input v-model="ruleForm.title" maxlength="30" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="description">
        <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 8}" v-model="ruleForm.description" maxlength="300" show-word-limit></el-input>
      </el-form-item>
      <el-form-item label="结束时间" prop="dueDate" style="margin-top:10px">
        <el-date-picker v-model="ruleForm.dueDate" type="datetime"></el-date-picker>
      </el-form-item>
      <el-form-item lable-width="10px">
        <el-col :span="7">
          <el-form-item label="最大填写份数：" prop="maxNumber" label-width="120px">
            <el-input-number v-model="ruleForm.maxNumber" :min="1" :max="99999"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label="每份金额(元)：" prop="fee" label-width="120px">
            <el-input-number v-model="ruleForm.fee" :min="0.01" :max="9999.0" :step="0.01"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="7" :offset="1">
          <el-form-item label="标签" label-width="100px" prop="tag">
            <el-select v-model="ruleForm.tag" placeholder="请选择">
              <el-option v-for="item in tags" :key="item.value" :label="item.value" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-divider content-position="center">问卷内容</el-divider>
      <el-form-item
        v-for="(question, index) in ruleForm.questions"
        :label="'问题 ' + index" :key="question.key" v-if="index > 0">
        <div>{{ question.title }}</div>
        <el-form-item v-if="question.type === 0">
          <el-radio-group v-for="(option) in question.options" :key="option.key">
            <el-radio style="margin: 0 20px 0 20px">{{ option.value }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="question.type === 1">
          <el-checkbox-group v-for="(option) in question.options" :key="option.key">
            <el-checkbox>{{ option.value }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item v-if="question.type === 2">
          <el-input placeholder="答案" style="margin-bottom: 5px"></el-input>
        </el-form-item>
        <el-button type="primary" icon="el-icon-edit" @click.prevent="editQuestion(question)">编辑</el-button>
        <el-button type="warning" icon="el-icon-delete" size="medium" @click.prevent="removeQuestion(question)">删除</el-button>
      </el-form-item>
      <el-form-item style="margin-top:10px;">
        <el-button type="primary" icon="el-icon-edit" @click="addSingleChoice" style="width:30%"> 单选题</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="addMulChoice" style="width:30%"> 多选题</el-button>
        <el-button type="primary" icon="el-icon-edit" @click="addFillIn" style="width:30%"> 填空题</el-button>
      </el-form-item>
      <el-form-item label="" style="margin-top: 10px;">
        <el-button :loading="isLoading" type="primary" icon="el-icon-document" @click.prevent="summitForm('ruleForm')" style="width:30%; margin-left: calc(30% + 12px)">提交问卷</el-button>
      </el-form-item>
    </el-form>

    <!-- 新增题目 -->
    <el-dialog :visible.sync="isAddQuestion" :close-on-click-model="false" :center="true" :show-close="false" :close-on-press-escape="false" append-to-body>
      <h5 v-if="addType === 0" style="text-align: center">单选题</h5>
      <h5 v-else-if="addType === 1" style="text-align: center">多选题</h5>
      <h5 v-else-if="addType === 2" style="text-align: center">填空题</h5>
      <el-divider></el-divider>
      <el-form :model="addQuestion" label-width="100px" class="demo-dynamic">
        <el-form-item label="题目" prop="question">
          <el-input type="textarea" :autosize=" {minRows: 1, maxRows: 2} " v-model="addQuestion.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="addType === 0 || addType === 1"
          v-for="(option, index) in addQuestion.options"
          :key="option.key" :rules=" { required: true, message: '选项不能为空' } "
          :label="'选项' + (index + 1)"
        >
          <el-input v-model="option.value" size="small"></el-input>
          <el-button type="warning" icon="el-icon-delete" size="small" @click.prevent="removeOption(option)">删除</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click.native="commitQuestion">确认</el-button>
        <el-button size="medium" v-if="addType === 0 || addType === 1" @click.prevent="addOption">增加选项</el-button>
        <el-button size="medium" @click.native="isAddQuestion = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 编辑题目 -->
    <el-dialog :visible.sync="isEdit" :close-on-click-model="false" :center="true" :show-close="false" :close-on-press-escape="false" append-to-body>
      <h5 v-if="editForm.type === 0" style="text-align: center">单选题</h5>
      <h5 v-else-if="editForm.type === 1" style="text-align: center">多选题</h5>
      <h5 v-else-if="editForm.type === 2" style="text-align: center">填空题</h5>
      <el-divider></el-divider>
      <el-form :model="editForm" label-width="100px" class="demo-dynamic">
        <el-form-item label="题目">
          <el-input type="textarea" :autosize=" {minRows: 1, maxRows: 2} " v-model="editForm.title" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-if="editForm.type === 0 || editForm.type === 1"
          v-for="(option, index) in editForm.options"
          :key="option.key" :rules=" { required: true, message: '选项不能为空' } "
          :label="'选项' + (index + 1)"
        >
          <el-input v-model="option.value" size="small"></el-input>
          <el-button type="warning" icon="el-icon-delete" size="small" @click.prevent="removeOptionInEdit(option)">删除</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="medium" @click.native="commitQuestionInEdit">提交</el-button>
        <el-button size="medium" v-if="editForm.type === 0 || editForm.type === 1" @click.prevent="addOptionInEdit">增加选项</el-button>
      </div>
    </el-dialog>
  </el-col>
</template>

<script>
/* 引入api */
import {summitQN} from '../../api/api'

export default {
  name: 'EditQuestionair',
  props: {
    ruleForm: {
      title: '',
      tag: '',
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
  },
  computed: {
    getInfo () {
      return this.$store.getters.getInfo
    }
  },
  data () {
    return {
      addQuestion: {
        title: '',
        options: [{
          value: ''
        }]
      },
      tags: [{
        value: '学校'
      }, {
        value: '商业'
      }],
      temp: '',
      addType: -1,
      editForm: {
        title: '',
        type: -1,
        options: [{
          value: ''
        }]
      },
      rules: {
        title: [
          { required: true, message: '请输入题目', triggr: 'blur' },
          { min: 2, max: 50, message: '长度应为2~50', triggr: 'blur' }
        ],
        description: [
          { required: true, message: '请输入问卷描述', triggr: 'blur' }
        ],
        maxNumber: [
          { required: true }
        ],
        fee: [
          { required: true }
        ],
        tag: [
          { required: true, message: '请选择类型', triggr: 'blur' }
        ],
        dueDate: [
          { type: 'date', required: true, message: '请选择问卷到期时间', triggr: 'blur' }
        ]
      },
      isAddQuestion: false,
      isEdit: false,
      isLoading: false
    }
  },
  methods: {
    addSingleChoice () {
      this.addType = 0
      this.isAddQuestion = true
      this.addQuestion = {
        title: '',
        options: [{
          value: ''
        }]
      }
    },
    addMulChoice () {
      this.addType = 1
      this.isAddQuestion = true
      this.addQuestion = {
        title: '',
        options: [{
          value: ''
        }]
      }
    },
    addFillIn () {
      this.addType = 2
      this.isAddQuestion = true
      this.addQuestion = {
        title: '',
        options: [{
          value: ''
        }]
      }
    },
    addOption () {
      this.addQuestion.options.push({
        value: '',
        key: Date.now()
      })
    },
    addOptionInEdit () {
      this.editForm.options.push({
        value: '',
        key: Date.now()
      })
    },
    removeOption (item) {
      var index = this.addQuestion.options.indexOf(item)
      if (index !== -1) {
        this.addQuestion.options.splice(index, 1)
      }
    },
    removeOptionInEdit (item) {
      var index = this.editForm.options.indexOf(item)
      if (index !== -1) {
        this.editForm.options.splice(index, 1)
      }
    },
    removeQuestion (item) {
      var index = this.ruleForm.questions.indexOf(item)
      if (index !== -1) {
        this.ruleForm.questions.splice(index, 1)
      }
    },
    editQuestion (item) {
      this.editForm = item
      this.isEdit = true
    },
    commitQuestion () {
      if (this.addQuestion.title === '') {
        this.$message.error('请输入题目！')
      } else {
        console.log(this.ruleForm.questions)
        this.ruleForm.questions.push({
          title: this.addQuestion.title,
          type: this.addType,
          options: this.addQuestion.options,
          key: Date.now()
        })
        this.isAddQuestion = false
      }
    },
    commitQuestionInEdit () {
      if (this.editForm.title === '') {
        this.$message.error('请输入题目！')
      } else {
        this.isEdit = false
      }
    },
    summitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm('确定提交问卷吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'success'
          }).then(() => {
            this.isLoading = true
            console.log(this.getInfo.email)
            let summitParams = {
              taskType: '问卷',
              title: this.ruleForm.title,
              tag: [this.ruleForm.tag],
              description: this.ruleForm.description,
              maxNumber: this.ruleForm.maxNumber,
              fee: this.ruleForm.fee,
              dueDate: this.ruleForm.dueDate.toString(),
              questions: this.ruleForm.questions
            }
            summitQN(summitParams).then(res => {
              console.log(res)
              if (res.status === 200) {
                this.$message({
                  message: '问卷提交成功',
                  type: 'success'
                })
              } else {
                this.$message({
                  message: '提交失败 ' + res.data.msg,
                  type: 'error'
                })
              }
              this.isLoading = false
            }).catch(err => {
              console.log(err)
              this.isLoading = false
              return false
            })
          })
        } else {
          console.log('error submit')
          this.isLoading = false
          return false
        }
      })
    }
  }
}
</script>
