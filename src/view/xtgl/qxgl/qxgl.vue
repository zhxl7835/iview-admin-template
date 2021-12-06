<template>
  <div class="demo-split">
    <Split v-model="split1">
      <div id="tree1" slot="left" class="demo-split-pane">
        <Tree
          ref="tree1"
          :data="data1"
          :show-checkbox="true"
          :check-strictly="true"
          :check-directly="true"
          @on-check-change="treeChange"
        ></Tree>
      </div>
      <div id="tree2" slot="right" class="demo-split-pane">
        <Tree ref="tree2" :data="data2" @on-check-change="funChange" show-checkbox></Tree>
      </div>
    </Split>
  </div>
</template>
<script>
import { queryUsers, getAccess } from '@/api/xtgl/qxgl'
export default {
  name: 'qxgl',
  data () {
    return {
      split1: 0.5,
      xx: [],
      data1: [],
      data2: [
        {
          title: '系统管理',
          expand: true,
          checked: true,
          menuid: '1',
          children: [
            {
              title: '用户管理',
              expand: true,
              menuid: '2'
            },
            {
              title: '权限管理',
              expand: true,
              menuid: '3'
            }
          ]
        }
      ]
    }
  },
  mounted () {
    this.queryUsers()
  },
  methods: {
    async queryUsers () {
      const resp = await queryUsers()
      this.data1 = resp.data
    },
    funChange () {
      console.log(this.$refs.tree2.getCheckedNodes())
    },
    // 树复选框发生改变--只能有一个被选中
    async treeChange (arr, obj) {
      // 清空所有已选中的
      arr.forEach(item => {
        item.checked = false
      })
      // 只选中最后一次选中的
      obj.checked = true

      const title = this.$refs.tree1.getCheckedNodes()[0].title
      if (title !== '超级管理员' && title !== '管理员' && title !== '普通用户') {
        const username = this.$refs.tree1.getCheckedNodes()[0].username
        // 获取用户菜单权限
        const access = await getAccess(username)
        console.log(access)
        if (access.data !== '') {

        } else {

        }
      }
    }
  }
}
</script>
<style>
.demo-split{
  height: 100%;
  border: 1px solid #dcdee2;
}
.demo-split-pane{
  padding: 10px;
}
/* 让方形复选框变成圆形单选框样式，最好在树组件外套一个父盒子，在样式前加父级选择器，以免影响其他树组件*/
#tree1 .ivu-checkbox-inner {
 border-radius: 50%;
}

</style>
