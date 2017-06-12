type State = {
  enthusiasm: number
}

export const state: State = { enthusiasm: 0 }
export const mutations = {
  increment (state: State) {
    state.enthusiasm++
  },

  decrement (state: State) {
    state.enthusiasm--
  }
}
