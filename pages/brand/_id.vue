<template>
  <div class="brand-page-block">
    <!-- <TopMenu></TopMenu> -->
    
    <v-container>
      <div class="top-block">
        <div class="left-block"></div>
        <div class="center-block">
          <img src="http://127.0.0.1:8000/images/Kiddok_logo_04-1.PNG" width="100px">
          <span>Brand</span>
        </div>
        <div class="right-block"></div>
      </div>
      <v-row justify="center">
        <div style="width: 25%;">
          <Filters></Filters>
        </div>
        <div style="display: flex; width: 75%; flex-wrap: wrap; justify-content: space-between;">
          <productCard
            v-for="(product, i) in products.products"
            :key="i"
            :image="JSON.parse(product.images)[0]"
            :id="product.id"
            :title_en="product.name_en"
            :title_ru="product.name_ru"
            :title_am="product.name_am"
            :price="product.price"
            :discountType="product.discountType"
            :discount="product.discount"
          ></productCard>
        </div>
      </v-row>
      <div v-if="products.count > 1" class="text-center">
        <v-pagination
          v-model="page"
          :length="products.count"
          :total-visible="7"
          @input="next"
        ></v-pagination>
      </div>
    </v-container>
  </div>
</template>

<script>
  import productCard from "../../components/productCard";
  import TopMenu from '../../components/Topmenu';
  import Filters from "../../components/Filters";
    export default {
      watchQuery: ["page"],

      async fetch({route, store}) {
        await store.dispatch('products/getProductByBrandId', [route.params.id, route.query.page]);
        await store.dispatch('brands/getBrandFilters', [route.params.id]);
        await store.dispatch('brands/fetch');
        await store.dispatch('menus/fetch');
        await store.dispatch('brands/getBrand', [route.params.id]);
      },
      layout: 'brand',
      components: {
        productCard,
        TopMenu,
        Filters
      },
      data () {
        return {
          page: parseInt(this.$route.query.page),
        }
      },
      computed: {
        products() {
          return this.$store.getters['products/productByBrand'];
        },
        async categories() {
          return this.$store.getters['categories/categories'];
        },
      },
      beforeRouteLeave (to, from, next) {
        this.$cookies.set('davmar_filter', [], {
          path: '/',
          maxAge: 10 * 365 * 24 * 60 * 60
        });
        next();
      },
      methods:{
        next() {
          let cookieRes = this.$cookies.get('davmar_filter');
          if(cookieRes != undefined && cookieRes[2] === this.$route.params.id){
            cookieRes.push(this.page);
            this.$store.dispatch('products/Filter', cookieRes).then(r => {
            })
          }else{
            this.$router.push({ query: { page: this.page } });
          }
        },
      },
      async mounted() {
        console.log(123, this.$route.params.id)
        await this.$store.dispatch('brands/getBrand', [this.$route.params.id]);
        await this.$store.dispatch('wishListAndCart/fetch');
        if(this.user){
          await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
        }else{
          await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
        }
      },
    }
</script>

<style scoped>
  .brand-page-block .top-block {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .brand-page-block .left-block, .right-block {
    border-top: 3px solid #B22180;
    width: 100%;
  }
  .brand-page-block .center-block {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
  }

  .brand-page-block .container {
    max-width: 1300px !important;
  }
</style>