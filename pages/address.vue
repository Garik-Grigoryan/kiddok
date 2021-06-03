<template>
  <v-container class="mt-5 address-page-block">
    <v-row>
      <div class="text-caption" style="display: flex; flex-wrap: wrap; justify-content: space-between; width: 100%; margin: 20px 0 80px 0;">
        <div class="address-block">
          <div class="address-block-title">
            Սուրմալու առևտրի կենտրոն 51Ա տաղավար
          </div>
          <div>
            <v-btn :to="localePath('#')" text class="my-2 nav_button" style="border: none; min-width: 30px; padding: 0;">
              <v-icon style="margin-right: 10px; font-size: 30px;">mdi-facebook</v-icon>
            </v-btn>
            <v-btn :to="localePath('#')" text class="my-2 nav_button" style="border: none; min-width: 30px; padding: 0;">
              <v-icon style="margin-right: 10px; font-size: 30px;">mdi-instagram</v-icon>
            </v-btn>
          </div>
        </div>
        <div class="map">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12196.31259205636!2d44.49865963057115!3d40.162813729115726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abc4335d0c721%3A0x8596defb8a02d4a9!2sSurmalu!5e0!3m2!1sru!2s!4v1621407359614!5m2!1sru!2s" width="650" height="300" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "address",
        layout: 'product',
      head() {
        return {
          title: 'Address',
          meta: [
            { hid: 'Address', name: 'Address', content: 'Address' }
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

  .address-block-title {
    color: #B22180;
    font-size: 18px;
  }

  @media (max-width: 959px) {
    .address-page-block {
      margin-top: 170px !important;
    }
  }
</style>
