<template>
  <div style="width: 40%">
    <Modal :title="title"
           v-model="showMenuwh"
           :closable="false"
           @on-ok="ok"
           @on-cancel="cancel"
           class-name="vertical-center-modal"
           :mask-closable="false"
           width="40%">
      <fieldset>
        <Form ref="param1" :model="param1" :rules="ruleValidate" :label-width="100">
          <Row style="margin-top: 10px;">
            <Col span="24">
              <FormItem style="margin-right: 10px;" label="类型："
                        prop="type"
                        label-for="type">
                <RadioGroup v-model="param1.type" @on-change="setParentName()">
                  <Radio label="0">目录</Radio>
                  <Radio label="1">菜单</Radio>
                  <Radio label="2">按钮</Radio>
                </RadioGroup>
              </FormItem>
            </Col>
          </Row>

          <Row style="margin-top: 10px;">
            <Col span="24">
              <FormItem style="margin-right: 10px;" label="上级菜单："
                        prop="parentName"
                        label-for="parentName">
                <Input v-model="param1.parentName" :disabled="disabled" element-id="parentName" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row style="margin-top: 10px;">
            <Col span="24">
              <FormItem style="margin-right: 10px;" label="菜单名称："
                        prop="name"
                        label-for="name">
                <Input v-model="param1.name" element-id="name" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row style="margin-top: 10px;">
            <Col span="24">
              <FormItem style="margin-right: 10px;" label="权限编码："
                        prop="perms"
                        label-for="perms">
                <Input v-model="param1.perms" element-id="perms" style="width: 90%"></Input>
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
        <Button type="primary" size="large" @click="ok">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { insertMenus, updateMenus } from '@/api/xtgl/cdgl'
export default {
  name: 'menu_wh',
  data () {
    return {
      showMenuwh: false,
      disabled: false,
      title: '菜单维护',
      param1: {
        id: '', parentName: '', name: '', perms: '', type: '', state: ''
      },
      param2: {
        czlx: ''
      },
      ruleValidate: {
        parentName: [
          { required: true, message: '请选择上级菜单', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
        ],
        perms: [
          { required: true, message: '请输入权限编码', trigger: 'blur' }
        ],
        type: [
          { required: true, message: '请选择类型', trigger: 'blur' }
        ],
        state: [
          { required: true, message: '请选择状态', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    showMenuwhModal (params) {
      debugger
      this.init()
      if (params !== null) {
        this.param2.czlx = params.czlx
        this.param1.id = params.param1.id
        this.param1.name = params.param1.name
        this.param1.perms = params.param1.perms
        this.param1.type = params.param1.type
        this.param1.state = params.param1.state
      }
      this.showMenuwh = true
    },
    async ok () {
      try {
        this.showMenuwh = false

        if (this.param2.czlx === '0') {
          // 新增
          const resp = await insertMenus(this.param1)
        } else if (this.param2.czlx === '1') {
          // 修改
          const resp = await updateMenus(this.param1)
        }
        this.$emit('menuwhSucc')
      } catch (e) {
        throw e
      }
    },
    cancel () {
      this.showMenuwh = false
    },
    setParentName () {
      if (this.param1.type === '0') {
        this.param1.parentName = '添加或修改目录不需要选中上级菜单'
        this.disabled = true
      } else {
        this.param1.parentName = ''
        this.disabled = false
      }
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
