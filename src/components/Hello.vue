<template>
  <div class="hello">
    <h1 @click="info" :class="color">{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: '我是Hello组件',
      color:'color'
    }
  },
  methods:{
      info(){
          console.log('你点击了我');
      }
  }
}
</script>

<style>