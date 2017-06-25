import deserializeJSONResponse from './desirializeJSONResponse';
import Request from './Request';
import { SearchResult } from '../types/SratchResult';

type FeatchListParams = { q: string }
function fetchList(params: FeatchListParams): Promise<SearchResult> {
  return deserializeJSONResponse(
    Request.get({
      url: `https://www.googleapis.com/youtube/v3/search`,
      parameters: {
        part: 'snippet',
        order: 'date',
        q: params.q
      }
    })
  );
}

export default { fetchList };
