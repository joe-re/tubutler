type Thubnail = {
  url: string,
  width: number,
  height: number
};

export type Snippet = {
  publishedAt: string,
  channelId: string,
  title: string,
  description: string,
  thumbnails: {
    default: Thubnail,
    medium: Thubnail,
    high: Thubnail
  },
  channelTitle: string,
  liveBroadcastContent: string
}

export type Player = {
  embedHtml: string
}

export type Statistics = {
  commentCount: string,
  dislikeCount: string,
  favoriteCount: string,
  likeCount: string,
  viewCount: string
}

export type SearchItem = {
   kind: string,
   etag: string,
   id: {
    kind: "youtube#video",
    videoId: string
   },
   snippet: Snippet
}

export type VideoItem = {
  kind: string,
  etags: string,
  id: string,
  player: Player,
  statistics: Statistics
}

export type FullItem = SearchItem & {
  player: Player,
  statistics: Statistics
}
