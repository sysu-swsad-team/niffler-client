<template>
    <el-row class="content-warpper">
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" :model="filters">
          <el-form-item>
            <el-input v-model="filters.title" placeholder="活动标题"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="el-icon-search" @click="getFilter"> 查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-table :data="errandList" highlight-current-row @selection-change="selsChange" style="width: 100%;" stripe>
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column type="index" width="50"></el-table-column>
        <el-table-column prop="id" label="ID" width="100" sortable></el-table-column>
        <el-table-column prop="title" label="活动标题" width="200"></el-table-column>
        <el-table-column prop="fee" label="报酬" width="80" sortable></el-table-column>
        <el-table-column prop="finisher" label="接取者" width="100"></el-table-column>
        <el-table-column prop="dueDate" label="结束日期" width="150"></el-table-column>
        <el-table-column prop="tag" label="类型" width="100" :filters="[{ text: '快递', value: '快递' }, {text: '外卖', value: '外卖' }]" :filter-method="filterTag" filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag :type="scope.row.tag === '快递' ? 'primary' : 'success'"
            disable-transitions>{{ scope.row.tag }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作和描述" width="150">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">{{ scope.row.description }}</div>
              <el-button size="small" type="danger" @click="deleteErrand(scope.$index)">删除</el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24" class="toolbar">
        <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
        </el-pagination>
      </el-col>
      <el-col :span="24" class="toolbar">
        <el-button type="danger" size="medium" style="margin-top: 5px;" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
      </el-col>
    </el-row>
</template>

<script>
import Vue from 'vue'
Vue.component('anchored-heading', {
  render: function (createElement) {
    return createElement(
      'h' + this.level, // 标签名称
      this.$slots.default // 子节点数组
    )
  },
  props: {
    level: {
      type: Number,
      required: true
    }
  }
})
export default {
  data () {
    return {
      filters: {
        title: ''
      },
      errandList: [
        {
          id: 0,
          title: '活动1',
          description: '问卷1描述',
          fee: 10,
          dueDate: '1111-1-1',
          tag: '快递',
          finisher: '用户1'
        }, {
          id: 1,
          title: '轰动2',
          description: '问卷2描述',
          fee: 10,
          dueDate: '1111-1-1',
          tag: '外卖',
          finisher: '用户1'
        },
        {
          id: 3,
          title: '问卷3',
          description: '问卷3描述',
          fee: 50,
          dueDate: '1131-1-1',
          tag: '外卖',
          finisher: '用户1'
        },
        {
          id: 4,
          title: '问卷4',
          description: '问卷4描述',
          fee: 0.3,
          dueDate: '1131-1-1',
          tag: '快递',
          finisher: '无'
        }
      ],
      sels: [],
      total: 1
    }
  },
  methods: {
    getFilter () {
      // 从后端根据查询条件获取对应的活动，放在errandList中
      alert('查询条件' + this.filters)
    },
    selsChange: function (sels) {
      this.sels = sels
    },
    filterTag (value, row) {
      return row.tag === value
    },
    batchRemove () {
      // 根据sels中的下标，找到对应问卷的id，传给后端进行删除，返回成功再在前端questionnaireList进行删除
    },
    deleteErrand (index) {
      // 根据this.errandList[index].id 想后端请求删除的活动，如果返回success，在前端的
      // this.errandList删除对应活动
      event.cancelBubble = true
      alert('删除问卷' + this.errandList[index].title)
    },
    handleCurrentChange () { }
  }
}
</script>
