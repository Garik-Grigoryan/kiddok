<template>
  <v-hover v-slot:default="{ hover }">
  <v-card
    color="grey lighten-4"
    class="ma-4"
    width="250"
    height="450"
    style="margin: 16px 10px !important; border-color: transparent !important; background-color: transparent !important; box-shadow: none;"
  >
    <nuxt-link :to="localePath(`/product/${id}`)">
      <v-img
        :aspect-ratio="16/9"
        :src="image"
        position="top"
        cover
        height="270px"
      >
      </v-img>
    </nuxt-link>
    <v-slide-y-reverse-transition>
      <v-card-text
        class="pt-6"
        style="position: relative; height: 80px; padding: 0;"
      >
        <!-- <v-btn
          absolute
          color="#01235e"
          class="white--text"
          fab
          right
          top
          @click="addToCart($event, id)"
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
        <v-btn
          absolute
          color="#01235e"
          class="white--text"
          fab
          top
          style="right: 90px"
          @click="addToWishlist($event, id)"
        >
          <v-icon>mdi-heart</v-icon>
        </v-btn> -->
        <nuxt-link :to="localePath(`/product/${id}`)">
          <h3 class="font-weight-light font-weight-bold white--text mb-2" v-text="title_am" style="color: #352249 !important; font-weight: 100 !important; font-size: 15px; margin-bottom: 8px !important;"></h3>
          <div style="display: flex; justify-content: center;">
            <div style="display: flex; align-items: center;">
              <v-icon v-text="'mdi-star-outline'" size="25"></v-icon>
              <v-icon v-text="'mdi-star-outline'" size="25"></v-icon>
              <v-icon v-text="'mdi-star-outline'" size="25"></v-icon>
              <v-icon v-text="'mdi-star-outline'" size="25"></v-icon>
              <v-icon v-text="'mdi-star-outline'" size="25"></v-icon>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: baseline;">
            <p class="price" style="color: #352249; font-size: 15px;">
              <span>{{price}} դրամ</span>
            </p>
            <v-btn @click="addToCart($event, id)" color="#000" text class="my-2 nav_button" width="40px" style="justify-content: flex-end; padding: 0;">
              <v-icon >mdi-cart-outline</v-icon>
            </v-btn>
          </div>
          <!-- <h3 v-if="$i18n.locale === 'am'" class=" font-weight-light font-weight-bold white--text mb-2">{{title_am}}</h3>
          <h3 v-if="$i18n.locale === 'en'" class=" font-weight-light font-weight-bold white--text mb-2">{{title_en}}</h3>
          <h3 v-if="$i18n.locale === 'ru'" class=" font-weight-light font-weight-bold white--text mb-2">{{title_ru}}</h3>
          <p class="price white--text">
            <span class="font-weight-bold">{{ $t('price') }}</span>
            <span v-if="discountType == 'percent'"><span class="discount">{{price}}</span> {{price - (price * discount)/100}}</span>
            <span v-else-if="discountType == 'price'">{{price - discount}}</span>
            <span v-else>{{price}}</span>
            AMD
          </p> -->
        </nuxt-link>
      </v-card-text>
    </v-slide-y-reverse-transition>
  </v-card>
  </v-hover>
</template>

<script>
    export default {
      props: ['image', 'id', 'title_en', 'title_ru', 'title_am', 'price', 'discountType', 'discount'],
      name: "productCard",
      methods: {
        addToWishlist(e, id) {
          this.$store.dispatch('wishListAndCart/setWishList', [id])
        },
        addToCart(e, id) {
          let user_id = 0;
          if(this.user){
            user_id = this.user.id
          }
          this.$store.dispatch('wishListAndCart/setCArt', [id, user_id])
        }
      }
    }
</script>


<style scoped>

.discount{
  opacity: 0.8;
  text-decoration: line-through;
  color: #dbdbdb;
}
</style>

