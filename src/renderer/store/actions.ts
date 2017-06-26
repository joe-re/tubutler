import { Item } from '../types/Item';
import SearchAPI from '../api_utils/SearchAPI';
import { createActions } from './TypedActions';

export type SeachActions = {
  SEARCH_RESOLVED: { items: Item[] },
  SEARCH_REJECTED: { message: string }
}

export const actions = createActions<null, null, SeachActions>({
  search: ({ typedCommit }, payload: { q: string }) => {
    SearchAPI.fetchList({ q: payload.q }).then((res) => {
      typedCommit.SEARCH_RESOLVED({ items: res.items });
    }).catch(e => {
      typedCommit.SEARCH_REJECTED({ message: e.message || '' });
    })
  }
}, ['SEARCH_RESOLVED', 'SEARCH_REJECTED']);
