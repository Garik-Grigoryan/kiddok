<template>
  <v-sheet
    class="mx-auto"
    max-width="120%"
    style="margin-bottom: 120px;"
  >
    <v-slide-group
      v-model="model"
      class="pa-4"
      center-active
      :show-arrows="false"
    >
        <bestProductCard
          v-for="(product, n) in products"
          :key="n"
          :image="JSON.parse(product.images)[0]"
          :id="product.id"
          :title_en="product.name_en"
          :title_ru="product.name_ru"
          :title_am="product.name_am"
          :price="product.price"
          :discountType="product.discountType"
          :discount="product.discount"
        ></bestProductCard>
      
    </v-slide-group>

  </v-sheet>
</template>

<script>
import bestProductCard from "./bestProductCard";
  export default {
    props: ['count', 'type'],
    name: 'bestProductComponent',
    components: {
      bestProductCard
    },
    data: () => ({
      model: null,
      rating: '',
      ratingCount: 0,
      best_products: []
    }),
    async fetch({route, store}) {
      await store.dispatch('products/filterAsType', ['best']);
    },
    methods: {
      addToWishlist(e, id) {
        let user_id = 0;
        if(this.user){
          user_id = this.user.id
        }
        this.$store.dispatch('wishListAndCart/setWishList', [id, user_id])
      },
      addToCart(e, id) {
        let user_id = 0;
        if(this.user){
          user_id = this.user.id
        }
        this.$store.dispatch('wishListAndCart/setCArt', [id, user_id])
      }
    },
    computed: {
      products() {
        return this.$store.getters['products/bestProducts'];
      }
    },
    mounted() {
      let stars = document.querySelectorAll('.best-product-rating .v-rating button');
      for(let i = 0; i < stars.length; i++) {
        stars[i].style.padding = "0";
        stars[i].disabled = true;
      }
    }
  }
</script>

<style scoped>
  .blue-text{
    color: #01235e;
  }
  .blue_bg{
    background-color: #01235e;
  }
  .price{
    font-size: 18px;
  }
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    position: absolute;
    width: 100%;
  }
  .discount{
    opacity: 0.8;
    text-decoration: line-through;
    color: #dbdbdb;
  }
</style>
