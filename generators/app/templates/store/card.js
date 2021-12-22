const uri = 'api/cards/'

export const state = () => ({
  cards: []
})

export const getters = {
  get: state => id => state.cards.find(v => v.id === id) || {},
  allCards: state => state.cards
}

export const mutations = {
  ALL: (state, cards) => {
    state.cards = cards
  },
  CREATE: (state, card) => state.cards.push(card),
  UPDATE: (state, updatedCard) => {
    const cardToUpdate = state.cards.find(v => v.id === updatedCard.id)
    const index = state.cards.indexOf(cardToUpdate)
    state.cards.splice(index, 1, updatedCard)
  },
  DELETE: (state, id) => {
    const cards = state.cards.filter(v => v.id !== id)
    state.cards = cards
  }
}

export const actions = {
  async all ({ commit }) {
    const allCards = await this.$axios.get(uri).then(res => res.data)
    commit('ALL', allCards)
    return allCards
  },
  async find ({ commit }, id) {
    const foundCard = await this.$axios.get(`${uri}${id}`).then(res => res.data)
    commit('ALL', [foundCard])
    return foundCard
  },
  async create ({ commit }, card) {
    const createdCard = await this.$axios.post(uri, card)
    commit('CREATE', createdCard)
    return createdCard
  },
  async update ({ commit }, { id, ...body }) {
    const updatedCard = await this.$axios.put(`${uri}${id}`, body).then(res => res.data)
    commit('UPDATE', updatedCard)
    return updatedCard
  },
  async delete ({ commit }, id) {
    await this.$axios
      .delete(`${uri}${id}`)
      .then((response) => {
        if (response.status === 200 || response.status === 204) {
          commit('DELETE', id)
        }
      })
  }
}
