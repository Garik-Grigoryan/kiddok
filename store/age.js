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
    const ages = await this.$axios.$get('http://127.0.0.1:8000/api/age/get');
    commit('setAges', ages);
  },
  async getAge({commit}, [id]){
    const age = await this.$axios.$get(`http://127.0.0.1:8000/api/age/get/${id}`);
    commit('setAge', age)
  },

  async updateAge({commit}, [id, name]){
    const age = await this.$axios.$put(`http://127.0.0.1:8000/api/age/update/${id}`, {'name': name});
  },
  async delete({commit}, [id]){
    const age = await this.$axios.$delete(`http://127.0.0.1:8000/api/age/delete/${id}`);
  },
  async addAge(ctx, [name]){
    await this.$axios.$post('http://127.0.0.1:8000/api/age/add', {'name': name});
  }
}

export const getters = {
  ages: s => s.ages,
  age:  s => s.age
}
