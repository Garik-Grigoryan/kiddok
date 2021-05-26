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
            style="margin: 16px 10px !important; border-color: transparent !important; background-color: transparent !important; box-shadow: none;"
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
                    <v-btn style="background: #B22180; padding: 6px 15px; border-radius: 16px; color: white; text-transform: none;"><v-icon color="white" style="margin-right: 5px;">mdi-bullhorn</v-icon> NEW</v-btn>
                  </div>
                  <!-- <h3 v-if="$i18n.locale === 'am'" class="font-weight-light font-weight-bold white--text mb-2" v-text="product.name_am" style="color: #352249 !important; font-weight: 100 !important; font-size: 18px; margin-bottom: 16px !important;"></h3>
                  <h3 v-if="$i18n.locale === 'en'" class="font-weight-light font-weight-bold white--text mb-2" v-text="product.name_en" style="color: #352249 !important; font-weight: 100 !important; font-size: 18px; margin-bottom: 16px !important;"></h3>
                  <h3 v-if="$i18n.locale === 'ru'" class="font-weight-light font-weight-bold white--text mb-2" v-text="product.name_ru" style="color: #352249 !important; font-weight: 100 !important; font-size: 18px; margin-bottom: 16px !important;"></h3> -->
                  <h3 class="font-weight-light font-weight-bold white--text mb-2" v-text="product.name_am" style="color: #352249 !important; font-weight: 100 !important; font-size: 15px; margin-bottom: 8px !important;"></h3>
                  <div style="display: flex; justify-content: space-between; align-items: baseline;">
                    <p class="price" style="color: #352249; font-size: 15px;">
                      <span>{{product.price}} դրամ</span>
                    </p>
                    <v-btn @click="addToCart($event, product.id)" color="#000" text class="my-2 nav_button" width="40px" style="justify-content: flex-end; padding: 0;">
                      <v-icon >mdi-cart-outline</v-icon>
                    </v-btn>
                  </div>
                </nuxt-link>
              </v-card-text>
            </v-slide-y-reverse-transition>
          </v-card>

        </v-hover>
      </v-slide-item>
    </v-slide-group>

  </v-sheet>
</template>

<script>
  export default {
    props: ['count', 'type'],
    name: 'bestProductComponent',
    data: () => ({
      model: null,
    }),
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
      // console.log(this.products);
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
