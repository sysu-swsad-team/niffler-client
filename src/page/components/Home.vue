<template>
<el-col :span="24" class="main">
  <aside>
    <el-menu default-active="1" class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse"
      :collapse-transition="true">
      <el-menu-item index="1">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2">
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">设置</span>
      </el-menu-item>
    </el-menu>
  </aside>
  <section class="content-container">
    <el-row class="breadcrumb-container">
      <el-col :span="24">
        <strong class="title">{{$route.name}}</strong>
        <el-breadcrumb separator="/" class="breadcrumb-inner">
          <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
            {{ item.name }}
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <el-row style="padding-top: 20px;">
      <h4>Niffler 功能模块</h4>
      <el-col :span="6">
        <el-card :body-style="{ padding: '0px' }" class="module-cards" @click.native="handleQuestionnaireModuleClick">
          <img src="@/assets/images/products-lg-questionnaire.png" style="width: 100%;">
          <div style="padding: 14px;">
            <span>问卷系统</span>
            <div class="bottom clearfix">
              描述
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" :offset=1>
        <el-card :body-style="{ padding: '0px' }" class="module-cards">
          <img src="@/assets/images/delivery_779px_1229802_easyicon.net.png" style="width: 100%; padding: 10px;">
          <div style="padding: 14px;">
            <span>跑腿办事</span>
            <div class="bottom clearfix">
              描述
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" :offset=1>
        <el-card :body-style="{ padding: '0px' }" class="module-cards">
          <img src="@/assets/images/coins_782px_1227591_easyicon.net.png" style="width: 100%; padding: 16px;">
          <div style="padding: 14px;">
            <span>提现</span>
            <div class="bottom clearfix">
              描述
              <el-button type="text" class="button">操作按钮</el-button>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </section>
</el-col>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    isCollapse () {
      // 返回./store/index.js中的全局变量
      return this.$store.getters.getIsCollapse
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleQuestionnaireModuleClick () {
      this.$router.push('/questionnaire')
    }
  },
  components: {
  }
}
</script>

<style scoped lang="scss">
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
.module-cards {
  cursor: pointer;
}
</style>
