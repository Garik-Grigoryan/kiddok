<template>
  <v-container>
    <v-toolbar-title style="display: flex; justify-content: space-between;">
      Partners
      <v-btn small dark to="partners/new" color="purple" >Add new partner</v-btn>
    </v-toolbar-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Image</th>
            <th class="text-left">Name</th>
            <th class="text-left">Link</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="item in partners" :key="item.name">
          <td><v-img :src="JSON.parse(item.image)[0]" max-width="100"></v-img></td>
          <td>{{ item.name }}</td>
          <td>{{ item.partner_link }}</td>
          <td><v-btn small :to="`partners/edit/${item.id}`" :elevation="0" dark fab color="primary" ><v-icon>mdi-pencil</v-icon></v-btn> <v-btn small :elevation="0" @click="deletePartners($event, item.id )" dark fab color="error" ><v-icon>mdi-delete</v-icon></v-btn></td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
  export default {
    async fetch({store}) {
      await store.dispatch('partners/fetch')
    },
    layout: 'dashboard',
    middleware: 'admin',
    name: "index",
    data () {
      return {
      }
    },
    computed: {
      partners() {
        return this.$store.getters['partners/partners'];
      }
    },
    methods: {
      deletePartners(event, id) {
        this.$store.dispatch('partners/delete', [id]).then( r => {
          this.$store.dispatch('partners/fetch')
        })
      }
    }
  }
</script>

<style scoped>

</style>
