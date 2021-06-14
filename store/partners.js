export const state = () => ({
  partners: [],
  partner: [],
});

export const mutations = {
  setPartners(state, partners){
    state.partners = partners;
  },
  setPartner(state, partner){
    state.partner = partner;
  }
}

export const actions = {
  async fetch({commit}) {
    const partners = await this.$axios.$get(this.$axios.defaults.baseURL+'/partner/get');
    commit('setPartners', partners);
  },
  async getPartner({commit}, [id]){
    const partner = await this.$axios.$get(this.$axios.defaults.baseURL+`/partner/get/${id}`);
    commit('setPartner', partner)
  },
  async updatePartner({commit}, [id, name, link, image]){
    await this.$axios.$put(this.$axios.defaults.baseURL+`/partner/update/${id}`, {'name': name, 'image': image, 'partner_link': link});
  },
  async delete({commit}, [id]){
    await this.$axios.$delete(this.$axios.defaults.baseURL+`/partner/delete/${id}`);
  },
  async addPartner(ctx, [name, link, image])  {
    await this.$axios.$post(this.$axios.defaults.baseURL+'/partner/add', {'name': name, 'image': image, 'partner_link': link});
  }
}

export const getters = {
  partners: s => s.partners,
  partner:  s => s.partner
}
