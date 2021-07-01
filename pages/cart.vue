<template>
  <v-container class="cart-page-block">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">

    <div id="app">
      <div class="container">
        <ul class="nav nav-tabs nav-justified">
          <li class="nav-item">
            <v-icon v-if="isActive('step1')" color="#B22381">mdi-check-circle</v-icon>
            <v-icon v-else color="#C6C3C3">mdi-numeric-1-circle</v-icon>
            <a class="nav-link" @click.prevent="setActive('step1')" :class="{ active: isActive('step1') }" href="#step1">Քայլ 1</a>
          </li>
          <li style="display: flex; align-items: center;">
            <hr style="width: 100px; border-top: 2px solid rgba(0,0,0,.1);">
          </li>
          <li class="nav-item">
            <v-icon v-if="isActive('step2')" color="#B22381">mdi-check-circle</v-icon>
            <v-icon v-else color="#C6C3C3">mdi-numeric-2-circle</v-icon>
            <a class="nav-link" :class="{ active: isActive('step2') }">Քայլ 2</a>
          </li>
          <li style="display: flex; align-items: center;">
            <hr style="width: 100px; border-top: 2px solid rgba(0,0,0,.1);">
          </li>
          <li class="nav-item">
            <v-icon v-if="isActive('step3')" color="#B22381">mdi-check-circle</v-icon>
            <v-icon v-else color="#C6C3C3">mdi-numeric-3-circle</v-icon>
            <a class="nav-link" :class="{ active: isActive('step3') }">Քայլ 3</a>
          </li>
        </ul>
        <div class="tab-content py-3" id="myTabContent">
          <div class="tab-pane fade step1-table-block" :class="{ 'active show': isActive('step1') }" id="step1">
            <v-row>
              <v-col lg="12" md="12">
                <v-data-table :headers="headers" :items="desserts" hide-default-footer class="elevation-1 mytable" style="box-shadow: none !important;">
                  <template v-slot:item.image="{ item }">
                    <v-img :src="item.image" :contain="true" width="100" height="100" ></v-img>
                  </template>
                  <template v-slot:item.price="{ item }">
                    <div v-if="!user || (user && user.role !== 'juridical')">
                      {{item.price}}
                    </div>
                    <div v-else-if="user && user.role === 'juridical'">
                      {{item.price_wholesale}}
                    </div>
                  </template>
                  <template v-slot:item.count="{ item }">
                    <div v-if="!user || (user && user.role !== 'juridical')" class="product-count">
                        <div class="minus" @click="countMinus($event, item)"><v-icon color="black" left style="margin-left: 10px;">mdi-minus-thick</v-icon></div>
                        <input class="product-count-val" placeholder="0" @input="summCount()" @change="changeCount(item)" type="text" v-model="item.count" disabled>
                        <div class="plus" @click="countPlus($event, item)"><v-icon color="black" left style="margin-left: 10px;">mdi-plus</v-icon></div>
                    </div>
                    <div v-else-if="user && user.role === 'juridical'" class="product-count">
                        <div class="minus" @click="countMinusJuridical($event, item)"><v-icon color="black" left style="margin-left: 10px;">mdi-minus-thick</v-icon></div>
                        <input class="product-count-val" placeholder="0" @input="summCount()" @change="changeCount(item)" type="text" v-model="item.count" disabled>
                        <div class="plus" @click="countPlusJuridical($event, item)"><v-icon color="black" left style="margin-left: 10px;">mdi-plus</v-icon></div>
                    </div>
                    <!-- <v-text-field type="number" @input="summCount()" @change="changeCount(item)" placeholder="0" v-model="item.count" style="max-width: 60px; margin: 0 auto !important; text-align: center" min="1" ></v-text-field> -->
                  </template>
                  <template v-slot:item.color="{ item }">
                    <v-card :color="item.color" class="d-flex text-center align-center mx-3" dark height="30" width="30" style="margin: 0 auto !important;" >
                    </v-card>
                  </template>
                  <template v-slot:item.remove="{ item }">
                    <v-icon  @click="deleteItem(item)">mdi-close-circle</v-icon>
                  </template>
                  <template v-slot:item.total_price="{ item }">
                    <div v-if="!user || (user && user.role !== 'juridical')">
                      <span class="product-total-price">{{item.total_price}}</span>
                    </div>
                    <div v-else-if="user && user.role === 'juridical'">
                      <span class="product-total-price">{{item.count*item.price_wholesale}}</span>
                    </div>
                  </template>
                </v-data-table>

                <div style="margin-top: 30px; display: flex; justify-content: flex-end;">
                  <span>Ապրանքի գին: {{totalPrice}} դր</span>
                </div>
                <div style="margin-top: 20px; display: flex; justify-content: flex-end;">
                  <a v-if="totalPrice !== 0" class="white--text approve-btn" @click.prevent="setActive('step2')" href="#step2">
                    Հաստատել <v-icon color="white" left style="margin: 0;">mdi-chevron-right</v-icon>
                  </a>
                  <a v-else class="white--text approve-btn">
                    Հաստատել <v-icon color="white" left style="margin: 0;">mdi-chevron-right</v-icon>
                  </a>
                </div>
              </v-col>
            </v-row>
          </div>
          <div class="tab-pane fade" :class="{ 'active show': isActive('step2') }" id="step2">
            <v-row>
              <v-col lg="8" md="12" sm="12">
                <v-card style="box-shadow: none;">
                  <v-form style="background: #EBE7E7;">
                    <v-alert v-if="cartError" text type="error">
                      {{cartError}}
                    </v-alert>

                    <div class="step2_block">
                      <v-divider style="margin: 20px 0 0 0;"></v-divider>
                    </div>
                    <div class="step2_block">
                        <div style="margin-bottom: 15px;">
                          <select class="country-select" value="Երկիր" v-model="country">
                            <option selected>Երկիր</option>
                            <option>Armenia</option>
                          </select>
                        </div>
                    </div>
                    <div class="flex-block">
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
                    </div>
                    <div class="flex-block">
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
                    </div>
                    <div class="flex-block">
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
                    </div>
                    <div class="flex-block">
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
                    </div>

                    <div class="step2_block" style="margin-top: 40px;">
                      <span style="text-transform: uppercase; font-weight: 700;">Վճարման տարբերակ</span>
                      <v-divider style="margin: 5px 0 0 0;"></v-divider>
                    </div>
                    <div class="step2_block">
                        <!-- <div class="radio-input">
                          <input type="radio" name="payment" value="visa" v-model="payment">
                          <label>Visa, MasterCard</label>
                        </div> -->
                        <div class="radio-input">
                          <input type="radio" name="payment" value="cash" v-model="payment">
                          <label>Կանխիկ</label>
                        </div>
                        <!-- <div class="radio-input">
                          <input type="radio" name="payment" value="idram" v-model="payment">
                          <label>Idram</label>
                        </div> -->
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

                    <div style="margin: 40px 0; display: flex; justify-content: center; padding-bottom: 40px;">
                      <a class="white--text approve-btn" @click="buy" href="#">
                        Հաստատել
                      </a>
                      <a class="white--text go-to-next-step" href="#step3" style="display: none;"></a>
                    </div>
                  </v-form>
                </v-card>
              </v-col>
              <v-col lg="4" md="12" sm="12">
                <v-card style="box-shadow: none; background: #EBE7E7; padding: 15px;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                      <div>
                        <span>Ընդհանուր զամբյուղ</span>
                      </div>
                      <div>
                        <a href="#" style="color: #B22180;">Խմբագրել</a>
                      </div>
                    </div>
                    <div v-for="dessert in desserts" :key="dessert" style="display: flex; justify-content: space-between; margin-bottom: 15px;">
                        <div>
                          <span>{{dessert.name}}</span>
                        </div>
                        <div v-if="!user || (user && user.role !== 'juridical')">
                          <span>{{dessert.total_price}} դրամ</span>
                        </div>
                        <div v-else-if="user && user.role === 'juridical'">
                          <span>{{dessert.count * dessert.price_wholesale}} դրամ</span>
                        </div>
                    </div>
                    <v-divider style="margin: 20px 0 0 0;"></v-divider>
                    <div style="display: flex; justify-content: flex-end; margin: 20px 0 5px 0;">
                      <span>Ընդհանուր գումար {{totalPrice}} դր</span>
                    </div>
                </v-card>
              </v-col>
            </v-row>
          </div>
          <div class="tab-pane fade" :class="{ 'active show': isActive('step3') }" id="step3">
            <v-card style="box-shadow: none; background: #EBE7E7; padding: 20px 40px;">
              <div>
                <div>
                  <span>Ձեր պատվերը հաստատված է՝</span>
                </div>
                <!-- <v-btn class="white--text approve-btn" style="text-transform: none; margin-top: 10px; padding: 5px 30px !important;" @click="">Կտրոն</v-btn> -->
              </div>
              <div style="display: flex; margin-top: 20px;">
                  <div class="step3-input-label" style="width: 20%;"><span>Պատվիրատու՝</span></div>
                  <div class="step3-input" style="width: 30%;">
                    <input class="step2_input" :rules="requiredField" type="text" name="name" v-model="nameLastName" disabled>
                  </div>
              </div>
              <div style="display: flex; margin-top: 20px;">
                  <div class="step3-input-label" style="width: 20%;"><span>Վճարման տարբերակ</span></div>
                  <div class="step3-input" style="width: 30%;">
                    <input class="step2_input" :rules="requiredField" type="text" name="payment" v-model="payment" disabled>
                  </div>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </div>

    <v-dialog v-model="dialog" max-width="996" >
      <v-card>
        <v-card-title  style="display: flex; justify-content: space-between;" class="headline">{{$t('conditions')}}</v-card-title>
        <v-container fluid>
          <p class="px-3" v-html="conditions"></p>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false" >{{$t('close')}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>

  var PhoneNumber = require( 'awesome-phonenumber' );
  export default {
    head() {
      return {
        title: 'Cart',
        meta: [
          { hid: 'Cart', name: 'Cart', content: 'Cart' }
        ],
      };
    },
    async fetch({store}){
      await store.dispatch('brands/fetch');
      await store.dispatch('regions/fetch');

      await store.dispatch('wishListAndCart/fetch');
      if(this.user){
        await store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
      }else{
        await store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
      }

      await store.dispatch('menus/fetch');
      await store.dispatch('pages/getById', [1]);

    },
    name: "cart",
    data () {
      return {
        conditions: '',
        settings: true,
        dialog: false,
        state: '',
        formValid: false,
        totalPrice: 0,
        totalPriceWithoutDelivery: 0,
        items: ['Yerevan', 'Kirovakan', 'Lennakan'],
        address: '',
        apartment: '',
        payment: '',
        payments: ['Cash', 'Online Payment'],
        country: 'Երկիր',
        nameLastName: '',
        email: '',
        city: '',
        zip: '',
        more_info: '',
        delivery_type: '',
        agree: false,
        count: 0,
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
        headers: [
          { text: "", value: 'remove',  sortable: false,  align: 'center', },
          { text: this.$t('image'), value: 'image',  sortable: false,  align: 'start', },
          { text: 'Ապրանքի անվանում',value: 'name',  sortable: false,  align: 'center', },
          { text: 'Գին', value: 'price',  sortable: false,  align: 'center', },
          { text: 'Կոդ', value: 'code',  sortable: false,  align: 'center', },
          { text: 'Քանակ', value: 'count',  sortable: false,  align: 'center', },
          { text: 'Ընդհանուր գին', value: 'total_price',  sortable: false,  align: 'center', },
        ],
        desserts: [

        ],
        selected_region: '',
        selected_region_price: '',
        cost_of_delivery: '0',
        all_regions: [],
        activeItem: 'step1',
        cartError: false,
      }
    },
    computed: {
      menus() {
        return this.$store.getters['menus/menus'];
      },
      cartProducts() {
        let cookieResCart = this.$cookies.get('davmar_cart');
        if(cookieResCart !== undefined){
          this.$store.dispatch('products/getProductsByIds', [cookieResCart]);
          return this.$store.getters['products/productByIds'];
        }
      },
      cartData() {
        return this.$store.getters['wishListAndCart/cartData'];
      },
      cartId() {
        return this.$store.getters['wishListAndCart/cart'];
      },
      conditionsPage() {
        return this.$store.getters['pages/page'];
      },
      regions() {
        return this.$store.getters['regions/regions'];
      }
    },
    async mounted() {
      this.$nextTick(function () {
        if(document.querySelector('.step1-table-block .v-data-table .v-data-table-header') !== null) {
          document.querySelector('.step1-table-block .v-data-table .v-data-table-header').style.background = "#EBE7E7";
        }
      });

      if(this.$i18n.locale === 'am'){
        this.conditions = this.conditionsPage.html_am
      }
      else if(this.$i18n.locale === 'en'){
        this.conditions = this.conditionsPage.html
      }
      else if(this.$i18n.locale === 'ru'){
        this.conditions = this.conditionsPage.html_ru
      }
      if(this.user){
        this.nameLastName = this.user.name;
        this.email = this.user.email;
        this.phone = this.user.phone || '';
        this.address = this.user.address || '';
      }
      await this.$store.dispatch('wishListAndCart/fetch');
      if(this.user){
        await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
      }else{
        await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
      }

      this.cartData.forEach((elem, key) => {
        if(elem.product !== null) {
          if(this.$i18n.locale == 'ru'){
            this.desserts.push({
              image: JSON.parse(elem.product.images)[0],
              name: elem.product.nam_rue,
              size: elem.size && elem.size[0] !== undefined ? elem.size : '',
              color: elem.color && elem.color.length > 0 ? elem.color : '#000000',
              count: elem.count,
              price: elem.product.price,
              price_wholesale: elem.product.price_wholesale,
              quantity_wholesale: elem.product.quantity_wholesale,
              remove: key,
              total_price: elem.product.price*elem.count,
              code: elem.product.code
            })
          }else if(this.$i18n.locale == 'am'){
            this.desserts.push({
              image: JSON.parse(elem.product.images)[0],
              name: elem.product.name_am,
              size: elem.size && elem.size[0] !== undefined ? elem.size : '',
              color: elem.color && elem.color.length > 0 ? elem.color : '#000000',
              count: elem.count,
              price: elem.product.price,
              price_wholesale: elem.product.price_wholesale,
              quantity_wholesale: elem.product.quantity_wholesale,
              remove: key,
              total_price: elem.product.price*elem.count,
              code: elem.product.code
            })
          }else if(this.$i18n.locale == 'en'){
            this.desserts.push({
              image: JSON.parse(elem.product.images)[0],
              name: elem.product.name_en,
              size: elem.size && elem.size[0] !== undefined ? elem.size : '',
              color: elem.color && elem.color.length > 0 ? elem.color : '#000000',
              count: elem.count,
              price: elem.product.price,
              price_wholesale: elem.product.price_wholesale,
              quantity_wholesale: elem.product.quantity_wholesale,
              remove: key,
              total_price: elem.product.price*elem.count,
              code: elem.product.code
            })
          }
        }

      });

      await this.summCount();

      this.regions.forEach((elem, key) => {
        if(this.$i18n.locale == 'ru'){
          this.all_regions.push(elem.name_ru);
        } else if(this.$i18n.locale == 'am'){
          this.all_regions.push(elem.name_am);
        } else if(this.$i18n.locale == 'en'){
          this.all_regions.push(elem.name_en);
        }
      });
    },
    methods: {
      buy() {
        this.delivery_type = (document.querySelector('.delivery-block .selected') !== null) ? document.querySelector('.delivery-block .selected').innerText : "";
        if(this.address !== "" && this.payment !== "" && this.nameLastName !== "" && this.email !== "" && this.phone !== "" && this.country !== "Երկիր" && this.city !== "" && this.selected_region !== "" && this.zip !== "" && this.delivery_type !== "") {
          if(this.payment == 'cash'){
            if(this.user){
              this.$store.dispatch('user/buy', [this.user.id, this.cartId, null, this.totalPrice, this.address, this.payment, this.nameLastName, this.email, this.count, this.phone, this.country, this.apartment, this.city, this.selected_region, this.zip, this.more_info, this.delivery_type]).then(() => {
                this.$store.dispatch('wishListAndCart/emptyCart')
                this.desserts = [];
                this.setActive('step3');
                document.querySelector('.go-to-next-step').click();
                this.totalPrice = 0;
              });
            }else {
              this.$store.dispatch('user/buy', [null, this.cartId, null, this.totalPrice, this.address, this.payment, this.nameLastName, this.email, this.count, this.phone, this.country, this.apartment, this.city, this.selected_region, this.zip, this.more_info, this.delivery_type]).then(() => {
                this.$store.dispatch('wishListAndCart/emptyCart')
                this.desserts = [];
                this.setActive('step3');
                document.querySelector('.go-to-next-step').click();
                this.totalPrice = 0;
              });
            }
          } else {
            if(this.user){
              this.$store.dispatch('user/buy', [this.user.id, this.cartId, null, this.totalPrice, this.address, this.payment, this.nameLastName, this.email, this.count, this.phone, this.country, this.apartment, this.city, this.selected_region, this.zip, this.more_info, this.delivery_type]).then((res) => {
                this.$store.dispatch('wishListAndCart/emptyCart');
                this.desserts = [];
                this.setActive('step3');
                document.querySelector('.go-to-next-step').click();
                // this.$store.dispatch('user/initOrder', [res.orderID+' order from davmar.am', res.orderID, this.totalPrice]).then((redirectUrl) => {
                //   window.location.href = redirectUrl.url;
                // });
                this.totalPrice = 0;
              });
            } else {
              this.$store.dispatch('user/buy', [null, this.cartId, null, this.totalPrice, this.address, this.payment, this.nameLastName, this.email, this.count, this.phone, this.country, this.apartment, this.city, this.selected_region, this.zip, this.more_info, this.delivery_type]).then((res) => {
                this.$store.dispatch('wishListAndCart/emptyCart');
                this.desserts = [];
                this.setActive('step3');
                document.querySelector('.go-to-next-step').click();
                // this.$store.dispatch('user/initOrder', [res.orderID+' order from davmar.am', res.orderID, this.totalPrice]).then((redirectUrl) => {
                //   window.location.href = redirectUrl.url;
                // });
                this.totalPrice = 0;
              });
            }
          }
        } else {
          this.cartError = "Ոչ բոլոր պարտադիր դաշտերն են լրացվաց";
        }
      },
      init() {
        console.log(this.cartData);
        this.desserts = [];
        this.cartData.forEach((elem, key) => {
          if(elem.product !== null) {
            if(this.$i18n.locale == 'ru'){
              this.desserts.push({
                image: JSON.parse(elem.product.images)[0],
                name: elem.product.nam_rue,
                size: elem.size && elem.size[0] !== undefined ? elem.size : '',
                color: elem.color && elem.color.length > 0 ? elem.color : '#000000',
                count: elem.count,
                price: elem.product.price,
                price_wholesale: elem.product.price_wholesale,
                quantity_wholesale: elem.product.quantity_wholesale,
                remove: key,
                total_price: elem.product.price*elem.count,
                code: elem.product.code
              })
            }else if(this.$i18n.locale == 'am'){
              this.desserts.push({
                image: JSON.parse(elem.product.images)[0],
                name: elem.product.name_am,
                size: elem.size && elem.size[0] !== undefined ? elem.size : '',
                color: elem.color && elem.color.length > 0 ? elem.color : '#000000',
                count: elem.count,
                price: elem.product.price,
                price_wholesale: elem.product.price_wholesale,
                quantity_wholesale: elem.product.quantity_wholesale,
                remove: key,
                total_price: elem.product.price*elem.count,
                code: elem.product.code
              })
            }else if(this.$i18n.locale == 'en'){
              this.desserts.push({
                image: JSON.parse(elem.product.images)[0],
                name: elem.product.name_en,
                size: elem.size && elem.size[0] !== undefined ? elem.size : '',
                color: elem.color && elem.color.length > 0 ? elem.color : '#000000',
                count: elem.count,
                price: elem.product.price,
                price_wholesale: elem.product.price_wholesale,
                quantity_wholesale: elem.product.quantity_wholesale,
                remove: key,
                total_price: elem.product.price*elem.count,
                code: elem.product.code
              })
            }
          }
        });
      },
      changeState() {
        if(this.state !== 'Yerevan'){
          this.totalPrice = this.totalPrice + 3000
        }else{
          this.totalPrice = this.totalPriceWithoutDelivery
        }
      },
      async deleteItem (item) {
        const index = this.desserts.indexOf(item);
        let user_id = 0;
        if(this.user){
          user_id = this.user.id;
        }
        if(confirm('Are you sure you want to delete this item?')){
          this.desserts.splice(index, 1);
          await this.$store.dispatch('wishListAndCart/removeFromCart', [index, user_id]).then(() => {
            this.init();
            this.summCount();
          });

        }
      },
      async changeCount(item) {
        const index = this.desserts.indexOf(item);
        let user_id = 0;
        if(this.user){
          user_id = this.user.id;
        }
        this.$store.dispatch('wishListAndCart/updateFromCart', [index, user_id, item.count]).then(() => {
          this.init();
          this.summCount();
        });
      },
      async summCount() {
        this.count = 0;
        this.totalPrice = 0;
        this.desserts.forEach(elem => {
          this.count += parseInt(elem.count);
          if(!this.user || (this.user && this.user.role !== "juridical")) {
            this.totalPrice += elem.price * elem.count;
          } else if(this.user && this.user.role === "juridical") {
            this.totalPrice += elem.price_wholesale * elem.count;
          }
        })
      },
      onChangeSelectedRegion() {
        let region_en = this.regions.find(o => o.name_en === this.selected_region);
        let region_am = this.regions.find(o => o.name_am === this.selected_region);
        let region_ru = this.regions.find(o => o.name_ru === this.selected_region);
        if(region_en !== undefined) {
          this.selected_region_price = region_en.delivery_price;
          this.totalPrice = this.totalPrice - parseInt(this.cost_of_delivery) + parseInt(region_en.delivery_price);
          this.cost_of_delivery = region_en.delivery_price;
        } else if(region_am !== undefined) {
          this.selected_region_price = region_am.delivery_price;
          this.totalPrice = this.totalPrice - parseInt(this.cost_of_delivery) + parseInt(region_am.delivery_price);
          this.cost_of_delivery = region_am.delivery_price;
        } else if(region_ru !== undefined) {
          this.selected_region_price = region_ru.delivery_price;
          this.totalPrice = this.totalPrice - parseInt(this.cost_of_delivery) + parseInt(region_ru.delivery_price);
          this.cost_of_delivery = region_ru.delivery_price;
        }
      },
      navigate: function(e){
        if (e.target.dataset.show) {
          e.preventDefault();
          this.show = e.target.dataset.show;
        }
      },
      alerts: function(e){
        if (e.target.dataset.alert) {
          e.preventDefault();
          alert(e.target.dataset.alert);
        }
      },
      isActive (menuItem) {
        return this.activeItem === menuItem
      },
      setActive (menuItem) {
        this.activeItem = menuItem
      },
      countMinus(e, item) {
        console.log(e, item);
        let count = 0;
        // console.log(e.path[0].classList.contains('minus'));
        if(e.path[0].classList.contains('minus')){
          let old_val = parseInt(e.path[1].querySelector('.product-count-val').value);
          count = old_val;
          if(old_val >= 2) {
            e.path[1].querySelector('.product-count-val').value = old_val - 1;
            count = old_val - 1;
            e.path[3].querySelector('.product-total-price').innerText = item.price*count;
          }
        } else {
          let old_val = parseInt(e.path[2].querySelector('.product-count-val').value);
          count = old_val;
          if(old_val >= 2) {
            e.path[2].querySelector('.product-count-val').value = old_val - 1;
            count = old_val - 1;
            e.path[4].querySelector('.product-total-price').innerText = item.price*count;
          }
        }
        item.count = count;

        this.changeCount(item);

        // let index_minus = this.desserts.indexOf(item);
        // let user_id = 0;
        // if(this.user){
        //   user_id = this.user.id;
        // }
        // this.$store.dispatch('wishListAndCart/updateFromCart', [index_minus, user_id, count]).then(() => {
        //   this.init();
        //   this.summCount();
        // });
      },
      countPlus(e, item) {
        // console.log(e);
        let count = 0;
        if(e.path[0].classList.contains('plus')){
          count = parseInt(e.path[1].querySelector('.product-count-val').value);
          e.path[1].querySelector('.product-count-val').value = parseInt(e.path[1].querySelector('.product-count-val').value) + 1;
          count++;
          e.path[3].querySelector('.product-total-price').innerText = item.price*count;
        } else {
          count = parseInt(e.path[2].querySelector('.product-count-val').value);
          e.path[2].querySelector('.product-count-val').value = parseInt(e.path[2].querySelector('.product-count-val').value) + 1;
          count++;
          e.path[4].querySelector('.product-total-price').innerText = item.price*count;
        }
        item.count = count;

        this.changeCount(item);

        // let index_plus = this.desserts.indexOf(item);
        // let user_id = 0;
        // if(this.user){
        //   user_id = this.user.id;
        // }
        // this.$store.dispatch('wishListAndCart/updateFromCart', [index_plus, user_id, count]).then(() => {
        //   this.init();
        //   this.summCount();
        // });
      },
      countMinusJuridical(e, item) {
        let count = 0;
        if(e.path[0].classList.contains('minus')){
          let old_val = parseInt(e.path[1].querySelector('.product-count-val').value);
          count = old_val;
          if((old_val - parseInt(item.quantity_wholesale)) !== 0) {
            e.path[1].querySelector('.product-count-val').value = old_val - parseInt(item.quantity_wholesale);
            count = old_val - parseInt(item.quantity_wholesale);
            e.path[3].querySelector('.product-total-price').innerText = item.price*count;
          }
        } else {
          let old_val = parseInt(e.path[2].querySelector('.product-count-val').value);
          count = old_val;
          if((old_val - parseInt(item.quantity_wholesale)) !== 0) {
            e.path[2].querySelector('.product-count-val').value = old_val - parseInt(item.quantity_wholesale);
            count = old_val - parseInt(item.quantity_wholesale);
            e.path[4].querySelector('.product-total-price').innerText = item.price_wholesale*count;
          }
        }
        item.count = count;

        this.changeCount(item);
      },
      countPlusJuridical(e, item) {
        let count = 0;
        if(e.path[0].classList.contains('plus')){
          count = parseInt(e.path[1].querySelector('.product-count-val').value);
          e.path[1].querySelector('.product-count-val').value = parseInt(e.path[1].querySelector('.product-count-val').value) + parseInt(item.quantity_wholesale);
          count += parseInt(item.quantity_wholesale);
          e.path[3].querySelector('.product-total-price').innerText = item.price_wholesale*count;
        } else {
          count = parseInt(e.path[2].querySelector('.product-count-val').value);
          e.path[2].querySelector('.product-count-val').value = parseInt(e.path[2].querySelector('.product-count-val').value) + parseInt(item.quantity_wholesale);
          count += parseInt(item.quantity_wholesale);
          e.path[4].querySelector('.product-total-price').innerText = item.price_wholesale*count;
        }
        item.count = count;

        this.changeCount(item);
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
    }
  }
</script>

<style scoped>
  .section {
    padding: 2em 0;
  }

  .fade-up-enter-active,
  .fade-up-leave-active {
    transition: all 0.3s ease-in-out;
  }
  .fade-up-enter,
  .fade-up-leave-to {
    height: 0;
    transform: translateY(30px);
    opacity: 0;
  }

  .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active, .nav-tabs .nav-item .nav-link:hover, .nav-tabs .nav-link.active:hover, .nav-tabs {
    border: none;
  }

  .nav-tabs .nav-link {
    color: #352249;
  }

  .nav-tabs .nav-item {
    display: flex;
    justify-content: center;
  }

  .nav-tabs {
    margin: 20px 0 40px 0;
  }

  .approve-btn {
    background: #B22180 !important;
    color: white !important;
    padding: 5px 20px !important;
    width: max-content !important;
    border-radius: 6px !important;
    text-decoration: none;
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

  tr {
    background: #EBE7E7 !important;
  }

  .country-select {
    width: 100%;
    color: black;
    border: 1px solid #C6C3C3;
    border-radius: 6px;
    padding: 5px 10px;
    background: white;
  }

  .theme--light.v-text-field > .v-input__control > .v-input__slot:before {
    border: none !important;
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

  #myTabContent .v-data-table-header {
    background: #EBE7E7 !important;
  }

  #myTabContent .v-data-table tbody tr {
    border-bottom: thin solid #B22180 !important;
  }

  .mytable .v-data-table tbody tr td {
    border-bottom: thin solid #B22180 !important;
  }

  .flex-block {
    display: flex; 
    justify-content: space-between; 
    align-items: center;
  }

  @media (max-width: 959px) {
    .cart-page-block {
      margin-top: 20px;
    }

    .flex-block {
      display: block;
    }

    .step3-input-label {
      width: 30% !important;
    }

    .step3-input {
      width: 70% !important;
    }
  }

  @media (max-width: 448px) {
    .container {
        margin-top: 40px !important;
    }
  }
</style>
