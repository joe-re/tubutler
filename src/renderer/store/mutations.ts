import {Actions } from './actions';
import { MutationTree } from 'battle-ax';
import { FullItem } from '../types/Item';
import { State } from './index';
import { SearchAPIResponse, VideoAPIResponse } from '../types/APIResponse';

function mergeResponse(searchAPIResponse: SearchAPIResponse, videoAPIResponse: VideoAPIResponse): FullItem[] {
  return searchAPIResponse.items.map(item => {
    const videoItem = videoAPIResponse.items.find(videoItem => videoItem.id === item.id.videoId);
    if (!videoItem) {
      throw new Error(`can't find video API response. ${item.id.videoId}`);
    }
    return Object.assign({}, videoItem, item );
  });
}

export const mutations: MutationTree<State, Actions> = {
  ['SEARCH_PENDING'](state, payload) {
    state.loading = true;
  },
  ['SEARCH_RESOLVED'](state, payload) {
    state.items = mergeResponse(payload.searchAPIResponse, payload.videoAPIResponse);
    state.prevPageToken = payload.searchAPIResponse.prevPageToken;
    state.nextPageToken = payload.searchAPIResponse.nextPageToken;
    state.loading = false;
  },
  ['SEARCH_REJECTED'](state, payload) {
    state.loading = false;
  },
  ['SEARCH_RELATED_VIDEOS_PENDING'](state, payload) {
    state.loading = true;
  },
  ['SEARCH_RELATED_VIDEOS_RESOLVED'](state, payload) {
    state.relatedVideos = mergeResponse(payload.searchAPIResponse, payload.videoAPIResponse);
    state.loading = false;
  },
  ['SEARCH_RELATED_VIDEOS_REJECTED'](state, payload) {
    state.loading = false;
  },
  ['ADD_HISTORY'](state, payload) {
    if (!state.playedVedeoIds.find(id => id === payload.videoId)) {
      state.playedVedeoIds = [payload.videoId].concat(state.playedVedeoIds).slice(0, 19);
    }
  },
  ['SET_MINI_PLAYER_MODE'](state, payload) {
    state.miniPlayerMode = payload.val;
  },
  ['SET_TRANSPARENT_RATE'](state, payload) {
    state.transparentRate = payload.transparentRate;
  },
  ['SET_SEARCH_TEXT'](state, payload) {
    state.searchText = payload.searchText;
    state.prevPageToken = '';
    state.nextPageToken = '';
  }
};
