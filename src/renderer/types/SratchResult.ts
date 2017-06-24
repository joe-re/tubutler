import { Item } from './Item';

export type SearchResult = {
  kind: "youtube#searchListResponse",
  etag: string,
  nextPageToken: string,
  regionCode: string,
  pageInfo: {
   totalResults: number,
   resultsPerPage: number
  },
  items: Item[]
};
