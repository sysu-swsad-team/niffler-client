<template>
  <div id="app">
    <!-- 头部导航 -->
    <header class="header">
    <el-row>
        <el-col :span="24">
          <el-menu default-active="5" class="el-menu-demo" mode="horizontal">
            <el-menu-item index="1">任务菜单</el-menu-item>
            <el-menu-item index="2">任务菜单</el-menu-item>
            <el-menu-item index="3">任务菜单</el-menu-item>
            <el-menu-item index="4">任务菜单</el-menu-item>
            <el-menu-item index="5">任务发布</el-menu-item>
          </el-menu>
        </el-col>
    </el-row>
    </header>
    <div style="position: relative;height: 60px;width: 100%;"></div>

    <main>
          <!-- 左侧导航 -->
        <div class="main-left">
          <el-menu default-active="/activePublic" class="el-menu-vertical-demo" :router="true">
            <el-menu-item index="/activePublic" :class="{'isActive': true}">
              <i class="el-icon-document"></i>
              <span slot="title">任务发布</span>
            </el-menu-item>
            <el-menu-item index="/activeManage" :class="{'isActive': false}">
              <i class="el-icon-setting"></i>
              <span slot="title">任务设置</span>
            </el-menu-item>
          </el-menu>
        </div>

        <!-- 右侧主内容区 -->
        <div  class="main-right" >
          haha
          <el-table
            v-loading="loading"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </div>
    </main>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }],
      loading: false
    }
  }
}
</script>

<style>
body{margin: 0;}
#app {
  min-width: 1200px;
  margin: 0 auto;
  font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
}
/* 头部导航 */
header {
  z-index: 1000;
  min-width: 1200px;
  transition: all 0.5s ease;
  border-top: solid 16px #3091F2;
  background-color: #fff;
  box-shadow: 0 4px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
}
header.header-fixed {
  position: fixed;top: 0;
  left: 0;
  right: 0;
}
header .el-menu-demo {
  padding-left: 300px!important;
}

/* 主内容区 */
main {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  min-height: 800px;
  border: solid 40px #E9ECF1;
  background-color: #FCFCFC;
}
main .main-left {
  text-align: center;
  width: 200px;
  float: left;
}
main .main-right {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  background-color: #fff; padding: 50px 70px;
}
main .el-menu{
  background-color: transparent!important;
}
</style>
