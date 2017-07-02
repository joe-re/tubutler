import SearchAPI from '../api_utils/SearchAPI';
import VideoAPI from '../api_utils/VideoAPI';
import { createActions } from './TypedActions';
import { SearchAPIResponse, VideoAPIResponse } from '../types/APIResponse';

export type SeachActions = {
  SEARCH_RESOLVED: {
    searchApiResponse: SearchAPIResponse,
    VideoAPIResponse: VideoAPIResponse
  },
  SEARCH_REJECTED: { message: string }
}

export const actions = createActions<null, null, SeachActions>({
  search: async ({ typedCommit }, payload: { q: string }) => {
    try {
      const searchApiResponse = await SearchAPI.fetchList({ q: payload.q });
      const VideoAPIResponse = await VideoAPI.fetchVideos({ ids: searchApiResponse.items.map(item => item.id.videoId) });
      typedCommit.SEARCH_RESOLVED({ searchApiResponse, VideoAPIResponse });
    } catch (e) {
      typedCommit.SEARCH_REJECTED({ message: e.message || '' });
    }
  }
}, ['SEARCH_RESOLVED', 'SEARCH_REJECTED']);
