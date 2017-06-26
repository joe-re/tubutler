import store from '../store';

export type Actions = {
  search: (params: { q: string }) => void
};

export default function getActions(): Actions {
  return {
    search: (params) => store.dispatch('search', params)
  };
}
