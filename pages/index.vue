<template>
      <div>
        <HeadSlider></HeadSlider>
        <deliveryBaner></deliveryBaner>
        <v-container style="max-width: 1360px;">
          <h1  class="text-center mb-5" v-text="$t('newProducts')" style="text-transform: uppercase; color: #352249; font-weight: 100;"></h1>
          <PromoProducts :count="7" type="new"></PromoProducts>

          <h1  class="text-center mb-5" v-text="'ԸՍՏ ՏԱՐԻՔԻ'" style="text-transform: uppercase; color: #352249; font-weight: 100; margin-top: 120px;"></h1>
          <v-container style="margin-bottom: 0px; max-width: 1360px;">
            <v-row>
              <v-col sm="6" xs="12" md="4" v-for="(item, i) in categoriesBlock" :key="i">
                <v-list :three-line="true" :class="'block1'">
                  <v-list-item :to="item.to" style="display: block; cursor: pointer;">
                    <div style="display: flex; heigth: 200px;">
                        <div class="age-block" :style="item.ageStyle">
                          <p style="font-size: 30px; color: white;">{{item.age}}</p>
                        </div>
                        <div class="img-block" :style="item.imgStyle"></div>
                    </div>
                    <v-list-item-content style="display: block;">
                      <v-list-item-title v-text="item.title"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>

          <h1  class="text-center mb-5" v-text="'ԶԵՂՉՎԱԾ ՏԵՍԱԿԱՆԻ'" style="text-transform: uppercase; color: #352249; font-weight: 100;"></h1>
          <SalesProducts :count="7" type="sales"></SalesProducts>

          <h1  class="text-center mb-5" v-text="'BESTSELLERS'" style="text-transform: uppercase; color: #352249; font-weight: 400;"></h1>
          <BestProducts :count="7" type="best"></BestProducts>

        </v-container>
          <!-- <v-snackbar
            v-model="snackbar"
            :color="color"
            :right="true"
            :timeout="3000"
            :top="true"
            rounded="pill"
          >
            {{ notification }}

            <template v-slot:action="{ attrs }">
              <v-btn
                dark
                text
                v-bind="attrs"
                @click="snackbar = false"
              >
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </template>
          </v-snackbar> -->




        <!-- <v-footer style="justify-content: space-between; background: #01B8BE; align-items: center; padding: 90px;">
          <div style="display: flex; justify-content: space-between; align-items: baseline; width: 70%;">
            <div>
              <div>
                <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
                  <v-icon style="margin-right: 10px; font-size: 20px;">mdi-card-account-mail</v-icon>
                  <span>ԿՈՆՏԱԿՏԱՅԻՆ ՏՎՅԱԼՆԵՐ</span>
                </v-btn>
              </div>
              <div>
                <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
                  <v-icon style="margin-right: 10px; font-size: 20px;">mdi-phone</v-icon>
                  <span>+374 96 998996</span>
                </v-btn>
              </div>
              <div>
                <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
                  <v-icon style="margin-right: 10px; font-size: 20px;">mdi-whatsapp</v-icon>
                  <span>+374 96 998996</span>
                </v-btn>
              </div>
              <div>
                <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
                  <v-icon style="margin-right: 10px; font-size: 20px;">mdi-whatsapp</v-icon>
                  <span>+374 96 998996</span>
                </v-btn>
              </div>
            </div>
            <div>
              <div>
                <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
                  <span>ՄԵՐ ՀԱՍՑԵՆԵՐԸ</span>
                </v-btn>
              </div>
              <div>
                <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
                  <v-icon style="margin-right: 10px; font-size: 20px;">mdi-map-marker</v-icon>
                  <span style="text-transform: none;">Սուրմալու առևտրի կենտրոն 51Ա տաղավար</span>
                </v-btn>
              </div>
              <div>
                <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
                  <v-icon style="margin-right: 10px; font-size: 20px;">mdi-facebook</v-icon>
                  <v-icon style="margin-right: 10px; font-size: 20px;">mdi-instagram</v-icon>
                </v-btn>
              </div>
            </div>
            <div>
              <div>
                <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
                  <span>ԱՅԼ</span>
                </v-btn>
              </div>
              <div>
                <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button" style="text-transform: none;">
                  <span>Աշխատանք</span>
                </v-btn>
              </div>
              <div>
                <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button" style="text-transform: none;">
                  <span>Պայմաններ և կանոններ</span>
                </v-btn>
              </div>
              <div>
                <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button" style="text-transform: none;">
                  <span>Առաքում և վերադարձ</span>
                </v-btn>
              </div>
            </div>
          </div>

          <div style="width: 25%;">
            <img src="http://127.0.0.1:8000/images/Kiddok_logo_02-1.PNG" width="100%">
          </div>
        </v-footer> -->

      </div>
</template>

<script>
import HeadSlider from '~/components/HeadSlider.vue'
import Brands from '~/components/Brands.vue'
import ProductsSlider from '~/components/ProductsSlider.vue'
import PromoProducts from '~/components/PromoProducts.vue'
import SalesProducts from '~/components/SalesProducts.vue'
import BestProducts from '~/components/BestProducts.vue'
import Subscribe from '~/components/Subscribe.vue'
import MiddleBanner from "../components/MiddleBanner";
import deliveryBaner from "../components/deliveryBaner";

export default {
  head() {
    return {
      title: 'Home',
      meta: [
        { hid: 'Home', name: 'Home', content: 'Buy online from anywhere.' }
      ],
    };
  },
  async fetch({store}){
    await store.dispatch('brands/fetch');
    await store.dispatch('products/filterAsType', ['new']);
    await store.dispatch('products/filterAsType', ['best']);
    await store.dispatch('products/filterAsType', ['sales']);
    await store.dispatch('components/getComponent', [1]);
    await store.dispatch('components/getComponent', [2]);
    // await store.dispatch('wishListAndCart/fetch');
    await store.dispatch('menus/fetch');
  },

  components: {
    HeadSlider,
    Brands,
    ProductsSlider,
    PromoProducts,
    SalesProducts,
    BestProducts,
    Subscribe,
    MiddleBanner,
    deliveryBaner
  },
  data () {
    return {
      justifyCenter: 'center',
      notification: '',
      color: 'success',
      snackbar: false,
      categoriesBlock: [],
    }
  },
  async mounted() {
    let all_categories = await this.$axios.$get('http://127.0.0.1:8000/api/category/get');
    console.log(all_categories);
    all_categories.forEach(elem => {
      if(elem.parent !== 0) {
        this.categoriesBlock.push({
          id: elem.id,
          title: elem.name_am,
          parentID: elem.parent,
          image: elem.image,
          age: elem.description,
          to: '/category/' + elem.id + '?page=1',
          imgStyle: 'background-image: url('+JSON.parse(elem.image)[0]+')',
          ageStyle: 'background: '+elem.color,
        });
      }
    });
    // window.onload = function() {
    //   document.querySelector('.v-slide-group__prev .mdi-chevron-left').style.color = "#B22180";
    // }
    if(this.$route.query.payment){
      if(this.$route.query.payment == 'success'){
        this.color = 'success';
        this.notification = 'Payment Successful';
        this.snackbar = true;
      }else if(this.$route.query.payment = 'fail'){
        this.color = 'error';
        this.notification = 'Payment Failed';
        this.snackbar = true;
      }
    }

    await this.$store.dispatch('wishListAndCart/fetch');
    if(this.user){
      await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
    }else{
      await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
    }
  }
}
</script>

<style scoped>
  .block1 .img-block {
      width: 400px;
      height: 200px;
      /* background-image: url(http://127.0.0.1:8000/images/fp_lbk_shop_by_age_0_desk_en_us_1008x330.jfif); */
      background-size: cover;
      background-position: center;
  }

  .age-block {
    width: 100px; 
    height: 200px; 
    display: flex; 
    justify-content: center; 
    align-items: center;
  }

  div[data-v-2401beae] {
      background-color: #01B8BE !important;
  }

  .v-footer .theme--light.v-btn--active::before {
      opacity: 0 !important;
  }

  .v-slide-group__prev .mdi-chevron-left {
    color: #B22180;
    font-size: 100px;
  }

  .mytable .v-data-table-header {
    background: #EBE7E7 !important;
  }
</style>
