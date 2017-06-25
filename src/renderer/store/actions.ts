import { Commit, ActionContext, Action } from 'vuex';
import { Item } from '../types/Item';
import SearchAPI from '../api_utils/SearchAPI';
import { createActions } from './TypedActions';

export type SeachActions = {
  SEARCH_RESOLVED: { item: Item[] },
  SEARCH_REJECTED: { message: string }
}

export const actions = createActions<null, null, SeachActions>({
  search: ({ typedCommit }, payload) => {
    SearchAPI.fetchList({ q: payload.q }).then((res) => {
      typedCommit.SEARCH_RESOLVED({ item: res.items });
    }).catch(e => {
      typedCommit.SEARCH_REJECTED({ message: e.message || '' });
    })
  }
}, ['SEARCH_RESOLVED', 'SEARCH_REJECTED']);
