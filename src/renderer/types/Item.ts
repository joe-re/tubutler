type Thubnail = {
  url: string,
  width: number,
  height: number
};

export type Item = {
   kind: "youtube#searchResult",
   etag: string,
   id: {
    kind: "youtube#video",
    videoId: string
   },
   snippet: {
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
}
