const TreeNode = {
  // tree全部勾选或不勾选
  // tree: 树data   this.$refs.tree.data
  // checkVal: 是否勾选  勾选：tree  不勾选：false
  convertTreeCheck: function (tree, checkVal) {
    tree.forEach((item) => {
      // 勾选当前节点或不勾选当前节点
      item.checked = checkVal
      // 获取字节的
      let children = item.children
      // 如果有子节点，递归操作
      if (children) {
        this.convertTreeCheck(children, checkVal)
      }
    })
  }
}
export default TreeNode
