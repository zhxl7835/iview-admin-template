<template>
  <div class="city_components flexC">
    <div>
      <div>
        <Form :model="formItem" :label-width="0">
          <FormItem>
            用户名：<Input v-model="formItem.username" style="width: 200px"></Input>
            <Button type="info" style="position: absolute;left: 270px;" @click="handleReset">重置</Button>
            <Button type="info" style="position: absolute;left: 340px;" @click="queryJc">查询</Button>
          </FormItem>
        </Form>
        <Button type="success" :disabled="!$checkPermission('sys:user:save')" style="margin-left:0px;"  @click="insert('0')">新增</Button>
        <!--        <Button type="warning" style="margin-left:10px;">修改</Button>-->
        <Button type="error" :disabled="!$checkPermission('sys:user:delete')" style="margin-left:10px;" @click="delAll">批量删除</Button>
      </div>
      <div style="margin-top: 8px">
        <Alert show-icon>
          已选择
          <span class="select-count">{{selectCount}}</span> 项
          <a class="select-clear" @click="clearSelectAll">清空</a>
        </Alert>
      </div>
    </div>
    <div>
      <Table
        border
        stripe
        ref="selection"
        :data="list1"
        :loading="loading1"
        :columns="columns1"
        @on-selection-change="changeSelect"
        height="500">
      </Table>
    </div>
    <user_wh ref="userwhModal" @userwhSucc="getInfoRy"></user_wh>
    <grant_role ref="grantRoleModal" @grantRoleSucc="getInfoRy"></grant_role>
  </div>
</template>
<script>
import user_wh from '@/view/xtgl/user/model/user_wh'
import grant_role from '@/view/xtgl/user/model/grant_role'
import { deleteUsers, deleteAllUsers, queryUsers } from '@/api/xtgl/yhgl'
export default {
  name: 'user',
  components: {
    user_wh,
    grant_role
  },
  data () {
    return {
      list1: [],
      loading1: false,
      selectList: [], // 多选数据
      selectCount: 0, // 多选计数
      formItem: {
        username: ''
      },
      param1: {
        avatar: '', username: '', roles: '', xm: '', sfzh: '', email: '', phone: '', state: ''
      },
      columns1: [
        {
          title: '头像',
          key: 'avatar',
          width: 70,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('img', {
                attrs: {
                  src: params.row.avatar
                }
              })

            ])
          }
        },
        {
          title: '用户名',
          key: 'username',
          width: 120,
          align: 'center'
        },
        {
          title: '角色',
          key: 'roles',
          width: 200,
          align: 'center',
          render: (h, params) => {
            let arr = (params.row.roles || '').split(',')
            let color = 'geekblue'
            if (params.row.roles !== '') {
              return h('div', arr.map(function (item, index) {
                return h('tag', {
                  props: {
                    color: color
                  }
                }, item)
              }))
            }
          }
        },
        {
          title: '姓名',
          key: 'xm',
          width: 150,
          align: 'center'
        },
        {
          title: '身份证号',
          key: 'sfzh',
          width: 200,
          align: 'center'
        },
        {
          title: '状态',
          key: 'state',
          width: 120,
          align: 'center',
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.state == '1') {
              text = '正常'
              color = 'blue'
            } else if (params.row.state == '2') {
              text = '下线'
              color = 'volcano'
            } else {
              text = '未知状态'
              color = 'default'
            }
            return h('tag', {
              props: {
                color: color
              }
            }, text)
          }
        },
        {
          title: '邮箱',
          key: 'email',
          width: 200,
          align: 'center'
        },
        {
          title: '手机号',
          key: 'phone',
          width: 150,
          align: 'center'
        },
        {
          title: '创建时间',
          key: 'created',
          width: 200,
          align: 'center'
        },
        {
          title: '最近更新时间',
          key: 'updated',
          width: 200,
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 220,
          fixed: 'right',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  ghost: true,
                  size: 'small',
                  disabled: !this.$checkPermission('sys:user:role')
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.grantRole(params.index)
                  }
                }
              }, '分配角色'),
              h('Button', {
                props: {
                  type: 'primary',
                  ghost: true,
                  size: 'small',
                  disabled: !this.$checkPermission('sys:user:update')
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.update(params.index)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  ghost: true,
                  size: 'small',
                  disabled: !this.$checkPermission('sys:user:delete')
                },
                on: {
                  click: () => {
                    this.remove(params.index)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  mounted () {
    this.queryJc()
  },
  methods: {
    grantRole (index) {
      let params = { 'param1': this.list1[index] }
      this.$refs.grantRoleModal.showGrantRoleModal(params)
    },

    update (index) {
      let params = { 'param1': this.list1[index], 'czlx': '1' }
      this.$refs.userwhModal.showUserwhModal(params)
    },

    async remove (index) {
      const resp = await deleteUsers(this.list1[index].id)
      this.list1.splice(index, 1)
    },

    async insert (val) {
      let params = { 'param1': this.param1, 'czlx': '0' }
      this.$refs.userwhModal.showUserwhModal(params)
    },

    async getInfoRy () {
      this.queryJc()
    },

    // 多选
    changeSelect (e) {
      this.selectList = e
      this.selectCount = e.length
    },

    // 清空
    clearSelectAll () {
      this.$refs.selection.selectAll(false)
    },

    // 批量删除
    async delAll () {
      if (this.selectCount <= 0) {
        this.$Modal.warning({title: '提醒', content: `您还未选择要删除的数据`})
        return
      }
      this.$Modal.confirm({
        title: '确认删除',
        content: `您确认要删除所选的${this.selectCount}条数据?`,
        onOk: async () => {
          this.loading1 = true
          let ids = ''
          this.selectList.forEach(function (e) {
            ids += e.id + ','
          })
          ids = ids.substring(0, ids.length - 1)
          const resp = await deleteAllUsers(ids)
          this.queryJc()
          this.loading1 = false
        }
      })
    },
    async queryJc () {
      this.loading1 = true
      const resp = await queryUsers(this.formItem.username.trim())
      this.list1 = resp.data
      this.loading1 = false
    },
    handleReset (name) {
      this.formItem.username = ''
      this.queryJc()
    }
  }
}
</script>
<style>
img{
  width:30px;
  height:30px;
  border-radius:15px;
}
</style>
