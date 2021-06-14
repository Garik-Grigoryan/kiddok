<template>
  <v-slide-item
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
        <nuxt-link :to="localePath(`/product/${id}`)">
          <v-img
            :aspect-ratio="16/9"
            :src="image"
            height="270px"
            style="border-radius: 50%;"
            cover
          >
          </v-img>
        </nuxt-link>
        <v-slide-y-reverse-transition>
          <v-card-text
            class="pt-6"
            style="position: relative; height: 80px;"
          >
            <div style="display: flex; justify-content: space-between; margin-bottom: 16px;">
              <div class="best-product-rating" style="display: flex; align-items: center;">
                <v-rating
                  empty-icon="mdi-star-outline"
                  full-icon="mdi-star"
                  half-icon="mdi-star-half-full"
                  hover
                  length="5"
                  size="20"
                  half-increments
                  v-model="rating"
                  background-color="grey lighten-1"
                  color="orange"
                ></v-rating>
                <div style="color: rgb(112, 112, 112); font-weight: 500; font-size: 14px; margin-left: 8px;"> ({{ratingCount}})</div>
              </div>
              <v-btn style="background: #B22180; padding: 6px 15px; border-radius: 16px; color: white; text-transform: none;"><v-icon color="white" style="margin-right: 5px;">mdi-bullhorn</v-icon> NEW</v-btn>
            </div>
            <h3 class="font-weight-light font-weight-bold white--text mb-2" v-text="title_am" style="color: #352249 !important; font-weight: 100 !important; font-size: 15px; margin-bottom: 8px !important;"></h3>
            <div style="display: flex; justify-content: space-between; align-items: baseline;">
              <p class="price" style="color: #352249; font-size: 15px;">
                <span>{{price}} դրամ</span>
              </p>
              <v-btn @click="addToCart($event, id)" color="#000" text class="my-2 nav_button" width="40px" style="justify-content: flex-end; padding: 0;">
                <v-icon >mdi-cart-outline</v-icon>
              </v-btn>
            </div>
          </v-card-text>
        </v-slide-y-reverse-transition>
      </v-card>
    </v-hover>
  </v-slide-item>
</template>

<script>
    export default {
      props: ['image', 'id', 'title_en', 'title_ru', 'title_am', 'price', 'discountType', 'discount'],
      name: "bestProductCard",
      data: () => ({
        rating: 0,
        ratingCount: 0
      }),
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
      },
      async mounted() {
        let stars = document.querySelectorAll('.best-product-rating .v-rating button');
        for(let i = 0; i < stars.length; i++) {
          stars[i].style.padding = "0";
          stars[i].disabled = true;
        }
        await this.$axios.get(this.$axios.defaults.baseURL+'/rating/get/'+this.id).then(response => {
          let rating_count = 0;
          let rating_val = 0;
          response.data.forEach(elem => {
            rating_count++;
            rating_val += elem.rating;
          });
          this.rating = rating_val/rating_count;
          this.ratingCount = rating_count;
        }).catch(e => {});
      }
    }
</script>


<style scoped>
</style>

