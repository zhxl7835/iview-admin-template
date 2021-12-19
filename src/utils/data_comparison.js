const DateComp = {
  /**
   * 判断是否在数组中
   * @param {*} str
   * @param {*} _array
   * @return {*}
   */
  strInArray: function (str, _array) {
    for (let i = 0; i < _array.length; i++) {
      const element = _array[i]
      if (element === str) {
        return true
      };
    };
    return false
  }
}
export default DateComp
