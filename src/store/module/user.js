import { login, logout, getUserInfo } from '@/api/user'
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
    handleLogin ({ commit }, {username, password, code, key}) {
      username = username.trim()
      return new Promise((resolve, reject) => {
        login({
          username,
          password,
          code,
          key
        }).then(res => {
          if (res.code === 200) {
            commit('setToken', res.data.token) // 封装token到store
            commit('setAccess', res.data.access) // 封装角色和权限列表到store
            commit('setLoginInfo', res.data.loginInfo) // 封装登用户信息到store
            commit('setHasGetInfo', true)
          }
          resolve(res)
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 退出登录
    handleLogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        logout().then(() => {
          commit('setToken', '')
          commit('setAccess', [])
          commit('setLoginInfo', '')
          commit('setHasGetInfo', true)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            debugger
            /* commit('setAccess', res.data.access)
            commit('setHasGetInfo', true)
            commit('setLoginInfo', res.data) // 储存登用户信息
            const loginInfo = JSON.parse(getLoginInfo()) // 用户信息 获取方式
            console.log('loginInfo=', loginInfo) */
            resolve(res)
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
