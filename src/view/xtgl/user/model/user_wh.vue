<template>
  <div style="width: 60%">
    <Modal :title="title"
           v-model="showUserwh"
           :closable="false"
           @on-ok="ok"
           @on-cancel="cancel"
           class-name="vertical-center-modal"
           :mask-closable="false"
           width="50%">
      <fieldset>
        <Form ref="param1" :model="param1" :rules="ruleValidate" style="margin-top: 25px;" :label-width="100">
          <Row style="margin-top: 10px;">
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="用户名："
                        prop="username"
                        label-for="username">
                <Input v-model="param1.username" element-id="username" style="width: 90%"></Input>
              </FormItem>
            </Col>
<!--            <Col span="12">
              <FormItem style="margin-right: 10px;" label="密码："
                        prop="password"
                        label-for="password">
                <Input v-model="param1.password" element-id="password" style="width: 90%"></Input>
              </FormItem>
            </Col>-->
          </Row>

          <Row style="margin-top: 10px;">
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="姓名："
                        prop="xm"
                        label-for="xm">
                <Input v-model="param1.xm" element-id="xm" style="width: 90%"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="身份证号："
                        prop="sfzh"
                        label-for="sfzh">
                <Input v-model="param1.sfzh" element-id="sfzh" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row style="margin-top: 10px;">
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="邮箱："
                        prop="email"
                        label-for="email">
                <Input v-model="param1.email" element-id="email" style="width: 90%"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="手机号："
                        prop="phone"
                        label-for="phone">
                <Input v-model="param1.phone" element-id="phone" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>

          <Row style="margin-top: 10px;">
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="状态："
                        prop="state"
                        label-for="state">
                <RadioGroup v-model="param1.state">
                  <Radio label="1">正常</Radio>
                  <Radio label="2">下线</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="头像："
                        prop="avatar"
                        label-for="avatar">
                <Input v-model="param1.avatar" element-id="avatar" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </fieldset>
      <div slot="footer">
        <Button type="error" size="large" @click="cancel">退出</Button>
        <Button type="primary" size="large" :disabled="disabled" @click="ok">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { insertUsers, updateUsers } from '@/api/xtgl/yhgl'
export default {
  name: 'user_wh',
  data () {
    return {
      showUserwh: false,
      disabled: false,
      title: '用户维护',
      param1: {
        id: '', avatar: '', username: '', password: '', roles: '', xm: '', sfzh: '', email: '', phone: '', state: ''
      },
      param2: {
        czlx: ''
      },
      ruleValidate: {
        avatar: [
          { required: true, message: '请输入头像', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        roles: [
          { required: true, message: '请输入角色', trigger: 'blur' }
        ],
        xm: [
          { required: true, message: '请输入姓名', trigger: 'blur' }
        ],
        sfzh: [
          { required: true, message: '请输入身份证号', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请输入选择状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    showUserwhModal (params) {
      debugger
      this.init()
      if (params !== null) {
        this.param2.czlx = params.czlx
        this.param1.id = params.param1.id
        this.param1.avatar = params.param1.avatar
        this.param1.username = params.param1.username
        this.param1.roles = params.param1.roles
        this.param1.xm = params.param1.xm
        this.param1.sfzh = params.param1.sfzh
        this.param1.email = params.param1.email
        this.param1.phone = params.param1.phone
        this.param1.state = params.param1.state
      }

      if (this.param2.czlx === '3') {
        this.disabled = true
      } else {
        this.disabled = false
      }
      this.showUserwh = true
    },
    async ok () {
      try {
        this.showUserwh = false
        if (this.param2.czlx === '0') {
          // 新增
          const resp = await insertUsers(this.param1)
        } else if (this.param2.czlx === '1') {
          // 修改
          const resp = await updateUsers(this.param1)
        }
        this.$emit('userwhSucc')
      } catch (e) {
        throw e
      }
    },
    cancel () {
      this.showUserwh = false
    },
    init () {

    }
  }
}
</script>

<style scoped>

</style>
