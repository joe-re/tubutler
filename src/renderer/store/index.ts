import Vue from 'vue'
import Vuex, { ActionTree, MutationTree, Plugin, ModuleTree, Store } from 'vuex'
import { mutations } from './mutations'
import { actions } from './actions';
import { FullItem } from '../types/Item';
import getters, { TypedGetterTree } from './getters';
import plugins from './plugins';

export type State = {
  items: FullItem[],
  relatedVideos: FullItem[],
  playedVedeoIds: string[]
}

export const state: State = {
  items: [],
  relatedVideos: [],
  playedVedeoIds: []
}

interface StoreOptions<S, G> {
  state?: S;
  getters?: TypedGetterTree<S, S, G>;
  actions?: ActionTree<S, S>;
  mutations?: MutationTree<S>;
  modules?: ModuleTree<S>;
  plugins?: Plugin<S>[];
  strict?: boolean;
}

export declare class TypedStore<S, G> extends Store<S> {
  constructor(options: StoreOptions<S, G>);
  readonly getters: G;
}

function createStore<S, G>(options: StoreOptions<S, G>): TypedStore<S, G> {
  return new (Vuex.Store as any)(options);
}

Vue.use(Vuex)

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  state,
  actions,
  mutations,
  getters,
  plugins
});

export default store;

// memo: type inferrence isn't work well. example is bellow.
// type State3 = { value: number };
// type Getters3 = { count: number, plus10: number };
// const store3 = createStore({
//   state: {
//     value: 0
//   },
//   getters: {
//     count: state => state.value,
//     plus10: (_, { count }) => count + 10
//   },
//   actions: {
//     foo({ state, getters, dispatch, commit }, payload) {
//       state.value;
//       getters.count;
//       dispatch("bar", {});
//       commit("bar", {});
//     }
//   },
//   mutations: {
//     bar(state, payload) { }
//   },
//   strict: true
// }
