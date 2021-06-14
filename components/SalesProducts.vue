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
                <!-- <nuxt-link :to="`/product/${product.id}`"> -->
                  <h3 v-if="$i18n.locale === 'am'" class="font-weight-light font-weight-bold white--text mb-2" v-text="product.name_am" style="color: #352249 !important; font-weight: 100 !important; font-size: 18px; margin-bottom: 16px !important;"></h3>
                  <h3 v-if="$i18n.locale === 'en'" class="font-weight-light font-weight-bold white--text mb-2" v-text="product.name_en" style="color: #352249 !important; font-weight: 100 !important; font-size: 18px; margin-bottom: 16px !important;"></h3>
                  <h3 v-if="$i18n.locale === 'ru'" class="font-weight-light font-weight-bold white--text mb-2" v-text="product.name_ru" style="color: #352249 !important; font-weight: 100 !important; font-size: 18px; margin-bottom: 16px !important;"></h3>
                  <p class="price" style="color: #352249;">Կոդ {{product.code}}</p>
                  <p class="price" style="color: #352249;">
                    <span>Գին</span>
                    <span v-if="product.discountType == 'percent'"><span class="discount">{{product.price}}</span> {{product.price - (product.price * product.discount)/100}} դրամ</span>
                    <span v-else-if="product.discountType == 'price'">{{product.price - product.discount}} դրամ</span>
                    <span v-else>{{product.price}} դրամ</span>
                    <!-- <span>{{product.price}} դրամ</span> -->
                  </p>
                  <div style="display: flex; justify-content: space-between;">
                    <v-btn style="background: #B22180; padding: 12px; border-radius: 16px; color: white; width: 130px; text-transform: none;" @click="openBuyNowModal(product.id)">Գնել հիմա</v-btn>
                    <v-btn @click="addToCart($event, product.id)" color="#000" text class="my-2 nav_button" width="40px" style="justify-content: flex-end; padding: 0;">
                      <v-icon >mdi-cart-outline</v-icon>
                    </v-btn>
                  </div>
                <!-- </nuxt-link> -->
              </v-card-text>
            </v-slide-y-reverse-transition>
          </v-card>

        </v-hover>
      </v-slide-item>
    </v-slide-group>

    <div id="buyNowSalesModal" style="display: none;" class="modal-shadow" @click.self="closeModal">
        <div class="modal">
            <slot name="body">
                <div class="modal-content">
                  <div style="padding: 15px 30px; text-align: center;">
                    <h2 style="color: #B22180;">Գնել հիմա</h2>
                  </div>
                  <v-card style="box-shadow: none;">
                    <v-form>
                      <v-alert v-if="cartError" text type="error">
                        {{cartError}}
                      </v-alert>
                      <div class="step2_block">
                          <div style="margin-bottom: 15px;">
                            <select class="country-select" value="Երկիր" v-model="country">
                              <option selected>Երկիր</option>
                              <option>Armenia</option>
                            </select>
                          </div>
                      </div>
                      <div class="step2_block">
                          <div style="margin-bottom: 10px;"><span>Ամբողջական անուն *</span></div>
                          <div style="margin-bottom: 15px;">
                            <input class="step2_input" v-model="nameLastName" :rules="requiredField" type="text" name="name" required>
                          </div>
                      </div>
                      <div class="step2_block">
                          <div style="margin-bottom: 10px;"><span>Էլ. հասցե *</span></div>
                          <div style="margin-bottom: 15px;">
                            <input class="step2_input"  v-model="email" :rules="emailRules" type="email" name="email" required>
                          </div>
                      </div>
                      <div class="step2_block">
                          <div style="margin-bottom: 10px;"><span>Հասցե *</span></div>
                          <div style="margin-bottom: 15px;">
                            <input class="step2_input" v-model="address" :rules="addressRules" type="text" name="address" placeholder="Փողոց /համար..." required>
                          </div>
                      </div>
                      <div class="step2_block">
                          <div style="margin-bottom: 10px;"></div>
                          <div>
                            <input class="step2_input"  v-model="apartment" type="text" name="apartment" placeholder="Բնակարան,նրբանցք, թաղամաս, շենք, հարկ եւ այլն:" required>
                          </div>
                      </div>
                      <div class="step2_block">
                          <div style="margin-bottom: 10px;"><span>Քաղաք *</span></div>
                          <div style="margin-bottom: 15px;">
                            <input class="step2_input" v-model="city" :rules="requiredField" type="text" name="city" required>
                          </div>
                      </div>
                      <div class="step2_block">
                          <div style="margin-bottom: 10px;"><span>Քաղաք / Մարզ / Տարածաշրջան *</span></div>
                          <div style="margin-bottom: 15px;">
                            <input class="step2_input" :label="$t('region')" v-model="selected_region" type="text" name="region" required>
                          </div>
                      </div>
                      <div class="step2_block">
                          <div style="margin-bottom: 10px;"><span>Փոստային Ինդեքս *</span></div>
                          <div style="margin-bottom: 15px;">
                            <input class="step2_input"  v-model="zip" :rules="requiredField" type="text" name="zip" required>
                          </div>
                      </div>
                      <div class="step2_block">
                          <div style="margin-bottom: 10px;"><span>Հեռ. *</span></div>
                          <div style="margin-bottom: 15px;">
                            <input class="step2_input"  v-model="phone" :rules="phoneRules" type="text" name="phone" required>
                          </div>
                      </div>

                      <div class="step2_block">
                        <span style="text-transform: uppercase; font-weight: 700;">Վճարման տարբերակ</span>
                        <v-divider style="margin: 5px 0 0 0;"></v-divider>
                      </div>
                      <div class="step2_block">
                          <div class="radio-input">
                            <input type="radio" name="payment" value="cash" v-model="payment">
                            <label>Կանխիկ</label>
                          </div>
                      </div>

                      <div class="step2_block">
                        <span style="text-transform: uppercase; font-weight: 700;">ԱՌԱՔՈՒՄ</span>
                        <v-divider style="margin: 5px 0 0 0;"></v-divider>
                      </div>
                      <div class="step2_block delivery-block">
                          <div class="radio-input" @click="chooseDelivery($event)">
                            <span>Անվճար առաքում Երևանում, 10000դր. և ավելի գնման դեպքում</span>
                          </div>
                          <div class="radio-input" @click="chooseDelivery($event)">
                            <span>500 դր առաքում Երևանում, մինչև 10000դր. գնման դեպքում</span>
                          </div>
                          <div class="radio-input" @click="chooseDelivery($event)">
                            <span>1000դր. շտապ առաքում, Երևանում *Շտապ առաքում իրագործելի է մինչ ժամը 20:00 կատարած պատվերների համար:</span>
                          </div>
                          <div class="radio-input" @click="chooseDelivery($event)">
                            <span>1500դր առաքում ՀՀ մարզեր</span>
                          </div>
                          <div class="radio-input" @click="chooseDelivery($event)">
                            <span>Առաքում ՀԱՅՓՈՍՏԻ միջոցով անվճար</span>
                          </div>
                      </div>
                      <div class="step2_block">
                        <label>Լրացուցիչ նշումներ. Ցանկալի է նշել 2 -րդ հեռ.</label>
                        <textarea v-model="more_info"></textarea>
                      </div>

                      <div style="display: flex; justify-content: flex-end; padding: 30px;">
                        <span>Ընդհանուր գումար {{totalPrice}} դր</span>
                      </div>

                      <div style="margin: 0; display: flex; justify-content: center;">
                        <a class="modal-footer__button_approve" @click="buy" href="#">
                          Հաստատել
                        </a>
                      </div>
                    </v-form>
                  </v-card>
                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                </div>
            </slot>
        </div>
    </div>

  </v-sheet>
</template>

<script>
  export default {
    props: ['count', 'type'],
    name: 'salesProductComponent',
    data: () => ({
      model: null,
      cartError: false,
      selected_region: '',
      totalPrice: 0,
      address: '',
      apartment: '',
      payment: '',
      country: 'Երկիր',
      nameLastName: '',
      email: '',
      city: '',
      zip: '',
      more_info: '',
      delivery_type: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid',
      ],
      requiredField: [
        v => !!v || 'Field is required',
      ],
      phone: '',
      phoneRules: [
        v => !!v || 'Phone is required',
        v => new PhoneNumber(v, 'AM').isValid() || `${v} is note valid phone number`
      ],
      addressRules: [
        v => !!v || 'Address is required',
      ],
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
      },
      closeModal: function () {
        document.getElementById('buyNowSalesModal').style.display = 'none';
      },
      async openBuyNowModal(id){
        this.cartError = false;
        document.getElementById('buyNowSalesModal').style.display = 'flex';
        document.querySelector('#buyNowSalesModal .modal').id = 'product_'+id;
        let product_info = await this.$axios.$get(this.$axios.defaults.baseURL+`/product/get/${id}`);
        if(product_info.discountType === 'percent') {
          this.totalPrice = product_info.price - (product_info.price * product_info.discount)/100;
        } else if(product_info.discountType === 'price') {
          this.totalPrice = product_info.price - product_info.discount;
        } else {
          this.totalPrice = product_info.price;
        }
      },
      buy() {
        this.delivery_type = (document.querySelector('.delivery-block .selected') !== null) ? document.querySelector('.delivery-block .selected').innerText : "";
        let product_id = document.querySelector('#buyNowSalesModal .modal').id.replace("product_", "");
        console.log(product_id);

        if(this.address !== "" && this.payment !== "" && this.nameLastName !== "" && this.email !== "" && this.phone !== "" && this.country !== "Երկիր" && this.city !== "" && this.selected_region !== "" && this.zip !== "" && this.delivery_type !== "") {
          if(this.payment == 'cash'){
            if(this.user){
              this.$store.dispatch('user/buy', [this.user.id, null, product_id, this.totalPrice, this.address, this.payment, this.nameLastName, this.email, this.count, this.phone, this.country, this.apartment, this.city, this.selected_region, this.zip, this.more_info, this.delivery_type]).then(() => {
                this.totalPrice = 0;
                this.cartError = false;
                document.getElementById('buyNowSalesModal').style.display = 'none';
                alert("Ձեր պատվերը հաստատված է՝");
              });
            }else {
              this.$store.dispatch('user/buy', [null, null, product_id, this.totalPrice, this.address, this.payment, this.nameLastName, this.email, this.count, this.phone, this.country, this.apartment, this.city, this.selected_region, this.zip, this.more_info, this.delivery_type]).then(() => {
                this.totalPrice = 0;
                this.cartError = false;
                document.getElementById('buyNowSalesModal').style.display = 'none';
                alert("Ձեր պատվերը հաստատված է՝");
              });
            }
          } else {
            if(this.user){
              this.$store.dispatch('user/buy', [this.user.id, null, product_id, this.totalPrice, this.address, this.payment, this.nameLastName, this.email, this.count, this.phone, this.country, this.apartment, this.city, this.selected_region, this.zip, this.more_info, this.delivery_type]).then((res) => {
                this.totalPrice = 0;
                this.cartError = false;
                document.getElementById('buyNowSalesModal').style.display = 'none';
                alert("Ձեր պատվերը հաստատված է՝");
              });
            } else {
              this.$store.dispatch('user/buy', [null, null, product_id, this.totalPrice, this.address, this.payment, this.nameLastName, this.email, this.count, this.phone, this.country, this.apartment, this.city, this.selected_region, this.zip, this.more_info, this.delivery_type]).then((res) => {
                this.totalPrice = 0;
                this.cartError = false;
                document.getElementById('buyNowSalesModal').style.display = 'none';
                alert("Ձեր պատվերը հաստատված է՝");
              });
            }
          }
        } else {
          this.cartError = "Ոչ բոլոր պարտադիր դաշտերն են լրացվաց";
        }
      },
      chooseDelivery(e) {
        let all = document.querySelectorAll('.delivery-block .radio-input');
        for(let i = 0; i < all.length; i++) {
          all[i].classList.remove("selected");
        }

        if(e.path[0].classList.contains('radio-input')){
          e.path[0].classList.add("selected");
        } else {
          e.path[1].classList.add("selected");
        }
      }
    },
    computed: {
      products() {
        return this.$store.getters['products/salesProducts'];
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

  .country-select {
    width: 100%;
    color: black;
    border: 1px solid #C6C3C3;
    border-radius: 6px;
    padding: 5px 10px;
    background: white;
  }

  .step2_block {
    padding: 15px 30px;
    width: 100%;
  }

  .step2_block textarea {
    width: 100%;
    background: white;
    border-radius: 6px;
    border: 1px solid #C6C3C3;
    height: 100px;
  }

  .step2_input {
    padding: 5px;
    width: 100%;
    border: 1px solid #C6C3C3;
    outline: none;
    border-radius: 6px;
    background: white;
  }

  .radio-input {
    margin-bottom: 15px;
    display: flex;
    background: white;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #C6C3C3;
    cursor: pointer;
  }

  .radio-input.selected {
    background: #C6C3C3;
  }

  .radio-input label {
    margin: 0;
  }

  .radio-input input {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }

  @media (max-width: 767px) {
    .modal {
      min-width: 90%;
      max-width: 90%;
      top: 28% !important;
      max-height: 450px !important;
    }
  }

  @media (min-width: 767px) and (max-width: 959px) {
    .modal {
      min-width: 90%;
      max-width: 90%;
      top: 20%;
    }
  }

  @media (min-width: 959px) {
    .modal {
      min-width: 600px;
      max-width: 600px;
      top: 12%;
    }
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
        z-index: 2;
        display: flex;
        justify-content: center;
    }
 
    .modal {
        background: white;
        border-radius: 0;
        position: fixed;
        display: block;
        height: fit-content;
        overflow: auto;
        max-height: 600px;
 
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
            padding: 10px 0;
            padding-bottom: 0;
            width: 100%;
        }
 
        &-footer {
            &__button_approve {
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
            padding: 30px;
            display: flex;
            justify-content: center;
        }
    }
</style>
