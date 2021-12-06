<template>
  <div style="width: 60%">
    <Modal :title="title"
           v-model="showYhglwh"
           :closable="false"
           @on-ok="ok"
           @on-cancel="cancel"
           class-name="vertical-center-modal"
           :mask-closable="false"
           width="50%">
      <fieldset>
        <Form ref="param1" :model="param1" style="margin-top: 25px;" :label-width="100">
          <Row style="margin-top: 10px;">
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="用户名："
                        prop="username"
                        label-for="username">
                <Input v-model="param1.username" element-id="username" style="width: 90%"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="姓名："
                        prop="xm"
                        label-for="xm">
                <Input v-model="param1.xm" element-id="xm" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>

          <Row style="margin-top: 10px;">
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="身份证号："
                        prop="sfzh"
                        label-for="sfzh">
                <Input v-model="param1.sfzh" element-id="sfzh" style="width: 90%"></Input>
              </FormItem>
            </Col>
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="邮箱："
                        prop="email"
                        label-for="email">
                <Input v-model="param1.email" element-id="email" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row style="margin-top: 10px;">
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="角色："
                        prop="role"
                        label-for="role">
                  <Select v-model="model1" style="width:90%">
                    <Option v-for="item in roleList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                  </Select>
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
  name: 'yhglwh',
  data () {
    return {
      showYhglwh: false,
      disabled: false,
      title: '用户维护',
      czlx: '',
      roleList: [
        {
          value: '超级管理员',
          label: '超级管理员'
        },
        {
          value: '管理员',
          label: '管理员'
        },
        {
          value: '普通用户',
          label: '普通用户'
        }
      ],
      model1: '',
      param1: {
        id: '', username: '', xm: '', sfzh: '', email: '', role: ''
      },
      /* reqData修改和删除请求参数，可以使用param1，为了防止以后功能变复杂，param1和reqData不要相互影响，使用单独建立了请求参数对象reqData */
      reqData: {
        id: '', username: '', xm: '', sfzh: '', email: '', role: ''
      },
      param2: {
        czlx: '', code: '', message: ''
      }
    }
  },
  methods: {
    showYhglwhModal (params) {
      if (params != null) {
        this.param2.czlx = params.czlx
        this.param1.id = params.param1.id
        this.param1.username = params.param1.username
        this.param1.xm = params.param1.xm
        this.param1.sfzh = params.param1.sfzh
        this.param1.email = params.param1.email
        this.param1.role = params.param1.role
        this.model1 = params.param1.role
      }
      if (this.param2.czlx === 3) {
        this.disabled = true
      } else {
        this.disabled = false
      }
      this.showYhglwh = true
    },
    async ok () {
      if (this.param1.username === '' || this.param1.xm === '' || this.param1.sfzh === '' || this.param1.email === '' || this.model1 === '') {
        this.$Modal.error({title: '错误', content: `各输入框不能为空`})
        return
      }
      try {
        this.showYhglwh = false

        if (this.param2.czlx === 0) {
          // 新增
          this.init()
          this.reqData.username = this.param1.username
          this.reqData.xm = this.param1.xm
          this.reqData.sfzh = this.param1.sfzh
          this.reqData.email = this.param1.email
          this.reqData.role = this.model1

          const resp = await insertUsers(this.reqData)

          this.param2.code = resp.code
          this.param2.message = resp.msg
        } else if (this.param2.czlx === 1) {
          // 修改
          this.init()
          this.reqData.id = this.param1.id.trim()
          this.reqData.username = this.param1.username
          this.reqData.xm = this.param1.xm
          this.reqData.sfzh = this.param1.sfzh
          this.reqData.email = this.param1.email
          this.reqData.role = this.model1

          const resp = await updateUsers(this.reqData)

          this.param2.code = resp.code
          this.param2.message = resp.msg
        }
        this.$emit('yhglwhSucc', this.param2)
      } catch (e) {
        throw e
      }
    },
    cancel () {
      this.showYhglwh = false
    },
    init () {
      this.reqData.id = ''
      this.reqData.username = ''
      this.reqData.xm = ''
      this.reqData.sfzh = ''
      this.reqData.email = ''
      this.reqData.role = ''
    }
  }
}
</script>

<style scoped>

</style>
