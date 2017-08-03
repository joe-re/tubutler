import SearchAPI from '../api_utils/SearchAPI';
import VideoAPI from '../api_utils/VideoAPI';
import { FullItem } from '../types/Item';
import { SearchAPIResponse, VideoAPIResponse } from '../types/APIResponse';
import { ActionCreatorHelper } from 'battle-ax';
import { State } from './';

export type Actions = {
  SEARCH_PENDING: null,
  SEARCH_RESOLVED: { searchAPIResponse: SearchAPIResponse, videoAPIResponse: VideoAPIResponse, searchText: string },
  SEARCH_REJECTED: { message: string },
  SEARCH_RELATED_VIDEOS_PENDING: null,
  SEARCH_RELATED_VIDEOS_RESOLVED: { searchAPIResponse: SearchAPIResponse, videoAPIResponse: VideoAPIResponse },
  SEARCH_RELATED_VIDEOS_REJECTED: { message: string },
  ADD_HISTORY: { videoId: string },
  SET_MINI_PLAYER_MODE: { val: boolean },
  SET_TRANSPARENT_RATE: { transparentRate: number },
  SET_SEARCH_TEXT: { searchText: string }
};

export const actions = ActionCreatorHelper<State, State, Actions>()({
  search: (payload: { q: string, pageToken: string }) => {
    return async ({ commit }) => {
      commit({ type: 'SEARCH_PENDING', payload: null });
      try {
        const searchAPIResponse = await SearchAPI.fetchList({ q: payload.q, pageToken: payload.pageToken });
        const videoAPIResponse = await VideoAPI.fetchVideos({ ids: searchAPIResponse.items.map(item => item.id.videoId) });
        commit({
          type: 'SEARCH_RESOLVED',
          payload: { searchAPIResponse, videoAPIResponse, searchText: payload.q }
        });
      } catch (e) {
      }
    }
  },
  fetchRelatedVideos: (payload: { videoId: string }) => {
    return async ({ commit }) => {
      try {
        const searchAPIResponse = await SearchAPI.fetchRelatedVideos({ videoId: payload.videoId });
        const videoAPIResponse = await VideoAPI.fetchVideos({ ids: searchAPIResponse.items.map(item => item.id.videoId) });
        commit({
          type: 'SEARCH_RELATED_VIDEOS_RESOLVED',
          payload: { searchAPIResponse, videoAPIResponse }
        });
      } catch (e) {
        commit({
          type: 'SEARCH_RELATED_VIDEOS_REJECTED',
          payload: { message: e.message || '' }
        });
      }
    }
  },
  addHistory: (payload: { videoId: string }) => {
    return ({ commit }) => {
      commit({
        type: 'ADD_HISTORY',
        payload: { videoId: payload.videoId }
      });
    }
  },
  setMiniPlayerMode: (payload: { val: boolean }) => {
    return ({ commit }) => {
      commit({ type: 'SET_MINI_PLAYER_MODE', payload: { val: payload.val } });
    };
  },
  setTransparentRate: (payload: { transparentRate: number }) => {
    return ({ commit }) => {
      commit({ type: 'SET_TRANSPARENT_RATE', payload: { transparentRate: payload.transparentRate } });
    };
  },

  changeSearchText: (payload: { searchText: string }) => {
    return ({ commit }) => {
      commit({ type: 'SET_SEARCH_TEXT', payload: { searchText: payload.searchText } });
    }
  }
});
