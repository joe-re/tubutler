import deserializeJSONResponse from './desirializeJSONResponse';
import Request from './Request';
import { SearchResult } from '../types/SratchResult';

function fetchList(): Promise<SearchResult> {
  return deserializeJSONResponse(
    Request.get({
      url: `https://www.googleapis.com/youtube/v3/search`,
      parameters: {
        part: 'snippet',
        order: 'date'
      }
    })
  );
}

export default { fetchList };
