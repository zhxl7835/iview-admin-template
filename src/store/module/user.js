import { login, /* logout, */getUserInfo } from '@/api/user'
import { setToken, getToken, setLoginInfo, getLoginInfo } from '@/libs/util'

export default {
  state: {
    access: '', // 权限字符串数组
    token: getToken(),
    hasGetInfo: false
  },
  mutations: {
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
      setToken(token)
    },
    setLoginInfo (state, loginInfo) {
      state.loginInfo = loginInfo
      setLoginInfo(loginInfo)
    },
    setHasGetInfo (state, status) {
      state.hasGetInfo = status
    }
  },
  actions: {
    // 登录
    handleLogin ({ commit }, {username, password}) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password
        }).then(res => {
          debugger
          const data = res.data
          if (data.code === 200) {
            commit('setToken', data.data.token)
          }
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        /* logout(state.token).then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          resolve()
        }).catch(err => {
          reject(err)
        })             zhxl */
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data
            commit('setAccess', data.data.roles)
            commit('setHasGetInfo', true)
            commit('setLoginInfo', data.data) // 储存登用户信息
            const loginInfo = JSON.parse(getLoginInfo()) // 用户信息 获取方式
            console.log('loginInfo=', loginInfo)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    }
  }
}
