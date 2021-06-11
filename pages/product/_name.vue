<template>
  <div>
    <v-container class="product-page-block">
      <div>
        <!-- <v-row> -->
          <productDetail style="width: 100%;"></productDetail>
          <h2 style="font-weight: 300; margin-top: 150px; margin-bottom: 60px;">ԱՌԱՋԱՐԿՎՈՂ ՏԵՍԱԿԱՆԻ</h2>
          <BestProducts :count="7" type="best" style="width: 100%;"></BestProducts>
        <!-- </v-row> -->
      </div>
    </v-container>
  </div>
</template>
<script>
import productDetail from "../../components/productDetail";
import PromoProducts from "../../components/PromoProducts";
import BestProducts from '../../components/BestProducts.vue';

export default {
  layout: 'product',
  async fetch({route, store}) {
    await store.dispatch('brands/fetch');
    await store.dispatch('menus/fetch');
    await store.dispatch('products/filterAsType', ['best']);
    await store.dispatch('products/getProduct', [route.params.name]);
  },
  components: {
    productDetail,
    PromoProducts,
    BestProducts
  },
  data () {
    return {

    }
  },
  async mounted() {
    await this.$store.dispatch('wishListAndCart/fetch');
    if(this.user){
      await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
    }else{
      await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
    }
  },
  mounted() {
    if(document.querySelector('.product-page-block') !== null) {
      document.querySelector('.product-page-block').parentNode.parentNode.style.position = 'unset';
    }
  }
}
</script>
