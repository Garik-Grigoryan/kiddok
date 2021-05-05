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
              <v-col sm="6" xs="12" md="4">
                <v-list :three-line="true" :class="'block1'">
                  <v-list-item style="display: block;">
                    <div style="display: flex; heigth: 200px;">
                        <div style="width: 100px; height: 200px; background: #FDB813; display: flex; justify-content: center; align-items: center;">
                          <p style="font-size: 30px; color: white;">0+</p>
                        </div>
                        <div class="img-block"></div>
                    </div>
                    <v-list-item-content style="display: block;">
                      <v-list-item-title v-text="'0-12 ամսական'"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col sm="6" xs="12" md="4">
                <v-list :three-line="true" :class="'block1'">
                  <v-list-item style="display: block;">
                    <div style="display: flex; heigth: 200px;">
                        <div style="width: 100px; height: 200px; background: #01B8BE; display: flex; justify-content: center; align-items: center;">
                          <p style="font-size: 30px; color: white;">12+</p>
                        </div>
                        <div class="img-block"></div>
                    </div>
                    <v-list-item-content style="display: block;">
                      <v-list-item-title v-text="'12-24 ամսական'"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col sm="6" xs="12" md="4">
                <v-list :three-line="true" :class="'block1'">
                  <v-list-item style="display: block;">
                    <div style="display: flex; heigth: 200px;">
                        <div style="width: 100px; height: 200px; background: #B22180; display: flex; justify-content: center; align-items: center;">
                          <p style="font-size: 30px; color: white;">2+</p>
                        </div>
                        <div class="img-block"></div>
                    </div>
                    <v-list-item-content style="display: block;">
                      <v-list-item-title v-text="'2-5 տարեկան'"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>

          <v-container style="margin-bottom: 120px; max-width: 1360px;">
            <v-row>
              <v-col sm="6" xs="12" md="4">
                <v-list :three-line="true" :class="'block1'">
                  <v-list-item style="display: block;">
                    <div style="display: flex; heigth: 200px;">
                        <div style="width: 100px; height: 200px; background: #352249; display: flex; justify-content: center; align-items: center;">
                          <p style="font-size: 30px; color: white;">5+</p>
                        </div>
                        <div class="img-block"></div>
                    </div>
                    <v-list-item-content style="display: block;">
                      <v-list-item-title v-text="'5-8 տարեկան'"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col sm="6" xs="12" md="4">
                <v-list :three-line="true" :class="'block1'">
                  <v-list-item style="display: block;">
                    <div style="display: flex; heigth: 200px;">
                        <div style="width: 100px; height: 200px; background: #B22180; display: flex; justify-content: center; align-items: center;">
                          <p style="font-size: 30px; color: white;">8+</p>
                        </div>
                        <div class="img-block"></div>
                    </div>
                    <v-list-item-content style="display: block;">
                      <v-list-item-title v-text="'8-12 տարեկան'"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
              <v-col sm="6" xs="12" md="4">
                <v-list :three-line="true" :class="'block1'">
                  <v-list-item style="display: block;">
                    <div style="display: flex; heigth: 200px;">
                        <div style="width: 100px; height: 200px; background: #01B8BE; display: flex; justify-content: center; align-items: center;">
                          <p style="font-size: 30px; color: white;">16+</p>
                        </div>
                        <div class="img-block"></div>
                    </div>
                    <v-list-item-content style="display: block;">
                      <v-list-item-title v-text="'12-16 տարեկան'"></v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-col>
            </v-row>
          </v-container>

          <!-- <h1  class="text-center mb-5" v-text="$t('bestSales')" style="text-transform: uppercase; color: #352249; font-weight: 100;"></h1>
          <PromoProducts :count="7" type="best"></PromoProducts> -->

          <h1  class="text-center mb-5" v-text="'ԶԵՂՉՎԱԾ ՏԵՍԱԿԱՆԻ'" style="text-transform: uppercase; color: #352249; font-weight: 100;"></h1>
          <PromoProducts :count="7" type="sales"></PromoProducts>

        </v-container>
          <v-snackbar
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
          </v-snackbar>
      </div>
</template>

<script>
import HeadSlider from '~/components/HeadSlider.vue'
import Brands from '~/components/Brands.vue'
import ProductsSlider from '~/components/ProductsSlider.vue'
import PromoProducts from '~/components/PromoProducts.vue'
import Subscribe from '~/components/Subscribe.vue'
import MiddleBanner from "../components/MiddleBanner";
import deliveryBaner from "../components/deliveryBaner";

export default {
  head() {
    return {
      title: 'Home',
      meta: [
        { hid: 'Davmar - home', name: 'Davmar home', content: 'Buy online from anywhere.' }
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
    Subscribe,
    MiddleBanner,
    deliveryBaner
  },
  data () {
    return {
      justifyCenter: 'center',
      notification: '',
      color: 'success',
      snackbar: false
    }
  },
  async mounted() {
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
  },
}
</script>

<style scoped>
  .block1 .img-block {
      width: 400px;
      height: 200px;
      background-image: url(http://127.0.0.1:8000/images/fp_lbk_shop_by_age_0_desk_en_us_1008x330.jfif);
      background-size: cover;
      background-position: center;
  }
</style>
