<template>
<el-col :span="24" class="main">
  <aside>
    <el-menu default-active="1" class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse"
      :collapse-transition="true">
      <el-menu-item index="1" @click="$router.push('/questionnaire')">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">问卷系统</span>
      </el-menu-item>
      <el-menu-item index="2" @click="$router.push('/questionnaire/create')">
        <i class="el-icon-menu"></i>
        <span slot="title">创建问卷</span>
      </el-menu-item>
      <el-menu-item index="3" @click="$router.push('/questionnaire/mine')">
        <i class="el-icon-document"></i>
        <span slot="title">我的问卷</span>
      </el-menu-item>
    </el-menu>
  </aside>
  <section class="content-container">
    <PageHead id="page-head"></PageHead>
    <template v-if="this.$route.path === '/questionnaire'">
      <el-col :span="24" class="toolbar" sytle="padding-bottom: 0px;">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.title" placeholder="问卷标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input v-model="filters.sponsor" placeholder="问卷发起者"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="getFilter">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="questionnaireList" highlight-current-row v-loading="listLoading" @selection-change="selsChange" style="width: 100%;" stripe>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="id" label="ID" width="100" sortable></el-table-column>
        <el-table-column prop="title" label="问卷标题" width="200"></el-table-column>
        <el-table-column prop="sponsor" label="发起者" width="150" sortable></el-table-column>
        <el-table-column prop="maxNumber" label="剩余量" width="100" sortable></el-table-column>
        <el-table-column prop="fee" label="费用" width="80" sortable></el-table-column>
        <el-table-column prop="dueDate" label="结束日期" width="150"></el-table-column>
        <el-table-column prop="tag" label="标签" width="100" :filters="[{ text: '商业', value: '商业' }, {text: '学校', value: '学校' }]" :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '商业' ? 'primary' : 'success'"
            disable-transitions>{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作和描述" width="120">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">{{ scope.row.description }}</div>
              <el-button size="small" type="primary" @click="getQustionnair(scope.$index)">填写问卷</el-button>
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
import PageHead from '../components/PageHead'
export default {
  data () {
    return {
      questionnaireList: [
        {
          id: 0,
          title: '问卷1',
          sponsor: '发起者1',
          description: '问卷1描述',
          maxNumber: 20,
          fee: 10,
          dueDate: '1111-1-1',
          tag: '学校'
        }, {
          id: 1,
          title: '问卷2',
          sponsor: '发起者2',
          description: '问卷2描述',
          maxNumber: 20,
          fee: 10,
          dueDate: '1111-1-1',
          tag: '商业'
        },
        {
          id: 3,
          title: '问卷3',
          sponsor: '发起者3',
          description: '问卷3描述',
          maxNumber: 10,
          fee: 50,
          dueDate: '1131-1-1',
          tag: '学校'
        },
        {
          id: 4,
          title: '问卷4',
          sponsor: '发起者2',
          description: '问卷4描述',
          maxNumber: 30,
          fee: 4,
          dueDate: '1131-1-1',
          tag: '商业'
        }
      ],
      filters: {
        title: '',
        sponsor: ''
      },
      listLoading: false,
      sels: []
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
      // console.log(key, keyPath)
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    getFilter () {
      alert('查询条件' + this.filters)
    },
    getQustionnair (index) {
      alert('获取问卷' + this.questionnaireList[index].title)
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    filterTag (value, row) {
      return row.tag === value
    },
    handleCurrentChange () { }
  },
  components: {
    PageHead
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages.scss';
</style>
