<template>
  <div style="width: 60%">
    <Modal :title="title"
           v-model="showGrantRole"
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
                <Input v-model="param1.username" disabled element-id="username" style="width: 90%"></Input>
              </FormItem>
            </Col>
          </Row>
          <Row style="margin-top: 10px;">
            <Col span="12">
              <FormItem style="margin-right: 10px;" label="用户名："
                        prop="role"
                        label-for="role">
                <CheckboxGroup v-model="param1.roleId" >
                  <Checkbox v-for="(item,index) in list" :key="item.id" :label="item.id">{{item.name}}</Checkbox>
                </CheckboxGroup>
              </FormItem>
            </Col>
          </Row>
        </Form>
      </fieldset>
      <div slot="footer">
        <Button type="error" size="large" @click="cancel">退出</Button>
        <Button type="primary" size="large"  @click="ok">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { updateUserRoles } from '@/api/xtgl/yhgl'
import { queryRoles } from '@/api/xtgl/jsgl'
export default {
  name: 'grant_role',
  data () {
    return {
      showGrantRole: false,
      title: '分配角色',
      list: [],
      param1: {
        userId: '', username: '', roleId: []
      }
    }
  },
  mounted () {
    this.getRoles()
  },
  methods: {
    showGrantRoleModal (params) {
      this.init()
      if (params !== null) {
        this.param1.userId = params.param1.id // 用户id
        this.param1.username = params.param1.username // 用户名
        this.param1.role = params.param1.role // 角色列表
      }
      this.showGrantRole = true
    },
    async getRoles () {
      const resp = await queryRoles('')
      this.list = resp.data
    },
    async ok () {
      try {
        const resp = await updateUserRoles(this.param1)
        this.showGrantRole = false
        this.$emit('grantRoleSucc')
      } catch (e) {
        throw e
      }
    },
    cancel () {
      this.showGrantRole = false
    },
    init () {
      this.param1.userId = ''
      this.param1.username = ''
      this.param1.roleId = []
    }
  }
}
</script>

<style scoped>

</style>
