export const state = () => ({
  regions: [],
  region: []
});

export const mutations = {
  setRegions(state, regions){
    state.regions = regions;
  },
  setRegion(state, region){
    state.region = region;
  },
}

export const actions = {
  async fetch({commit}) {
    const regions = await this.$axios.$get('http://127.0.0.1:8000/api/region/get');
    commit('setRegions', regions);
  },
  async getRegion({commit}, [id]){
    const region = await this.$axios.$get(`http://127.0.0.1:8000/api/region/get/${id}`);
    commit('setRegion', region)
  },

  async updateRegion({commit}, [id, name_en, name_ru, name_am, delivery_price]){
    const region = await this.$axios.$put(`http://127.0.0.1:8000/api/region/update/${id}`, {'name_en': name_en, 'name_ru': name_ru, 'name_am': name_am, 'delivery_price': delivery_price});
  },
  async delete({commit}, [id]){
    const region = await this.$axios.$delete(`http://127.0.0.1:8000/api/region/delete/${id}`);
  },
  async addRegion(ctx, [name_en, name_ru, name_am, delivery_price]){
    await this.$axios.$post('http://127.0.0.1:8000/api/region/add', {'name_en': name_en, 'name_ru': name_ru, 'name_am': name_am, 'delivery_price': delivery_price});
  }
}

export const getters = {
    regions: s => s.regions,
    region:  s => s.region,
}
