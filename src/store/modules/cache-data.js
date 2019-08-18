import * as types from '../mutation-types'

const state = {
  data: null
}

const getters = {
  getData: (state) => { return state.data }
}

const mutations = {
  [types.CACHE_DATA_SET_DATA] (state, data) {
    state.data = data
  }
}

const actions = {
  // 设置缓存数据
  setData ({ commit }, data) {
    commit(types.CACHE_DATA_SET_DATA, data)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
