import { State } from './index';
import { FullItem } from '../types/Item';
import { GetterTree } from 'battle-ax';

export type Getters = {
  nextVideo: FullItem | null;
  nextVideoId: string | null;
  relatedVideos: FullItem[]
};

const getters: GetterTree<State, State, Getters> = {
  nextVideo: (state, getters) => {
    const next = state.relatedVideos.filter((v) => !state.playedVedeoIds.includes(v.id.videoId));
    if (next.length === 0) {
      return null;
    }
    return next[0];
  },

  nextVideoId: (state, getters) => {
    return getters.nextVideo && getters.nextVideo.id.videoId;
  },

  relatedVideos: (state, getters) => {
    return state.relatedVideos.filter(v => v !== getters.nextVideo);
  }
}

export default getters;
