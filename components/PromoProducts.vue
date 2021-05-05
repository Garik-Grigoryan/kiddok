<template>
  <v-sheet
    class="mx-auto"
    max-width="120%"
  >
    <v-slide-group
      v-model="model"
      class="pa-4 new_products_block"
      center-active
      :show-arrows="false"
      style="display: none;"
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
            width="270"
            height="350"
            style="border-color: transparent !important; background-color: transparent !important; box-shadow: none;"
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
                style="position: relative; height: 80px; text-align: center;"
              >
                <nuxt-link :to="`/product/${product.id}`">
                  <h3 v-if="$i18n.locale === 'am'" class=" font-weight-light font-weight-bold white--text mb-2" v-text="product.name_am" style="color: #352249 !important; font-weight: 100 !important;"></h3>
                  <h3 v-if="$i18n.locale === 'en'" class=" font-weight-light font-weight-bold white--text mb-2" v-text="product.name_en" style="color: #352249 !important; font-weight: 100 !important;"></h3>
                  <h3 v-if="$i18n.locale === 'ru'" class=" font-weight-light font-weight-bold white--text mb-2" v-text="product.name_ru" style="color: #352249 !important; font-weight: 100 !important;"></h3>
                  <v-btn style="background: #B22180; padding: 12px; text-align: center; border-radius: 16px; color: white; width: 200px; text-transform: none;">Գնել հիմա</v-btn>
                </nuxt-link>
              </v-card-text>
            </v-slide-y-reverse-transition>
          </v-card>

        </v-hover>
      </v-slide-item>
    </v-slide-group>

    <v-slide-group
      v-model="model"
      class="pa-4 sales_products_block"
      center-active
      :show-arrows="false"
      style="display: none;"
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
            width="270"
            height="350"
            style="border-color: transparent !important; background-color: transparent !important; box-shadow: none;"
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
                style="position: relative; height: 80px; text-align: center;"
              >
                <nuxt-link :to="`/product/${product.id}`">
                  <h3 v-if="$i18n.locale === 'am'" class=" font-weight-light font-weight-bold white--text mb-2" v-text="product.name_am" style="color: #352249 !important; font-weight: 100 !important;"></h3>
                  <h3 v-if="$i18n.locale === 'en'" class=" font-weight-light font-weight-bold white--text mb-2" v-text="product.name_en" style="color: #352249 !important; font-weight: 100 !important;"></h3>
                  <h3 v-if="$i18n.locale === 'ru'" class=" font-weight-light font-weight-bold white--text mb-2" v-text="product.name_ru" style="color: #352249 !important; font-weight: 100 !important;"></h3>
                  <v-btn style="background: #B22180; padding: 12px; text-align: center; border-radius: 16px; color: white; width: 200px; text-transform: none;">Գնել հիմա</v-btn>
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
    name: 'promoProductComponent',
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
        if(this.type === 'new'){
          return this.$store.getters['products/newProducts'];
        } else if(this.type === 'best'){
          return this.$store.getters['products/bestProducts'];
        } else if(this.type === 'sales'){
          return this.$store.getters['products/salesProducts'];
        }
      }
    },
    mounted() {
      // console.log(this.products);
      if(this.type === 'new'){
        document.querySelector('.new_products_block').style.display = "block";
        document.querySelector('.sales_products_block').style.display = "none";
      } else if(this.type === 'sales'){
        document.querySelector('.new_products_block').style.display = "none";
        document.querySelector('.sales_products_block').style.display = "block";
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
