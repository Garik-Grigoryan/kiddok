export const state = () => ({
  ages: [],
  age: []
});

export const mutations = {
  setAges(state, ages){
    state.ages = ages;
  },
  setAge(state, age){
    state.age = age;
  }
}

export const actions = {
  async fetch({commit}) {
    const ages = await this.$axios.$get(this.$axios.defaults.baseURL+'/age/get');
    commit('setAges', ages);
  },
  async getAge({commit}, [id]){
    const age = await this.$axios.$get(this.$axios.defaults.baseURL+`/age/get/${id}`);
    commit('setAge', age)
  },

  async updateAge({commit}, [id, name]){
    const age = await this.$axios.$put(this.$axios.defaults.baseURL+`/age/update/${id}`, {'name': name});
  },
  async delete({commit}, [id]){
    const age = await this.$axios.$delete(this.$axios.defaults.baseURL+`/age/delete/${id}`);
  },
  async addAge(ctx, [name]){
    await this.$axios.$post(this.$axios.defaults.baseURL+'/age/add', {'name': name});
  }
}

export const getters = {
  ages: s => s.ages,
  age:  s => s.age
}
