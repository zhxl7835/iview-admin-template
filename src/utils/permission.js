/**
*   @description 按扭级权限校验
*   @author Xiaohui Zeng
*   @date 2020-05-16
*/
import store from '../store'
// 权限校验
export default function checkPermission (str) {
  let _array = store.state.user.access
  console.log(store.state.user.access)
  for (let i = 0; i < _array.length; i++) {
    const element = _array[i]
    if (element === str) {
      return true
    };
  };
  return false
}
