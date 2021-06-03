<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="10" md="12">
        <v-card>
          <v-card-title>
            Juridical users
            <!-- <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field> -->
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="users"
            item-key="id"
            class="elevation-1"
          >
            <template v-slot:item.approved="{ item }" >
              <v-radio-group v-model="item.approved" row @change="approveUser(item.id, item.approved)">
                <v-radio label="Yes" value="1"></v-radio>
                <v-radio label="No" value="0"></v-radio>
              </v-radio-group>
            </template>
          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  layout: 'dashboard',
  middleware: 'admin',
  name: "users",
  data () {
    return {
      users: [],
      headers: [
        {text: '#', value: 'id'},
        {text: 'Name', value: 'name'},
        {text: 'Lastname', value: 'lastname'},
        {text: 'E-mail', value: 'email'},
        {text: 'Phone', value: 'phone'},
        {text: 'Address', value: 'address'},
        {text: 'Company name', value: 'company_name'},
        {text: 'Company HVHH', value: 'company_hvhh'},
        {text: 'Company phone', value: 'company_phone'},
        {text: 'Approved', value: 'approved'},
      ],
    }
  },
  methods: {
    async approveUser(id, approved) {
      await this.$axios.$post(this.$axios.defaults.baseURL+'/user/approveUserAccount', {id, approved});
    }
  },
  async mounted() {
    this.users = await this.$axios.$get(this.$axios.defaults.baseURL+'/user/getJuridicalUsers');
  },
}
</script>

<style scoped>

</style>
