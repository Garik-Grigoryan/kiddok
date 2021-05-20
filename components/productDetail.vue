<template>
  <div>
    <!-- <h2 v-if="$i18n.locale === 'am'">{{product.name_am}}</h2>
    <h2 v-if="$i18n.locale === 'en'">{{product.name_en}}</h2>
    <h2 v-if="$i18n.locale === 'ru'">{{product.name_ru}}</h2> -->
    <h2 style="font-weight: 300; margin-bottom: 40px; margin-top: 40px; text-transform: uppercase;">{{product.name_ru}}</h2>

    <v-row>
      <v-col md="2" sm="12" class="product-images-slider">
        <v-carousel :continuous="false" :cycle="false" :vertical="true" hide-delimiter-background delimiter-icon="mdi-minus" height="100%">
          <!-- <v-carousel-item v-for="(slide, i) in JSON.parse(product.images)" :key="i" :src="slide" top></v-carousel-item> -->
          <v-carousel-item v-for="(slide, i) in imagesCount" :key="i" style="margin-top: 60px;">
            <v-card
              v-for="(slide2, j) in JSON.parse(product.images)"
              :key="j"
              style="background: transparent; width: 70%; box-shadow: none; margin-bottom: 20px;"
            >
              <v-img v-if="i = 1 && j <= 2"
                :src="JSON.parse(product.images)[j]"
                height="100%"
                style="border-radius: 50%; transform: scale(-1, 1); cursor: pointer; opacity: 0.5;"
                cover
                :class="'productImage_'+j"
                @click="showImage(JSON.parse(product.images)[j], 'productImage_'+j)"
              >
              </v-img>
            </v-card>
          </v-carousel-item>
        </v-carousel>

      </v-col>
      <v-col md="5" sm="12" class="product-image">
        <v-img
          :src="JSON.parse(product.images)[0]"
          height="100%"
          style="width: 100%"
          cover
        >
        </v-img>
      </v-col>
      <v-col md="4" sm="12" class="about-product-block">
        <v-col md="12" lg="12">
          <div class="pl-0">
            <p class="mb-5 product-price">
              <span>{{product.price}}</span> դրամ
            </p>
          </div>
          <div class="mt-5">
            <span>Ապրանքի կոդը՝ M8-151</span>
          </div>
          <div class="mt-5 pl-0" style="display: flex; align-items: center;">
            <p class="mr-5" style="margin-bottom: 0;"><span>{{ $t('count') }}</span></p>
            <div class="product-count">
                <div class="minus" @click="countMinus()"><v-icon :color="black" left style="margin-left: 10px;">mdi-minus-thick</v-icon></div>
                <input id="product-count-val" placeholder="0" type="text" v-model="count" disabled>
                <div class="plus" @click="countPlus()"><v-icon :color="black" left style="margin-left: 10px;">mdi-plus</v-icon></div>
            </div>
            <!-- <v-col cols="2" class="pa-0">
              <v-text-field type="number" placeholder="0" v-model="count" style="padding-top: 0;"/>
            </v-col> -->
          </div>
          <div class="mt-0">
            <div style="display: flex; align-items: baseline;">
              <div style="margin-right: 20px;"><span>Գնահատել՝</span></div>
              <div style="display: flex; align-items: center;">
                <v-icon v-text="'mdi-star-outline'" size="30"></v-icon>
                <v-icon v-text="'mdi-star-outline'" size="30"></v-icon>
                <v-icon v-text="'mdi-star-outline'" size="30"></v-icon>
                <v-icon v-text="'mdi-star-outline'" size="30"></v-icon>
                <v-icon v-text="'mdi-star-outline'" size="30"></v-icon>
              </div>
            </div>
          </div>
          <div class="mt-5">
            <p class="ma-0"><span>{{ $t('size') }}</span></p>
            <v-item-group :multiple="false" >
              <v-row>
                <v-item  v-for="(size, n) in productSizes" :key="n" v-slot:default="{ active, toggle }">
                  <v-card class="d-flex text-center align-center mx-3 justify-center" :color="active? 'green' : '#fff'" height="30" width="30" :data-value="size" @click="toggle(), selectSize($event)">
                    {{size}}
                  </v-card>
                </v-item>
              </v-row>
            </v-item-group>
          </div>
          <div class="mt-5 product-availability">
            <div>
              Առկա է
            </div>
          </div>
          <div class="mt-5">
            <p class="ma-0"><span>{{ $t('colors') }}</span></p>
            <v-item-group :multiple="false">
              <v-row>
                <v-item  v-for="(color, n) in productColors" :key="n" v-slot:default="{ active, toggle }">
                  <v-card :color="color.toLowerCase()" class="d-flex text-center align-center mx-3" dark height="30" width="30" :data-value="color.toLowerCase()" @click="toggle(), selectColor($event)">
                    <v-scroll-y-transition>
                      <v-icon v-if="active" color="white" size="20" v-text="'mdi-check-circle-outline'" class="mx-auto" :data-value="color.toLowerCase()" />
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-row>
            </v-item-group>
          </div>
          
          <!-- <div class="pl-0">
            <p class="ma-0">
              <span class="font-weight-bold">{{ $t('price') }}</span>
              <span v-if="product.discountType == 'percent'"><span class="discount">{{product.price}}</span> {{product.price - (product.price * product.discount)/100}}</span>
              <span v-else-if="product.discountType == 'price'">{{product.price - product.discount}}</span>
              <span v-else>{{product.price}}</span>
              AMD
            </p>
          </div> -->
          <div class="mt-5 pl-0">
            <div class="text-left">
              <v-btn class="white--text add-to-cart-btn" rounded @click="addToCart($event, product.id)" >
                Ավելացնել զամբյուղ <v-icon left style="margin-left: 10px;">mdi-cart</v-icon>
              </v-btn>
              <!-- <v-btn color="#01235e" class="white--text" rounded @click="addToWishlist($event, product.id)" >
                <v-icon left>mdi-heart</v-icon> {{ $t('wishList') }}
              </v-btn> -->
            </div>
          </div>
        </v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-col md="2" sm="12"></v-col>
      <v-col md="9" sm="12" class="product-description">
        <span>Նկարագրություն</span>
        <p id="productDescription"></p>
      </v-col>
    </v-row>

    <div id="addToCartModal" style="display: none;" class="modal-shadow" @click.self="closeModal">
        <div class="modal">
            <!-- <div class="modal-close" @click="closeModal">&#10006;</div> -->
            <slot name="title">
                <h3 class="modal-title">Ապրանքը հաջողությամբ ավելացված է զամբյուղի մեջ</h3>
            </slot>
            <slot name="body">
                <div class="modal-content">
                    <v-img
                      :src="JSON.parse(product.images)[0]"
                      height="180px"
                      style="width: 180px; margin-right: 20px;"
                      cover
                    >
                    </v-img>
                    <div style="display: flex; justify-content: space-between; width: 100%;">
                      <div>
                        <span>{{product.name_am}}</span>
                      </div>
                      <div>
                        <span class="modal-count-val"></span>
                      </div>
                      <div>
                        <span class="modal-price-val"></span>
                      </div>
                    </div>
                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-footer__button_continue" @click="closeModal">
                        Շարունակել գնումներ կատարել
                    </button>
                    <button class="modal-footer__button_cart" @click="goToCart">
                        Գնալ զամբյուղ
                    </button>
                </div>
            </slot>
        </div>
    </div>
  </div>
</template>
<script>

  export default {
    async fetch({route, store}) {
      await store.dispatch('brands/fetch');
      await store.dispatch('menus/fetch');
      await store.dispatch('products/filterAsType', ['best']);
      await store.dispatch('products/getProduct', [route.params.name]);
    },
    head() {
      return {
        title: this.product.name_am,
        meta: [
          { hid: 'Davmar - ' + this.product.name_am, name: 'Davmar ' + this.product.name_am, content: 'Davmar ' + this.product.description_am.replace(/<[^>]*>?/gm, '') },
          {
            hid: "og:image",
            property: "og:image",
            content: JSON.parse(this.product.images)[0],
          },
          {
            hid: "description",
            name: "description",
            content: this.product.description_am.replace(/<[^>]*>?/gm, ''),
          },

        ],
      };
    },
    data () {
      return {
        productColors: [],
        productSizes: [],
        selectedColor: '',
        selectedSize: '',
        cycle: false,
        count: 1,
        imagesCount: 1,
        show: false
      }
    },
    mounted() {
      this.imagesCount = Math.ceil(JSON.parse(this.product.images).length/3);
      window.onload = function() {
        document.querySelector('.productImage_0').style.opacity = '1';
      }
      this.product.product_color.forEach(elem => {
        this.productColors.push(elem.color)
      });
      this.product.product_size.forEach(elem => {
        this.productSizes.push(elem.name)
      });
      if(this.$i18n.locale === 'am'){
        document.getElementById('productDescription').innerHTML = this.product.description_am
      } else if(this.$i18n.locale === 'en'){
        document.getElementById('productDescription').innerHTML = this.product.description_en
      } else if(this.$i18n.locale === 'ru'){
        document.getElementById('productDescription').innerHTML = this.product.description_ru
      }
    },
    methods: {
      addToWishlist(e, id) {
        let user_id = 0;
        if(this.user){
          user_id = this.user.id
        }
        this.$store.dispatch('wishListAndCart/setWishList', [id, user_id, this.selectedColor, this.selectedSize, this.count])
      },
      addToCart(e, id) {
        let user_id = 0;
        if(this.user){
          user_id = this.user.id
        }
        this.$store.dispatch('wishListAndCart/setCArt', [id, user_id, this.selectedColor, this.selectedSize, this.count])
        this.show = true;
        document.querySelector('.modal-count-val').innerText = "x " + document.getElementById('product-count-val').value;
        document.querySelector('.modal-price-val').innerText = parseInt(document.getElementById('product-count-val').value)*parseInt(document.querySelector('.product-price span').innerText) + 'դրամ';
        document.getElementById('addToCartModal').style.display = 'block';
      },
      selectColor(e) {
        if(e.target !== undefined){
          if(e.target.tagName === 'DIV' || e.target.tagName === 'I'){
            if(e.target.tagName === 'I'){
              this.selectedColor = ''
              // this.$delete(this.selectedColor, this.selectedColor.indexOf(e.target.getAttribute('data-value')));
            }else{
              this.selectedColor = e.target.getAttribute('data-value');
            }
          }
        }
      },
      selectSize(e) {
        if(e.target !== undefined){
          if(e.target.getAttribute('data-active') === 'active'){
            // this.$delete(this.selectedSize, this.selectedSize.indexOf(e.target.getAttribute('data-value')));
          }else{
            this.selectedSize = e.target.getAttribute('data-value');
          }
        }
      },
      showImage(img, cl) {
        let all_images = document.querySelectorAll('[class*="productImage_"]');
        for(let i = 0; i < all_images.length; i++) {
          all_images[i].style.opacity = 0.5;
        }
        document.querySelector("."+cl).style.opacity = 1;
        document.querySelector('.product-image .v-image__image').style.backgroundImage = 'url("'+img+'")';
      },
      closeModal: function () {
        this.show = false;
        document.getElementById('addToCartModal').style.display = 'none';
      },
      goToCart() {
        window.location.href = '/cart';
      },
      countMinus() {
        let old_val = parseInt(document.getElementById('product-count-val').value);
        if(old_val >= 1) {
          document.getElementById('product-count-val').value = old_val - 1;
        }
      },
      countPlus() {
        document.getElementById('product-count-val').value = parseInt(document.getElementById('product-count-val').value) + 1;
      }
    },
    computed: {
      product() {
        return this.$store.getters['products/product'];
      }
    },
  }
</script>


<style scoped>
  .discount{
    opacity: 0.8;
    text-decoration: line-through;
    color:#888888;
  }

  .product-price {
    background: #E8E7DF;
    padding: 10px 20px;
    color: #B22180;
    border-radius: 6px;
    width: max-content;
  }

  .about-product-block span {
    color: #B22180;
  }
  
  .product-availability, .add-to-cart-btn {
    background: #B22180 !important;
    color: white !important;
    padding: 5px 20px !important;
    width: max-content !important;
    border-radius: 6px !important;
  }

  .product-description {
    margin-top: 40px;
  }

  .product-description span {
    color: #352249;
    margin-bottom: 20px;
    font-size: 18px;
  }

  .product-description p {
    color: #707070;
    margin-top: 20px;
  }

  .product-count {
    display: flex;
    justify-content: space-between;
    width: 100px;
  }

  .product-count input {
    outline: none;
    width: inherit;
    text-align: center;
    max-width: inherit;
  }

  .product-count .minus, .product-count .plus {
    background: #C6C3C3;
    border-radius: 50%;
    padding: 5px 0;
    cursor: pointer;
  }

  .product-count .minus i, .product-count .plus i {
    color: black;
    font-size: 16px;
  }
</style>

<style scoped
       lang="scss">
    .modal-shadow {
        position: absolute;
        top: 0;
        left: 0;
        min-height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.39);
    }
 
    .modal {
        background: #EBE7E7;
        border-radius: 0;
        /* padding: 15px; */
        min-width: 700px;
        max-width: 700px;
        position: absolute;
        top: 25%;
        left: 50%;
        transform: translate(-50%, -50%);
 
        &-close {
            border-radius: 50%;
            color: #fff;
            background: #2a4cc7;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 7px;
            right: 7px;
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
 
        &-title {
            color: white;
            background: #B22180;
            padding: 10px 30px;
            font-weight: 300;
            font-size: 16px;
        }
 
        &-content {
            padding: 30px;
            padding-bottom: 0;
            display: flex;
            align-items: center;
            width: 100%;
        }
 
        &-footer {
            &__button_cart {
                background-color: #B22180;
                color: #fff;
                border: none;
                text-align: center;
                padding: 10px 35px;
                font-size: 16px;
                font-weight: 500;
                border-radius: 8px;
                min-width: 150px;
            }
            &__button_continue {
                background-color: #C6C3C3;
                color: #352249;
                border: none;
                text-align: center;
                padding: 10px 35px;
                font-size: 16px;
                font-weight: 500;
                border-radius: 8px;
                min-width: 150px;
            }
            padding: 30px;
            display: flex;
            justify-content: space-between;
        }
    }
</style>
