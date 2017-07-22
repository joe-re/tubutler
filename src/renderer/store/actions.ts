import SearchAPI from '../api_utils/SearchAPI';
import VideoAPI from '../api_utils/VideoAPI';
import { FullItem } from '../types/Item';
import { SearchAPIResponse, VideoAPIResponse } from '../types/APIResponse';
import { ActionCreatorHelper } from './BattleAx';

export type SearchActions = {
  SEARCH_RESOLVED: {
    searchAPIResponse: SearchAPIResponse,
    videoAPIResponse: VideoAPIResponse
  },
  SEARCH_REJECTED: { message: string },
  SEARCH_RELATED_VIDEOS_RESOLVED: {
    searchAPIResponse: SearchAPIResponse,
    videoAPIResponse: VideoAPIResponse
  },
  SEARCH_RELATED_VIDEOS_REJECTED: { message: string },
  ADD_HISTORY: { videoId: string },
  SET_MIN_PLAYER_MODE: { val: boolean }
}

export const actions = ActionCreatorHelper<null, null, SearchActions>()({
  search: (payload: { q: string }) => {
    return async ({ commit }) => {
      try {
        const searchAPIResponse = await SearchAPI.fetchList({ q: payload.q });
        const videoAPIResponse = await VideoAPI.fetchVideos({ ids: searchAPIResponse.items.map(item => item.id.videoId) });
        commit({
          type: 'SEARCH_RESOLVED',
          payload: { searchAPIResponse, videoAPIResponse }
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
  setminiPlayerMode: (payload: { val: boolean }) => {
    return ({ commit }) => {
      commit({ type: 'SET_MIN_PLAYER_MODE', payload: { val: payload.val } });
    };
  }
});
