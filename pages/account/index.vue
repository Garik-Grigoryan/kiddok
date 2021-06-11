<template>
  <v-container class="account-page-block">
    <div v-if="authenticated">
      <v-row justify="space-between">
        <v-col cols="12" md="3">
          <div v-if="user.image">
            <div class="user-photo-block"></div>
          </div>
          <div v-else>
            <v-icon size="270">mdi-account-circle-outline</v-icon>
          </div>
          <v-btn class="white--text add-to-cart-btn" @click="openChangePhotoModal()" rounded>
            Փոխել նկարը <v-icon left style="margin-left: 10px;">mdi-plus</v-icon>
          </v-btn>
          <!-- <v-btn class="white--text add-to-cart-btn" rounded>
            Իմ դիտածները <v-icon left style="margin-left: 10px;">mdi-update</v-icon>
          </v-btn> -->
          <v-btn class="white--text add-to-cart-btn" :to="localePath('/cart')" rounded>
            Իմ զամբյուղը <v-icon left style="margin-left: 10px;">mdi-cart</v-icon>
          </v-btn>

          <v-list-item-content class="block1" style="display: flex; cursor: pointer;" @click="openQuestionnaireModal()">
            <div>
              <v-list-item-title v-text="'Հարցաթերթիկ'"></v-list-item-title>
              <v-list-item-subtitle v-text="'Ձեր կարծիքը շատ կարևոր է'"></v-list-item-subtitle>
            </div>
            <v-list-item-icon style="margin: 0 0 0 15px;">
              <v-icon v-text="'mdi-playlist-edit'" size="40" color="white"></v-icon>
            </v-list-item-icon>
          </v-list-item-content>

          <!-- <v-menu :close-on-content-click="false" :nudge-width="200" offset-y bottom>
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
                          <div><span class="close-modal" @click="closeModal()">x</span></div>
                        </div>
                        <v-form @submit.prevent="false" ref="form" :lazy-validation="true" >
                          <v-alert v-if="questionnaireError" text type="error">
                            {{questionnaireError}}
                          </v-alert>

                          <div class="questionnaire_block">
                              <v-btn text class="questionnaire_btn" style="text-transform: uppercase;">Հարցաթերթիկ</v-btn>
                              <div style="margin-bottom: 20px;"><span>Ձեր կարծիքը շատ կարևոր է մեզ համար</span></div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Որտեղի՞ց եք իմացել Kidd'Ok կազմակերպության մասին *</span></div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" name="how_find_out" v-model="questionnaireForm.how_find_out" value="Համացանցից">
                                <label style="margin-left: 10px;">Համացանցից</label>
                              </div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" name="how_find_out" v-model="questionnaireForm.how_find_out" value="Կազմակերպության աշխատակիցներից">
                                <label style="margin-left: 10px;">Կազմակերպության աշխատակիցներից</label>
                              </div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" name="how_find_out" v-model="questionnaireForm.how_find_out" value="Երրորդ անձից">
                                <label style="margin-left: 10px;">Երրորդ անձից</label>
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Արդյո՞ք Դուք օգտվում եք www.Kidd'Ok.am կայքից *</span></div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" name="use_site" v-model="questionnaireForm.use_site" value="Այո">
                                <label style="margin-left: 10px;">Այո</label>
                              </div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" name="use_site" v-model="questionnaireForm.use_site" value="Ոչ">
                                <label style="margin-left: 10px;">Ոչ</label>
                              </div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" name="use_site" v-model="questionnaireForm.use_site" value="Տեղյակ չեի">
                                <label style="margin-left: 10px;">Տեղյակ չեի</label>
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Ինչպիսի՞ նորարարություն կամ փոփոխություն կցանկանայիք տեսնել Kidd'Ok-ի աշխատանքի մեջ</span></div>
                              <div style="margin-bottom: 15px;">
                                <input class="questionnaire_input" v-model="questionnaireForm.innovations_or_changes" type="text" name="innovations_or_changes" placeholder="Իմ պատասխանը">
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Ի՞նչը Ձեզ չի գոհացնում ՊՈՊՈ ԳՐՈՒՊ-ի աշխատանքում</span></div>
                              <div style="margin-bottom: 15px;">
                                <input class="questionnaire_input" v-model="questionnaireForm.not_suit_in_work" type="text" name="not_suit_in_work" placeholder="Իմ պատասխանը">
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Խնդրում ենք գնահատել աշխատակիցների սպասարկումը 5 բալանի սանդղակով *</span></div>
                              <div style="display: flex; justify-content: space-between;margin-bottom: 15px;">
                                <div><span>Վատ</span></div>
                                <div>
                                  <input type="radio" name="rating" v-model="questionnaireForm.rating" value="1">
                                  <div>1</div>
                                </div>
                                <div>
                                  <input type="radio" name="rating" v-model="questionnaireForm.rating" value="2">
                                  <div>2</div>
                                </div>
                                <div>
                                  <input type="radio" name="rating" v-model="questionnaireForm.rating" value="3">
                                  <div>3</div>
                                </div>
                                <div>
                                  <input type="radio" name="rating" v-model="questionnaireForm.rating" value="4">
                                  <div>4</div>
                                </div>
                                <div>
                                  <input type="radio" name="rating" v-model="questionnaireForm.rating" value="5">
                                  <div>5</div>
                                </div>
                                <div><span>Շատ լավ</span></div>
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Անուն,Ազգանուն(պաշտոն) *</span></div>
                              <div style="margin-bottom: 15px;">
                                <input class="questionnaire_input" type="text" v-model="questionnaireForm.name" name="name" placeholder="Իմ պատասխանը">
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Կազմակերպության անվանում</span></div>
                              <div style="margin-bottom: 15px;">
                                <input class="questionnaire_input" type="text" v-model="questionnaireForm.company_name" name="company_name" placeholder="Իմ պատասխանը">
                              </div>
                          </div>

                          <div class="questionnaire_block">
                              <div style="margin-bottom: 20px;"><span>Հեռախոսահամար *</span></div>
                              <div style="margin-bottom: 15px;">
                                <input class="questionnaire_input" type="text" v-model="questionnaireForm.phone" name="phone" placeholder="Իմ պատասխանը">
                              </div>
                          </div>

                          <v-card-actions style="padding: 0;">
                            <v-btn color="primary" text @click="sendQuestionnaireForm()" class="questionnaire_btn" style="margin: auto;">Հաստատել</v-btn>
                          </v-card-actions>
                        </v-form>
                      </v-card-text>
                    </v-card>
                  </v-tab-item>
                </v-tabs>

              </v-card>
            </v-menu> -->
        </v-col>
        <v-col cols="12" md="9" style="display: flex; margin-top: 60px; flex-wrap: wrap;">
          <v-col cols="12" md="6">
            <div class="block-title">
              Իմ պատվերները
            </div>
            <div style="display: flex; justify-content: space-between;">
              <!-- <div style="text-align: center;">
                <div>
                  <v-icon color="#01B8BE">mdi-undo-variant</v-icon>
                </div>
                <div>Վերադարձի հարցումներ</div>
              </div> -->
              <div style="text-align: center;">
                <a href="/account/orders" style="color: rgba(0, 0, 0, 0.87);">
                  <div>
                    <v-icon color="#01B8BE">mdi-cart</v-icon>
                  </div>
                  <div>Պատվերների պատմություն</div>
                </a>
              </div>
            </div>
            <div style="margin-top: 40px;">
              <div>Բաժանորդագրում նորություններին</div>
              <div class="radio-input">
                <div style="margin-right: 30px;">
                  <input type="radio" name="news" v-model="notifications" value="1" @change="changeNotificationsVal()">
                  <label>Այո</label>
                </div>
                <div>
                  <input type="radio" name="news" v-model="notifications" value="0" @change="changeNotificationsVal()">
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
              <div style="text-align: center; cursor: pointer;" @click="openChangePasswordModal()">
                <div>
                  <v-icon color="#01B8BE">mdi-lock</v-icon>
                </div>
                <div>Փոխել գաղտնաբառը</div>
              </div>
              <div style="text-align: center; cursor: pointer;" @click="openChangeAddressModal()">
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

    <div id="changePassword" style="display: none;" class="modal-shadow" @click.self="closePasswordModal">
        <div class="modal">
            <slot name="body">
                <div class="modal-content">
                  <div>
                    <h2 style="color: #B22180;">Փոխել գաղտնաբառը</h2>
                  </div>
                  <v-form @submit.prevent="false" ref="form" :lazy-validation="true" style="width: 100%; margin-top: 30px;">
                    <v-alert v-if="passwordErrors" text type="error">
                      {{passwordErrors}}
                    </v-alert>
                    <v-card-actions style="display: block; padding: 0;">
                      <label style="color: #352249;">Հին գաղտնաբառը</label>
                      <input type="password" v-model="changePasswordForm.old_password" class="helper-block-input" required>
                    </v-card-actions>
                    <v-card-actions style="display: block; padding: 0;">
                      <label style="color: #352249;">Նոր գաղտնաբառը</label>
                      <input type="password" v-model="changePasswordForm.new_password" class="helper-block-input" required>
                    </v-card-actions>
                  </v-form>
                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-footer__button_approve" @click="changePassword()">
                        Հաստատել
                    </button>
                </div>
            </slot>
        </div>
    </div>

    <div id="changeAddress" style="display: none;" class="modal-shadow" @click.self="closeAddressModal">
        <div class="modal">
            <slot name="body">
                <div class="modal-content">
                  <div>
                    <h2 style="color: #B22180;">Փոփոխել իմ հասցեները</h2>
                  </div>
                  <v-form @submit.prevent="false" ref="form" :lazy-validation="true" style="width: 100%; margin-top: 30px;">
                    <v-alert v-if="addressErrors" text type="error">
                      {{addressErrors}}
                    </v-alert>
                    <v-card-actions style="display: block; padding: 0;">
                      <label style="color: #352249;">Հասցե</label>
                      <input type="text" v-model="changeAddressForm.address" class="helper-block-input" required>
                    </v-card-actions>
                  </v-form>
                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-footer__button_approve" @click="changeAddress()">
                        Հաստատել
                    </button>
                </div>
            </slot>
        </div>
    </div>

    <div id="changePhoto" style="display: none;" class="modal-shadow" @click.self="closePhotoModal">
        <div class="modal">
            <slot name="body">
                <div class="modal-content">
                  <div>
                    <h2 style="color: #B22180;">Փոխել նկարը</h2>
                  </div>
                  <div style="margin-top: 20px;">
                    <input type='file' id="imageUpload" accept=".png, .jpg, .jpeg"/>
                    <input type='hidden' id="imageUploadData"/>
                  </div>
                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-footer__button_approve" @click="changePhoto()">
                        Հաստատել
                    </button>
                </div>
            </slot>
        </div>
    </div>

    <div id="questionnaireModal" style="display: none;" class="modal-shadow" @click.self="closeModal">
        <div class="modal">
            <slot name="body">
                <div class="modal-content">
                    <div class="modal-header">
                      <h4>Հարցաթերթիկ</h4>
                      <div><span class="close-modal" @click="closeModal">x</span></div>
                    </div>
                    <v-form @submit.prevent="false" ref="form" :lazy-validation="true" style="margin-bottom: 30px;">
                      <v-alert v-if="questionnaireError" text type="error">
                        {{questionnaireError}}
                      </v-alert>

                      <div class="questionnaire_block">
                          <v-btn text class="questionnaire_btn" style="text-transform: uppercase;">Հարցաթերթիկ</v-btn>
                          <div style="margin-bottom: 20px;"><span>Ձեր կարծիքը շատ կարևոր է մեզ համար</span></div>
                      </div>

                      <div class="questionnaire_block">
                          <div style="margin-bottom: 20px;"><span>Որտեղի՞ց եք իմացել Kidd'Ok կազմակերպության մասին *</span></div>
                          <div style="margin-bottom: 15px;">
                            <input type="radio" name="how_find_out" v-model="questionnaireForm.how_find_out" value="Համացանցից">
                            <label style="margin-left: 10px;">Համացանցից</label>
                          </div>
                          <div style="margin-bottom: 15px;">
                            <input type="radio" name="how_find_out" v-model="questionnaireForm.how_find_out" value="Կազմակերպության աշխատակիցներից">
                            <label style="margin-left: 10px;">Կազմակերպության աշխատակիցներից</label>
                          </div>
                          <div style="margin-bottom: 15px;">
                            <input type="radio" name="how_find_out" v-model="questionnaireForm.how_find_out" value="Երրորդ անձից">
                            <label style="margin-left: 10px;">Երրորդ անձից</label>
                          </div>
                      </div>

                      <div class="questionnaire_block">
                          <div style="margin-bottom: 20px;"><span>Արդյո՞ք Դուք օգտվում եք www.Kidd'Ok.am կայքից *</span></div>
                          <div style="margin-bottom: 15px;">
                            <input type="radio" name="use_site" v-model="questionnaireForm.use_site" value="Այո">
                            <label style="margin-left: 10px;">Այո</label>
                          </div>
                          <div style="margin-bottom: 15px;">
                            <input type="radio" name="use_site" v-model="questionnaireForm.use_site" value="Ոչ">
                            <label style="margin-left: 10px;">Ոչ</label>
                          </div>
                          <div style="margin-bottom: 15px;">
                            <input type="radio" name="use_site" v-model="questionnaireForm.use_site" value="Տեղյակ չեի">
                            <label style="margin-left: 10px;">Տեղյակ չեի</label>
                          </div>
                      </div>

                      <div class="questionnaire_block">
                          <div style="margin-bottom: 20px;"><span>Ինչպիսի՞ նորարարություն կամ փոփոխություն կցանկանայիք տեսնել Kidd'Ok-ի աշխատանքի մեջ</span></div>
                          <div style="margin-bottom: 15px;">
                            <input class="questionnaire_input" v-model="questionnaireForm.innovations_or_changes" type="text" name="innovations_or_changes" placeholder="Իմ պատասխանը">
                          </div>
                      </div>

                      <div class="questionnaire_block">
                          <div style="margin-bottom: 20px;"><span>Ի՞նչը Ձեզ չի գոհացնում ՊՈՊՈ ԳՐՈՒՊ-ի աշխատանքում</span></div>
                          <div style="margin-bottom: 15px;">
                            <input class="questionnaire_input" v-model="questionnaireForm.not_suit_in_work" type="text" name="not_suit_in_work" placeholder="Իմ պատասխանը">
                          </div>
                      </div>

                      <div class="questionnaire_block">
                          <div style="margin-bottom: 20px;"><span>Խնդրում ենք գնահատել աշխատակիցների սպասարկումը 5 բալանի սանդղակով *</span></div>
                          <div style="display: flex; justify-content: space-between;margin-bottom: 15px;">
                            <div><span>Վատ</span></div>
                            <div>
                              <input type="radio" name="rating" v-model="questionnaireForm.rating" value="1">
                              <div>1</div>
                            </div>
                            <div>
                              <input type="radio" name="rating" v-model="questionnaireForm.rating" value="2">
                              <div>2</div>
                            </div>
                            <div>
                              <input type="radio" name="rating" v-model="questionnaireForm.rating" value="3">
                              <div>3</div>
                            </div>
                            <div>
                              <input type="radio" name="rating" v-model="questionnaireForm.rating" value="4">
                              <div>4</div>
                            </div>
                            <div>
                              <input type="radio" name="rating" v-model="questionnaireForm.rating" value="5">
                              <div>5</div>
                            </div>
                            <div><span>Շատ լավ</span></div>
                          </div>
                      </div>

                      <div class="questionnaire_block">
                          <div style="margin-bottom: 20px;"><span>Անուն,Ազգանուն(պաշտոն) *</span></div>
                          <div style="margin-bottom: 15px;">
                            <input class="questionnaire_input" type="text" v-model="questionnaireForm.name" name="name" placeholder="Իմ պատասխանը">
                          </div>
                      </div>

                      <div class="questionnaire_block">
                          <div style="margin-bottom: 20px;"><span>Կազմակերպության անվանում</span></div>
                          <div style="margin-bottom: 15px;">
                            <input class="questionnaire_input" type="text" v-model="questionnaireForm.company_name" name="company_name" placeholder="Իմ պատասխանը">
                          </div>
                      </div>

                      <div class="questionnaire_block">
                          <div style="margin-bottom: 20px;"><span>Հեռախոսահամար *</span></div>
                          <div style="margin-bottom: 15px;">
                            <input class="questionnaire_input" type="text" v-model="questionnaireForm.phone" name="phone" placeholder="Իմ պատասխանը">
                          </div>
                      </div>

                      <v-card-actions style="padding: 0;">
                        <v-btn color="primary" text @click="sendQuestionnaireForm()" class="questionnaire_btn" style="margin: auto;">Հաստատել</v-btn>
                      </v-card-actions>
                    </v-form>
                </div>
            </slot>
        </div>
    </div>
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
            { hid: this.name, name: this.name, content: this.name }
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
            addressErrors: false,
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
            questionnaireError: false,
            questionnaireForm: {
              user_id: 0,
              how_find_out: '',
              use_site: '',
              innovations_or_changes: '',
              not_suit_in_work: '',
              rating: '',
              name: '',
              company_name: '',
              phone: ''
            },
            changePasswordForm: {
              old_password: '',
              new_password: '',
            },
            changeAddressForm: {
              address: '',
            },
            userPhoto: '',
            notifications: '0',
          }
        },
      components: {
        BestProducts
      },
      methods: {
        async save() {
          await this.$axios.post(this.$axios.defaults.baseURL+'/user/checkPassword', {id: this.user.id, password: this.oldPassword}).then(response => {
           if(response.data.success){
             this.passwordErrors = false;
             this.$store.dispatch('user/update', [this.user.id, this.name, this.email, this.password, this.phone, this.address]);
           }else{
            this.passwordErrors = true;
           }
          }).catch(e => {
            this.registrationError = e.response;
          });
        },
        async sendQuestionnaireForm() {
          if(this.questionnaireForm.name !== "" && this.questionnaireForm.phone !== "" && this.questionnaireForm.rating !== "" && this.questionnaireForm.use_site !== "" && this.questionnaireForm.how_find_out !== "") {
            if(this.user){
              this.questionnaireForm.user_id = this.user.id;
            }
            await this.$axios.post(this.$axios.defaults.baseURL+'/questionnaire/store', this.questionnaireForm).then(response => {
              window.location.href = '/account';
            }).catch(e => {
              this.questionnaireError = e.response;
            });
          } else {
            this.questionnaireError = "Ոչ բոլոր պարտադիր դաշտերն են լրացվաց";
          }
        },
        closeModal() {
          // let modal = document.querySelector('.v-menu__content');
          // for(let i = 0; i < modal.length; i++) {
          //   modal[i].classList.remove('menuable__content__active');
          //   modal[i].style.display = 'none';
          // }
          document.getElementById('questionnaireModal').style.display = 'none';
        },
        openQuestionnaireModal() {
          document.getElementById('questionnaireModal').style.display = 'flex';
        },
        closePasswordModal: function () {
          document.getElementById('changePassword').style.display = 'none';
        },
        closeAddressModal: function () {
          document.getElementById('changeAddress').style.display = 'none';
        },
        closePhotoModal: function () {
          document.getElementById('changePhoto').style.display = 'none';
        },
        openChangePasswordModal() {
          document.getElementById('changePassword').style.display = 'flex';
        },
        openChangeAddressModal() {
          document.getElementById('changeAddress').style.display = 'flex';
        },
        openChangePhotoModal() {
          document.getElementById('changePhoto').style.display = 'flex';
        },
        async changePassword() {
          if(this.changePasswordForm.old_password !== '' && this.changePasswordForm.new_password !== '') {
            await this.$axios.post(this.$axios.defaults.baseURL+'/user/checkPassword', {id: this.user.id, password: this.changePasswordForm.old_password}).then(response => {
              if(response.data.success) {
                this.passwordErrors = false;
                this.$store.dispatch('user/updatePassword', [this.user.id, this.changePasswordForm.old_password, this.changePasswordForm.new_password]).then(response => {
                  document.getElementById('changePassword').style.display = 'none';
                });
              } else {
                this.passwordErrors = "Գաղտնաբառը սխալ է";
              }
            }).catch(e => {
              this.passwordErrors = e.response;
            });
          } else {
            this.passwordErrors = "Գաղտնաբառը լրացվաց չի";
          }
        },
        async changeAddress() {
          if(this.changeAddressForm.address !== '') {
            this.addressErrors = false;
            this.$store.dispatch('user/updateAddress', [this.user.id, this.changeAddressForm.address]).then(response => {
              document.getElementById('changeAddress').style.display = 'none';
            });
          } else {
            this.addressErrors = "Հասցեն լրացվաց չի";
          }
        },
        changePhoto() {
          if(document.getElementById('imageUpload').files[0] !== undefined) {
            var reader = new FileReader();
            reader.onload = function(e) {
              document.getElementById('imageUploadData').value = e.target.result;
            }
            reader.readAsDataURL(document.getElementById('imageUpload').files[0]);

            if(document.getElementById('imageUploadData').value !== "") {
              this.$store.dispatch('user/updateImage', [this.user.id, document.getElementById('imageUploadData').value]).then(response => {
                document.getElementById('changePhoto').style.display = 'none';
                document.querySelector('.user-photo-block').style.backgroundImage = "url('"+document.getElementById('imageUploadData').value+"')";
              });
            }
          }
        },
        changeNotificationsVal() {
          this.$store.dispatch('user/updateNotification', [this.user.id, this.notifications]);
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
      mounted () {
        document.querySelector('.account-page-block').parentNode.style.position = 'unset';
        if(this.user){
          this.notifications = this.user.notifications;
          let user_photo_blocks = document.querySelectorAll('.user-photo-block');
          for(let i = 0; i < user_photo_blocks.length; i++) {
            user_photo_blocks[i].style.backgroundImage = "url('"+this.user.image+"')";
          }
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
    margin-right: -50px;
    margin-left: -50px;
    margin-top: -40px;
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

  .helper-block-input {
    width: 100%;
    border: 2px solid #C6C3C3;
    border-radius: 6px;
    padding: 6px 12px;
    margin-bottom: 20px;
    background: white;
    margin-top: 10px;
  }

  .user-photo-block {
    width: 240px;
    height: 240px;
    background-position: 50% 50%;
    background-size: cover;
    border-radius: 50%;
    margin: 0 auto 20px auto;
  }

  @media (max-width: 959px) {
    .account-page-block {
      margin-top: 170px;
    }

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
            padding: 50px;
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