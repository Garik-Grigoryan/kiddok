export const state = () => ({
  sizes: [],
  size: []
});

export const mutations = {
  setSizes(state, sizes){
    state.sizes = sizes;
  },
  setSize(state, size){
    state.size = size;
  }
}

export const actions = {
  async fetch({commit}) {
    const sizes = await this.$axios.$get('http://127.0.0.1:8000/api/size/get');
    commit('setSizes', sizes);
  },
  async getSize({commit}, [id]){
    const size = await this.$axios.$get(`http://127.0.0.1:8000/api/size/get/${id}`);
    commit('setSize', size)
  },

  async updateSize({commit}, [id, name]){
    const size = await this.$axios.$put(`http://127.0.0.1:8000/api/size/update/${id}`, {'name': name});
  },
  async delete({commit}, [id]){
    const size = await this.$axios.$delete(`http://127.0.0.1:8000/api/size/delete/${id}`);
  },
  async addSize(ctx, [name]){
    await this.$axios.$post('http://127.0.0.1:8000/api/size/add', {'name': name});
  }
}

export const getters = {
  sizes: s => s.sizes,
  size:  s => s.size
}
