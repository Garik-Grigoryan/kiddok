<template>
  <div>
    <!-- <v-btn class="icon_filter" v-if="!drawer" icon @click.stop="drawer = !drawer" @click = "icon_filter" style="">
      <v-icon>mdi-filter-plus</v-icon>
    </v-btn> -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      fixed
      app
      clipped
      class="product_filter"
      style="width: 85% !important;"
    >
      <!-- <v-list-item class="px-2 mt-3">
        <v-img :src="brand[0].image" width="80%"  :contain="true"></v-img>
        <v-btn
          icon
          @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item> -->

      <!-- <v-divider></v-divider> -->
      <v-list>
        <v-list-item v-for="item in items" :key="item.title" >
          <v-list-item-content>
            <v-list-item-title style="color: #01B8BE; font-size: 18px;">{{ item.title }}</v-list-item-title>
            <v-divider style="margin: 10px 0 20px 0;"></v-divider>
            <div class="checkbox-block" v-for="(i, n) in item.data"  :key="n">
              <input class="checkbox-input" type="checkbox" :name="item.type">
              <label style="height: 23px;">{{i}}</label>
            </div>
            <!-- <div v-if="item.type === 'color'">
              <v-item-group :multiple="true" >
                <v-row class="colors">
                  <v-item  v-for="(color, n) in item.data"  :key="n" v-slot:default="{ active, toggle }">
                    <v-card  :color="color.toLowerCase()" class="d-flex text-center align-center mx-3 my-2" dark height="30" :data-value="color.toLowerCase()" width="30" @click="toggle(), filter($event)" >
                      <v-scroll-y-transition>
                        <v-icon v-if="active" :data-value="color.toLowerCase()" color="white" size="27" v-text="'mdi-close-circle-outline'" class="mx-auto" ></v-icon>
                      </v-scroll-y-transition>
                    </v-card>
                  </v-item>
                </v-row>
              </v-item-group>
            </div> -->
            <!-- <v-combobox v-else @change="filter($event)" v-model="item.select" :items="item.data" label="" dense chips small-chips multiple >
            </v-combobox> -->
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-content style="padding-bottom: 0;">
            <v-list-item-title style="color: #01B8BE; font-size: 18px;">ԳԻՆ</v-list-item-title>
            <v-divider style="margin: 10px 0;"></v-divider>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <!-- <v-range-slider v-model="range" :max="max" :min="min" hide-details class="align-center" thumb-label="always" color="#01B8BE" track-color="#f39513" @change="filter($event)" ></v-range-slider> -->
          <v-range-slider v-model="range" :max="max" :min="min" hide-details class="align-center" color="#01B8BE" track-color="rgba(0, 0, 0, 0.12)" @change="filter($event)" ></v-range-slider>
        </v-list-item>
        <v-list-item>
          <div style="display: flex; justify-content: space-between; width: 100%;">
            <div class="price-block">
              <label>սկսած</label>
              <input type="text" name="min" class="text-input" :value="min" disabled>
            </div>
            <div>
              <label>մինչև</label>
              <input type="text" name="max" class="text-input" :value="max" disabled>
            </div>
          </div>
        </v-list-item>

        <v-list-item class="mt-10">
          <div class="checkbox-block">
            <input class="checkbox-input" type="checkbox" name="sale">
            <label style="height: 33px; color: #01B8BE;">ԶԵՂՉ</label>
          </div>
        </v-list-item>

        <v-list-item class="mt-10">
          <v-list-item-content>
            <v-list-item-title class="sections-title">Բաժիններ</v-list-item-title>
            <div class="section-block" style="display: flex; align-items: center;">
              <img src="http://127.0.0.1:8000/images/Kiddok_logo_04-1.PNG" width="60px">
              <nuxt-link :to="`/brand/2?page=1`">
                <span>Բրենդ</span>
              </nuxt-link>
            </div>
            <div class="section-block">
              <nuxt-link :to="`#`">
                Գնել ըստ տարիքի
              </nuxt-link>
              <v-icon v-text="'mdi-chevron-down'" size="30" style="color: #B22180; cursor: pointer;" @click="openAgeMenu"></v-icon>
            </div>
            <div class="age-menu-block2">
                <div class="section-block">
                  <nuxt-link :to="`/product`">
                    <span>0–12 ամսական</span>
                  </nuxt-link>
                </div>
                <div class="section-block">
                  <nuxt-link :to="`/product`">
                    <span>12–24 ամսական</span>
                  </nuxt-link>
                </div>
                <div class="section-block">
                  <nuxt-link :to="`/product`">
                    <span>2–5 տարեկան</span>
                  </nuxt-link>
                </div>
                <div class="section-block">
                  <nuxt-link :to="`/product`">
                    <span>5–8 տարեկան</span>
                  </nuxt-link>
                </div>
                <div class="section-block">
                  <nuxt-link :to="`/product`">
                    <span>8–12 տարեկան</span>
                  </nuxt-link>
                </div>
                <div class="section-block">
                  <nuxt-link :to="`/product`">
                    <span>12-16 տարեկան</span>
                  </nuxt-link>
                </div>
            </div>
            <div class="section-block">
              <nuxt-link :to="`/product`">
                Նորածնային խաղալիքներ
              </nuxt-link>
            </div>
            <div class="section-block">
              <nuxt-link :to="`/product`">
                Զարգացնող խաղեր
              </nuxt-link>
            </div>
            <div class="section-block">
              <nuxt-link :to="`/product`">
                Երաժշտական խաղալիքներ
              </nuxt-link>
            </div>
            <div class="section-block">
              <nuxt-link :to="`/product`">
                Փափուկ խաղալիքներ
              </nuxt-link>
            </div>
            <div class="section-block">
              <nuxt-link :to="`/product`">
                Մեքենաներ, գնացքներ
              </nuxt-link>
            </div>
            <div class="section-block">
              <nuxt-link :to="`/product`">
                Էկո և փայտե խաղեր
              </nuxt-link>
            </div>
            <div class="section-block">
              <nuxt-link :to="`/product`">
                Կոնստրուկտորներ
              </nuxt-link>
            </div>
            <div class="section-block">
              <nuxt-link :to="`/product`">
                Փազլներ
              </nuxt-link>
            </div>
            <div class="section-block">
              <nuxt-link :to="`/product`">
                Բակային/սեզոնային խաղեր
              </nuxt-link>
            </div>
            <div class="section-block">
              <nuxt-link :to="`/product`">
                Սեղանի խաղեր
              </nuxt-link>
            </div>
            <div class="section-block">
              <nuxt-link :to="`/product`">
                Գրքեր, ուսումնական խաղեր
              </nuxt-link>
            </div>
            <div class="section-block">
              <nuxt-link :to="`/product`">
                ՈՒսուցանող խաղեր
              </nuxt-link>
            </div>
            <div class="section-block">
              <nuxt-link :to="`/product`">
                Գրենական պիտույքներ
              </nuxt-link>
            </div>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-divider style="margin: 60px 0; background-color: #B22180;"></v-divider>
        </v-list-item>

        <v-list-item class="mt-10">
          <v-list-item-content>
            <v-list-item-title>
              <h1  class="mb-5" v-text="'BESTSELLERS'" style="text-transform: uppercase; color: #352249; font-weight: 400;"></h1>
            </v-list-item-title>
            <!-- <BestProducts :count="7" type="best"></BestProducts> -->
            <v-slide-item
              v-for="(product, n) in products"
              :key="n"
              v-slot:default="{ active, toggle }"
            >
              <v-hover v-slot:default="{ hover }">
                <v-card
                  color="grey lighten-4"
                  class="ma-4"
                  width="280"
                  height="450"
                  style="margin: 0 0 40px 0 !important; border-color: transparent !important; background-color: transparent !important; box-shadow: none;"
                >
                  <nuxt-link :to="`/product/${product.id}`">
                    <v-img
                      :aspect-ratio="16/9"
                      :src="JSON.parse(product.images)[0]"
                      height="270px"
                      style="border-radius: 50%; transform: scale(-1, 1);"
                      cover
                    >
                    </v-img>
                  </nuxt-link>
                  <v-slide-y-reverse-transition>
                    <v-card-text
                      class="pt-6"
                      style="position: relative; height: 80px;"
                    >
                      <nuxt-link :to="`/product/${product.id}`">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
                          <div style="display: flex; align-items: center;">
                            <v-icon v-text="'mdi-star-outline'" size="20"></v-icon>
                            <v-icon v-text="'mdi-star-outline'" size="20"></v-icon>
                            <v-icon v-text="'mdi-star-outline'" size="20"></v-icon>
                            <v-icon v-text="'mdi-star-outline'" size="20"></v-icon>
                            <v-icon v-text="'mdi-star-outline'" size="20"></v-icon>
                            <div style="color: rgb(112, 112, 112); font-weight: 500; font-size: 14px; margin-left: 8px;"> (58)</div>
                          </div>
                          <v-btn style="background: #B22180; padding: 6px 15px; border-radius: 16px; color: white; text-transform: none;">NEW</v-btn>
                        </div>
                        <!-- <h3 v-if="$i18n.locale === 'am'" class="font-weight-light font-weight-bold white--text mb-2" v-text="product.name_am" style="color: #352249 !important; font-weight: 100 !important; font-size: 18px; margin-bottom: 16px !important;"></h3>
                        <h3 v-if="$i18n.locale === 'en'" class="font-weight-light font-weight-bold white--text mb-2" v-text="product.name_en" style="color: #352249 !important; font-weight: 100 !important; font-size: 18px; margin-bottom: 16px !important;"></h3>
                        <h3 v-if="$i18n.locale === 'ru'" class="font-weight-light font-weight-bold white--text mb-2" v-text="product.name_ru" style="color: #352249 !important; font-weight: 100 !important; font-size: 18px; margin-bottom: 16px !important;"></h3> -->
                        <h3 class="font-weight-light font-weight-bold white--text mb-2" v-text="'Մանկական խաղալիք զարգացնող'" style="color: #352249 !important; font-weight: 100 !important; font-size: 15px; margin-bottom: 8px !important;"></h3>
                        <div style="display: flex; justify-content: space-between; align-items: baseline;">
                          <p class="price" style="color: #352249; font-size: 15px;">
                            <span>{{product.price}} դրամ</span>
                          </p>
                          <v-btn :to="localePath('/cart')" color="#000" text class="my-2 nav_button" width="40px" style="justify-content: flex-end; padding: 0;">
                            <v-icon >mdi-cart-outline</v-icon>
                          </v-btn>
                        </div>
                      </nuxt-link>
                    </v-card-text>
                  </v-slide-y-reverse-transition>
                </v-card>

              </v-hover>
            </v-slide-item>

          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import BestProducts from './BestProducts.vue';

  export default {
    // brand[0]
    head() {
      return {
        title: this.brand[0].name,
        meta: [
          { hid: this.brand[0].name, name: this.brand[0].name, content: this.brand[0].name }
        ],
      };
    },
    components: {
      BestProducts
    },
    async fetch({route, store}) {
      await store.dispatch('products/filterAsType', ['new']);
      await store.dispatch('products/filterAsType', ['best']);
      await store.dispatch('products/filterAsType', ['sales']);
    },
    data () {
      return {
        min: 15000,
        max: 30000,
        range: [15000, 30000],
        drawer: true,
        items: [
          // { title: this.$t('sex'), icon: 'mdi-home-city', data: ['Men', 'Women',], select: [], type: 'sex' },
          // { title: this.$t('size'), icon: 'mdi-account', data: [], select: [], type: 'size'},
          // { title: this.$t('colors'), icon: 'mdi-account-group-outline', data: [], select: [], type: 'color'},
          { title: "ՍԵՌ", icon: 'mdi-home-city', data: ['Տղա', 'Աղջիկ',], select: [], type: 'sex' },
          { title: "ՏԱՐԻՔ", icon: 'mdi-account', data: ['0-12 ամսական', '12-24 ամսական', '2-5 տարեկան', '5-8 տարեկան', '8-12 տարեկան', '12-16 տարեկան'], select: [], type: 'age'},
        ],
        select: [],
        mini: false,
      }
    },
    mounted() {
      // for(let elem in this.filters.colors){
      //   if(elem != ''){
      //     this.items[2].data.push(elem)
      //   }
      // }
      // for(let elem in this.filters.sizes){
      //   if(elem != ''){
      //     this.items[1].data.push(elem)
      //   }
      // }
      this.min = this.filters.minPrice == null ? 0 : this.filters.minPrice;
      this.max = this.filters.maxPrice == null ? 0 : this.filters.maxPrice;
      this.range = [this.min, this.max];

      if(window.matchMedia('(max-width: 767px)').matches){
        this.drawer = false;
      }
      document.querySelector('.product_filter .v-navigation-drawer__border').style.display = "none";
    },
    methods: {
      filter(e) {
        // console.log(e);
        document.querySelector('input.text-input[name="min"]').value = e[0];
        document.querySelector('input.text-input[name="max"]').value = e[1];
        if(e.target !== undefined){
          if(e.target.tagName === 'DIV' || e.target.tagName === 'I'){
            if(e.target.tagName === 'I'){
              this.$delete(this.items[2].select, this.items[2].select.indexOf(e.target.getAttribute('data-value')));
            }else{
              this.items[2].select.push(e.target.getAttribute('data-value'));
            }
          }
        }
        this.$cookies.set('davmar_filter', [this.items, this.range, this.$route.params.id], {
          path: '/',
          maxAge: 10 * 365 * 24 * 60 * 60
        });
        this.$store.dispatch('products/Filter', [this.items, this.range, this.$route.params.id]).then(r => {
          // this.$router.push('/dashboard/categories')
        })
      },
      icon_filter() {
        if(document.getElementsByClassName("product_filter")[0].className.indexOf('v-navigation-drawer--close') === -1) {
          document.getElementsByClassName("icon_filter")[0].style.left = "auto";
        } else {
          document.getElementsByClassName("icon_filter")[0].style.left = "260px";
        }
      },

      openAgeMenu() {
        let block = document.querySelector('.age-menu-block2');
        if(block.style.display === 'none') {
          block.style.display = 'block';
        } else {
          block.style.display = 'none';
        }
      }
    },
    computed: {
      brand() {
        return this.$store.getters['brands/brand'];
      },
      filters() {
        return this.$store.getters['brands/brandFilters'];
      },
      products() {
        return this.$store.getters['products/bestProducts'];
      }
    }
  }
</script>

<style scoped>
  .v-list-item__content{
    display: initial;
  }
  /*@media (max-width: 1266px) {*/
    .icon_filter {
      display: block !important;
      position: fixed;
      top: 50%;
      left: 15px;
      z-index: 10;
      width: 56px;
      height: 56px;
      color: #ffffff !important;
      border: 1px solid rgb(1, 35, 94);
      background-color: rgb(1, 35, 94);
    }
  /*}*/

  nav.product_filter {
    position: relative !important;
    height: max-content !important;
    width: 256px !important;
    top: 0 !important;
    transform: none !important;
    max-height: none !important;
  }

  .checkbox-block {
    display: flex;
    align-items: center;
  }
  
  .checkbox-input {
    width: 20px;
    height: 20px;
    margin-right: 15px;
    margin-bottom: 10px;
  }

  .text-input {
    border: 1px solid rgba(0, 0, 0, 0.12);
    padding: 5px;
    width: 80px;
    margin-left: 10px;
  }

  .price-block {
    display: flex;
    align-items: center;
  }

  .sections-title {
    color: white;
    font-size: 16px;
    text-transform: uppercase;
    background: #B22180;
    padding: 8px;
    text-align: center;
    border-radius: 6px;
    margin-bottom: 30px !important;
  }

  .section-block {
    margin-bottom: 15px !important;
  }

  .section-block a {
    color: #352249;
  }

  .age-menu-block2 {
    display: none;
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    padding-left: 15px;
    margin: 20px 0 25px 30px !important;
  }
</style>
