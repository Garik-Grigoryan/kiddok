<template>
  <div>
    <v-btn class="icon_filter" v-if="!drawer" icon @click.stop="drawer = !drawer" @click = "icon_filter" style="">
      <v-icon>mdi-filter-plus</v-icon>
    </v-btn>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant.sync="mini"
      fixed
      app
      clipped
      class="product_filter"
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
          <v-list-item-content v-if="item.type !== 'sale'">
            <v-list-item-title style="color: #01B8BE; font-size: 18px;">{{ item.title }}</v-list-item-title>
            <v-divider style="margin: 10px 0 20px 0;"></v-divider>
            <div class="checkbox-block" v-for="(i, n) in item.data"  :key="n" @change="filter($event)">
              <input class="checkbox-input" type="checkbox" :name="item.type" :value="item.values[n]" v-model="item.select">
              <label style="height: 23px;">{{i}}</label>
            </div>
          </v-list-item-content>
          <v-list-item-content v-else>
            <div class="checkbox-block" v-for="(i, n) in item.data"  :key="n" @change="filter($event)">
              <input class="checkbox-input" type="checkbox" :name="item.type" :value="item.values[n]" v-model="item.select">
              <label style="height: 23px; color: #01B8BE;">{{i}}</label>
            </div>
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
          <v-list-item-content>
            <v-list-item-title class="sections-title">Բաժիններ</v-list-item-title>
            <div class="section-block" style="display: flex; align-items: center;">
              <img src="http://back.kiddok.am/images/Kiddok_logo_04-1.png" width="60px">
              <nuxt-link :to="`/brand/2?page=1`">
                <span>Բրենդ</span>
              </nuxt-link>
            </div>
            <div v-for="(item, i) in categoriesBlock" :key="i">
              <div v-if="parentCategoryID !== item.id">
                <div class="section-block">
                  <nuxt-link :to="item.to">
                    {{item.title}}
                  </nuxt-link>
                </div>
              </div>
              <div v-else>
                <div class="section-block">
                  <nuxt-link :to="`#`">
                    {{item.title}}
                  </nuxt-link>
                  <v-icon v-text="'mdi-chevron-down'" size="30" style="color: #B22180; cursor: pointer;" @click="openAgeMenu"></v-icon>
                </div>
                <div class="age-menu-block2" style="display: none;">
                  <div v-for="(item, i) in subcategoriesBlock" :key="i">
                    <div class="section-block">
                      <nuxt-link :to="item.to">
                        {{item.title}}
                      </nuxt-link>
                    </div>
                  </div>
                </div>
              </div>
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

          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
<script>
import BestProducts from './BestProducts.vue';
import bestProductCard from "./bestProductCard";

  export default {
    // brand[0]
    props: ['filter_type'],
    head() {
      return {
        // title: this.brand[0].name,
        // meta: [
        //   { hid: this.brand[0].name, name: this.brand[0].name, content: this.brand[0].name }
        // ],
      };
    },
    components: {
      BestProducts,
      bestProductCard
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
          { title: "ՍԵՌ", icon: 'mdi-home-city', data: ['Տղա', 'Աղջիկ'], values: ['men', 'women'], select: [], type: 'sex' },
          { title: "ՏԱՐԻՔ", icon: 'mdi-account', data: ['0-12 ամսական', '12-24 ամսական', '2-5 տարեկան', '5-8 տարեկան', '8-12 տարեկան', '12-16 տարեկան'], values: ['0-12 months', '12-24 months', '2-5 years old', '5-8 years old', '8-12 years old', '12-16 years old'], select: [], type: 'age'},
          { title: "", icon: 'mdi-home-city', data: ['ԶԵՂՉ'], values: ['sale'], select: [], type: 'sale' },
        ],
        select: [],
        mini: false,
        categoriesBlock: [],
        subcategoriesBlock: [],
        parentCategoryID: 0,
        rating: {},
        ratingCount: 0
      }
    },
    async mounted() {
      let stars = document.querySelectorAll('.best-product-rating .v-rating button');
      for(let i = 0; i < stars.length; i++) {
        stars[i].style.padding = "0";
        stars[i].disabled = true;
      }

      if(this.filter_type === "brand") {
        this.min = this.filters.minPrice == null ? 0 : this.filters.minPrice;
        this.max = this.filters.maxPrice == null ? 0 : this.filters.maxPrice;
        this.range = [this.min, this.max];
      } else {
        let categoryFilters = await this.$axios.$get(this.$axios.defaults.baseURL+'/product/getCategoryFilters/'+this.$route.params.id);

        this.min = categoryFilters.minPrice == null ? 0 : categoryFilters.minPrice;
        this.max = categoryFilters.maxPrice == null ? 0 : categoryFilters.maxPrice;
        this.range = [this.min, this.max];
      }

      let all_categories = await this.$axios.$get(this.$axios.defaults.baseURL+'/category/get');

      all_categories.forEach(elem => {
        if(elem.parent === 0) {
          this.categoriesBlock.push({
            id: elem.id,
            title: elem.name_am,
            parentID: elem.parent,
            to: '/category/' + elem.id + '?page=1'
          });
        } else {
          this.subcategoriesBlock.push({
            id: elem.id,
            title: elem.name_am,
            parentID: elem.parent,
            to: '/category/' + elem.id + '?page=1'
          });
          this.parentCategoryID = elem.parent;
        }
      });

      // console.log(this.brand);
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

      if(window.matchMedia('(max-width: 767px)').matches){
        this.drawer = false;
      }
      document.querySelector('.product_filter .v-navigation-drawer__border').style.display = "none";
    },
    methods: {
      filter(e) {
        // console.log(e);
        if(e[0] !== undefined && e[1] !== undefined) {
          document.querySelector('input.text-input[name="min"]').value = e[0];
          document.querySelector('input.text-input[name="max"]').value = e[1];
        }
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
        // console.log(this.items);
        // console.log(this.range);
        if(this.filter_type === "brand") {
          this.$store.dispatch('products/Filter', [this.items, this.range, this.$route.params.id]).then(r => {
            // this.$router.push('/dashboard/categories')
          })
        } else {
          this.$store.dispatch('products/FilterByCategory', [this.items, this.range, this.$route.params.id]).then(r => {
            // this.$router.push('/dashboard/categories')
          })
        }
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
      },
      addToCart(e, id) {
        console.log(e);
        let user_id = 0;
        if(this.user){
          user_id = this.user.id
        }
        this.$store.dispatch('wishListAndCart/setCArt', [id, user_id])
      }
    },
    computed: {
      brand() {
        return this.$store.getters['brands/brand'];
      },
      filters() {
        return this.$store.getters['brands/brandFilters'];
      },
      category_filters() {
        return this.$store.getters['products/brandFilters'];
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
      width: 56px !important;
      height: 56px !important;
      color: #ffffff !important;
      border: 1px solid #B22180;
      background-color: #B22180;
    }
  /*}*/

  @media (min-width: 767px) and (max-width: 1266px) {
    nav.product_filter {
      width: 50% !important;
    }
  }

  @media (min-width: 1266px) {
    nav.product_filter {
      position: relative !important;
      height: max-content !important;
      width: 85% !important;
      top: 0 !important;
      transform: none !important;
      max-height: none !important;
    }
  }
  @media (max-width: 767px) {
    nav.product_filter {
      width: 85% !important;
    }
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
    /* display: none; */
    border-left: 1px solid rgba(0, 0, 0, 0.12);
    padding-left: 15px;
    margin: 20px 0 25px 30px !important;
  }
</style>
