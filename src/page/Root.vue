<template>
  <el-row id="app">
    <el-col :span="24" class="header">
      <el-col :span="12">
        <el-col :span="6" class="collapse-btn-col">
          <el-tooltip effect="dark" content="菜单" placement="bottom">
            <el-button icon="fa fa-align-justify" @click.native="collapse" style="outline:none;" circle></el-button>
          </el-tooltip>
        </el-col>
        <router-link to="/home">
          <el-col :span="6" class="logo">
            <img id="niffler-logo" :src="this.nifflerLogo"/>
            <!-- <i class="fa fa-home"></i> -->
            {{sysName}}
          </el-col>
        </router-link>
      </el-col>
      <el-col :span="12" class="header-right">
        <el-tooltip class="item" effect="dark" content="Home" placement="bottom">
          <router-link to="/home"><el-button icon="fa fa-home" style="outline:none;" circle></el-button></router-link>
        </el-tooltip>
        <el-popover placement="bottom" width="400" trigger="click">
          <h6 style="text-align: center;">Niffler 应用模块</h6>
          <!-- <el-col :span="24">
            <el-col :span="8">
              <router-link to="/questionnaire"><el-button class="modules" icon="el-icon-edit-outline" style="outline:none;">问卷系统</el-button></router-link>
            </el-col>
            <el-col :span="8">
              <el-button class="modules" icon="fa fa-wheelchair-alt" style="outline:none;"> 跑腿办事</el-button>
            </el-col>
            <el-col :span="8">
              <el-button class="modules" icon="fa fa-truck" style="outline:none;"> 其他系统</el-button>
            </el-col>
          </el-col> -->
          <ModuleCards :details="false"></ModuleCards>
          <el-button style="outline:none; margin-left: 10px;" slot="reference" icon="el-icon-s-grid" circle></el-button>
        </el-popover>
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">
            <img id="avatar" :src="this.sysUserAvatar"/>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>{{sysUserName}}</el-dropdown-item>
            <el-dropdown-item divided>我的消息</el-dropdown-item>
            <el-dropdown-item>设置</el-dropdown-item>
            <el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-col>
    <router-view></router-view>
  </el-row>
</template>

<script>
import img from '../assets/images/login-background.jpg'
import logo from '../assets/images/niffler-logo.png'
import ModuleCards from './components/ModuleCards'
export default {
  data () {
    return {
      sysName: 'NIFFLER',
      sysUserName: 'someone',
      sysUserAvatar: img,
      nifflerLogo: logo
    }
  },
  methods: {
    // 折叠导航栏
    collapse: function () {
      this.$store.dispatch('changeSideBar')
    },
    logout () {
      var _this = this
      this.$confirm('确认退出吗？', '提示', {
        // type: 'warning'
      }).then(() => {
        this.$store.dispatch('resetAuth')
        _this.$router.push('/login')
      }).catch(() => { })
    },
    test () {
      console.log(this.$router)
    }
  },
  components: {
    ModuleCards
  }
}
</script>

<style scoped lang="scss">
@import '~scss_vars';
#app {
  font-family: "Helvetica Neue","PingFang SC", Arial, sans-serif;
}
.el-dropdown-link {
  cursor: pointer;
  color: #fff;
}
.el-icon-arrow-down {
  font-size: 12px;
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
  margin: 10px 0px 10px 10px;
}

.logo {
  color: #fff;
  width: 130px;
  height: 60px;
  font-size: 22px;
  margin-left: 20px;
  margin-right: 20px;
  // border-right-width: 1px;
  border-right-style: solid;
  #niffler-logo {
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
