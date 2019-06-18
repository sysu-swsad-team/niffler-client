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
      <el-table-column prop="content" label="content">
        <template slot-scope="scope">
          <template v-if="scope.row.title === '照片'">
            <div class="avator-box">
              <img :src="getInfo.avatar" class="avatar"/>
              <div class="camera-box">
                <i class="el-icon-camera-solid camera-icon"></i>
              </div>
            </div>
          </template>
          <template v-else>{{ scope.row.content }}</template>
        </template>
      </el-table-column>
      <el-table-column label="foo" fixed="right" width="50">
        <template>
          <i class="el-icon-arrow-right" style="font-weight: bold;"></i>
        </template>
      </el-table-column>
    </el-table>
    <el-button type="button" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="活动名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="活动区域" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai"></el-option>
            <el-option label="区域二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
</el-row>
</template>

<script>
export default {
  data () {
    return {
      isLoading: false,
      personInfoList: [
        {title: '照片', content: '照片'},
        {title: '闲钱币', content: this.$store.getters.getInfo.coinNum},
        {title: '姓名', content: this.$store.getters.getInfo.username},
        {title: '学号', content: this.$store.getters.getInfo.stuId},
        {title: '生日', content: this.$store.getters.getInfo.birth},
        {title: '性别', content: this.$store.getters.getInfo.sex ? '男' : '女'},
        {title: '年级', content: this.$store.getters.getInfo.grade},
        {title: '专业', content: this.$store.getters.getInfo.major},
        {title: '邮箱', content: this.$store.getters.getInfo.email},
        {title: '密码', content: '••••••••'}
      ],
      dialogTableVisible: false,
      dialogFormVisible: false,
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      formLabelWidth: '120px'
    }
  },
  methods: {
    selectionChange: function (selection) {
    },
    rowClick: function (row, column, event) {
      console.log(row, column, event)
      console.log(row.title)
    },
    rowStyle ({row, rowIndex}) {
      if (row.title === '闲钱币' || row.title === '邮箱') {
        return 'height: 66px; cursor: not-allowed;'
      } else {
        return 'height: 66px; cursor: pointer;'
      }
    },
    cellStyle ({row, column, rowIndex, columnIndex}) {
      if (columnIndex === 1) {
        return 'font-weight: bold;'
      } else if (columnIndex === 0) {
        return 'font-weight: normal; font-size: 12px;'
      }
    }
  },
  computed: {
    getInfo () {
      return this.$store.getters.getInfo
    }
  }
}
</script>

<style lang="scss" scoped>
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
</style>
