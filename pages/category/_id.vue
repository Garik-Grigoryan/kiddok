<template>
  <div class="brand-page-block">
    <v-container>
      <div v-if="this.category.image !== '[]'" class="top-block">
          <div>
            <div style="display: flex; heigth: 200px;">
                <div class="age-block" style="width: 100px; height: 200px; display: flex; justify-content: center; align-items: center;">
                  <p style="font-size: 30px; color: white;">{{this.category.description}}</p>
                </div>
                <div class="img-block"></div>
            </div>
          </div>
      </div>
      <div v-else class="top-block" style="display: flex; align-items: center;">
        <div class="left-block"></div>
        <div class="center-block">
          <img src="https://back.kiddok.am/images/Kiddok_logo_04-1.png" width="100px">
          <span>{{this.category.name_am}}</span>
        </div>
        <div class="right-block"></div>
      </div>
      <v-row justify="center">
        <div style="width: 30%;">
          <Filters filter_type="category"></Filters>
        </div>
        <div style="width: 70%; height: fit-content;">
          <!-- <div v-if="this.category.image !== '[]'">
            <p style="margin-top: 20px;">
              Երկաթուղի «Իմ 1-ին գնացքը»: Հավաքածուն ներառում է ՝ 8 տարրերից երկաթգիծ (28սմ), լոկոմոտիվ պրոյեկտորով, մեղեդիներ և իրական ծուխ, ուղևորափոխադրման վագո
            </p>
          </div> -->
          <div style="display: flex; flex-wrap: wrap; justify-content: space-between; height: fit-content;">
            <productCard
              v-for="(product, i) in products.products"
              :key="i"
              :image="JSON.parse(product.images)[0]"
              :id="product.id"
              :title_en="product.name_en"
              :title_ru="product.name_ru"
              :title_am="product.name_am"
              :price="product.price"
              :price_wholesale="product.price_wholesale"
              :discountType="product.discountType"
              :discount="product.discount"
            ></productCard>
          </div>
          <div v-if="products.count > 1" class="text-center" style="margin: 10px auto;">
            <v-pagination
              v-model="page"
              :length="products.count"
              :total-visible="7"
              @input="next"
            ></v-pagination>
          </div>
        </div>
      </v-row>

    </v-container>
  </div>

</template>

<!--<template>
  <div class="brand-page-block">
    <v-container>
      <div class="top-block">
        <div>
          <div style="display: flex; heigth: 200px;">
              <div style="width: 100px; height: 200px; background: #FDB813; display: flex; justify-content: center; align-items: center;">
                <p style="font-size: 30px; color: white;">0+</p>
              </div>
              <div>
                <img src="http://kiddokback.neoteric-software.com/images/fp_lbk_shop_by_age_0_desk_en_us_1008x330.jfif" width="100%">
              </div>
          </div>
        </div>
      </div>
      <v-row justify="center">
        <div style="width: 30%;">
          <Filters></Filters>
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
</template>-->

<script>
  import productCard from "../../components/productCard";
  import Filters from "../../components/Filters";
  import BestProducts from '../../components/BestProducts.vue';
  export default {
    watchQuery: ["page"],
    head() {
      return {
        title: this.products.categoryName,
        meta: [
          { hid: this.products.categoryName, name: this.products.categoryName, content: this.products.categoryName }
        ],
      };
    },
    async fetch({route, store}) {
      await store.dispatch('products/getProductByCategoryId', [route.params.id, route.query.page]);
      await store.dispatch('brands/fetch');
      await store.dispatch('menus/fetch');
      await store.dispatch('products/getCategoryFilters', [route.params.id]);
      await store.dispatch('products/filterAsType', ['new']);
      await store.dispatch('products/filterAsType', ['best']);
      await store.dispatch('products/filterAsType', ['sales']);
      await store.dispatch('categories/getCategory', [route.params.id]);
    },
    layout: 'category',
    components: {
      productCard,
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
        return this.$store.getters['products/productByCategory'];
      },
      category() {
        return this.$store.getters['categories/category'];
      },
    },
    beforeRouteLeave (to, from, next) {
      this.$cookies.set('davmar_filter', [], {
        path: '/',
        maxAge: 10 * 365 * 24 * 60 * 60
      });
      next();
    },
    // async mounted() {
      
    //   await this.$store.dispatch('wishListAndCart/fetch');
    //   if(this.user){
    //     await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
    //   }else{
    //     await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
    //   }
    // },
    mounted() {
      // console.log(this.category);
      if(document.querySelector('.img-block') !== null) {
        document.querySelector('.img-block').style.backgroundImage = "url('"+JSON.parse(this.category.image)[0]+"')";
        document.querySelector('.age-block').style.background = this.category.color;
      }
    },
    methods:{
      next() {
        let cookieRes = this.$cookies.get('davmar_filter');
        if(cookieRes[2] === this.$route.params.id){
          cookieRes.push(this.page);
          this.$store.dispatch('products/FilterByCategory', cookieRes).then(r => {
          })
        }else{
          this.$router.push({ query: { page: this.page } });
        }
      }
    },
  }
</script>

<style scoped>

  .brand-page-block .top-block {
    margin: 20px 0 30px 0;
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

  .img-block {
    width: 100%;
    height: 200px;
    background-size: cover;
    background-position: center;
  }

  .left-block, .right-block {
    border-top: 3px solid #B22180;
    width: 100%;
  }

  .center-block {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 20px;
    min-width: fit-content;
  }

  /* @media (min-width: 767px) and (max-width: 959px) {
    .brand-page-block .top-block {
      margin-top: 60px;
    }
  }

  @media (max-width: 455px) {
    .brand-page-block .top-block {
      margin-top: 60px;
    }
  } */

  @media (max-width: 448px) {
    .container {
        margin-top: 80px;
    }
  }

</style>
