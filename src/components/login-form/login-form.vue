<template>
  <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
    <FormItem prop="username">
      <Input v-model="form.username" placeholder="请输入用户名">
        <span slot="prepend">
          <Icon :size="16" type="ios-person"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="form.password" placeholder="请输入密码">
        <span slot="prepend">
          <Icon :size="14" type="md-lock"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem prop="code">
      <img :src="captchaImg" style="width: 100px; float: right; cursor: pointer;" @click="getCaptchaImg"/>
      <Input v-model="form.code" style="width: 150px;" maxlength="5">
        <span slot="prepend">
          <Icon :size="14" type="logo-twitter"></Icon>
        </span>
      </Input>
    </FormItem>
    <FormItem>
      <Button @click="handleSubmit" type="primary" long>登录</Button>
    </FormItem>
  </Form>
</template>
<script>
import { getCaptchaImg } from '@/api/user'
export default {
  name: 'LoginForm',
  props: {
    usernameRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '账号不能为空', trigger: 'blur' }
        ]
      }
    },
    passwordRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '密码不能为空', trigger: 'blur' }
        ]
      }
    },
    codeRules: {
      type: Array,
      default: () => {
        return [
          { required: true, message: '验证码不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  data () {
    return {
      captchaImg: '',
      form: {
        username: 'zhxl',
        password: '111111',
        code: '11111',
        key: ''
      }
    }
  },
  computed: {
    rules () {
      return {
        username: this.usernameRules,
        password: this.passwordRules,
        code: this.codeRules
      }
    }
  },

  mounted () {
    this.getCaptchaImg()
  },
  methods: {
    handleSubmit () {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.$emit('on-success-valid', {
            username: this.form.username,
            password: this.form.password,
            code: this.form.code,
            key: this.form.key
          })
        }
      })
    },
    async getCaptchaImg () {
      this.form.code = '11111'
      const resp = await getCaptchaImg()
      this.captchaImg = resp.data.captchaImg
      this.form.key = resp.data.key
    }
  }
}
</script>
