import deserializeJSONResponse from './desirializeJSONResponse';
import Request from './Request';
import { VideoAPIResponse } from '../types/APIResponse';

type FeatchVideosParams = { ids: string[] };
function fetchVideos(params: FeatchVideosParams): Promise<VideoAPIResponse> {
  return deserializeJSONResponse(
    Request.get({
      url: `https://www.googleapis.com/youtube/v3/videos`,
      parameters: {
        part: 'statistics,player',
        id: params.ids.join(','),
      }
    })
  );
}

export default { fetchVideos };
