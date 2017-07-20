import SearchAPI from '../api_utils/SearchAPI';
import VideoAPI from '../api_utils/VideoAPI';
import { FullItem } from '../types/Item';
import { SearchAPIResponse, VideoAPIResponse } from '../types/APIResponse';
import { Dispatch, Commit, ActionContext, Action, ActionTree, CommitOptions } from 'vuex';

export type SearchActions = {
  SEARCH_RESOLVED: {
    searchAPIResponse: SearchAPIResponse,
    videoAPIResponse: VideoAPIResponse
  },
  SEARCH_REJECTED: { message: string },
  SEARCH_RELATED_VIDEOS_RESOLVED: {
    searchAPIResponse: SearchAPIResponse,
    videoAPIResponse: VideoAPIResponse
  },
  SEARCH_RELATED_VIDEOS_REJECTED: { message: string },
  ADD_HISTORY: { videoId: string },
  SET_MIN_PLAYER_MODE: { val: boolean }
}

interface TypedActionContext<S, R, A> {
  dispatch: Dispatch;
  commit: <K extends keyof A>(params: { type: K, payload: A[K] }) => void,
  state: S;
  getters: any;
  rootState: R;
  rootGetters: any;
}

type TypedAction<S, R, A, P> = (payload: P) =>
 (injectee: TypedActionContext<S, R, A>) => any;

type TypedMutation<S, P> = (state: S, payload: P) => any;
type TypedMutationTree<S, A> = {
  [P in keyof A]?: TypedMutation<S, A[P]>;
};
export function createMutations<S, A>(params: TypedMutationTree<S, A>) {
  let obj: any = {};
  Object.keys(params).forEach(k => {
    obj[k] = (state: S, payload: any) =>
      (params[k] as any)(state, payload.payload)
  });
  return obj;
}

function createActions(params: any): any {
  let obj: any = {};
  Object.keys(params).forEach(k => {
    obj[k] = (actionContext: any, payload: any) => {
      (params as any)[k](payload)(actionContext)
    }
  });
  return obj;
}

export type TypedActionTree<S, R, A> = {
  [key: string]: (payload: any) => (ctx: TypedActionContext<S, R, A>) => any
}

function ActionCreatorHelper<S, R, A>() {
  return {
    create: <T extends TypedActionTree<S, R, A>>(ac: T): T => createActions(ac)
  }
}

export const actions = ActionCreatorHelper<null, null, SearchActions>().create({
  search: (payload: { q: string }) => {
    return async ({ commit }) => {
      try {
        const searchAPIResponse = await SearchAPI.fetchList({ q: payload.q });
        const videoAPIResponse = await VideoAPI.fetchVideos({ ids: searchAPIResponse.items.map(item => item.id.videoId) });
        commit({
          type: 'SEARCH_RESOLVED',
          payload: { searchAPIResponse, videoAPIResponse }
        });
      } catch (e) {
      }
    }
  },
  fetchRelatedVideos: (payload: { videoId: string }) => {
    return async ({ commit }) => {
      try {
        const searchAPIResponse = await SearchAPI.fetchRelatedVideos({ videoId: payload.videoId });
        const videoAPIResponse = await VideoAPI.fetchVideos({ ids: searchAPIResponse.items.map(item => item.id.videoId) });
        commit({
          type: 'SEARCH_RELATED_VIDEOS_RESOLVED',
          payload: { searchAPIResponse, videoAPIResponse }
        });
      } catch (e) {
        commit({
          type: 'SEARCH_RELATED_VIDEOS_REJECTED',
          payload: { message: e.message || '' }
        });
      }
    }
  },
  addHistory: (payload: { videoId: string }) => {
    return ({ commit }) => {
      commit({
        type: 'ADD_HISTORY',
        payload: { videoId: payload.videoId }
      });
    }
  },
  setminiPlayerMode: (payload: { val: boolean }) => {
    return ({ commit }) => {
      commit({ type: 'SET_MIN_PLAYER_MODE', payload: { val: payload.val } });
    };
  }
})
