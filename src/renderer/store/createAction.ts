import { Dispatch, Commit, ActionContext, Action, ActionTree, CommitOptions } from 'vuex';

type TypedCommit<T, P> = (type: T, payload: P) => void;

interface TypedActionContext<S, R, A> {
  dispatch: Dispatch;
  commit: <K extends keyof A>(params: { type: K, payload: A[K] }) => void,
  state: S;
  getters: any;
  rootState: R;
  rootGetters: any;
}

type TypedAction<S, R, A> = (injectee: TypedActionContext<S, R, A>, payload: any) => any;

type TypedActionTree<S, R, A> = {
  [key: string]: TypedAction<S, R, A>;
};

type TypedMutation<S, P> = (state: S, payload: P) => any;
type TypedMutationTree<S, A> = {
  [P in keyof A]: TypedMutation<S, A[P]>;
};
export function createMutations<S, A>(params: TypedMutationTree<S, A>) {
  return params;
}

export type SeachActions = {
  SEARCH_RESOLVED: { hoge: 'hg' },
  SEARCH_REJECTED: { message: string },

  SEARCH_RELATED_VIDEOS_RESOLVED: {
  },
  SEARCH_RELATED_VIDEOS_REJECTED: { message: string },
  ADD_HISTORY: { videoId: string }
}

const actions: TypedActionTree<null, null, SeachActions> = {
  search: ({ commit }) => {
    const search = commit({ type: 'SEARCH_RESOLVED', payload: { hoge: 'hg' } });
  }
}
