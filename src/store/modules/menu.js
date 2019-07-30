import {
  SET_ACTIVE_MENU
} from '../mutation-types'

const state = {
  active: 'APPS_DATA_INPUT'
}

const getters = {
  getCurrentActive: () => state.active
}

const mutations = {
  // 设置当前激活的菜单
  [SET_ACTIVE_MENU] (state, activeName) {
    state.active = activeName
  }
}

const actions = {
  // 设置当前活动菜单
  setActiveMenu ({ commit }, activeName) {
    commit(SET_ACTIVE_MENU, activeName)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
