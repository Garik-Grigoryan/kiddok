<template>
  <v-container>
    <div v-if="authenticated">
      <v-row justify="space-between">
        <v-col cols="12" md="3">
          <div>
            <v-icon size="270">mdi-account-circle-outline</v-icon>
          </div>

          <v-btn class="white--text add-to-cart-btn" rounded @click="addToCart($event, product.id)" >
            Փոխել նկարը <v-icon left style="margin-left: 10px;">mdi-plus</v-icon>
          </v-btn>
          <v-btn class="white--text add-to-cart-btn" rounded @click="addToCart($event, product.id)" >
            Իմ դիտածները <v-icon left style="margin-left: 10px;">mdi-update</v-icon>
          </v-btn>
          <v-btn class="white--text add-to-cart-btn" rounded @click="addToCart($event, product.id)" >
            Իմ զամբյուղը <v-icon left style="margin-left: 10px;">mdi-cart</v-icon>
          </v-btn>

          <v-menu :close-on-content-click="false" :nudge-width="200" offset-y bottom>
              <template v-slot:activator="{ on }">
                <v-list-item-content class="block1" style="display: flex; cursor: pointer;" v-on="on">
                  <div>
                    <v-list-item-title v-text="'Հարցաթերթիկ'"></v-list-item-title>
                    <v-list-item-subtitle v-text="'Ձեր կարծիքը շատ կարևոր է'"></v-list-item-subtitle>
                  </div>
                  <v-list-item-icon style="margin: 0 0 0 15px;">
                    <v-icon v-text="'mdi-playlist-edit'" size="40" color="white"></v-icon>
                  </v-list-item-icon>
                </v-list-item-content>
              </template>
              <v-card class="questionnaire">
                <v-tabs background-color="#01235E" class="elevation-2" dark :centered="true" :prev-icon="'mdi-arrow-left-bold-box-outline'" :next-icon="'mdi-arrow-right-bold-box-outline'" :icons-and-text="true" >
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab :href="`#tab-1`" ></v-tab>
                  <v-tab-item :value="'tab-1'">
                    <v-card flat tile style="padding: 20px;">
                      <v-card-text>
                        <div class="modal-header">
                          <h4>Հարցաթերթիկ</h4>
                          <div><span class="close-modal" @click="closeModal">x</span></div>
                        </div>
                        <v-form @submit.prevent="false" ref="form" v-model="valid" :lazy-validation="true" >
                          <div class="questionnaire_block">
                              <v-btn color="primary" text @click="closeModal" class="questionnaire_btn" style="text-transform: uppercase;">Հարցաթերթիկ</v-btn>
                              <div style="margin-bottom: 20px;"><span>Ձեր կարծիքը շատ կարևոր է մեզ համար</span></div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Որտեղի՞ց եք իմացել Kidd'Ok կազմակերպության մասին *</span></div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" name="how_find_out" value="internet">
                                <label style="margin-left: 10px;">Համացանցից</label>
                              </div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" name="how_find_out" value="organization_employees">
                                <label style="margin-left: 10px;">Կազմակերպության աշխատակիցներից</label>
                              </div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" name="how_find_out" value="third_person">
                                <label style="margin-left: 10px;">Երրորդ անձից</label>
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Արդյո՞ք Դուք օգտվում եք www.Kidd'Ok.am կայքից *</span></div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" name="use_site" value="yes">
                                <label style="margin-left: 10px;">Այո</label>
                              </div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" name="use_site" value="no">
                                <label style="margin-left: 10px;">Ոչ</label>
                              </div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" name="use_site" value="did_not_know">
                                <label style="margin-left: 10px;">Տեղյակ չեի</label>
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Ինչպիսի՞ նորարարություն կամ փոփոխություն կցանկանայիք տեսնել Kidd'Ok-ի աշխատանքի մեջ</span></div>
                              <div style="margin-bottom: 15px;">
                                <input class="questionnaire_input" type="text" name="innovations_or_changes" placeholder="Իմ պատասխանը">
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Ի՞նչը Ձեզ չի գոհացնում ՊՈՊՈ ԳՐՈՒՊ-ի աշխատանքում *</span></div>
                              <div style="margin-bottom: 15px;">
                                <input class="questionnaire_input" type="text" name="not_suit_in_work" placeholder="Իմ պատասխանը">
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Խնդրում ենք գնահատել աշխատակիցների սպասարկումը 5 բալանի սանդղակով *</span></div>
                              <div style="display: flex; justify-content: space-between;margin-bottom: 15px;">
                                <div><span>Շատ լավ</span></div>
                                <div>
                                  <input type="radio" name="rating" value="1">
                                  <div>1</div>
                                </div>
                                <div>
                                  <input type="radio" name="rating" value="2">
                                  <div>2</div>
                                </div>
                                <div>
                                  <input type="radio" name="rating" value="3">
                                  <div>3</div>
                                </div>
                                <div>
                                  <input type="radio" name="rating" value="4">
                                  <div>4</div>
                                </div>
                                <div>
                                  <input type="radio" name="rating" value="5">
                                  <div>4</div>
                                </div>
                                <div><span>Վատ</span></div>
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Անուն,Ազգանուն(պաշտոն)</span></div>
                              <div style="margin-bottom: 15px;">
                                <input class="questionnaire_input" type="text" name="name" placeholder="Իմ պատասխանը">
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Կազմակերպության անվանում</span></div>
                              <div style="margin-bottom: 15px;">
                                <input class="questionnaire_input" type="text" name="company_name" placeholder="Իմ պատասխանը">
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Հեռախոսահամար</span></div>
                              <div style="margin-bottom: 15px;">
                                <input class="questionnaire_input" type="text" name="phone" placeholder="Իմ պատասխանը">
                              </div>
                          </div>

                          <v-card-actions style="padding: 0;">
                            <v-btn color="primary" text @click="loginAction" class="questionnaire_btn" style="margin: auto;">Հաստատել</v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>

              </v-card>
            </v-menu>
        </v-col>
        <v-col cols="12" md="9" style="display: flex; margin-top: 60px;">
          <v-col cols="12" md="6">
            <div class="block-title">
              Իմ պատվերները
            </div>
            <div style="display: flex; justify-content: space-between;">
              <div style="text-align: center;">
                <div>
                  <v-icon color="#01B8BE">mdi-undo-variant</v-icon>
                </div>
                <div>Վերադարձի հարցումներ</div>
              </div>
              <div style="text-align: center;">
                <div>
                  <v-icon color="#01B8BE">mdi-cart</v-icon>
                </div>
                <div>Պատվերների պատմություն</div>
              </div>
            </div>
            <div style="margin-top: 40px;">
              <div>Բաժանորդագրում նորություններին</div>
              <div class="radio-input">
                <div style="margin-right: 30px;">
                  <input type="radio" name="news" value="yes">
                  <label>Այո</label>
                </div>
                <div>
                  <input type="radio" name="news" value="no">
                  <label>Ոչ</label>
                </div>
              </div>
            </div>
          </v-col>
          <v-col cols="12" md="6">
            <div class="block-title">
              Իմ տվյալները
            </div>
            <div style="display: flex; justify-content: space-between;">
              <div style="text-align: center;">
                <div>
                  <v-icon color="#01B8BE">mdi-lock</v-icon>
                </div>
                <div>Փոխել գաղտնաբառը</div>
              </div>
              <div style="text-align: center;">
                <div>
                  <v-icon color="#01B8BE">mdi-card-account-details</v-icon>
                </div>
                <div>Փոփոխել իմ հասցեները</div>
              </div>
            </div>
          </v-col>
        </v-col>
      </v-row>
      <!--<div class="text-center pageTitle" v-text="$t('myAccount')"></div>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <h4 v-if="passwordErrors" class="read">{{$t('passwordError')}}</h4>
          <v-form ref="form" v-model="valid" :lazy-validation="false" >
            <v-text-field v-model="name" :rules="nameRules" :label="$t('nameLastName')" required ></v-text-field>
            <v-text-field v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
            <v-text-field v-model="phone" :rules="phoneRules" :label="$t('phone')" required></v-text-field>
            <v-text-field v-model="oldPassword" :rules="passwordRules" :label="$t('oldPassword')" type="password" required></v-text-field>
            <v-text-field v-model="password" :rules="passwordRules" :label="$t('password')" type="password" required></v-text-field>
            <v-text-field :rules="passwordConfirmation" :label="$t('repeatPassword')" type="password" required></v-text-field>
            <v-text-field v-model="address" :rules="addressRules" :label="$t('address')" required ></v-text-field>

            <v-btn color="warning" :disabled="!valid" @click="save">Save</v-btn>
          </v-form>
        </v-col>
      </v-row>-->
    </div>
    <div v-else>
      <div class="text-center pageTitle mt-4" v-text="$t('loginError')"></div>
    </div>
    <h2 style="font-weight: 300; margin-top: 150px; margin-bottom: 60px;">BESTSELLERS</h2>
    <BestProducts :count="7" type="best" style="width: 100%;"></BestProducts>
  </v-container>
</template>

<script>
  import BestProducts from '../../components/BestProducts.vue';
  var PhoneNumber = require( 'awesome-phonenumber' );
    export default {
      head() {
        return {
          title: this.name,
          meta: [
            { hid: 'Davmar - ' + this.name, name: 'Davmar ' + this.name, content: 'Davmar ' + this.name }
          ],
        };
      },
        name: "account",
        middleware: 'userLogined',
      async asyncData({store}){
        await store.dispatch('brands/fetch');
        await store.dispatch('menus/fetch');
        await store.dispatch('products/filterAsType', ['new']);
        await store.dispatch('products/filterAsType', ['best']);
        await store.dispatch('products/filterAsType', ['sales']);
      },
      data () {
          return {
            valid: true,
            name: '',
            email: '',
            oldPassword: '',
            password: '',
            phone: '',
            address: '',
            passwordErrors: false,
            nameRules: [
              v => !!v || 'Name is required',
              v => (v && v.length >= 3) || 'Name must be more than 2 characters',
            ],
            emailRules: [
              v => !!v || 'E-mail is required',
              v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            passwordRules: [
              v => !!v || 'Password is required',
            ],
            passwordConfirmation: [
              v => !!v || 'Confirm password',
              v => v === this.password || 'Password is note correct'
            ],
            phoneRules: [
              v => !!v || 'Phone is required',
              v => new PhoneNumber(v, 'AM').isValid() || `${v} is note valid phone number`
            ],
            addressRules: [
              v => !!v || 'Address is required',
            ],
          }
        },
      components: {
        BestProducts
      },
      methods: {
        async save() {
          await this.$axios.post('http://127.0.0.1:8000/api/user/checkPassword', {id: this.user.id, password: this.oldPassword}).then(response => {

           if(response.data.success){
             this.passwordErrors = false;
             this.$store.dispatch('user/update', [this.user.id, this.name, this.email, this.password, this.phone, this.address]);
           }else{
            this.passwordErrors = true;
           }
          }).catch(e => {
            this.registrationError = e.response;
          });
        }
      },
      async mounted() {
        await this.$store.dispatch('wishListAndCart/fetch');
          if(this.user){
            this.name = this.user.name;
            this.email = this.user.email;
            this.phone = this.user.phone || '';
            this.address = this.user.address || '';
            await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
          }else{
            await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
          }
      },
      async closeModal() {
        let modal = document.querySelector('.v-menu__content');
        for(let i = 0; i < modal.length; i++) {
          modal[i].classList.remove('menuable__content__active');
          modal[i].style.display = 'none';
        }
      }
    }
</script>

<style scoped>
  .pageTitle{
    font-size: 34px;
  }

  .add-to-cart-btn {
    background: #B22180 !important;
    color: white !important;
    padding: 5px 20px !important;
    width: max-content !important;
    border-radius: 6px !important;
    margin: 10px 0;
    width: 100% !important;
  }

  .listGroup{
    flex-wrap: wrap;
    justify-content: center;
  }
  .listItem{
    max-width: 25%;
    min-width: 250px;
  }
  .block1 {
    background: #01B8BE;
    padding: 12px;
    display: flex;
    margin-top: 30px;
  }

  .v-list-item__title, .v-list-item__subtitle {
    font-size: 14px !important;
    color: white !important;
  }

  .v-list-item {
    min-height: 70px;
  }

  .theme--light.v-card > .v-card__text, .theme--light.v-card .v-card__subtitle, .theme--light.v-application {
    color: #352249;
  }

  .questionnaire_block {
    border: 1px solid #C6C3C3; 
    border-radius: 20px; 
    padding: 15px; 
    margin-bottom: 18px;
  }

  .questionnaire_btn {
    background: #B22180; 
    width: 50%; 
    padding: 12px !important; 
    border-radius: 6px !important; 
    color: white !important;
    margin-bottom: 15px;
    text-transform: none;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 30px;
    border-bottom: 1px solid #C6C3C3;
    padding: 5px 35px;
    margin-right: -35px;
    margin-left: -35px;
    margin-top: -30px;
  }

  .close-modal {
    cursor: pointer;
    color: #01B8BE;
    font-size: 20px;
  }

  .questionnaire_input {
    padding: 5px 0;
    width: 100%;
    border-bottom: 1px solid #959292;
    outline: none;
  }

  .block-title {
    color: #B22180;
    border-bottom: 2px solid #C6C3C3;
    width: max-content;
    padding: 10px 50px 5px 0;
    margin-bottom: 50px;
  }

  .radio-input {
    margin: 15px 0;
    display: flex;
  }

  .radio-input label {
    margin: 0;
  }

  .radio-input input {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
</style>
