import { TypedStore } from '../store';
import Vue from 'vue';
import { TypedActionTree } from '../store/actions';
import Component from 'vue-class-component'

export default function inject<S, G>(container: any, store: TypedStore<S, G>) {
  const name = container.options.name || 'unknown-container';
  const actions = Object.keys((store as any)._actions).reduce((p: any, c: string) => {
    const action = (store as any)._actions[c];
    p[c] = (payload: any) => store.dispatch(c, payload);
    return p;
  }, {});
  console.log(container.options);
  return {
    name: `injected-${name}`,
    components: {
      [name]: container
    },
    data: () => ({
      actions,
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
