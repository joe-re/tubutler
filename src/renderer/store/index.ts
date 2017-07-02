import Vue from 'vue'
import Vuex from 'vuex'
import { mutations } from './mutations'
import { actions } from './actions';
import { FullItem } from '../types/Item';

export type State = {
  items: FullItem[],
  selectedItem: FullItem | null
}

export const state: State = {
  items: [],
  selectedItem: null
}

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  actions,
  mutations,
})
