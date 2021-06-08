<template>
  <v-container class="mt-5">
    <v-row>
      <div class="text-caption" style="display: contents;">
        <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 30px;">
          <div class="partners-title">Մեր գործընկերները</div>
          <!-- <h2 class="text-center" style="font-weight: 400;">Kidd’OK – ի հիմքը մեր ԹԻՄՆ է, իսկ ուղեցույցը՝ մեր ՀԱՃԱԽՈՐԴՆԵՐԸ։</h2> -->
        </div>
        <div class="our-partners-block">
          <div class="partner-block">
            <img src="http://127.0.0.1:8000/images/NoPath.png" width="100%">
          </div>
          <div class="partner-block">
            <img src="http://127.0.0.1:8000/images/NoPath.png" width="100%">
          </div>
          <div class="partner-block">
            <img src="http://127.0.0.1:8000/images/NoPath.png" width="100%">
          </div>
          <div class="partner-block">
            <img src="http://127.0.0.1:8000/images/NoPath.png" width="100%">
          </div>
        </div>
        <div class="our-partners-block">
          <div class="partner-block">
            <img src="http://127.0.0.1:8000/images/NoPath.png" width="100%">
          </div>
          <div class="partner-block">
            <img src="http://127.0.0.1:8000/images/NoPath.png" width="100%">
          </div>
          <div class="partner-block">
            <img src="http://127.0.0.1:8000/images/NoPath.png" width="100%">
          </div>
          <div class="partner-block">
            <img src="http://127.0.0.1:8000/images/NoPath.png" width="100%">
          </div>
        </div>
      </div>
    </v-row>
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
          await store.dispatch('brands/fetch');
          // await store.dispatch('wishListAndCart/fetch');
          await store.dispatch('menus/fetch');
          await store.dispatch('pages/getById', [2]);

        },
      async mounted() {
        // await this.$store.dispatch('wishListAndCart/fetch');
        // if(this.user){
        //   await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
        // }else{
        //   await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
        // }
        // if(this.$i18n.locale === 'am'){
        //   this.text = this.page.html_am
        // }
        // else if(this.$i18n.locale === 'en'){
        //   this.text = this.page.html
        // }
        // else if(this.$i18n.locale === 'ru'){
        //   this.text = this.page.html_ru
        // }
      },
      computed: {
        // page() {
        //   return this.$store.getters['pages/page'];
        // }
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

  .partner-block {
    width: 20%;
    margin-bottom: 40px;
  }

  .our-partners-block .partner-block:not(:last-child) {
    margin-right: 5%;
  }

  @media (max-width: 959px) {
    .partners-title {
      margin-top: 170px;
    }
  }
</style>
