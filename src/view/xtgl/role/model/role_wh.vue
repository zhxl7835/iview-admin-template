<template>
  <div style="width: 60%">
    <Modal :title="title"
           v-model="showRolewh"
           :closable="false"
           @on-ok="ok"
           @on-cancel="cancel"
           class-name="vertical-center-modal"
           :mask-closable="false"
           width="50%">
      <fieldset>
        <Form ref="param1" :model="param1" :rules="ruleValidate" style="margin-top: 25px;" :label-width="100">
          <Row style="margin-top: 10px;">
            <Col span="24">
              <FormItem style="margin-right: 10px;" label="角色名称："
                        prop="name"
                        label-for="name">
                <Input v-model="param1.name" element-id="name" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row style="margin-top: 10px;">
            <Col span="24">
              <FormItem style="margin-right: 10px;" label="唯一编码："
                        prop="code"
                        label-for="code">
                <Input v-model="param1.code" element-id="code" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row style="margin-top: 10px;">
            <Col span="24">
              <FormItem style="margin-right: 10px;" label="描述："
                        prop="remark"
                        label-for="remark">
                <Input v-model="param1.remark" type="textarea" :rows="4" element-id="remark" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row style="margin-top: 10px;">
            <Col span="24">
              <FormItem style="margin-right: 10px;" label="状态："
                        prop="state"
                        label-for="state">
                  <RadioGroup v-model="param1.state">
                    <Radio label="1">正常</Radio>
                    <Radio label="2">下线</Radio>
                  </RadioGroup>
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
import { insertRoles, updateRoles } from '@/api/xtgl/jsgl'
export default {
  name: 'role_wh',
  data () {
    return {
      showRolewh: false,
      disabled: false,
      title: '角色维护',
      param1: {
        id: '', name: '', code: '', remark: '', state: ''
      },
      param2: {
        czlx: '', code: '', message: ''
      },
      ruleValidate: {
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ],
        code: [
          { required: true, message: '请输入唯一编码', trigger: 'blur' }
        ],
        remark: [
          { required: true, message: '请输入描述信息', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请输入选择状态', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    showRolewhModal (params) {
      this.init()
      if (params !== null) {
        this.param2.czlx = params.czlx
        this.param1.id = params.param1.id
        this.param1.name = params.param1.name
        this.param1.code = params.param1.code
        this.param1.remark = params.param1.remark
        this.param1.state = params.param1.state
      }

      if (this.param2.czlx === '3') {
        this.disabled = true
      } else {
        this.disabled = false
      }
      this.showRolewh = true
    },
    async ok () {
      try {
        this.showRolewh = false
        if (this.param2.czlx === '0') {
          // 新增
          const resp = await insertRoles(this.param1)
        } else if (this.param2.czlx === '1') {
          // 修改
          const resp = await updateRoles(this.param1)
        }
        this.$emit('rolewhSucc')
      } catch (e) {
        throw e
      }
    },
    cancel () {
      this.showRolewh = false
    },
    init () {
      /* this.param1 = ''
      this.param2 = '' */
    }
  }
}
</script>

<style scoped>

</style>
