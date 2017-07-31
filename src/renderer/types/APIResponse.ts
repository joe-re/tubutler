import { Snippet, Player, Statistics, SearchItem, VideoItem } from './Item';

type APIResponse = {
   kind: string,
   etag: string,
   prevPageToken: string,
   nextPageToken: string,
   regionCode: string,
   pageInfo: {
     totalResults: number,
     resultsPerPage: number
   }
}

export type SearchAPIResponse = APIResponse & { items: SearchItem[] };
export type VideoAPIResponse = APIResponse & { items: VideoItem[] };
