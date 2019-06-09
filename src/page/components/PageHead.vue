<template>
  <el-row>
    <el-col :span="24">
      <el-col :span="6" class="page-head-left">
        <strong class="title">{{ $route.name }}</strong>
      </el-col>
      <el-col :span="18" class="page-head-right">
        <el-breadcrumb separator="/">
          <template v-for="(item, index) in $route.matched">
            <el-breadcrumb-item v-if="index === 0" :key="item.path" :to="{ path: '/' + item.path }">
              {{ item.name }} {{ index }}
            </el-breadcrumb-item>
            <el-breadcrumb-item v-else :key="item.path" :to="{ path: item.path }">
              {{ item.name }} {{ index }}
            </el-breadcrumb-item>
          </template>
        </el-breadcrumb>
      </el-col>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.page-head-left {
  width: 80px;
  line-height: 1;
}
.page-head-right {
  position: absolute;
  right: 0;
  width: 150px;
  text-align: right;
}
</style>

