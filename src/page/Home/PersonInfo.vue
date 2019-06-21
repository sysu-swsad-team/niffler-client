<template>
  <el-row>
    <el-table
    :data="personInfoList"
    :show-header="false"
    :highlight-current-row="false"
    :row-style="rowStyle"
    :cell-style="cellStyle"
    v-loading="isLoading"
    @selection-change="selectionChange"
    @row-click="rowClick"
    style="width: 100%;">
      <el-table-column prop="title" label="title" width="80"></el-table-column>
      <el-table-column prop="key" label="key">
        <template slot-scope="scope">
          <template v-if="scope.row.key === 'avatar'">
            <div class="avator-box">
              <img :src="getInfo.avatar" class="avatar"/>
              <div class="camera-box">
                <i class="el-icon-camera-solid camera-icon"></i>
              </div>
            </div>
          </template>
          <template v-else>{{ getInfoList[scope.row.key] }}</template>
        </template>
      </el-table-column>
      <el-table-column label="foo" fixed="right" width="50">
        <template>
          <i class="el-icon-arrow-right" style="font-weight: bold;"></i>
        </template>
      </el-table-column>
    </el-table>
    <!-- 对话框，更改个人信息 -->
    <el-dialog :title="'更改' + dialogTitle" :visible.sync="dialogVisible" @close="dialogResetForm()">
      <el-upload v-if="this.dialogKey === 'avatar'"
        class="avatar-uploader"
        action="http://jsonplaceholder.typicode.com/posts/"
        :show-file-list="true"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload">
        <img v-if="dialogImageUrl" :src="dialogImageUrl" class="avatar-form">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <el-form v-if="this.dialogKey === 'name'"
        :model="forms.name" :rules="rules.name" :ref="this.dialogKey" status-icon>
        <el-form-item prop="name">
          <el-input v-model="forms.name.name" autocomplete="off" placeholder="请输入您的真实姓名"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-else-if="this.dialogKey === 'stuId'"
        :model="forms.stuId" :rules="rules.stuId" :ref="this.dialogKey" status-icon>
        <el-form-item prop="stuId">
          <el-input v-model="forms.stuId.stuId" autocomplete="off" placeholder="请输入您的学号"></el-input>
        </el-form-item>
      </el-form>
      <el-form v-else-if="this.dialogKey === 'birth'"
        :model="forms.birth" :rules="rules.birth" :ref="this.dialogKey" status-icon>
        <el-form-item prop="birth">
          <el-date-picker :editable="false" style="width: 100%;"
            v-model="forms.birth.birth"
            type="date"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"
            placeholder="请选择您的出生日期">
          </el-date-picker>
        </el-form-item>
      </el-form>
      <el-form v-else-if="this.dialogKey === 'sex'"
        :model="forms.sex" :rules="rules.sex" :ref="this.dialogKey" status-icon>
        <el-form-item prop="sex">
          <el-radio-group v-model="forms.sex.sex" style="width: 100%;" label="性别">
            <el-radio border label="男" style="width: 44%; margin: 0px;"></el-radio>
            <el-radio border label="女" style="width: 48%; margin-left: 8%;"></el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <el-form v-else-if="this.dialogKey === 'grade'"
        :model="forms.grade" :rules="rules.grade" :ref="this.dialogKey" status-icon>
        <el-form-item prop="grade">
          <el-select v-model="forms.grade.grade" placeholder="请选择年级" style="width: 100%;">
            <el-option label="大一" value="大一"></el-option>
            <el-option label="大二" value="大二"></el-option>
            <el-option label="大三" value="大三"></el-option>
            <el-option label="大四" value="大四"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form v-else-if="this.dialogKey === 'major'"
        :model="forms.major" :rules="rules.major" :ref="this.dialogKey" status-icon>
        <el-form-item prop="major">
          <el-select v-model="forms.major.major" placeholder="请输入您的专业" style="width: 100%;">
            <el-option label="软件工程" value="软件工程"></el-option>
            <el-option label="工商管理" value="工商管理"></el-option>
            <el-option label="计算机科学与技术" value="计算机科学与技术"></el-option>
            <el-option label="历史学系" value="历史学系"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form v-else-if="this.dialogKey === 'password'"
        label-position="right" label-width="78px"
        :model="forms.password" :rules="rules.password" :ref="this.dialogKey" status-icon>
        <el-form-item label="原密码" prop="oriPassword">
          <el-input v-model="forms.password.oriPassword" show-password placeholder="请输入原密码"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="forms.password.newPassword" show-password placeholder="请输入新密码"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="ackPassword">
          <el-input v-model="forms.password.ackPassword" show-password placeholder="请再次输入新密码"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogCancel()">取 消</el-button>
        <el-button @click="dialogResetForm()">重 置</el-button>
        <el-button type="primary" @click="dialogSubmitForm()">确 定</el-button>
      </div>
    </el-dialog>
</el-row>
</template>

<script>
export default {
  computed: {
    getInfo () {
      return this.$store.getters.getInfo
    },
    getInfoList () {
      const info = this.$store.getters.getInfo
      console.log(info)
      return {
        'avatar': '照片',
        'balance': info.balance,
        'name': info.name,
        'stuId': info.stuId,
        'birth': info.birth,
        'sex': info.sex,
        'grade': info.grade,
        'major': info.major,
        'email': info.email,
        'password': '••••••••'
      }
    }
  },
  components: {
  },
  data () {
    return {
      isLoading: false,
      personInfoList: [
        {key: 'avatar', title: '照片'},
        {key: 'balance', title: '闲钱币'},
        {key: 'name', title: '姓名'},
        {key: 'stuId', title: '学号'},
        {key: 'birth', title: '生日'},
        {key: 'sex', title: '性别'},
        {key: 'grade', title: '年级'},
        {key: 'major', title: '专业'},
        {key: 'email', title: '邮箱'},
        {key: 'password', title: '密码'}
      ],
      forms: {
        name: {name: ''},
        stuId: {stuId: ''},
        birth: {birth: ''},
        sex: {sex: ''},
        grade: {grade: ''},
        major: {major: ''},
        password: {oriPassword: '', newPassword: '', ackPassword: ''}
      },
      rules: {
        name: {name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]},
        stuId: {stuId: [{ required: true, message: '请输入学号', trigger: 'blur' }, { min: 8, max: 8, message: '长度为8的数字序列', trigger: 'blur' }]},
        birth: {birth: [{ required: true, message: '请输入出生年月', trigger: 'blur' }]},
        sex: {sex: [{ required: true, message: '请选择性别', trigger: 'blur' }]},
        grade: {grade: [{ required: true, message: '请选择年级', trigger: 'blur' }]},
        major: {major: [{ required: true, message: '请输入专业', trigger: 'blur' }]},
        password: {
          oriPassword: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
          newPassword: [{ required: true, message: '请输入新密码', trigger: 'blur' }, { min: 6, max: 20, message: '长度不小于6，不大于20', trigger: 'blur' }],
          ackPassword: [{ required: true, message: '请再次输入密码', trigger: 'blur' }, { min: 6, max: 20, message: '长度不小于6，不大于20', trigger: 'blur' }]
        }
      },
      dialogKey: '',
      dialogTitle: '',
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  methods: {
    isAllowClick (key) {
      if (key === 'balance' || key === 'email') {
        return false
      } else {
        return true
      }
    },
    selectionChange: function (selection) {
    },
    /* 点击行后的事件 */
    rowClick: function (row, column, event) {
      if (!this.isAllowClick(row.key)) {
        return
      }
      this.dialogKey = row.key
      this.dialogTitle = row.title
      this.dialogVisible = true
    },
    /* 提交dialog表单 */
    dialogSubmitForm () {
      if (this.dialogKey === 'avatar' || this.dialogKey === 'password') {
        /* TODO: avatar和password的处理 */
        this.dialogVisible = false
        return
      }
      /* 表单验证 */
      this.$refs[this.dialogKey].validate((valid) => {
        if (valid) {
          console.log('dialogSubmitForm', this.dialogKey, this.forms[this.dialogKey][this.dialogKey])
          /* TODO: 提交表单，修改个人信息 */

          /* 在Vuex store中修改 */
          this.$store.dispatch('setInfo', {itemName: this.dialogKey, itemValue: this.forms[this.dialogKey][this.dialogKey]})

          /* close dialog */
          this.dialogVisible = false

          /* 成功提示消息 */
          this.$message({
            message: '更改成功',
            type: 'success'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    /* 重置dialog表单 */
    dialogResetForm () {
      if (this.dialogKey === 'avatar') {
        return
      }
      this.$refs[this.dialogKey].resetFields()
    },
    /* 点击取消，关闭dialog */
    dialogCancel () {
      this.dialogVisible = false
    },
    /* 处理上传照片的函数 */
    handleAvatarSuccess (res, file) {
      this.dialogImageUrl = URL.createObjectURL(file.raw)
      console.log(this.dialogImageUrl)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    /* 表格行的样式设置 */
    rowStyle ({row, rowIndex}) {
      if (!this.isAllowClick(row.key)) {
        return 'height: 66px; cursor: not-allowed;'
      } else {
        return 'height: 66px; cursor: pointer;'
      }
    },
    /* 表格cell的样式设置 */
    cellStyle ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 1) {
        return 'font-weight: bold;'
      } else if (columnIndex === 0) {
        return 'font-weight: normal; font-size: 12px;'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~scss_vars';
.avatar-box {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.camera-box {
  border-radius: 0 0 60px 60px;
  background-color: rgba(32,33,36,0.6);
  bottom: 12px;
  height: 33%;
  width: 60px;
  left: 10px;
  position: absolute;
  right: 0;
  text-align: center;
  vertical-align: center;
}
.camera-icon {
  font-size: 20px;
  padding-top: 4px;
  width: 20px;
  height: 20px;
  color: white;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: $color-primary !important;
}
.avatar-uploader-icon {
  border: 1px dashed #d9d9d9 !important;
  border-radius: 6px;
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar-uploader-icon:hover {
  border-color: $color-primary !important;
}
.avatar-form {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
