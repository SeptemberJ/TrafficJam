import Vue from 'vue'
import Vuex from 'vuex'
import vuexAlong from 'vuex-along'

Vue.use(Vuex)

// const debug = process.env.NODE_ENV !== 'production'

const state = {
  openid: '', // oQtPE0g5HzL8esgFJf-Jni1TNhIk
  AreaId: '', // 402881f4701fc53b01702010aba00039
  AreaName: '',
  ftype: null,
  smType: null,
  userInfo: {},
  inOrOutP: '',
  role: null // 1-访客 2-住户
}
// actions
const actions = {
  updateInOrOutP ({commit, state}, inOrOutP) {
    commit('setInOrOutP', inOrOutP)
  },
  updateUsrInfo ({commit, state}, UsrInfo) {
    commit('setUsrInfo', UsrInfo)
  },
  updateOpenId ({commit, state}, OpenId) {
    commit('setOpenId', OpenId)
  },
  updateRole ({commit, state}, Role) {
    commit('setRole', Role)
  },
  updatesmType ({commit, state}, smType) {
    commit('setsmType', smType)
  },
  updateAreaId ({commit, state}, AreaId) {
    commit('setAreaId', AreaId)
  },
  updateFtype ({commit, state}, ftype) {
    commit('setFtype', ftype)
  },
  updateAreaName ({commit, state}, AreaName) {
    commit('setAreaName', AreaName)
  }
}

// mutations
const mutations = {
  setInOrOutP (state, inOrOutP) {
    state.inOrOutP = inOrOutP
  },
  setUsrInfo (state, userInfo) {
    state.userInfo = userInfo
  },
  setOpenId (state, OpenId) {
    state.openid = OpenId
    // alert('action1:' + OpenId)
  },
  setRole (state, Role) {
    state.role = Role
  },
  setsmType (state, smType) {
    state.smType = smType
  },
  setAreaId (state, AreaId) {
    state.AreaId = AreaId
  },
  setFtype (state, ftype) {
    state.ftype = ftype
  },
  setAreaName (state, AreaName) {
    // alert('action2:' + AreaName)
    state.AreaName = AreaName
  }
}

export default new Vuex.Store({
  state,
  modules: {
  },
  // getters,
  actions,
  mutations,
  // strict: debug,
  plugins: [vuexAlong]
  // plugins: debug ? [createLogger()] : []
})
