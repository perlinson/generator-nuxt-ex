const uri = 'api/<%= camel %>s/'

export const state = () => ({
  <%= camel %>s: []
})

export const getters = {
  get: state => id => state.<%= camel %>s.find(v => v.id === id) || {},
  all<%= pascal %>s: state => state.<%= camel %>s
}

export const mutations = {
  ALL: (state, <%= camel %>s) => {
    state.<%= camel %>s = <%= camel %>s
  },
  CREATE: (state, <%= camel %>) => state.<%= camel %>s.push(<%= camel %>),
  UPDATE: (state, updated<%= pascal %>) => {
    const <%= camel %>ToUpdate = state.<%= camel %>s.find(v => v.id === updated<%= pascal %>.id)
    const index = state.<%= camel %>s.indexOf(<%= camel %>ToUpdate)
    state.<%= camel %>s.splice(index, 1, updated<%= pascal %>)
  },
  DELETE: (state, id) => {
    const <%= camel %>s = state.<%= camel %>s.filter(v => v.id !== id)
    state.<%= camel %>s = <%= camel %>s
  }
}

export const actions = {
  async all ({ commit }) {
    const all<%= pascal %>s = await this.$axios.get(uri).then(res => res.data)
    commit('ALL', all<%= pascal %>s)
    return all<%= pascal %>s
  },
  async find ({ commit }, id) {
    const found<%= pascal %> = await this.$axios.get(`${uri}${id}`).then(res => res.data)
    commit('ALL', [found<%= pascal %>])
    return found<%= pascal %>
  },
  async create ({ commit }, <%= camel %>) {
    const created<%= pascal %> = await this.$axios.post(uri, <%= camel %>)
    commit('CREATE', created<%= pascal %>)
    return created<%= pascal %>
  },
  async update ({ commit }, { id, ...body }) {
    const updated<%= pascal %> = await this.$axios.put(`${uri}${id}`, body).then(res => res.data)
    commit('UPDATE', updated<%= pascal %>)
    return updated<%= pascal %>
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
