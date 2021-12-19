<template>
  <div class="city_components flexC">
    <div>
      <div>
        <Form :model="formItem" :label-width="0">
          <FormItem>
            角色名称：<Input v-model="formItem.name" style="width: 200px"></Input>
            <Button type="info" style="position: absolute;left: 280px;" @click="handleReset">重置</Button>
            <Button type="info" style="position: absolute;left: 350px;" @click="queryJc">查询</Button>
          </FormItem>
        </Form>
        <Button type="success" style="margin-left:0px;"  @click="insert('0')">新增</Button>
        <!--        <Button type="warning" style="margin-left:10px;">修改</Button>-->
        <Button type="error" style="margin-left:10px;" @click="delAll">批量删除</Button>
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
        height="400">
      </Table>
    </div>
    <role_wh ref="rolewhModal" @rolewhSucc="getInfoRy"></role_wh>
    <grant_menu ref="grantMenuModal" @grantMenuSucc="getInfoRy"></grant_menu>
  </div>
</template>
<script>
import role_wh from '@/view/xtgl/role/model/role_wh'
import grant_menu from '@/view/xtgl/role/model/grant_menu'
import { queryRoles, deleteRoles, deleteAllRoles } from '@/api/xtgl/jsgl'
export default {
  name: 'role',
  components: {
    role_wh,
    grant_menu
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
        name: '', code: '', remark: '', state: ''
      },
      columns1: [
        {
          type: 'selection',
          align: 'center',
          width: 60,
          display: true
        },
        {
          title: '角色名称',
          key: 'name',
          align: 'center'
        },
        {
          title: '唯一编码',
          key: 'code',
          align: 'center'
        },
        {
          title: '描述',
          key: 'remark',
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
          title: '创建时间',
          key: 'created',
          align: 'center'
        },
        {
          title: '最近更新时间',
          key: 'updated',
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          align: 'center',
          width: 250,
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  ghost: true,
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.grantMenu(params.index)
                  }
                }
              }, '分配权限'),
              h('Button', {
                props: {
                  type: 'primary',
                  ghost: true,
                  size: 'small'
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
                  size: 'small'
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
    grantMenu (index) {
      let params = { 'param1': this.list1[index], 'czlx': '3' }
      this.$refs.grantMenuModal.showGrantMenuModal(params)
    },
    update (index) {
      let params = { 'param1': this.list1[index], 'czlx': '1' }
      this.$refs.rolewhModal.showRolewhModal(params)
    },
    async remove (index) {
      const resp = await deleteRoles(this.list1[index].id)
      this.list1.splice(index, 1)
    },

    async insert (val) {
      let params = { 'param1': this.param1, 'czlx': '0' }
      this.$refs.rolewhModal.showRolewhModal(params)
    },

    async getInfoRy (data) {
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
          const resp = await deleteAllRoles(ids)
          this.queryJc()
          this.loading1 = false
        }
      })
    },
    async queryJc () {
      this.loading1 = true
      const resp = await queryRoles(this.formItem.username.trim())
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
