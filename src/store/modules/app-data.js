import * as types from '../mutation-types'
import store from '@/service/store'
import _ from 'lodash'

const state = {
  users: null,
  origin_data: null,
  cache_data: null
}

const getters = {
  getOriginData: (state) => state.origin_data,

  getCacheData: (state) => state.cache_data,

  getUsers: (state) => state.users
}

const mutations = {
  // 设置源数据
  [types.APP_DATA_SET_ORIGIN_DATA] (state, data) {
    state.origin_data = _.clone(data)
  },
  // 设置缓存数据
  [types.APP_DATA_SET_CACHE_DATA] (state, data) {
    state.cache_data = data
  },
  // 设置用户数据
  [types.SET_USERS] (state, data) {
    state.users = data
  },
  // 同步数据
  [types.APP_DATA_SYNC_ORIGIN_DATA] (state) {
    store.set('charts', state.origin_data)
  }
}

const actions = {
  // 获取源
  fetchOriginData ({ commit }) {
    let data = store.get('charts')
    commit(types.APP_DATA_SET_ORIGIN_DATA, data)
  },
  // 设置缓存数据
  setCacheData ({ commit }, data) {
    commit(types.APP_DATA_SET_CACHE_DATA, data)
  },
  // 设置源数据
  setOriginData ({ commit }, data) {
    commit(types.APP_DATA_SET_ORIGIN_DATA, data)
  },
  // 同步数据
  syncOriginData ({ commit }) {
    commit(types.APP_DATA_SYNC_ORIGIN_DATA)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
