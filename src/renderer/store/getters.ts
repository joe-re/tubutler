import { GetterTree, Getter } from 'vuex';
import { State } from './index';
import { FullItem } from '../types/Item';

export type Getters = {
  nextVideo: FullItem | null;
  nextVideoId: string | null;
  relatedVideos: FullItem[];
};

type TypedGetter<S, R, G, V> = (state: S, getters: G, rootState: R, rootGetters: any) => V;

export type TypedGetterTree<S, R, G> = {
  [P in keyof G]: TypedGetter<S, R, G, G[P]>;
}

const getters: TypedGetterTree<State, State, Getters> = {
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
