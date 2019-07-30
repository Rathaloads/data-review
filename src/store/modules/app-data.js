import {
  SET_USERS,
  SET_DATA
} from '../mutation-types'

import { ipcRenderer } from 'electron'

const state = {
  users: [],
  datas: []
}

const getters = {
  getUsers: () => state.users,
  getDatas: () => state.datas
}

const mutations = {
  // 设置用户数据
  [SET_USERS] (state, data) {
    state.users = data
  },
  // 设置表格数据
  [SET_DATA] (state, data) {
    state.datas = data
  }
}

const actions = {
  /**
   * 获取用户数据
   */
  getUserData ({ commit }) {
    ipcRenderer.send('getLocalUser')
    ipcRenderer.on('replayLocalUser', (event, args) => {
      const { data: { Users } } = args
      commit(SET_USERS, Users)
    })
  },

  // 获取表格数据
  getDatas ({ commit }) {
    ipcRenderer.send('getLocalData')
    ipcRenderer.on('replayLocalData', (event, args) => {
      const { data: { Data } } = args
      commit(SET_DATA, Data)
    })
  },

  // 设置用户数据
  setUserData ({ commit }, data) {
    ipcRenderer.send('updateLocalUser', { Users: data })
    ipcRenderer.on('replayUpdateUser', (event, args) => {})
  },

  // 设置表格数据
  setDatas ({ commit }, data) {
    ipcRenderer.send('updateLocalData', { Data: data })
    ipcRenderer.on('replayUpdateData', (event, args) => {})
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
