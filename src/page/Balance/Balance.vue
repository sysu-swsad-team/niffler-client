<template>
<el-col :span="24" class="main">
  <aside>
    <el-menu default-active="1" class="el-menu-vertical-demo"
      @open="handleOpen" @close="handleClose" @select="handleSelect" :collapse="isCollapse"
      :collapse-transition="true">
      <el-menu-item index="1" @click="$router.push('/balance')">
        <i class="el-icon-s-finance"></i>
        <span slot="title">我的闲钱币</span>
      </el-menu-item>
    </el-menu>
  </aside>
  <section class="content-container">
    <PageHead id="page-head"></PageHead>
    <template v-if="this.$route.path === '/balance'">
      <el-row style="text-align: center; padding-top: 20px;">
        <div class="demo-image">
          <img :src="getInfo.avatar" class="avatar"/>
        </div>
        <h4 style="margin: 10px;">闲钱币余额：<strong>{{ `${getInfo.balance} (可用: ${getInfo.available_balance})` }} 元</strong></h4>
      </el-row>
      <el-col :span="24" class="toolbar">
        <el-form :inline="true" style="padding-top: 20px; text-align: center;">
          <el-form-item>
            <el-button type="primary" @click="withdraw">提现</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="recharge" style="padding-left: 20px;">充值</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-dialog :visible.sync="isWithdraw" :close-on-click-model="false" :show-close="true" :close-on-press-escape="true" width="50%" title="提现">
        <el-form :model="withdrawForm" label-width="100px" class="demo-dynamic">
          <el-form-item label="支付宝账号:" prop="account">
            <el-input v-model="withdrawForm.account" auto-complete="off" placeholder="为了能顺利提现，请确保输入您的支付宝账号"></el-input>
          </el-form-item>
          <el-form-item label="提现金额(元):" prop="money">
            <el-input-number :min="0.01" :max="9999.0" :step="0.01" v-model="withdrawForm.money"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="medium" @click.native="coimmitWithdraw">确认</el-button>
          <el-button size="medium" @click.native="isWithdraw = false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog :visible.sync="isRecharge" :close-on-click-model="false" :show-close="true" :close-on-press-escape="true" width="40%" title="充值">
        <el-form :model="rechargeForm" :rules="rechargeRules" ref="rechargeForm" status-icon>
          <el-form-item label="充值金额" prop="rechargeMoney">
            <el-input-number v-model="rechargeForm.rechargeMoney" :min="0.01" :max="9999.0" :step="0.01"></el-input-number>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" size="medium" @click.native="commitRecharge">确认</el-button>
          <el-button size="medium" @click.native="isRecharge = false">取消</el-button>
        </div>
      </el-dialog>
    </template>
    <router-view v-else></router-view>
  </section>
</el-col>
</template>

<script>
import PageHead from '../components/PageHead'
import VueQr from 'vue-qr'
import { makePayment } from '../../api/api'
export default {
  data () {
    return {
      isWithdraw: false,
      isRecharge: false,
      withdrawForm: {
        account: '',
        money: 0
      },
      rechargeForm: {
        rechargeMoney: ''
      },
      rechargeRules: {
        rechargeMoney: [
          { required: true, message: '请输入充值金额', trigger: 'change' }
        ]
      },
      config: {
        value: 'www.baidu.com',
        // logo图片路径
        logo: '',
        text: 'Niffler充值二维码（充值功能还在开发，请见谅）',
        payInfo: {}
      }
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
    withdraw () {
      this.isWithdraw = true
    },
    recharge () {
      this.isRecharge = true
    },
    coimmitWithdraw () {
      this.$confirm('确定提现吗？', '提升', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'success'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '提现请求已提交，会尽快处理，请留意'
        })
        this.isWithdraw = false
      }).catch(() => { })
    },
    commitRecharge () {
      this.$refs.rechargeForm.validate((valid) => {
        // this.$message({
        //   type: 'success',
        //   message: '功能待开发，敬请期待'
        // })
        if (valid) {
          console.log(this.rechargeForm.rechargeMoney)
          makePayment(this.rechargeForm.rechargeMoney).then(res => {
            console.log(res)
          }).catch(err => {
            console.log(err)
            return false
          })
        } else {
          console.log('error submit!')
          return false
        }
      })
    }
  },
  components: {
    PageHead,
    VueQr
  }
}
</script>

<style scoped lang="scss">
@import '@/styles/pages.scss';
.avatar {
  width: 200px;
  height: 200px;
  border-radius: 200px;
}
</style>
