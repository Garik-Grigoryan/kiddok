<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="8" md="12">
        <v-card>
          <v-card-title>
            Callbacks
            <v-spacer></v-spacer>
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            :headers="headers"
            :items="getCallbacks"
            item-key="id"
            class="elevation-1"
            :search="search"
          >
            <template v-slot:item.created_at="{ item }">
              <v-card-text  style="padding: 0" >{{$dateFns.format(new Date(item.created_at), 'yyyy-MM-dd HH:mm')}}</v-card-text>
            </template>
          </v-data-table>
        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "callbacks",
        layout: 'dashboard',
        middleware: 'admin',
        async asyncData({store}) {
          await store.dispatch('user/getCallbacks');
        },
        data() {
          return {
            search: '',
            headers: [
              {text: '#', value: 'id'},
              {text: 'Message', value: 'message'},
              {text: 'Phone', value: 'phone'},
              {text: 'Created at', value: 'created_at'},
            ],
            getCallbacks: []
          }
        },
        computed: {
          // getCallbacks() {
          //   return this.$store.getters['user/callbacks'];
          // }
        },
       async  mounted() {
          this.getCallbacks = await this.$axios.$get('http://127.0.0.1:8000/api/callback/get');
        }
    }
</script>

<style scoped>

</style>
