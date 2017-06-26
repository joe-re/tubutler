import { SeachActions } from './actions';
import { createMutations } from './TypedActions';
import { Item } from '../types/Item';
type State = {
  enthusiasm: number,
  items: Item[]
}

export const state: State = { enthusiasm: 0, items: [] }
export const mutations = createMutations<State, SeachActions>({
  ['SEARCH_RESOLVED'](state, payload) {
    console.log(payload);
    console.log(payload.items);
    state.items = payload.items;
  },
  ['SEARCH_REJECTED'](state, payload) {
  }
});
