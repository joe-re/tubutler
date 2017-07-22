import Vue from 'vue';
import Vuex, { Store, Dispatch, Commit, ActionContext, Action, ActionTree, CommitOptions,  MutationTree, Plugin, ModuleTree } from 'vuex';

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

export type TypedActionTree<S, R, A> = {
  [key: string]: (payload: any) => (ctx: TypedActionContext<S, R, A>) => any
}

type TypedMutation<S, P> = (state: S, payload: P) => any;

export type TypedMutationTree<S, A> = {
  [P in keyof A]?: TypedMutation<S, A[P]>;
};

type TypedGetter<S, R, G, V> = (state: S, getters: G, rootState: R, rootGetters: any) => V;
export type TypedGetterTree<S, R, G> = {
  [P in keyof G]: TypedGetter<S, R, G, G[P]>;
}

interface StoreOptions<S, G, A, AC> {
  state?: S;
  getters?: TypedGetterTree<S, S, G>;
  actions?: AC;
  mutations?: TypedMutationTree<S, A>;
  modules?: ModuleTree<S>;
  plugins?: Plugin<S>[];
  strict?: boolean;
}

declare class TypedStore<S, G, A, AC> extends Store<S> {
  constructor(options: StoreOptions<S, G, A, AC>);
  readonly getters: G;
}

export class BAStore<S, G, A, AC> {
  _store: TypedStore<S, G, A, AC>
  private _actions: AC;

  constructor(options: StoreOptions<S, G, A, AC>) {
    Vue.use(Vuex);
    const { actions, mutations, ...remains } = options;
    this._store = new (Vuex.Store as any)({
      actions: this.transformActions(actions),
      mutations: this.transformMutations(mutations),
      ...remains
    });
    this.setActions();
  }

  get dispatch() {
    return this._store.dispatch;
  }

  get commit() {
    return this._store.commit;
  }

  get watch() {
    return this._store.watch;
  }

  get state(): S {
    return this._store.state;
  }
  get getters(): G  {
    return (this._store.getters as any);
  }

  get actions(): AC {
    return this._actions;
  }

  private setActions() {
    this._actions = Object.keys((this._store as any)._actions).reduce((p: any, c: string) => {
      const action = (this._store as any)._actions[c];
      p[c] = (payload: any) => this._store.dispatch(c, payload);
      return p;
    }, {});
  }

  transformMutations<S, A>(params: any) {
    let obj: any = {};
    Object.keys(params).forEach(k => {
      obj[k] = (state: S, payload: any) =>
        (params[k] as any)(state, payload.payload)
    });
    return obj;
  }

  transformActions(params: any): any {
    let obj: any = {};
    Object.keys(params).forEach(k => {
      obj[k] = (actionContext: any, payload: any) => {
        (params as any)[k](payload)(actionContext)
      }
    });
    return obj;
  }
}

export function createStore<S, G, A, AC>(options: StoreOptions<S, G, A, AC>) {
  return new BAStore(options);
}

export function ActionCreatorHelper<S, R, A>() {
  return <T extends TypedActionTree<S, R, A>>(ac: T): T => ac
}

export function inject<S, G, A, AC>(container: any, store: BAStore<S, G, A, AC>) {
  const name = container.options.name || 'unknown-container';
  return {
    name: `injected-${name}`,
    components: {
      [name]: container
    },
    data: () => ({
      actions: store.actions,
      state: store.state,
      getters: store.getters
    }),
    template: `
      <${name}
       :actions="actions"
       :state="state"
       :getters="getters"
     />
    `
  }
}
