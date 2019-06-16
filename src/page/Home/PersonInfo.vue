<template>
  <el-row>
    <el-table
    :data="questionnaireList"
    :show-header="false"
    :highlight-current-row="false"
    :row-style="rowStyle"
    :cell-style="cellStyle"
    v-loading="listLoading"
    @selection-change="selsChange"
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
</el-row>
</template>

<script>
export default {
  data () {
    return {
      listLoading: false,
      questionnaireList: [
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
      ]
    }
  },
  methods: {
    getQustionnair (index) {
      alert('获取问卷' + this.questionnaireList[index].title)
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    rowClick: function (row, column, event) {
      // console.log(row, column, event)
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
