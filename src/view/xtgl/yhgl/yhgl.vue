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
          @on-selection-change="changeSelect">
      </Table>
    </div>
    <yhglwh ref="yhglwhModal" @yhglwhSucc="getInfoRy"></yhglwh>
  </div>
</template>
<script>
import yhglwh from '@/view/xtgl/yhgl/modal/yhglwh'
import { deleteUsers, deleteAllUsers, queryUsers } from '@/api/xtgl/yhgl'

export default {
  name: 'yhgl',
  components: {
    yhglwh
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
      /* queryData查询请求参数，可以使用formItem，为了防止以后功能变复杂，queryData和formItem不要相互影响，使用单独建立了请求参数对象queryData */
      queryData: {
        username: ''
      },
      param1: {
        username: '', xm: '', sfzh: '', email: '', role: ''
      },
      columns1: [
        {
          type: 'selection',
          width: 60,
          align: 'center',
          display: true
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '姓名',
          key: 'xm'
        },
        {
          title: '身份证号',
          key: 'sfzh'
        },
        {
          title: '邮箱',
          key: 'email'
        },
        {
          title: '角色',
          key: 'role'
        },
        {
          title: '操作',
          key: 'action',
          width: 200,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'info',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.select(params.index)
                  }
                }
              }, '详情'),
              h('Button', {
                props: {
                  type: 'primary',
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
    select (index) {
      let params = { 'param1': this.list1[index], 'czlx': 3 }
      this.$refs.yhglwhModal.showYhglwhModal(params)
    },
    update (index) {
      let params = { 'param1': this.list1[index], 'czlx': 1 }
      this.$refs.yhglwhModal.showYhglwhModal(params)
    },
    async remove (index) {
      const resp = await deleteUsers(this.list1[index].id)
      if (resp.code === 200) {
        this.$Message.success(resp.msg)
        this.list1.splice(index, 1)
      }
    },

    async insert (val) {
      let params = { 'param1': this.param1, 'czlx': 0 }
      this.$refs.yhglwhModal.showYhglwhModal(params)
    },

    async getInfoRy (data) {
      if (data.code === 200) {
        this.$Message.success(data.message)
      } else if (data.code === 500) {
        this.$Message.error(data.message)
      }
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
          if (resp.code === 200) {
            this.$Message.success(resp.msg)
            this.queryJc()
            this.loading1 = false
          } else {
            this.$Message.error(resp.msg)
          }
        }
      })
    },
    async queryJc () {
      this.loading1 = true
      this.queryData.username = this.formItem.username.trim()
      debugger
      const resp = await queryUsers(this.queryData)
      if (resp.code === 200) {
        this.$Message.success(resp.msg)
        this.list1 = resp.data
        this.loading1 = false
      } else {
        this.$Message.error(resp.msg)
        this.loading1 = false
      }
    },
    handleReset (name) {
      this.formItem.username = ''
      this.queryJc()
    },
    formatDate (date, fmt) {
      let o = {
        'M+': date.getMonth() + 1, // 月份
        'd+': date.getDate(), // 日
        'h+': date.getHours(), // 小时
        'm+': date.getMinutes(), // 分
        's+': date.getSeconds(), // 秒
        'S': date.getMilliseconds() // 毫秒
      }
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
      }
      return fmt
    }
  }
}
</script>
