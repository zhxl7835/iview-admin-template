<template>
  <div style="width: 40%">
    <Modal :title="title"
           v-model="showGrantMenu"
           :closable="false"
           @on-ok="ok"
           @on-cancel="cancel"
           class-name="vertical-center-modal"
           :mask-closable="false"
           width="30%">
      <fieldset>
        <Tree ref="tree" check-strictly="true" :data="list1" :multiple="multiple1" @on-check-change="funChange" show-checkbox></Tree>
      </fieldset>
      <div slot="footer">
        <Button type="error" size="large" @click="cancel">退出</Button>
        <Button type="primary" size="large"  @click="ok">提交</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import { queryMenus, updateRoleMenus } from '@/api/xtgl/jsgl'
export default {
  name: 'grant_menu',
  data () {
    return {
      showGrantMenu: false,
      multiple1: true,
      title: '分配权限',
      list1: [], // 所有菜单列表
      list2: [], // 当前角色拥有的菜单列表
      param1: {
        roleId: '', menuId: [] // 新权限数组
      }
    }
  },
  mounted () {
    // this.setTrees()
  },
  updated () {
    this.setTrees()
  },
  methods: {
    showGrantMenuModal (params) {
      this.init()
      if (params !== null) {
        this.param1.roleId = params.param1.id // 角色id
        this.getMenus()
      }
      this.showGrantMenu = true
    },
    async getMenus () {
      const resp = await queryMenus(this.param1.roleId)
      this.list1 = resp.data.list1 // 所有菜单列表
      console.log('list1', this.list1)
      // this.list2 = resp.data.list2  //当前角色拥有的菜单列表
    },
    setTrees () {
      // 获取所有树节点（第一步已经全部勾选，所以是全部树节点）
      /* const tree = this.$refs.tree.getCheckedNodes()
      if(tree.length === 0) return
      console.log("tree",tree)
      debugger
      for(var i = 0; i < this.list2.length; i++){
        for(var j = 0; j < tree.length; j++) {
          if (this.list2[i].menuId == tree[j].id) {
            /!*if (tree[j].children.length > 0) {
              tree[j].checked = false
            } else {
              tree[j].checked = true
            }*!/
            tree[j].checked = true
          } else {
            tree[j].checked = false
          }
        }
      } */
    },
    async ok () {
      try {
        /* if(this.param1.menuId == '' || this.param1.menuId == null){
          this.$Message.warning('权限未变动，无需修改')
          return
        } */
        const resp = await updateRoleMenus(this.param1)
        this.showGrantMenu = false
        this.$emit('grantMenuSucc')
      } catch (e) {
        throw e
      }
    },
    cancel () {
      this.showGrantMenu = false
    },
    init () {
      this.param1.roleId = ''
      this.param1.menuId = []
      this.list1 = []
      this.list2 = []
    },
    funChange () {
      // 获取选中的节点
      const tree = this.$refs.tree.getCheckedAndIndeterminateNodes()
      this.param1.menuId = []
      for (var i = 0; i < tree.length; i++) {
        this.param1.menuId.push(tree[i].id)
      }
    }
  }
}
</script>

<style scoped>

</style>
