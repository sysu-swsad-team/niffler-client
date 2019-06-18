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
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.title" placeholder="活动标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filters.sponsor" placeholder="活动发起者"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="errandList" highlight-current-row v-loading="listLoading" style="width: 100%;" stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="id" label="ID" width="100" sortable></el-table-column>
        <el-table-column prop="title" label="活动标题" width="200"></el-table-column>
        <el-table-column prop="sponsor" label="发起者" width="150"></el-table-column>
        <el-table-column prop="fee" label="报酬" width="80" sortable></el-table-column>
        <el-table-column prop="dueDate" label="结束时间" width="150"></el-table-column>
        <el-table-column prop="tag" label="类型" width="100" :filters="[{ text: '快递', value: '快递' }, { text: '外卖', value: '外卖' }]" :filter-mothod="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '快递' ? 'primary' : 'success'" disable-transitions> {{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作和活动描述" width="200">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">{{ scope.row.description }}</div>
              <el-button size="small" type="primary" @click="takeErrand(scope.$index)">接取该任务</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
        </el-pagination>
      </el-col>
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
      filters: {
        title: '',
        sponsor: ''
      },
      // 加载页面前从后端获取errandList，当前所有可接受活动（假设每个活动只能一个人接取）
      errandList: [{
        id: 0,
        title: '外卖1',
        sponsor: '14',
        fee: 0.1,
        dueDate: '1123-2-2',
        tag: '外卖',
        description: '放假哦我啊哈公安局发的'
      }, {
        id: 1,
        title: '外卖2',
        sponsor: '14',
        fee: 0.1,
        dueDate: '1123-2-2',
        tag: '外卖',
        description: '放假哦我啊哈公安局发的'
      }, {
        id: 3,
        title: '快递1',
        sponsor: '14',
        fee: 0.1,
        dueDate: '1123-2-2',
        tag: '快递',
        description: '放假哦我公安局发的'
      }],
      listLoading: false,
      total: 0
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
    },
    handleCurrentChange () { },
    getFilter () {
      alert('查询条件' + this.filters)
    },
    filterTag (value, row) {
      return row.tag === value
    },
    takeErrand (index) {
      // 接受此任务，后端将该任务的接受者设为当前用户，并设置该任务不能再被其他用户接受。注意处理并发事件
      // 即当此时用户发送接受任务请求时，若在此页面重新渲染前，任务已被其他用户先接取，需返回提示信息，接取任务失败
      var success = true
      this.$confirm('确定接取该任务吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        if (success) {
          this.$message({
            type: 'success',
            message: '任务接取成功，请按要求在规定时间内完成'
          })
        } else {
          this.$message.error('任务接取失败 + 原因')
        }
      }).catch(() => { })
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
