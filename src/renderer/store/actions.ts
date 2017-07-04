import SearchAPI from '../api_utils/SearchAPI';
import VideoAPI from '../api_utils/VideoAPI';
import { createActions } from './TypedActions';
import { SearchAPIResponse, VideoAPIResponse } from '../types/APIResponse';

export type SeachActions = {
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
}

export const actions = createActions<null, null, SeachActions>({
  search: async ({ typedCommit }, payload: { q: string }) => {
    try {
      const searchAPIResponse = await SearchAPI.fetchList({ q: payload.q });
      const videoAPIResponse = await VideoAPI.fetchVideos({ ids: searchAPIResponse.items.map(item => item.id.videoId) });
      typedCommit.SEARCH_RESOLVED({ searchAPIResponse, videoAPIResponse });
    } catch (e) {
      typedCommit.SEARCH_REJECTED({ message: e.message || '' });
    }
  },
  fetchRelatedVideos: async ({ typedCommit }, payload: {videoId: string}) => {
    try {
      const searchAPIResponse = await SearchAPI.fetchRelatedVideos({ videoId: payload.videoId });
      const videoAPIResponse = await VideoAPI.fetchVideos({ ids: searchAPIResponse.items.map(item => item.id.videoId) });
      typedCommit.SEARCH_RELATED_VIDEOS_RESOLVED({ searchAPIResponse, videoAPIResponse });
    } catch (e) {
      typedCommit.SEARCH_RELATED_VIDEOS_REJECTED({ message: e.message || '' });
    }
  }
}, [
  'SEARCH_RESOLVED',
  'SEARCH_REJECTED',
  'SEARCH_RELATED_VIDEOS_RESOLVED',
  'SEARCH_RELATED_VIDEOS_REJECTED'
]);
