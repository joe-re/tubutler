import { SeachActions } from './actions';
import { createMutations } from './TypedActions';
import { FullItem } from '../types/Item';
import { State } from './index';

export const mutations = createMutations<State, SeachActions>({
  ['SEARCH_RESOLVED'](state, payload) {
    const items = payload.searchApiResponse.items.map(item => {
      const videoItem = payload.VideoAPIResponse.items.find(videoItem => videoItem.id === item.id.videoId);
      if (!videoItem) {
        console.log("error");
        throw new Error(`can't find video API response. ${item.id.videoId}`);
      }
       return Object.assign({}, item, videoItem);
    });
    state.items = items;
  },
  ['SEARCH_REJECTED'](state, payload) {
  }
});
