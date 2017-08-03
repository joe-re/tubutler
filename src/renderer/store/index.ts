import { mutations } from './mutations'
import { actions } from './actions';
import { FullItem } from '../types/Item';
import getters from './getters';
import { createStore } from 'battle-ax';

export type State = {
  searchText: string,
  prevPageToken: string,
  nextPageToken: string,
  items: FullItem[],
  relatedVideos: FullItem[],
  playedVedeoIds: string[],
  miniPlayerMode: boolean,
  transparentRate: number,
  loading: boolean
}

const state: State = {
  searchText: '',
  prevPageToken: '',
  nextPageToken: '',
  items: [],
  relatedVideos: [],
  playedVedeoIds: [],
  miniPlayerMode: false,
  transparentRate: 0,
  loading: false
}

const store = createStore({
  strict: process.env.NODE_ENV !== 'production',
  state,
  actions,
  mutations,
  getters,
});

export default store;
