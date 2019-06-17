<template>
<el-col :span="24" class="main">
  <aside>
    <el-menu default-active="1" class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse"
      :collapse-transition="true">
      <el-menu-item index="1" @click="$router.push('/errand')">
        <i class="el-icon-bicycle"></i>
        <span slot="title">跑腿办事</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/errand/create')">
        <i class="el-icon-s-order"></i>
        <span slot="title">创建订单</span>
      </el-menu-item>
      <el-menu-item index="3" @click="$router.push('/errand/mine')">
        <i class="el-icon-s-claim"></i>
        <span slot="title">我的订单</span>
      </el-menu-item>
    </el-menu>
  </aside>
  <section class="content-container">
    <PageHead id="page-head"></PageHead>
    <template v-if="this.$route.path === '/errand'">
      这里是跑腿办事主页的内容
    </template>
    <router-view v-else></router-view>
  </section>
</el-col>
</template>

<script>
/* Errand noun. 差使；差事
a job that you do for sb that involves going somewhere to take a message, to buy sth, deliver goods, etc. */
import PageHead from '../components/PageHead'
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
    PageHead
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
