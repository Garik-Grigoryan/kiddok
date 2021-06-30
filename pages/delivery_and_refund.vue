<template>
  <v-container class="mt-5">
    <!-- <v-row> -->
      <div class="text-caption" style="display: contents;">
        <div class="delivery-block">
          <div class="delivery-block-title">
            Առաքում և վերադարձ
          </div>
          <p>
            Ըստ ՀՀ օրենքի գնապիտակների առկայության և արտաքին տեսքի պահպանման դեպքում կարող եք 
            <br>
            14 օրերի ընթացքում կատարել վերադարձ և փոխանակում:
          </p>
        </div>
      </div>
    <!-- </v-row> -->
  </v-container>
</template>

<script>
    export default {
        name: "delivery_and_refund",
        layout: 'product',
      head() {
        return {
          title: 'Delivery And Refund',
          meta: [
            { hid: 'Delivery And Refund', name: 'Delivery And Refund', content: 'Delivery And Refund' }
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

  .delivery-block {
    border: 1px solid #C6C3C3;
    border-radius: 8px;
    width: 100%;
    padding: 15px;
    margin: 20px 0 50px 0;
  }

  .delivery-block-title {
    color: #B22180;
    border-bottom: 1px solid #9f9b9b;
    width: max-content;
    padding: 10px 30px 5px 0;
    margin-bottom: 30px;
  }

  .delivery-block p {
    margin-bottom: 40px;
    color: #352249;
  }

  @media (min-width: 767px) and (max-width: 959px) {
    .delivery-block {
      margin-top: 60px;
    }
  }

  @media (max-width: 455px) {
    .delivery-block {
      margin-top: 60px;
    }
  }

</style>
