<template>
  <v-container class="mt-5">
    <!-- <v-row> -->
      <div class="text-caption">
        <h1 class="text-center">{{$t('conditions')}}</h1>
        <div v-html="text"></div>
      </div>
    <!-- </v-row> -->
  </v-container>
</template>

<script>
  export default {
    head() {
      return {
        title: 'Conditions',
        meta: [
          { hid: 'Conditions', name: 'Conditions', content: 'Conditions' }
        ],
      };
    },
    name: "deliveryCondition",
    layout: 'product',
    data(){
      return {
        text: '',
      }
    },
    async fetch({route, store}) {
      await store.dispatch('brands/fetch');
      // await store.dispatch('wishListAndCart/fetch');
      await store.dispatch('menus/fetch');
      await store.dispatch('pages/getById', [1]);

    },

    async mounted() {
      await this.$store.dispatch('wishListAndCart/fetch');
      if(this.user){
        await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
      }else{
        await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
      }
      
      this.text = this.page.html_am
    },
    computed: {
      page() {
        return this.$store.getters['pages/page'];
      }
    }
  }
</script>

<style scoped>

</style>

