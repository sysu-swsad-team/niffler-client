<template>
  <el-row id="app">
    <el-col :span="24" class="header">
      <el-col :span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':sysName}}
      </el-col>
      <el-col :span="10">
        <div class="tools" @click.prevent="collapse">
          <i class="fa fa-align-justify"></i>
        </div>
      </el-col>
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <img :src="this.sysUserAvatar"/>{{sysUserName}}
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>

    <!-- <el-col :span="24" class="header-nav">
      <el-menu :default-active="activeIndex" align="center" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
      </el-menu>
    </el-col> -->

    <el-col :span="24" class="main">
      <!-- <el-radio-group v-model="collapsed" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group> -->
      <aside>
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo"
          @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="collapsed"
          :collapse-transition="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
          <el-menu-item index="3" disabled>
            <i class="el-icon-document"></i>
            <span slot="title">导航三</span>
          </el-menu-item>
          <el-menu-item index="4">
            <i class="el-icon-setting"></i>
            <span slot="title">导航四</span>
          </el-menu-item>
        </el-menu>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <el-col :span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <el-breadcrumb separator="/" class="breadcrumb-inner">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </el-col>
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
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
            </transition>
          </el-col>
        </div>
      </section>
    </el-col>
  </el-row>
</template>

<script>
import img from '../assets/logo.png'
export default {
  data () {
    return {
      sysName: 'NIFFLER',
      collapsed: false,
      sysUserName: 'someone',
      sysUserAvatar: img,
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
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    // 折叠导航栏
    collapse: function () {
      this.collapsed = !this.collapsed
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss">
@import '~scss_vars';
#app {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 100%;
  margin: 0 auto;
  font-family: "Helvetica Neue","PingFang SC", Arial, sans-serif;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.header {
  height: 60px;
  line-height: 60px;
  background: $color-primary;
  color: #fff;
  .userinfo {
    text-align: right;
    padding-right: 35px;
    float: right;
    .userinfo-inner {
      cursor: pointer;
      color: #fff;
      img {
        width: 40px;
        height: 40px;
        // border-radius: 20px;
        margin: 10px 0px 10px 10px;
        float: right;
      }
    }
  }
  .logo-width {
    width: 200px;
    transition: 0.3s;
  }
  .logo-collapse-width {
    width: 64px;
    transition: 0.3s;
  }
  .logo {
    height: 60px;
    font-size: 22px;
    padding-left: 20px;
    padding-right: 20px;
    border-color: rgba(238, 241, 146, 0.3);
    border-right-width: 1px;
    border-right-style: solid;
  }
  .tools {
    padding: 0px 23px;
    width: 14px;
    height: 60px;
    cursor: pointer;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.main {
  display: flex;
  overflow: hidden;
}
.content-container {
  flex: 1;
  overflow-y: scroll;
  top: 60px;
  bottom: 0px;
  padding: 20px;
  .breadcrumb-container {
    //margin-bottom: 15px;
    .title {
      width: 200px;
      float: left;
      color: #475669;
    }
    .breadcrumb-inner {
      float: right;
    }
  }
  .content-wrapper {
    background-color: #fff;
    box-sizing: border-box;
  }
}

// body{margin: 0;}
// #app {
//   // min-width: 1200px;
//   margin: 0 auto;
//   font-family: "Helvetica Neue","PingFang SC",Arial,sans-serif;
// }
// /* 头部导航 */
// header {
//   z-index: 1000;
//   // min-width: 1200px;
//   transition: all 0.5s ease;
//   border-top: solid 16px #3091F2;
//   background-color: #fff;
//   box-shadow: 0 4px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
// }
// header.header-fixed {
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
// }
// header .el-menu-demo {
//   text-align: center;
//   // padding-left: 300px!important;
// }

// /* 主内容区 */
// main {
//   // display: -webkit-box;
//   // display: -ms-flexbox;
//   display: flex;
//   min-height: 800px;
//   border: solid 40px #E9ECF1;
//   background-color: #FCFCFC;
// }
// main .main-left {
//   text-align: center;
//   width: 200px;
//   float: left;
// }
// main .main-right {
//   // -webkit-box-flex: 1;
//   // -ms-flex: 1;
//   flex: 1;  // 让所有弹性盒模型对象的子元素都有相同的长度，且忽略它们内部的内容
//   background-color: #fff;
//   padding: 50px 70px;
// }
// main .el-menu{
//   background-color: transparent!important;
// }
</style>
