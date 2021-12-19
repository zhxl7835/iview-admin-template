<template>
  <div>
    <div>
      <Button type="success" style="margin-left:0px;"  @click="insert('0')">新增</Button>
    </div>
    <div style="margin-top: 8px">
      <Table
        row-key="id"
        border
        stripe
        :data="list1"
        :loading="loading1"
        :columns="columns1">
      </Table>
    </div>
    <menu_wh ref="menuwhModal" @menuwhSucc="getInfoRy"></menu_wh>
  </div>
</template>

<script>
import menu_wh from '@/view/xtgl/menu/model/menu_wh'
import { queryMenus, deleteMenus } from '@/api/xtgl/cdgl'
export default {
  name: 'caidan',
  components: {
    menu_wh
  },
  data () {
    return {
      list1: [],
      loading1: false,
      param1: {
        id: '', name: '', perms: '', type: '', state: ''
      },
      columns1: [
        {
          title: '名称',
          key: 'name',
          align: 'left',
          tree: true

        },
        {
          title: '权限编码',
          key: 'perms',
          align: 'center'
        },
        {
          title: '类型',
          key: 'type',
          align: 'center',
          render: (h, params) => {
            let text = ''
            let color = ''
            if (params.row.type == '0') {
              text = '目录'
              color = 'blue'
            } else if (params.row.type == '1') {
              text = '菜单'
              color = 'green'
            } else if (params.row.type == '2') {
              text = '按钮'
              color = 'default'
            } else {
              text = '未知类型'
              color = 'warning'
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
          title: '最新更新时间',
          key: 'updated',
          align: 'center'
        },
        {
          title: '状态',
          key: 'state',
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
          title: '操作',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
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
                    this.update(params)
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
                    this.remove(params)
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
    update (param) {
      let params = {'param1': param.row, 'czlx': '1'}
      this.$refs.menuwhModal.showMenuwhModal(params)
    },
    async remove (param) {
      const resp = await deleteMenus(param.row.id)
      this.queryJc()
    },

    async insert (val) {
      let params = {'param1': this.param1, 'czlx': '0'}
      this.$refs.menuwhModal.showMenuwhModal(params)
    },

    async getInfoRy (data) {
      this.queryJc()
    },
    async queryJc () {
      this.loading1 = true
      const resp = await queryMenus()
      this.list1 = resp.data
      this.loading1 = false
    }
  }
}
</script>

<style scoped>

</style>
