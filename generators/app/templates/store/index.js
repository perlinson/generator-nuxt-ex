const uri = "api/<%= camel %>s/";

export const state = () => ({
  <%= camel %>s: []
});

export const getters = {
  get: state => id => state.<%= camel %>s.find(v => v.id === id) || {}
};

export const mutations = {
  ALL: (state, records) => {
    state.<%= camel %>s = records;
  },
  CREATE: (state, record) => state.<%= camel %>s.push(record),
  UPDATE: (state, id, updatedRecord) => {
    let recordToUpdate = state.<%= camel %>s.find(v => v.id === id);
    let index = state.<%= camel %>s.indexOf(recordToUpdate);
    state.<%= camel %>s.splice(index, 1, updatedRecord);
  },
  DELETE: (state, id) => {
    let records = state.<%= camel %>s.filter(v => v.id !== id);
    state.<%= camel %>s = records;
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
