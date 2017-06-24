import { Commit, ActionContext, Action } from 'vuex';

type TypedMutation<S, P> = (state: S, payload: P) => any;
type TypedMutationTree<S, A> = {
  [P in keyof A]: TypedMutation<S, A[P]>;
};
export function createMutations<S, A>(params: TypedMutationTree<S, A>) {
  return params;
}

type TypedCommit<A> = {
  [P in keyof A]: (payload: A[P]) => void;
}

interface TypedActionContext<S,R,A> extends ActionContext<S,R> {
  typedCommit: TypedCommit<A>
}

type TypedAction<S, R, A> = (injectee: TypedActionContext<S, R, A>, payload: any) => any;

type TypedActionTree<S, R, A> = {
  [key: string]: TypedAction<S, R, A>;
};

export function createActions<S,R,A>(params: TypedActionTree<S,R,A>, allowedActions: string[]) {
  const proxyActions = allowedActions.map((k) => ({
    [k]: (payload: any, commit: Commit) => commit({ type: k, payload })
  }));
  let obj: any = {};
  Object.keys(params).forEach(k => {
    const fun = params[k];
    obj[k] = (context: ActionContext<S,R>, payload: any) => {
      const typedCommits: any = {};
      allowedActions.forEach(action =>
        typedCommits[action] = (payload: any) => context.commit({ type: action, payload }));
      fun({ ...context, typedCommit: typedCommits }, payload);
    };
  });
  return obj;
}
