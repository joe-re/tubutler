import store from '../store';
import { FullItem } from '../types/Item';

export type Actions = {
  search: (params: { q: string }) => void,
  fetchRelatedVideos: (params: { videoId: string }) => void,
  addHistory: (params: { videoId: string }) => void
};

export default function getActions(): Actions {
  return {
    search: (params) => store.dispatch('search', params),
    fetchRelatedVideos: (params) => store.dispatch('fetchRelatedVideos', params),
    addHistory: (params) => store.dispatch('addHistory', params)
  };
}
