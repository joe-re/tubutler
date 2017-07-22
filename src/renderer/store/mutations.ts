import {Actions } from './actions';
import { TypedMutationTree } from './BattleAx';
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

export const mutations: TypedMutationTree<State, Actions> = {
  ['SEARCH_RESOLVED'](state, payload) {
    state.items = mergeResponse(payload.searchAPIResponse, payload.videoAPIResponse);
  },
  ['SEARCH_REJECTED'](state, payload) {
  },
  ['SEARCH_RELATED_VIDEOS_RESOLVED'](state, payload) {
    state.relatedVideos = mergeResponse(payload.searchAPIResponse, payload.videoAPIResponse);
  },
  ['SEARCH_RELATED_VIDEOS_REJECTED'](state, payload) {
  },
  ['ADD_HISTORY'](state, payload) {
    if (!state.playedVedeoIds.find(id => id === payload.videoId)) {
      state.playedVedeoIds = [payload.videoId].concat(state.playedVedeoIds).slice(0, 19);
    }
  },
  ['SET_MIN_PLAYER_MODE'](state, payload) {
    state.miniPlayerMode = payload.val;
  }
};
