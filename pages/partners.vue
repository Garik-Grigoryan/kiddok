<template>
  <v-container class="mt-5">
      <div class="text-caption" style="display: contents;">
        <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 30px;">
          <div class="partners-title">Մեր գործընկերները</div>
          <!-- <h2 class="text-center" style="font-weight: 400;">Kidd’OK – ի հիմքը մեր ԹԻՄՆ է, իսկ ուղեցույցը՝ մեր ՀԱՃԱԽՈՐԴՆԵՐԸ։</h2> -->
        </div>
        <div class="our-partners-block" style="width: 100%;">
          <div v-for="item in partners" :key="item.name" class="partner-block">
            <a :href="item.partner_link">
              <img :src="JSON.parse(item.image)[0]" width="100%">
            </a>
          </div>
        </div>
      </div>
  </v-container>
</template>

<script>
    export default {
      name: "partners",
      layout: 'product',
      head() {
        return {
          title: 'Our Partners',
          meta: [
            { hid: 'Our Partners', name: 'Our Partners', content: 'Our Partners' }
          ],
        };
      },
      data(){
          return {
            text: '',
          }
      },
      async fetch({route, store}) {
        await store.dispatch('menus/fetch');
        await store.dispatch('partners/fetch');
      },
      computed: {
        partners() {
          return this.$store.getters['partners/partners'];
        }
      }
    }
</script>

<style scoped>
  .v-application {
    color: #352249;
  }

  .mailing_btn {
    background: #B22180; 
    width: 100%; 
    padding: 12px !important; 
    border-radius: 6px !important; 
    color: white !important;
    margin-bottom: 15px;
    text-transform: none;
  }

  .partners-title {
    color: white;
    font-size: 16px;
    background: #B22180;
    padding: 8px;
    text-align: center;
    border-radius: 6px;
    margin-bottom: 30px !important;
    width: 800px;
  }

  .our-partners-block {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .our-partners-block .partner-block {
    width: 20%;
    margin: 0 2.5% 40px 2.5%;
  }

  @media (min-width: 767px) and (max-width: 959px) {
    .partners-title {
      margin-top: 60px;
    }
  }

  @media (max-width: 455px) {
    .partners-title {
      margin-top: 60px;
    }
  }
</style>
