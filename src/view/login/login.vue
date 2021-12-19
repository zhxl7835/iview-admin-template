<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
<!--          <p class="login-tip">输入任意用户名和密码即可</p>-->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
import { getToken } from '@/libs/util'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      flag: false
    }
  },
  methods: {
    ...mapActions([
      'handleLogin'
    ]),
    handleSubmit ({ username, password, code, key }) {
      this.handleLogin({ username, password, code, key }).then(res => {
        if (!getToken()) {
          this.flag = true
        } else {
          this.flag = false
          this.$router.push({
            name: this.$config.homeName
          })
          this.$Message.success(res.msg)
        }
      })
    }
  }
}
</script>

<style>

</style>
