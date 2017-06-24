import { SeachActions } from './actions';
import { createMutations } from './TypedActions';
type State = {
  enthusiasm: number
}

export const state: State = { enthusiasm: 0 }
export const mutations = createMutations<State, SeachActions>({
  ['SEARCH_RESOLVED'](state, payload) {
    console.log(payload);
  },
  ['SEARCH_REJECTED'](state, payload) {
  }
});
