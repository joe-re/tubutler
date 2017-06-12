import { Commit } from 'vuex';
export const actions = {
  increment: ({ commit }: { commit: Commit }) => commit('increment'),
  decrement: ({ commit }: { commit: Commit }) => commit('decrement'),
}
