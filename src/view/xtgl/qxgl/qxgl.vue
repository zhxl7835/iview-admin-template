<template>
  <div class="demo-split">
    <Split v-model="split1">
      <div slot="left" class="demo-split-pane">
        Left Pane
      </div>
      <div slot="right" class="demo-split-pane">
        <Tree ref="tree" :data="data2" @on-check-change="funChange" show-checkbox></Tree>
      </div>
    </Split>
  </div>
</template>
<script>
export default {
  name: 'qxgl',
  data () {
    return {
      split1: 0.7,
      xx: [],
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
  methods: {
    funChange () {
      console.log(this.$refs.tree.getCheckedNodes())
      this.$Message.info(this.$refs.tree.getCheckedNodes())
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
</style>
