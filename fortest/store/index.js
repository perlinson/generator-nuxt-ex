const uri = "api/cards/";

export const state = () => ({
  cards: []
});

export const getters = {
  get: state => id => state.cards.find(v => v.id === id) || {}
};

export const mutations = {
  ALL: (state, records) => {
    state.cards = records;
  },
  CREATE: (state, record) => state.cards.push(record),
  UPDATE: (state, id, updatedRecord) => {
    let recordToUpdate = state.cards.find(v => v.id === id);
    let index = state.cards.indexOf(recordToUpdate);
    state.cards.splice(index, 1, updatedRecord);
  },
  DELETE: (state, id) => {
    let records = state.cards.filter(v => v.id !== id);
    state.cards = records;
  }
};

export const actions = {
  async all({ commit, $axios }) {
    let allRecords = await $axios.get(uri);
    commit("ALL", allRecords);
    return allRecords;
  },
  async find({ commit, $axios }, id) {
    let foundRecord = await $axios.get(`${uri}${id}`);
    commit("ALL", [foundRecord]);
    return foundRecord;
  },
  async create({ commit, $axios }, record) {
    let createdRecord = await $axios.post(uri, record);
    commit("CREATE", createdRecord);
    return createdRecord;
  },
  async update({ commit, $axios }, id, body) {
    let updatedRecord = await $axios.put(`${uri}${id}`, body);

    commit("UPDATE", id, updatedRecord);
    return updatedRecord;
  },
  async delete({ commit, $axios }, id) {
    let deletedRecord = await $axios.delete(`${uri}${id}`).then(response => {
      if (response.status === 200 || response.status === 204) {
        commit("DELETE", deletedRecord.id);
      }
    });
  }
};
