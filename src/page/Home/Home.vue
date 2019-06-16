<template>
<el-col :span="24" class="main">
  <aside>
    <el-menu default-active="1" class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse"
      :collapse-transition="true">
      <el-menu-item index="1" @click="$router.push('/home')">
        <i class="el-icon-s-home"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/home/personinfo')">
        <i class="el-icon-user-solid"></i>
        <span slot="title">个人信息</span>
      </el-menu-item>
      <el-menu-item index="3" @click="$router.push('/home/message')">
        <i class="el-icon-message-solid"></i>
        <span slot="title">我的消息</span>
      </el-menu-item>
    </el-menu>
  </aside>
  <section class="content-container">
    <PageHead id="page-head"></PageHead>
    <template v-if="this.$route.path === '/home'">
      <el-row style="text-align: center;">
        <div class="demo-image">
          <img :src="getInfo.avatar" class="avatar"/>
        </div>
        <h3 style="margin: 10px;">欢迎使用，{{ getInfo.username }}</h3>
      </el-row>
      <el-row style="margin-top: 20px; text-align: center;">
        <ModuleCards :details="true" style="width: 80%; margin:0 auto;"></ModuleCards>
      </el-row>
    </template>
    <router-view v-else></router-view>
  </section>
</el-col>
</template>

<script>
import PageHead from '../components/PageHead'
import ModuleCards from '../components/ModuleCards'
export default {
  data () {
    return {
    }
  },
  computed: {
    isCollapse () {
      // 返回./store/index.js中的全局变量
      return this.$store.getters.getIsCollapse
    },
    getInfo () {
      return this.$store.getters.getInfo
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      // console.log(this.$route.path)
      // console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  },
  components: {
    PageHead,
    ModuleCards
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages.scss';
.avatar {
  width: 150px;
  height: 150px;
  border-radius: 150px;
}
</style>
