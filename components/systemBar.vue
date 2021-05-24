<template>
  <div>

    <v-navigation-drawer v-resize="onResize" v-model="drawerForHeader" :mini-variant="miniVariant" :clipped="clipped" :right="right" fixed app >
      <v-list style="padding-bottom: 0">
        <v-list-item v-for="(item, i) in leftSide" :key="i" router exact >
          <v-list-item-content class="leftSide-menu">
            <v-menu v-if="item.items" offset-y>
              <template v-slot:activator="{ on }">
                <a href="#"
                  v-on="on"
                  class="v-list-item v-list-item--link theme--light"
                >
                  {{ item.title }}
                </a>
              </template>
              <v-list class="mobile-category-menu">
                <v-list-item
                  v-for="(item1, index) in item.items"
                  :key="index"
                  class="category-block"
                >
                  <v-list-item exact :to="localePath(item1.to)" style="background-color: rgb(1, 35, 94); color: white !important;">
                    <v-list-item-title>{{ item1.title }}</v-list-item-title>
                  </v-list-item>
                  <v-list style="background: transparent;">
                    <v-list-item-group v-for="(item2, index) in item.items2" :key="index">
                          <v-list-item v-if="item1.id === item2.brand" exact :to="localePath(item2.to)" v-on="on">
                            <v-list-item-title v-if="$i18n.locale === 'am'">{{ item2.title_am }}</v-list-item-title>
                            <v-list-item-title v-if="$i18n.locale === 'ru'">{{ item2.title_ru }}</v-list-item-title>
                            <v-list-item-title v-if="$i18n.locale === 'en'">{{ item2.title_en }}</v-list-item-title>
                          </v-list-item>
                            <v-list v-if="item1.id === item2.brand" style="background: transparent; margin: 0 16px; border-left: 2px solid rgb(178, 8, 57)">
                              <v-list-item-group v-for="(item3, index) in item.items3" :key="index">
                                <v-list-item v-if="item2.id === item3.parent && item1.id === item2.brand" exact :to="localePath(item3.to)">
                                  <v-list-item-title v-if="$i18n.locale === 'am'">{{ item3.title_am }}</v-list-item-title>
                                  <v-list-item-title v-if="$i18n.locale === 'ru'">{{ item3.title_ru }}</v-list-item-title>
                                  <v-list-item-title v-if="$i18n.locale === 'en'">{{ item3.title_en }}</v-list-item-title>
                                </v-list-item>
                              </v-list-item-group>
                            </v-list>
                    </v-list-item-group>
                  </v-list>
                </v-list-item>
              </v-list>
            </v-menu>
            <v-list-item v-else exact :to="localePath(item.to)" class="leftSide-menu-items">
              <v-list-item-title v-text="item.title" />
            </v-list-item>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list style="padding-top: 0">
        <v-list-item v-for="(item, i) in rightSide" :key="i" router exact >
          <v-list-item-content style="display: block; padding: 0">
            <v-list-item v-if="item.title_am === undefined" exact :to="localePath(item.to)">
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            <v-menu v-if="item.title_am !== undefined" :open-on-hover="true" bottom offset-y >
                <template v-slot:activator="{ on }">
                  <a href="#"
                      v-on="on"
                      class="v-list-item v-list-item--link theme--light"
                    >
                      <div v-if="item.title_am !== undefined && $i18n.locale === 'am'">{{ item.title_am }}</div>
                      <div v-if="item.title_ru !== undefined && $i18n.locale === 'ru'">{{ item.title_ru }}</div>
                      <div v-if="item.title_en !== undefined && $i18n.locale === 'en'">{{ item.title_en }}</div>
                      <div v-if="item.title_am === undefined">{{ item.title }}</div>
                    </a>
                </template>
                <v-list v-if="item.items">
                  <v-list-item-content style="align-items: normal; display: block">
                    <v-list-item-group v-for="(item1, index) in item.items" :key="index">
                      <v-list-item exact exact-active-class="activeLink" :to="localePath(item1.to)">
                        <v-list-item-title v-if="$i18n.locale === 'am'">{{ item1.title_am }}</v-list-item-title>
                        <v-list-item-title v-if="$i18n.locale === 'ru'">{{ item1.title_ru }}</v-list-item-title>
                        <v-list-item-title v-if="$i18n.locale === 'en'">{{ item1.title_en }}</v-list-item-title>
                      </v-list-item>
                      <v-list-item-group v-for="(item2, index) in item.items2" :key="index" style="margin: 0 16px; border-left: 2px solid rgb(178, 8, 57)">
                        <v-list-item v-if="item1.id === item2.parent" exact :to="localePath(item2.to)">
                          <v-list-item-title v-if="$i18n.locale === 'am'">{{ item2.title_am }}</v-list-item-title>
                          <v-list-item-title v-if="$i18n.locale === 'ru'">{{ item2.title_ru }}</v-list-item-title>
                          <v-list-item-title v-if="$i18n.locale === 'en'">{{ item2.title_en }}</v-list-item-title>
                        </v-list-item>
                      </v-list-item-group>
                    </v-list-item-group>
                  </v-list-item-content>
                </v-list>
            </v-menu>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-list>
        <v-list-item-content class="mobile-icons" style="padding: 16px; padding-top: 0">
          <v-btn :to="localePath('/wishlist')" color="#fff" text class="my-2 nav_button" width="40px" >
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>

          <v-btn :to="localePath('/cart')" color="#fff" text class="my-2 nav_button" width="40px" >
            <v-icon >mdi-cart-outline</v-icon>
          </v-btn>

          <v-menu  v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-y bottom >
            <template v-slot:activator="{ on }">
              <v-btn color="#fff" text class="my-2 nav_button" v-on="on" >
                <v-icon >mdi-account-outline</v-icon>
              </v-btn>
            </template>
          </v-menu>
        </v-list-item-content>
        <v-list-item-content class="mobile-icons" style="padding: 16px; padding-top: 0">
          <v-btn v-for="(item, key) in languages" :key="key" :to="switchLocalePath(item.to)" fab color="#01235E" class="my-2 nav_button" small >
            <v-img :src="item.icon" max-width="40"></v-img>
          </v-btn>
        </v-list-item-content>
      </v-list>
    </v-navigation-drawer>
    <v-system-bar height="auto" style="z-index: 5;" color="#01B8BE" fixed app dark id="create" >
      <v-col lg="1" md="1" class="text-center" style="padding: 0;">
        <nuxt-link :to="localePath('/')" style="text-decoration: none;">
          <img src="http://127.0.0.1:8000/images/Kiddok_logo_02-1.PNG" width="100%">
        </nuxt-link>
      </v-col>
      <v-col lg="7" md="7">
        <v-row class="hidden-sm-and-down" no-gutters >
          <v-menu :open-on-hover="true" bottom offset-y v-for="(item, i) in leftSide" dark :key="i">
            <template v-slot:activator="{on}">
              <div v-if="item.to==='/sections'" style="position: relative">
                <v-btn  exact color="#fff" text class="my-2 nav_button" v-on="on" bottom @click="openSectionsMenu" style="border: none;">
                  <div>{{ item.title }}</div>
                </v-btn>

                <div class="sections-menu-block" style="display: none;">
                  <div>
                    <div class="section-block" style="display: flex; align-items: center;">
                      <img src="http://127.0.0.1:8000/images/Kiddok_logo_04-1.PNG" width="60px">
                      <nuxt-link :to="`/brand/2?page=1`">
                        <span>Բրենդ</span>
                      </nuxt-link>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`#`">
                        Գնել ըստ տարիքի
                      </nuxt-link>
                      <v-icon v-text="'mdi-chevron-down'" size="30" style="color: #B22180; cursor: pointer;" @click="openAgeMenu"></v-icon>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`/product`">
                        Նորածնային խաղալիքներ
                      </nuxt-link>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`/product`">
                        Զարգացնող խաղեր
                      </nuxt-link>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`/product`">
                        Երաժշտական խաղալիքներ
                      </nuxt-link>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`/product`">
                        Փափուկ խաղալիքներ
                      </nuxt-link>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`/product`">
                        Մեքենաներ, գնացքներ
                      </nuxt-link>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`/product`">
                        Էկո և փայտե խաղեր
                      </nuxt-link>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`/product`">
                        Կոնստրուկտորներ
                      </nuxt-link>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`/product`">
                        Փազլներ
                      </nuxt-link>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`/product`">
                        Բակային/սեզոնային խաղեր
                      </nuxt-link>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`/product`">
                        Սեղանի խաղեր
                      </nuxt-link>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`/product`">
                        Գրքեր, ուսումնական խաղեր
                      </nuxt-link>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`/product`">
                        ՈՒսուցանող խաղեր
                      </nuxt-link>
                    </div>
                    <div class="section-block">
                      <nuxt-link :to="`/product`">
                        Գրենական պիտույքներ
                      </nuxt-link>
                    </div>
                  </div>
                  <div class="age-menu-block" style="display: none;">
                      <div class="section-block">
                        <nuxt-link :to="`/product`">
                          <span>0–12 ամսական</span>
                        </nuxt-link>
                      </div>
                      <div class="section-block">
                        <nuxt-link :to="`/product`">
                          <span>12–24 ամսական</span>
                        </nuxt-link>
                      </div>
                      <div class="section-block">
                        <nuxt-link :to="`/product`">
                          <span>2–5 տարեկան</span>
                        </nuxt-link>
                      </div>
                      <div class="section-block">
                        <nuxt-link :to="`/product`">
                          <span>5–8 տարեկան</span>
                        </nuxt-link>
                      </div>
                      <div class="section-block">
                        <nuxt-link :to="`/product`">
                          <span>8–12 տարեկան</span>
                        </nuxt-link>
                      </div>
                      <div class="section-block">
                        <nuxt-link :to="`/product`">
                          <span>12-16 տարեկան</span>
                        </nuxt-link>
                      </div>
                  </div>
                </div>
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
      <v-row justify="start">
        <div style="padding: 0; margin: 5px 10px 5px 0;">
            <input class="search-input" placeholder="ՈՐՈՆԵԼ">
        </div>

        <v-btn v-if="authenticated" color="#fff" text class="my-2 nav_button" v-on="on" style="border: none; position: relative;">
          <a href="/account" style="color: white;">{{user.name}}</a>
          <v-icon @click="openAccountMenu">mdi-chevron-down</v-icon>

          <v-list v-if="authenticated" class="accountMenu" style="display: none;">
            <v-list-item @click="openHelperModal" v-text="'իմ օգնականը'" style="color: black !important;"></v-list-item>
            <v-list-item @click="logout" v-text="'Դուրս գալ'" style="color: black !important;"></v-list-item>
          </v-list>
        </v-btn>

        <v-menu v-if="!authenticated" v-model="loginMenu" :close-on-content-click="false" :nudge-width="200" offset-y bottom>
          <template v-slot:activator="{ on }">
            <!-- <v-btn v-if="authenticated" :to="localePath('/account')" color="#fff" text class="my-2 nav_button" v-on="on" style="border: none; position: relative;">
              {{user.name}}
              <v-icon @click="openAccountMenu">mdi-chevron-down</v-icon>

              <v-list v-if="authenticated" class="accountMenu" style="display: none;">
                <v-list-item @click="openHelperModal" v-text="'իմ օգնականը'"></v-list-item>
                <v-list-item @click="logout" v-text="'Դուրս գալ'"></v-list-item>
              </v-list>
            </v-btn> -->
            <v-btn color="#fff" text class="my-2 nav_button" v-on="on" >
              <v-icon >mdi-account-outline</v-icon>
              {{$t('myAccount')}}
            </v-btn>
          </template>
          <v-card class="login-form">
            <v-list v-if="authenticated" style="background-color: #01235E" dark>
              <!-- <v-list-item :to="localePath('/account')" v-text="$t('myAccount')"></v-list-item>
              <v-list-item :to="localePath('/account/orders')" v-text="$t('orders')"></v-list-item>
              <v-list-item @click="openHelperModal" v-text="'իմ օգնականը'"></v-list-item>
              <v-list-item @click="logout" v-text="$t('logout')">
              </v-list-item> -->
            </v-list>
             <v-tabs v-else  background-color="#01235E" class="elevation-2" dark :centered="true" :prev-icon="'mdi-arrow-left-bold-box-outline'" :next-icon="'mdi-arrow-right-bold-box-outline'" :icons-and-text="true" >
              <v-tabs-slider></v-tabs-slider>
              <v-tab :href="`#tab-1`" >
                Login
              </v-tab>
              <v-tab-item :value="'tab-1'">
                <v-card flat tile style="padding: 20px 100px">
                  <v-card-text>
                    <img src="http://127.0.0.1:8000/images/Kiddok_logo_04-1.PNG" width="40%" style="margin: 0 auto 20px auto; display: flex;">
                    <h3 style="text-align: center; margin-bottom: 30px;">ՄՈՒՏՔ ԱՆՁՆԱԿԱՆ ԷՋ</h3>
                    <v-form @submit.prevent="false" ref="form" v-model="valid" :lazy-validation="true" >
                      <v-alert v-if="errors.email" text type="error">
                        {{errors.email[0]}}
                      </v-alert>
                      <!-- <v-text-field v-model="loginForm.email" :rules="emailRules" label="ԷԼԵԿՏՐՈՆԱՅԻՆ ՀԱՍՑԵ" required ></v-text-field>
                      <v-text-field v-model="loginForm.password" :rules="passwordRules" label="ԳԱՂՏՆԱԲԱՌ" type="password" required ></v-text-field> -->
                      
                      <v-card-actions style="display: block; padding: 0;">
                        <label>ԷԼԵԿՏՐՈՆԱՅԻՆ ՀԱՍՑԵ</label><br>
                        <input v-model="loginForm.email" :rules="emailRules" placeholder="Էլ հասցե կամ հեռախոսահամար" style="width: 100%;border: 2px solid #C6C3C3;border-radius: 6px;padding: 6px 12px;margin-bottom: 20px;margin-top: 10px;" required>
                      </v-card-actions>
                      <v-card-actions style="display: block; padding: 0;">
                        <label>ԳԱՂՏՆԱԲԱՌ</label><br>
                        <input v-model="loginForm.password" :rules="passwordRules" type="password" style="width: 100%;border: 2px solid #C6C3C3;border-radius: 6px;padding: 6px 12px;margin-bottom: 20px;margin-top: 10px;" required>
                      </v-card-actions>

                      <v-card-actions style="padding: 0;">
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="loginAction" style="background: #B22180; width: 100%; padding: 12px; border-radius: 6px; color: white !important;">ՄՈԻՏՔ</v-btn>
                      </v-card-actions>
                    </v-form>
                    <div style="margin-top: 40px;text-align: center;">
                        <a href="#">Մոռացե՞լ եք Գաղտնաբառը</a>
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
        </v-menu>

        <div v-if="!authenticated" style="padding: 0; margin: 5px 0;">
            <v-btn :to="localePath('/register')" color="#fff" text class="my-2 nav_button" style="border: none;">
              {{$t('register')}}
            </v-btn>
        </div>

        <v-badge color="error" :content="cartLength" >
          <v-btn :to="localePath('/cart')" color="#fff" text class="my-2 nav_button" width="50px" style="border: none;">
            <v-icon >mdi-cart-outline</v-icon>
          </v-btn>
        </v-badge>
      </v-row>
      <!-- <v-row justify="end" class="hidden-lg-and-down" no-gutters style="position: absolute; right: 0" id="dropdown-language">
        <v-badge color="error" :content="wishListLength" >
          <v-btn :to="localePath('/wishlist')" color="#fff" text class="my-2 nav_button" width="50px" >
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
        </v-badge>
        <v-badge color="error" :content="cartLength" >
          <v-btn :to="localePath('/cart')" color="#fff" text class="my-2 nav_button" width="50px" >
            <v-icon >mdi-cart-outline</v-icon>
          </v-btn>
        </v-badge>

        <v-menu v-model="loginMenu" :close-on-content-click="false" :nudge-width="200" offset-y bottom>
          <template v-slot:activator="{ on }">
            <v-btn color="#fff" text class="my-2 nav_button" v-on="on" >
              <v-icon >mdi-account-outline</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list v-if="authenticated" style="background-color: #01235E" dark>
              <v-list-item :to="localePath('/account')" v-text="$t('myAccount')"></v-list-item>
              <v-list-item :to="localePath('/account/orders')" v-text="$t('orders')"></v-list-item>
              <v-list-item @click="logout" v-text="$t('logout')">
              </v-list-item>
            </v-list>
             <v-tabs v-else  background-color="#01235E" class="elevation-2" dark :centered="true" :prev-icon="'mdi-arrow-left-bold-box-outline'" :next-icon="'mdi-arrow-right-bold-box-outline'" :icons-and-text="true" >
              <v-tabs-slider></v-tabs-slider>
              <v-tab :href="`#tab-1`" >
                Login
              </v-tab>
              <v-tab-item :value="'tab-1'">
                <v-card flat tile >
                  <v-card-text>
                    <v-form @submit.prevent="false" ref="form" v-model="valid" :lazy-validation="true" >
                      <v-alert v-if="errors.email" text type="error">
                        {{errors.email[0]}}
                      </v-alert>
                      <v-text-field v-model="loginForm.email" :rules="emailRules" label="E-mail" required ></v-text-field>
                      <v-text-field v-model="loginForm.password" :rules="passwordRules" label="Password" type="password" required ></v-text-field>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="loginAction">Login</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>

              <v-tab :href="`#tab-2`" >
                Register
              </v-tab>
              <v-tab-item :value="'tab-2'">
                <v-card flat tile >
                  <v-card-text>
                    <v-form @submit.prevent="false" ref="form" v-model="valid" :lazy-validation="true" >
                      <v-alert v-if="registrationError" text type="error">
                        {{registrationError.data.errors.email[0]}}
                      </v-alert>
                      <v-text-field v-model="registerForm.name" :rules="nameRules" label="Name" required ></v-text-field>
                      <v-text-field v-model="registerForm.email" :rules="emailRules" label="E-mail" required ></v-text-field>
                      <v-text-field v-model="registerForm.password" :rules="passwordRules" type="password" label="Password" required ></v-text-field>
                      <v-text-field v-model="registerForm.password_confirmation" :rules="passwordConfirmation" label="Password"  required ></v-text-field>
                      <v-checkbox v-model="checkbox" :rules="[v => !!v || 'You must agree to continue!']" label="Do you agree?" required ></v-checkbox>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="primary" text @click="registerAction">Register</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs>

          </v-card>
        </v-menu>
          <v-overflow-btn
            v-model="MainLanguage"
            :items="languages"
            label="Overflow Btn"
            target="#dropdown-language"
            style="width: 85px; height: 50px; margin-top: 0; padding: 0;"
          >
              <template v-slot:selection="{item, index}">
                  <v-img  :src="item.icon" max-width="50"></v-img>
              </template>
              <template v-slot:item="{item, index}">
                <nuxt-link :to="switchLocalePath(item.to)" style="text-decoration: none;">
                  <v-img  :src="item.icon" max-width="50"></v-img>
                </nuxt-link>
              </template>
          </v-overflow-btn>

      </v-row> -->
      <!-- <v-speed-dial class="show-in-lg"  v-model="fab" :top="top" :bottom="bottom" :right="right" :left="left" :direction="direction" :open-on-hover="hover" :transition="transition" >
        <template v-slot:activator>
          <v-btn small  v-model="fab" color="#01235E" dark fab >
            <v-icon style="margin: 0;" v-if="fab">mdi-close</v-icon>
            <v-icon style="margin: 0;" v-else>mdi-account-circle</v-icon>
          </v-btn>
        </template>
        <v-badge color="error" :content="wishListLength" >
          <v-btn to="/wishlist" fab color="#01235E" class="my-2 nav_button" small >
            <v-icon>mdi-heart-outline</v-icon>
          </v-btn>
        </v-badge>
        <v-badge color="error" :content="cartLength" >
          <v-btn to="/cart" fab color="#01235E" class="my-2 nav_button" small >
            <v-icon >mdi-cart-outline</v-icon>
          </v-btn>
        </v-badge>

        <v-menu v-model="menu" :close-on-content-click="false" :nudge-width="200" offset-x >
          <template v-slot:activator="{ on }">
            <v-btn fab color="#01235E" class="my-2 nav_button" small v-on="on" >
              <v-icon style="margin: 0;">mdi-account-outline</v-icon>
            </v-btn>
          </template>
        </v-menu>
        <v-btn v-for="(item, key) in languages" :key="key" :to="switchLocalePath(item.to)" fab color="#01235E" class="my-2 nav_button" small >
          <v-img :src="item.icon" max-width="50"></v-img>
        </v-btn>
      </v-speed-dial> -->
      <!-- <v-app-bar-nav-icon class="hidden-md-and-up" style="position: absolute; right: 0" @click.stop="drawerForHeader = !drawerForHeader" /> -->
    </v-system-bar>

    <div id="helperModal" style="display: none;" class="modal-shadow" @click.self="closeModal">
        <div class="modal">
            <slot name="body">
                <div class="modal-content">
                  <div>
                    <h2 style="color: #B22180;">իմ օգնականը</h2>
                  </div>
                  <div style="display: flex; align-items: center; margin: 20px 0;">
                    <div style="margin-right: 20px;">
                      <v-icon size="100">mdi-account-circle-outline</v-icon>
                    </div>
                    <div v-if="authenticated">
                      <span style="color: #B22180;">{{user.name}}</span>
                    </div>
                  </div>
                  <v-form @submit.prevent="false" ref="form" :lazy-validation="true" style="width: 100%; margin-top: 30px;">
                    <v-card-actions style="display: block; padding: 0;">
                      <label style="color: #352249;">Հեռ.</label>
                      <input type="text" class="helper-block-input" required>
                    </v-card-actions>
                    <v-card-actions style="display: block; padding: 0;">
                      <label style="color: #352249;">Գրել նամակ</label>
                      <textarea class="helper-block-input"></textarea>
                    </v-card-actions>
                  </v-form>
                </div>
            </slot>
            <slot name="footer">
                <div class="modal-footer">
                    <button class="modal-footer__button_approve" @click="closeModal">
                        Հաստատել
                    </button>
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
              items: [

              ],
              items2: [

              ],
              items3: [

              ],
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
      mounted () {
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

          await this.$axios.post('http://127.0.0.1:8000/api/auth/register', this.registerForm).then(response => {
            this.menu = false;
            this.$auth.login({data: this.registerForm});
          }).catch(e => {
            this.registrationError = e.response;
          });
        },
        async loginAction() {
          await this.$auth.login({data: this.loginForm}).then(response => {
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
        openHelperModal(){
          document.getElementById('helperModal').style.display = 'block';
        },
        openAccountMenu() {
          let accountMenu = document.querySelector('.accountMenu');
          if(accountMenu.style.display === 'none') {
            accountMenu.style.display = 'block';
          } else {
            accountMenu.style.display = 'none';
          }
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
      height: 140px !important;
    }

    .category-block {
      display: block !important;
      width: 100%;
    }

    .mobile-category-menu {
      height: 100vh;
      overflow-y: scroll;
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

  .v-menu__content {
    min-width: 600px !important;
    max-width: 600px !important;
    top: 5% !important;
    left: 31% !important;
    overflow: auto;
    max-height: 650px;
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
    color: #352249;
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
        z-index: 10;
    }
 
    .modal {
        background: white;
        border-radius: 0;
        min-width: 600px;
        max-width: 600px;
        position: absolute;
        top: 25%;
        left: 31%;
        display: block;
        height: fit-content;
 
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
