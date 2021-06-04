<template>
  <div>
    <v-system-bar height="auto" style="z-index: 5;" color="#01B8BE" fixed app dark id="create" >
      <v-col lg="1" md="1" class="text-center" style="padding: 0;">
        <nuxt-link :to="localePath('/')" style="text-decoration: none;">
          <img src="http://kiddokback.neoteric-software.com/images/Kiddok_logo_02-1.png" width="100%">
        </nuxt-link>
      </v-col>
      <v-col class="hidden-sm-and-down" lg="7" md="7">
        <v-row class="hidden-sm-and-down" no-gutters >
          <v-menu :open-on-hover="true" bottom offset-y v-for="(item, i) in leftSide" dark :key="i">
            <template v-slot:activator="{on}">
              <div v-if="item.to==='/sections'" class="sections-menu-block-title" style="position: relative">
                <v-btn  exact color="#fff" text class="my-2 nav_button" v-on="on" bottom @click="openSectionsMenu" style="border: none;">
                  <div>{{ item.title }}</div>
                </v-btn>

                <div class="sections-menu-block" style="display: none;">
                  <div>
                    <div class="section-block" style="display: flex; align-items: center;">
                      <img src="http://kiddokback.neoteric-software.com/images/Kiddok_logo_04-1.png" width="60px">
                      <nuxt-link :to="`/brand/2?page=1`">
                        <span>Բրենդ</span>
                      </nuxt-link>
                    </div>
                    <div v-for="(item, i) in categoriesBlock" :key="i">
                      <div v-if="parentCategoryID !== item.id"  class="section-block">
                        <nuxt-link :to="item.to">
                          {{item.title}}
                        </nuxt-link>
                      </div>
                      <div v-else class="section-block">
                        <nuxt-link :to="`#`">
                          {{item.title}}
                        </nuxt-link>
                        <v-icon v-text="'mdi-chevron-down'" size="30" style="color: #B22180; cursor: pointer;" @click="openAgeMenu"></v-icon>
                      </div>
                    </div>
                  </div>
                  <div class="age-menu-block" style="display: none;">
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
              <div v-else-if="item.to==='/wholesale'">
                <v-btn v-if="user && user.role === 'juridical'" exact color="#fff" text class="my-2 nav_button" v-on="on" bottom @click="openSectionsMenu" style="border: none;">
                  <div>{{ item.title }}</div>
                </v-btn>
              </div>
              <div v-else>
                <v-btn  exact :to="localePath(item.to)" router color="#fff" text class="my-2 nav_button" v-on="on" bottom >
                  <div>{{ item.title }}</div>
                </v-btn>
              </div>
            </template>
          </v-menu>
        </v-row>
      </v-col>
      <v-row justify="center" class="hidden-sm-and-down">
        <div style="padding: 0; margin: 5px 0 5px 10px; position: relative;">
            <input class="search-input" placeholder="ՈՐՈՆԵԼ" v-model="search_product_name">

            <div class="search-block" style="display: none;"></div>
        </div>

        <v-btn v-if="authenticated" color="#fff" text class="my-2 nav_button" v-on="on" style="border: none; position: relative;">
          <a href="/account" style="color: white;">{{user.name + ' ' + user.lastname}}</a>
          <v-icon @click="openAccountMenu">mdi-chevron-down</v-icon>

          <v-list v-if="authenticated" class="accountMenu" style="display: none;">
            <v-list-item @click="openHelperModal" v-text="'իմ օգնականը'" style="color: black !important;"></v-list-item>
            <v-list-item @click="logout" v-text="'Դուրս գալ'" style="color: black !important;"></v-list-item>
          </v-list>
        </v-btn>

        <v-btn v-if="!authenticated" color="#fff" text class="my-2 nav_button" v-on="on" @click="openLoginModal()">
          <v-icon >mdi-account-outline</v-icon>
          {{$t('myAccount')}}
        </v-btn>

        <!-- <v-menu v-if="!authenticated" v-model="loginMenu" :close-on-content-click="false" :nudge-width="200" offset-y bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="#fff" text class="my-2 nav_button" v-on="on" >
              <v-icon >mdi-account-outline</v-icon>
              {{$t('myAccount')}}
            </v-btn>
          </template>
          <v-card class="login-form">
            <v-list v-if="authenticated" style="background-color: #01235E" dark>
            </v-list>
             <v-tabs v-else  background-color="#01235E" class="elevation-2" dark :centered="true" :prev-icon="'mdi-arrow-left-bold-box-outline'" :next-icon="'mdi-arrow-right-bold-box-outline'" :icons-and-text="true" >
              <v-tabs-slider></v-tabs-slider>
              <v-tab :href="`#tab-1`" >
                Login
              </v-tab>
              <v-tab-item :value="'tab-1'">
                <v-card flat tile style="padding: 20px 100px">
                  <v-card-text>
                    <img src="http://kiddokback.neoteric-software.com/images/Kiddok_logo_04-1.png" width="40%" style="margin: 0 auto 20px auto; display: flex;">
                    <h3 style="text-align: center; margin-bottom: 30px;">ՄՈՒՏՔ ԱՆՁՆԱԿԱՆ ԷՋ</h3>
                    <v-form @submit.prevent="false" ref="form" v-model="valid" :lazy-validation="true" >
                      <v-alert v-if="errors.email" text type="error">
                        {{errors.email[0]}}
                      </v-alert>
                      <v-alert v-if="loginError" text type="error">
                        {{loginError}}
                      </v-alert>
                      
                      <v-card-actions style="display: block; padding: 0;">
                        <label>ԷԼԵԿՏՐՈՆԱՅԻՆ ՀԱՍՑԵ</label>
                        <div style="position: relative;">
                          <input v-model="loginForm.email" :rules="emailRules" placeholder="Էլ հասցե կամ հեռախոսահամար" style="width: 100%;border: 2px solid #C6C3C3;border-radius: 6px;padding: 6px 12px;margin-bottom: 20px;margin-top: 10px;" required>
                          <v-icon style="position: absolute; top: 23%; right: 3%;">mdi-email-outline</v-icon>
                        </div>
                      </v-card-actions>
                      <v-card-actions style="display: block; padding: 0;">
                        <label>ԳԱՂՏՆԱԲԱՌ</label>
                        <div style="position: relative;">
                          <input v-model="loginForm.password" :rules="passwordRules" type="password" style="width: 100%;border: 2px solid #C6C3C3;border-radius: 6px;padding: 6px 12px;margin-bottom: 20px;margin-top: 10px;" required>
                          <v-icon style="position: absolute; top: 23%; right: 3%;">mdi-lock-outline</v-icon>
                        </div>
                      </v-card-actions>

                      <v-card-actions style="padding: 0;">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="loginAction" style="background: #B22180; width: 100%; padding: 12px; border-radius: 6px; color: white !important;">ՄՈԻՏՔ</v-btn>
                      </v-card-actions>
                    </v-form>
                    <div style="margin-top: 40px;text-align: center;">
                        <a href="#" @click="openPasswordModal()">Մոռացե՞լ եք Գաղտնաբառը</a>
                    </div>
                    <div style="margin-top: 30px;text-align: center;">
                        <a href="/register">Գրանցվել</a>
                    </div>
                    <div style="margin-top: 100px;">
                      <p>Մուտք գործելով `դուք նշում եք, որ կարդացել եք և ընդունում եք Օգտագործման պայմանները և Գաղտնիության քաղաքականությունը.</p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>

          </v-card>
        </v-menu> -->

        <div v-if="!authenticated" style="padding: 0; margin: 5px 0;">
            <v-btn :to="localePath('/register')" color="#fff" text class="my-2 nav_button" style="border: none;">
              {{$t('register')}}
            </v-btn>
        </div>

        <div v-if="!cartLength">
          <v-btn :to="localePath('/cart')" color="#fff" text class="my-2 nav_button" width="50px" style="border: none;">
            <v-icon >mdi-cart-outline</v-icon>
          </v-btn>
        </div>

        <v-badge v-else color="error" :content="cartLength">
          <v-btn :to="localePath('/cart')" color="#fff" text class="my-2 nav_button" width="50px" style="border: none;">
            <v-icon >mdi-cart-outline</v-icon>
          </v-btn>
        </v-badge>
      </v-row>

      <div class="mobile-menu" style="display: none; margin: 0 20px;">
        <div style="padding: 0; margin: 10px 40px; position: relative;">
            <input class="search-input" placeholder="ՈՐՈՆԵԼ" v-model="search_product_name2">
            <div class="search-block2" style="display: none;"></div>
        </div>

        <main id="foo" style="margin: 10px 0;">
          <button id="hamburger" @click="showMenu">
          <svg width="50px" height="50px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="Artboard" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <circle id="Oval" stroke="#FFFFFF" cx="50" cy="50" r="49.5"></circle>
                <rect id="Rectangle" fill="#FFFFFF" x="25" y="33" width="50" height="2"></rect>
                <rect id="Rectangle-Copy" fill="#FFFFFF" x="25" y="49" width="50" height="2"></rect>
                <rect id="Rectangle-Copy-2" fill="#FFFFFF" x="25" y="66" width="50" height="2"></rect>
            </g>
          </svg>
          </button>
            <nav v-show="navVisible">
              <div class="mobile-menu-items">
                <div style="height: 70px; width: 50px; margin: 0 auto;">
                  <button class="close" @click="hideMenu" style="display: block;margin: 10px auto;">
                  <svg width="50px" height="50px" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                      <g id="close" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                          <circle id="Oval" stroke="#000000" cx="50" cy="50" r="49.5"></circle>
                          <rect id="Rectangle" fill="#000000" transform="translate(50.000000, 50.000000) rotate(45.000000) translate(-50.000000, -50.000000) " x="25" y="49" width="50" height="2"></rect>
                          <rect id="Rectangle-Copy-2" fill="#000000" transform="translate(50.000000, 50.000000) rotate(-45.000000) translate(-50.000000, -50.000000) " x="25" y="49" width="50" height="2"></rect>
                      </g>
                  </svg>
                  </button>
                </div>
                <v-menu :open-on-hover="true" bottom offset-y v-for="(item, i) in leftSide" dark :key="i">
                  <template v-slot:activator="{on}">
                    <div v-if="item.to==='/sections'" class="sections-menu-block-title" style="position: relative">
                      <v-btn  exact color="#fff" text class="my-2 nav_button" v-on="on" bottom @click="openSectionsMenu" style="border: none;">
                        <div>{{ item.title }}</div>
                      </v-btn>

                      <div class="sections-menu-block" style="display: none;">
                        <div>
                          <div class="section-block" style="display: flex; align-items: center;">
                            <img src="http://kiddokback.neoteric-software.com/images/Kiddok_logo_04-1.png" width="60px">
                            <nuxt-link :to="`/brand/2?page=1`">
                              <span>Բրենդ</span>
                            </nuxt-link>
                          </div>
                          <div v-for="(item, i) in categoriesBlock" :key="i">
                            <div v-if="parentCategoryID !== item.id"  class="section-block">
                              <nuxt-link :to="item.to">
                                {{item.title}}
                              </nuxt-link>
                            </div>
                            <div v-else class="section-block">
                              <nuxt-link :to="`#`">
                                {{item.title}}
                              </nuxt-link>
                              <v-icon v-text="'mdi-chevron-down'" size="30" style="color: #B22180; cursor: pointer;" @click="openAgeMenu"></v-icon>
                            </div>
                          </div>
                        </div>
                        <div class="age-menu-block" style="display: none;">
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
                    <div v-else-if="item.to==='/wholesale'">
                      <v-btn v-if="user && user.role === 'juridical'" exact color="#fff" text class="my-2 nav_button" v-on="on" bottom @click="openSectionsMenu" style="border: none;">
                        <div>{{ item.title }}</div>
                      </v-btn>
                    </div>
                    <div v-else>
                      <v-btn  exact :to="localePath(item.to)" router color="#fff" text class="my-2 nav_button" v-on="on" bottom >
                        <div>{{ item.title }}</div>
                      </v-btn>
                    </div>
                  </template>
                </v-menu>
                <v-btn v-if="authenticated" color="#000000" text class="my-2 nav_button" v-on="on" style="border: none; position: relative;">
                  <a href="/account" style="color: white;">{{user.name + ' ' + user.lastname}}</a>
                  <v-icon @click="openAccountMenu" color="#000000">mdi-chevron-down</v-icon>

                  <v-list v-if="authenticated" class="accountMenu" style="display: none; z-index: 10;">
                    <v-list-item @click="openHelperModal" v-text="'իմ օգնականը'" style="color: black !important;"></v-list-item>
                    <v-list-item @click="logout" v-text="'Դուրս գալ'" style="color: black !important;"></v-list-item>
                  </v-list>
                </v-btn>

                <v-btn v-if="!authenticated" color="#000000" text class="my-2 nav_button" v-on="on" @click="openLoginModal()">
                  <v-icon color="#000000">mdi-account-outline</v-icon>
                  {{$t('myAccount')}}
                </v-btn>

                <div v-if="!authenticated" style="padding: 0; margin: 5px 0;">
                    <v-btn :to="localePath('/register')" color="black" text class="my-2 nav_button" style="border: none;">
                      {{$t('register')}}
                    </v-btn>
                </div>

                <div v-if="!cartLength">
                  <v-btn :to="localePath('/cart')" color="#000000" text class="my-2 nav_button" width="50px" style="border: none;">
                    <v-icon color="#000000">mdi-cart-outline</v-icon>
                  </v-btn>
                </div>

                <v-badge v-else color="error" :content="cartLength">
                  <v-btn :to="localePath('/cart')" color="#000000" text class="my-2 nav_button" width="50px" style="border: none;">
                    <v-icon color="#000000">mdi-cart-outline</v-icon>
                  </v-btn>
                </v-badge>
              </div>
            </nav>
        </main>
      </div>
    </v-system-bar>

    <div id="helperModal" style="display: none;" class="modal-shadow" @click.self="closeModal">
        <div class="modal">
            <slot name="body">
                <div class="modal-content">
                  <div>
                    <h2 style="color: #B22180;">իմ օգնականը</h2>
                  </div>
                  <div style="display: flex; align-items: center; margin: 20px 0;">
                    <div v-if="user && user.image" style="margin-right: 20px;">
                      <div class="user-photo-block" style="width: 100px; height: 100px;"></div>
                    </div>
                    <div v-else style="margin-right: 20px;">
                      <v-icon size="100">mdi-account-circle-outline</v-icon>
                    </div>
                    <div v-if="authenticated">
                      <span style="color: #B22180;">{{user.name + ' ' + user.lastname}}</span>
                    </div>
                  </div>
                  <v-form @submit.prevent="false" ref="form" :lazy-validation="true" style="width: 100%; margin-top: 30px;">
                    <v-alert v-if="callbackErrors" text type="error">
                      {{callbackErrors}}
                    </v-alert>
                    <v-card-actions style="display: block; padding: 0;">
                      <label style="color: #352249;">Հեռ.</label>
                      <input type="text" v-model="callbackForm.phone" class="helper-block-input" required>
                    </v-card-actions>
                    <v-card-actions style="display: block; padding: 0;">
                      <label style="color: #352249;">Գրել նամակ</label>
                      <textarea v-model="callbackForm.message" class="helper-block-input"></textarea>
                    </v-card-actions>
                  </v-form>
                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-footer__button_approve" @click="callback()">
                        Հաստատել
                    </button>
                </div>
            </slot>
        </div>
    </div>

    <div id="resetPassword" style="display: none;" class="modal-shadow" @click.self="closePasswordModal">
        <div class="modal">
            <slot name="body">
                <div class="modal-content">
                  <div>
                    <h2 style="color: #B22180;">Վերականգնել գաղտնաբառը</h2>
                  </div>
                  <v-form @submit.prevent="false" ref="form" :lazy-validation="true" style="width: 100%; margin-top: 30px;">
                    <v-alert v-if="passwordErrors" text type="error">
                      {{passwordErrors}}
                    </v-alert>
                    <v-card-actions style="display: block; padding: 0;">
                      <label style="color: #352249;">Էլ. հասցե</label>
                      <input type="email" v-model="changePasswordForm.email" class="helper-block-input" required>
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
                    <button class="modal-footer__button_approve" @click="resetPassword()">
                        Հաստատել
                    </button>
                </div>
            </slot>
        </div>
    </div>

    <div id="loginModal" style="display: none;" class="modal-shadow" @click.self="closeLoginModal">
        <div class="modal">
            <slot name="body">
                <div class="modal-content">
                    <v-card flat tile style="padding: 20px">
                      <v-card-text>
                        <img src="http://kiddokback.neoteric-software.com/images/Kiddok_logo_04-1.png" width="40%" style="margin: 0 auto 20px auto; display: flex;">
                        <h3 style="text-align: center; margin-bottom: 30px;">ՄՈՒՏՔ ԱՆՁՆԱԿԱՆ ԷՋ</h3>
                        <v-form @submit.prevent="false" ref="form" v-model="valid" :lazy-validation="true" >
                          <v-alert v-if="errors.email" text type="error">
                            {{errors.email[0]}}
                          </v-alert>
                          <v-alert v-if="loginError" text type="error">
                            {{loginError}}
                          </v-alert>
                          
                          <v-card-actions style="display: block; padding: 0;">
                            <label>ԷԼԵԿՏՐՈՆԱՅԻՆ ՀԱՍՑԵ</label>
                            <div style="position: relative;">
                              <input v-model="loginForm.email" :rules="emailRules" placeholder="Էլ հասցե կամ հեռախոսահամար" style="width: 100%;border: 2px solid #C6C3C3;border-radius: 6px;padding: 6px 12px;margin-bottom: 20px;margin-top: 10px;" required>
                              <v-icon style="position: absolute; top: 23%; right: 3%;">mdi-email-outline</v-icon>
                            </div>
                          </v-card-actions>
                          <v-card-actions style="display: block; padding: 0;">
                            <label>ԳԱՂՏՆԱԲԱՌ</label>
                            <div style="position: relative;">
                              <input v-model="loginForm.password" :rules="passwordRules" type="password" style="width: 100%;border: 2px solid #C6C3C3;border-radius: 6px;padding: 6px 12px;margin-bottom: 20px;margin-top: 10px;" required>
                              <v-icon style="position: absolute; top: 23%; right: 3%;">mdi-lock-outline</v-icon>
                            </div>
                          </v-card-actions>

                          <v-card-actions style="padding: 0;">
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="loginAction" style="background: #B22180; width: 100%; padding: 12px; border-radius: 6px; color: white !important;">ՄՈԻՏՔ</v-btn>
                          </v-card-actions>
                        </v-form>
                        <div style="margin-top: 40px;text-align: center;">
                            <a href="#" @click="openPasswordModal()">Մոռացե՞լ եք Գաղտնաբառը</a>
                        </div>
                        <div style="margin-top: 30px;text-align: center;">
                            <a href="/register">Գրանցվել</a>
                        </div>
                        <div style="margin-top: 100px;">
                          <p>Մուտք գործելով `դուք նշում եք, որ կարդացել եք և ընդունում եք Օգտագործման պայմանները և Գաղտնիության քաղաքականությունը.</p>
                        </div>
                      </v-card-text>
                    </v-card>
                </div>
            </slot>
        </div>
    </div>
  </div>
</template>

<script>
    export default {
      props: ['header'],
      async fetch({store}) {
        await store.dispatch('brands/fetch');
        await store.dispatch('categories/fetch');
        await store.dispatch('menus/fetch');
      },
      data () {
        return {
          subTitle: 'Retail Company',
          on: false,
          wishlistCount: 0,
          cartCount: 0,
          registrationError: false,
          loginError: false,
          fab: false,
          direction: 'bottom',
          fling: false,
          hover: false,
          tabs: null,
          top: false,
          bottom: true,
          headerHeight: 190,
          left: false,
          menuAbsolute: false,
          transition: 'slide-y-reverse-transition',
          registerForm: {
            name: '',
            email: '',
            password: '',
            password_confirmation: '',
          },
          loginForm: {
            email: '',
            password: ''
          },
          passwordRules: [
            v => !!v || 'Password is required',
          ],
          passwordConfirmation: [
            v => !!v || 'Confirm password',
            v => v === this.registerForm.password || 'Password is note correct'
          ],
          nameRules: [
            v => !!v || 'Name is required',
          ],
          emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
          ],
          clipped: true,
          right: true,
          miniVariant: false,
          drawerForHeader: false,
          valid: true,
          checkbox: false,
          menu: false,
          loginMenu: false,
          MainLanguage: "armenian",
          languages: [
            { text: 'armenian', to: 'am', icon: '/arm.png', callback: () => console.log('') },
            { text: 'russian', to: 'ru', icon: '/rus.png', callback: () => console.log('') },
            { text: 'english', to: 'en', icon: '/eng.png', callback: () => console.log('') },
          ],
          leftSide: [
            {
              title: this.$t('aboutUs'),
              to: '/aboutUs'
            },
            { title: this.$t('sections'),
              to: '/sections',
            },
            { title: this.$t('wholesale'),
              to: '/wholesale'
            },
            { title: this.$t('news'),
              to: '/news'
            },
            { title: this.$t('partners'),
              to: '/partners'
            },
          ],
          rightSide: [
          ],
          categoriesBlock: [],
          subcategoriesBlock: [],
          parentCategoryID: 0,
          passwordErrors: false,
          callbackErrors: false,
          changePasswordForm: {
            email: '',
            new_password: '',
          },
          callbackForm: {
            user_id: 0,
            phone: '',
            message: '',
          },
          search_product_name: '',
          search_product_name2: '',
          navVisible: false
        }
      },
      computed: {
        brands() {
          return this.$store.getters['brands/brands'];
        },
        categories() {
          return this.$store.getters['categories/categories'];
        },
        wishListLength(){
          return this.$store.getters['wishListAndCart/wishListLength']
        },
        cartLength(){
          return this.$store.getters['wishListAndCart/cartLength']
        },
        menus() {
          return this.$store.getters['menus/menus'];
        }
      },
      async mounted () {
        window.addEventListener('click', function(e){
          if(document.querySelector('.sections-menu-block-title') !== null) {
            if (document.querySelector('.sections-menu-block-title').contains(e.target)){
            } else{
              document.querySelector('.sections-menu-block').style.display = "none";
            }
          }
          if(document.querySelector('.search-block') !== null) {
            if (document.querySelector('.search-block').contains(e.target)){
            } else{
              document.querySelector('.search-block').style.display = "none";
            }
          }
        });

        let all_categories = await this.$axios.$get(this.$axios.defaults.baseURL+'/category/get');
        // console.log(all_categories);

        if(window.innerWidth >= 960){
          this.drawerForHeader = false;
        }
        if (this.$i18n.locale === 'am'){
           this.MainLanguage = "armenian"
        }else if(this.$i18n.locale === 'ru'){
           this.MainLanguage = "russian"
        }else if(this.$i18n.locale === 'en'){
           this.MainLanguage = "english"
        }
        for(let menu of this.menus.menus){
          let menusConstruct = JSON.parse(this.menus.menus[0].construction);
          for(let item of menusConstruct){
            let index = this.menus.categories.findIndex(i=>i.id===item.id);
            let mainMenu = {
              title_en: this.menus.categories[index].name_en,
              title_ru: this.menus.categories[index].name_ru,
              title_am: this.menus.categories[index].name_am,
              to: '/category/' + item.id + '?page=1',
              items: [],
              items2: []
            };
            if(item.menus.length > 0){
              for(let menuItem of item.menus){
                let indexItem = this.menus.categories.findIndex(i=>i.id===menuItem.id);
                mainMenu.items.push({
                  id: menuItem.id,
                  title_en: this.menus.categories[indexItem].name_en,
                  title_ru: this.menus.categories[indexItem].name_ru,
                  title_am: this.menus.categories[indexItem].name_am,
                  to: '/category/' + menuItem.id + '?page=1'
                })

                if(menuItem.menus.length > 0){
                  for(let menuItemItem of menuItem.menus){
                    let indexItemItem = this.menus.categories.findIndex(i=>i.id===menuItemItem.id);
                    mainMenu.items2.push({
                      parent: this.menus.categories[indexItemItem].parent,
                      title_en: this.menus.categories[indexItemItem].name_en,
                      title_ru: this.menus.categories[indexItemItem].name_ru,
                      title_am: this.menus.categories[indexItemItem].name_am,
                      to: '/category/' + menuItemItem.id + '?page=1'
                    })
                  }
                }
              }
            }
            this.rightSide.unshift(mainMenu);
          }

        }
        let cookieResWishlist = this.$cookies.get('davmar_wishlist');
        if(cookieResWishlist !== undefined){
          this.wishlistCount = cookieResWishlist.length
        }
        let cookieResCart = this.$cookies.get('davmar_cart');
        if(cookieResCart !== undefined){
          this.cartCount = cookieResCart.length
        }
        this.onResize();

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

        // this.brands.forEach(elem => {
        //   this.leftSide[0].items.push(
        //     {
        //       id: elem.brand.id,
        //       title: elem.brand.name,
        //       to: '/brand/'+elem.brand.id+'?page=1',
        //     }
        //   )
        //   if(elem.categories !== undefined) {
        //     elem.categories.forEach(elem2 => {
        //       this.leftSide[0].items2.push(
        //         {
        //           id: elem2.id,
        //           brand: elem2.brand,
        //           title_am: elem2.name_am,
        //           title_ru: elem2.name_ru,
        //           title_en: elem2.name_en,
        //           to: '/category/'+elem2.id+'?page=1',
        //         }
        //       )
        //       if(elem2.subcategories !== undefined) {
        //         elem2.subcategories.forEach(elem3 => {
        //           this.leftSide[0].items3.push(
        //             {
        //               parent: elem3.parent,
        //               title_am: elem3.name_am,
        //               title_ru: elem3.name_ru,
        //               title_en: elem3.name_en,
        //               to: '/category/'+elem3.id+'?page=1',
        //             }
        //           )
        //         })
        //       }
        //     })
        //   }
        // })

        if(this.user && document.querySelector('.user-photo-block') !== null){
          document.querySelector('.user-photo-block').style.backgroundImage = "url('"+this.user.image+"')";
        }
      },
      methods: {
        onResize () {
          if(window.innerWidth >= 960){
            this.drawerForHeader = false;
            this.headerHeight = 190;
          }else if(window.innerWidth >= 796){
            this.headerHeight = 150;
          }else if(window.innerWidth < 600){
            this.headerHeight = 145;
          }else{
            this.headerHeight = 115;
          }
          this.windowSize = { x: window.innerWidth, y: window.innerHeight }
        },
        async registerAction() {

          await this.$axios.post(this.$axios.defaults.baseURL+'/auth/register', this.registerForm).then(response => {
            this.menu = false;
            this.$auth.login({data: this.registerForm});
          }).catch(e => {
            this.registrationError = e.response;
          });
        },
        async loginAction() {
          await this.$auth.login({data: this.loginForm}).then(async(response) => {
            if(response.data.data.approved !== "1") {
              await this.$auth.logout().then(response => {}).catch(e => {});
              this.loginError = "Ձեր հաշիվը դեռ չի հաստատվել";
            }
            this.menu = false;
          }).catch(e => {
            this.loginError = e.response;
          });
        },
        async logout(){
          await this.$auth.logout().then(response => {
            this.menu = false;

          }).catch(e => {


          });
        },
        openAgeMenu() {
          let block = document.querySelector('.age-menu-block');
          if(block.style.display === 'none') {
            block.style.display = 'block';
          } else {
            block.style.display = 'none';
          }
        },
        openSectionsMenu() {
          let block = document.querySelector('.sections-menu-block');
          if(block.style.display === 'none') {
            block.style.display = 'flex';
          } else {
            block.style.display = 'none';
          }
        },
        closeModal: function () {
          document.getElementById('helperModal').style.display = 'none';
        },
        closePasswordModal: function () {
          document.getElementById('resetPassword').style.display = 'none';
        },
        closeLoginModal: function () {
          document.getElementById('loginModal').style.display = 'none';
        },
        openHelperModal(){
          let modals = document.querySelectorAll(".modal-shadow");
          for(let i = 0; i < modals.length; i++) {
            modals[i].style.display = "none";
          }
          document.getElementById('helperModal').style.display = 'flex';
        },
        openPasswordModal(){
          // let modals = document.querySelectorAll(".v-menu__content");
          // for(let i = 0; i < modals.length; i++) {
          //   modals[i].style.display = "none";
          // }
          let modals = document.querySelectorAll(".modal-shadow");
          for(let i = 0; i < modals.length; i++) {
            modals[i].style.display = "none";
          }
          document.getElementById('resetPassword').style.display = 'flex';
        },
        openAccountMenu() {
          let accountMenu = document.querySelector('.accountMenu');
          if(accountMenu.style.display === 'none') {
            accountMenu.style.display = 'block';
          } else {
            accountMenu.style.display = 'none';
          }
        },
        openLoginModal(){
          let modals = document.querySelectorAll(".modal-shadow");
          for(let i = 0; i < modals.length; i++) {
            modals[i].style.display = "none";
          }
          document.getElementById('loginModal').style.display = 'flex';
        },
        async resetPassword() {
          if(this.changePasswordForm.email !== '' && this.changePasswordForm.new_password !== '') {
            this.passwordErrors = false;
            this.$store.dispatch('user/resetPassword', [this.changePasswordForm.email, this.changePasswordForm.new_password]).then(response => {
              document.getElementById('resetPassword').style.display = 'none';
              alert("Գաղտնաբառը հաջողությամբ փոխվել է");
            });
          } else {
            this.passwordErrors = "Ոչ բոլոր դաշտերն են լրացվաց";
          }
        },
        async callback() {
          if(this.callbackForm.phone !== "" && this.callbackForm.message !== "") {
            if(this.user){
              this.callbackForm.user_id = this.user.id;
            }
            await this.$axios.post(this.$axios.defaults.baseURL+'/callback/store', this.callbackForm).then(response => {
              alert("Ձեր նամակը հաջողությամբ ուղարկվել է!");
              document.getElementById('helperModal').style.display = 'none';
              this.callbackForm.phone = "";
              this.callbackForm.message = "";
              this.callbackErrors = false;
            }).catch(e => {
              this.callbackErrors = e.response;
            });
          } else {
            this.callbackErrors = "Ոչ բոլոր դաշտերն են լրացվաց";
          }
        },
        async searchProduct() {
          document.querySelector('.search-block').style.display = "block";
          let all_products = await this.$axios.$get(this.$axios.defaults.baseURL+'/product/get');
          let result = [];

          all_products.forEach(elem => {
            if(elem.name_am.toLowerCase().indexOf(this.search_product_name.toLowerCase()) !== -1) {
              result.push(elem);
            }
          });

          let search_result = "";
          result.forEach(elem => {
            search_result += "<div style='display: flex; align-items: center;'><img src='"+JSON.parse(elem.images)[0]+"' style='width: 70px;margin-right: 10px;'><a href='/product/"+elem.id+"'>"+elem.name_am+"</a></div>";
          });

          document.querySelector('.search-block').innerHTML = search_result;
        },
        async searchProduct2() {
          document.querySelector('.search-block2').style.display = "block";
          let all_products = await this.$axios.$get(this.$axios.defaults.baseURL+'/product/get');
          let result = [];

          all_products.forEach(elem => {
            if(elem.name_am.toLowerCase().indexOf(this.search_product_name2.toLowerCase()) !== -1) {
              result.push(elem);
            }
          });

          let search_result = "";
          result.forEach(elem => {
            search_result += "<div style='display: flex; align-items: center;'><img src='"+JSON.parse(elem.images)[0]+"' style='width: 70px;margin-right: 10px;'><a href='/product/"+elem.id+"'>"+elem.name_am+"</a></div>";
          });

          document.querySelector('.search-block2').innerHTML = search_result;
        },
        closeSearch: function() {
          document.querySelector('.search-block').style.display = "none";
        },
        showMenu: function() {
          console.log('show');
          this.navVisible = true;
          console.log(this.navVisible);
        },
        hideMenu: function() {
          console.log('hide');
          this.navVisible = false;
          console.log(this.navVisible);
        }
      },
      watch: {
        search_product_name: function() {
          this.searchProduct();
        },
        search_product_name2: function() {
          this.searchProduct2();
        }
      },
    }
</script>

<style>

  .v-list-item__content > * {
      line-height: 1.1;
      flex: 1 0 10% !important;
  }
  .v-input__slot {
    border-color: transparent !important;
  }
  #create{
    flex-wrap: wrap;
  }
  #create .v-speed-dial {
    position: absolute;
  }

  #create .v-btn--floating {
    position: relative;
  }
  #create .v-speed-dial--right {
    right: 10px;
  }
  #create .v-speed-dial--bottom {
    bottom: 13px;
  }
  @media (min-width: 1904px) {
    .show-in-lg {
      display: none;
    }
  }
  @media (max-width: 959px) {
    .show-in-lg{
      display: none;
    }
    .responsive-text{
      text-align: center !important;
      white-space: nowrap;
      padding: 0;
    }
    .v-system-bar{
      height: auto !important;
    }

    .category-block {
      display: block !important;
      width: 100%;
    }

    .mobile-category-menu {
      height: 100vh;
      overflow-y: scroll;
    }

    .mobile-menu {
      display: flex !important;
      justify-content: flex-end;
      align-items: center;
    }

    .mobile-menu .mobile-menu-items {
      position: absolute;
      width: max-content;
      background: white;
      padding: 10px 20px;
      z-index: 100;
      height: 100vh;
      right: 0;
      top: 0;
    }

    .mobile-menu .mobile-menu-items a, .mobile-menu .mobile-menu-items span {
      color: #352249 !important;
    }

    .v-application .justify-center {
      padding: 10px 0;
    }

    .v-system-bar img {
      width: 40%;
    }

    .sections-menu-block {
      top: 0 !important;
      width: 200px !important;
      left: 100% !important;
    }

    .v-menu__content {
        position: fixed !important;
        min-width: 90% !important;
        max-width: 90% !important;
        top: 5% !important;
        left: 5% !important;
        max-height: 600px;
        z-index: 1 !important;
    }

    .v-menu__content .v-item-group .v-window-item .v-card {
      padding: 20px !important;
    }

    .modal {
      min-width: 90%;
      max-width: 90%;
      top: 12%;
    }
  }

  @media (min-width: 959px) {
    .v-menu__content {
      position: fixed !important;
      min-width: 600px !important;
      max-width: 600px !important;
      top: 15% !important;
      left: 31% !important;
      overflow: auto;
      max-height: 600px;
      z-index: 1 !important;
    }
    .modal {
      min-width: 600px;
      max-width: 600px;
      top: 12%;
    }
  }

  .mobile-icons a, .mobile-icons button {
    width: 40px;
    color: #fff;
    caret-color: #fff;
    background-color: rgb(1, 35, 94);
    border-color: rgb(1, 35, 94);
    border-radius: 50%;
    height: 40px !important;
    min-width: 40px !important;
    padding: 0 !important;
    margin: 0 15px;
  }

  .v-list-item__content, .leftSide-menu-items {
    padding: 12px 16px;
  }

  .leftSide-menu {
    padding: 0 !important;
  }

  .leftSide-menu a {
    padding: 0 16px;
  }

  .v-btn:not(.v-btn--round).v-size--default {
    height: min-content !important;
    border-radius: 0;
    font-size: 12px;
  }

  .my-2.nav_button.v-btn:not(:last-child) {
    border-right: 1px solid #fff;
  }

  .login-form {
    width: 600px;
  }

  .v-tabs--icons-and-text > .v-tabs-bar {
    display: none;
  }

  .v-btn__content {
    padding: 3px 0;
  }

  .section-block {
    margin-bottom: 15px !important;
  }

  .section-block a {
    color: #352249 !important;
  }

  .age-menu-block {
    /* display: none; */
    padding-left: 15px;
    margin: 50px 0 25px 30px !important;
  }

  .sections-menu-block {
    /* display: none; */
    position: absolute;
    background: white;
    top: 145%;
    padding: 10px 40px;
    width: max-content;
    left: -50%;
  }

  .search-block, .search-block2 {
    position: absolute;
    background: white;
    top: 145%;
    padding: 10px;
    width: max-content;
    left: 0;
    color: #352249;
    min-width: 218px;
    max-height: 300px;
    overflow: auto;
    border: 1px solid rgb(1, 184, 190);
  }

  .search-block a, .search-block2 a {
    color: #352249 !important;
  }

  .search-block > div, .search-block2 > div {
    padding: 10px;
    cursor: pointer;
  }

  .search-block > div:hover, .search-block2 > div:hover {
    /* background: #C6C3C3; */
    background: rgb(1, 184, 190);
    color: white;
  }

  .search-block > div:hover a, .search-block2 > div:hover a {
    color: white !important;
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

  .accountMenu {
    position: absolute !important;
    top: 110% !important;
    background: white !important;
    color: black !important;
    width: 124% !important;
    border-radius: 0 !important;
    border: 1px solid #C6C3C3 !important;
    text-transform: none !important;
    background: white !important;
  }

  .search-input {
    border: 1px solid #FFFFFF; 
    padding: 7px 12px; 
    color: #FFFFFF; 
    outline: none; 
    font-size: 10px; 
    width: 218px;
  }

  .search-input::placeholder {
    color: #ffffff;
  }

  .user-photo-block {
    width: 100%;
    height: 240px;
    margin-bottom: 20px;
    background-position: 50% 50%;
    background-size: cover;
    border-radius: 50%;
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
