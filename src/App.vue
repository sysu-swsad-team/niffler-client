<template>
  <div id="app">
    <transition name="fade" mode="out-in">
      <router-view></router-view>
    </transition>
    <!--可以定义不变的内容-->
    <!-- <h3>{{title}}</h3>
    <ul>
      <li><router-link to="/">MainPage页面</router-link></li>
      <li><router-link to="/HelloWorld">HelloWorld页面</router-link></li>
      <li><router-link to="/login">login页面</router-link></li>
      <li><router-link to="/404">404</router-link></li>
    </ul> -->
    <!--定义路由插座-->
    <!-- <router-view></router-view> -->
    <!--可以定义不变的内容-->
  </div>
</template>

<script>
export default{
  name: 'app',
  data () {
    return {
      title: '我是项目主入口'
    }
  }
}
</script>

<style>
#app {
  padding:0px;
  margin:0px;
  position:absolute;
  top:0px;
  left:0px;
  width:100%;
  height:100%;
  border:hidden;
  overflow-y:auto
}
</style>
