import deserializeJSONResponse from './desirializeJSONResponse';
import Request from './Request';
import { SearchAPIResponse } from '../types/APIResponse';

type FeatchListParams = { q: string }
function fetchList(params: FeatchListParams): Promise<SearchAPIResponse> {
  return deserializeJSONResponse(
    Request.get({
      url: `https://www.googleapis.com/youtube/v3/search`,
      parameters: {
        part: 'snippet',
        order: 'viewCount',
        q: params.q,
        type: 'video'
      }
    })
  );
}

function fetchRelatedVideos(params: { videoId: string }): Promise<SearchAPIResponse> {
  return deserializeJSONResponse(
    Request.get({
      url: `https://www.googleapis.com/youtube/v3/search`,
      parameters: {
        part: 'snippet',
        order: 'viewCount',
        relatedToVideoId: params.videoId,
        type: 'video'
      }
    })
  );
}

export default { fetchList, fetchRelatedVideos };
