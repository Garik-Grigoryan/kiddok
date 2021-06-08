<template>
  <div class="brand-page-block">
    <!-- <TopMenu></TopMenu> -->
    
    <v-container>
      <div class="top-block">
        <div class="left-block"></div>
        <div class="center-block">
          <img src="http://127.0.0.1:8000/images/Kiddok_logo_04-1.PNG" width="100px">
          <span>{{this.brand[0].name}}</span>
        </div>
        <div class="right-block"></div>
      </div>
      <v-row justify="center">
        <div style="width: 30%;">
          <Filters filter_type="brand"></Filters>
        </div>
        <div style="display: flex; width: 70%; flex-wrap: wrap; justify-content: space-between; height: fit-content;">
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
  import BestProducts from '../../components/BestProducts.vue';
    export default {
      watchQuery: ["page"],

      async fetch({route, store}) {
        await store.dispatch('products/getProductByBrandId', [route.params.id, route.query.page]);
        await store.dispatch('brands/getBrandFilters', [route.params.id]);
        await store.dispatch('brands/fetch');
        await store.dispatch('menus/fetch');
        await store.dispatch('brands/getBrand', [route.params.id]);
        await store.dispatch('products/filterAsType', ['new']);
        await store.dispatch('products/filterAsType', ['best']);
        await store.dispatch('products/filterAsType', ['sales']);
      },
      layout: 'brand',
      components: {
        productCard,
        TopMenu,
        Filters,
        BestProducts
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
        brand() {
          return this.$store.getters['brands/brand'];
        }
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
        console.log(123, this.$route.params.id);
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
    margin: 20px 0 30px 0;
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
    min-width: fit-content;
  }

  .brand-page-block .container {
    max-width: 1300px !important;
  }

  @media (max-width: 959px) {
    .brand-page-block .top-block {
      margin-top: 170px;
    }
  }
</style>