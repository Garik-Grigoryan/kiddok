<template>
  <v-container>
    <v-row justify="center">
      <v-col lg="12" md="12">
        <v-card>
          <v-card-title>
            Questionnairies
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
            :items="getQuestionnairies"
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
        name: "questionnairies",
        layout: 'dashboard',
        middleware: 'admin',
        async asyncData({store}) {
          await store.dispatch('user/getQuestionnairies');
        },
        data() {
          return {
            search: '',
            headers: [
              {text: '#', value: 'id'},
              {text: "Որտեղից են իմացել Kidd'Ok կազմակերպության մասին", value: 'how_find_out'},
              {text: "Արդյոք օգտվում են www.Kidd'Ok.am կայքից", value: 'use_site'},
              {text: 'ՆորարարությունՆեր կամ փոփոխությունՆեր', value: 'innovations_or_changes'},
              {text: 'Ինչը չի գոհացնում ՊՈՊՈ ԳՐՈՒՊ-ի աշխատանքում', value: 'not_suit_in_work'},
              {text: 'Վարկանիշ', value: 'rating'},
              {text: 'Անուն,Ազգանուն(պաշտոն)', value: 'name'},
              {text: 'Կազմակերպության անվանում', value: 'company_name'},
              {text: 'Հեռախոսահամար', value: 'phone'},
              {text: 'Created at', value: 'created_at'},
            ],
            getQuestionnairies: []
          }
        },
        computed: {
          // getQuestionnairies() {
          //   return this.$store.getters['user/questionnairies'];
          // }
        },
       async  mounted() {
          this.getQuestionnairies = await this.$axios.$get('http://127.0.0.1:8000/api/questionnaire/get');
        }
    }
</script>

<style scoped>

</style>
