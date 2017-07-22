import { mutations } from './mutations'
import { actions } from './actions';
import { FullItem } from '../types/Item';
import getters from './getters';
import plugins from './plugins';
import { createStore } from './BattleAx';

export type State = {
  items: FullItem[],
  relatedVideos: FullItem[],
  playedVedeoIds: string[],
  miniPlayerMode: boolean
}

export const state: State = {
  items: [],
  relatedVideos: [],
  playedVedeoIds: [],
  miniPlayerMode: false
}

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  state,
  actions,
  mutations,
  getters,
  plugins
});

export default store;
