<template>
  <el-row id="root-container">
    <el-col :span="24" class="header">
      <el-col :span="12">
        <el-col :span="6" class="collapse-btn-col">
          <el-tooltip effect="dark" content="菜单" placement="bottom">
            <el-button icon="fa fa-align-justify" @click.native="collapse" style="outline:none;" circle></el-button>
          </el-tooltip>
        </el-col>
        <router-link to="/home">
          <el-col :span="6" class="logo">
            <img id="niffler-logo" :src="getInfo.logo"/>
            {{ getInfo.sysname }}
          </el-col>
        </router-link>
      </el-col>
      <el-col :span="12" class="header-right">
        <el-tooltip class="item" effect="dark" content="Home" placement="bottom">
          <router-link to="/home"><el-button icon="fa fa-home" style="outline:none;" circle></el-button></router-link>
        </el-tooltip>
        <el-popover placement="bottom" width="400" trigger="click">
          <p id="title">NIFFLER 功能模块</p>
          <ModuleCards :details="false"></ModuleCards>
          <el-button style="outline:none; margin-left: 10px;" slot="reference" icon="el-icon-s-grid" circle></el-button>
        </el-popover>
        <el-dropdown trigger="hover" @command="handleCommand" :hide-timeout="150" :show-timeout="0">
          <span class="el-dropdown-link userinfo-inner">
            <img id="avatar" :src="getInfo.avatar"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="personInfo" style="line-height: 40px;"><i class="el-icon-user"></i> {{ getInfo.name }}</el-dropdown-item>
            <el-dropdown-item command="message" divided style="line-height: 40px;"><i class="el-icon-bell"></i> 我的消息<el-badge :value="getInfo.msgNumUnread" :max="99" style="top: 3px; left: 3px;"/></el-dropdown-item>
            <el-dropdown-item command="logout" style="line-height: 40px;"><i class="el-icon-switch-button"></i> 退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <router-view></router-view>
  </el-row>
</template>

<script>
import ModuleCards from './components/ModuleCards'
import {postLogout} from '../api/api'
export default {
  data () {
    return {
    }
  },
  computed: {
    getInfo () {
      return this.$store.getters.getInfo
    }
  },
  methods: {
    // 折叠导航栏
    collapse: function () {
      this.$store.dispatch('changeSideBar')
    },
    handleCommand (command) {
      if (command === 'personInfo') {
        this.$router.push('/home/personInfo')
      } else if (command === 'message') {
        this.$router.push('/home/message')
      } else if (command === 'logout') {
        var _this = this
        this.$confirm('确认退出吗？', '提示', {
          // type: 'warning'
        }).then(() => {
          var param = {}
          postLogout(param).then(res => {
            console.log(res.data)
            let { code, msg } = res.data
            if (code === 200) {
              sessionStorage.clear()
              _this.$router.push('/login')
            } else {
              this.$message({
                message: '发送错误：' + msg,
                type: 'error'
              })
            }
          }).catch(err => {
            this.$message({
              message: err,
              type: 'error'
            })
          })
          // sessionStorage.clear()
          // getLogout(null).then(res => {
          //   console.log('logout res:', res)
          // }).catch(err => {
          //   console.log('logout err:', err)
          // })
          // _this.$router.push('/login')
        }).catch(() => { })
      }
    }
  },
  components: {
    ModuleCards
  }
}
</script>

<style scoped lang="scss">
@import '~scss_vars';
#title {
  text-align: center;
  font-weight:bold;
  font-size: 16px;
  font-family: 'Montserrat',"Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei",Arial,sans-serif;
}
#root-container {
  width: 100%;
  height: 100%;
}
.el-col {
  border-width: 0px;
}
.header-buttons {
  right: 0px;
}
.header {
  user-select: none;
  margin: 0px;
  height: 60px;
  line-height: 60px;
  background: $color-primary;
  color: #fff;
}

.header-right {
  text-align: right;
  padding-right: 35px;
}

#avatar {
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin: 8px 0px 10px 10px;
}

.logo {
  font-weight: bold;
  color: #fff;
  width: 140px;
  height: 60px;
  font-size: 23px;
  margin-left: 16px;
  margin-right: 20px;
  // border-right-width: 1px;
  border-right-style: solid;
  #niffler-logo {
    width: 30px;
    height: 30px;
    margin-bottom: 8px;
    margin-right: -2px;
    margin-left: -4px;
  }
}

.collapse-btn-col {
  padding: 0px 13px;
  width: 50px;
  height: 60px;
}
.modules {
  margin: 5px;
  height: 60px;
  // margin-right: 10px;
}
</style>
