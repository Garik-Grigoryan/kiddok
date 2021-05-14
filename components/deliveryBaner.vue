<template>
  <v-container style="margin-bottom: 120px; max-width: 900px;">
    <v-row>
      <v-col sm="6" xs="12" md="4" v-for="(item, i) in items" :key="i">
        <v-list :three-line="true" :class="item.class">
          <v-list-item>
            <v-list-item-content v-if="item.class === 'block2' || item.class === 'block3'" style="display: block;">
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon v-if="item.class === 'block2' || item.class === 'block3'">
              <v-icon v-text="item.icon" size="40"></v-icon>
            </v-list-item-icon>

            <v-menu v-if="item.class === 'block1'" v-model="loginMenu" :close-on-content-click="false" :nudge-width="200" offset-y bottom>
              <template v-slot:activator="{ on }">
                <v-list-item-content style="display: block; cursor: pointer;" v-on="on">
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                  <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon v-text="item.icon" size="40"></v-icon>
                </v-list-item-icon>
              </template>
              <v-card class="questionnaire">
                <v-list v-if="authenticated" style="background-color: #01235E" dark>
                  <v-list-item :to="localePath('/account')" v-text="$t('myAccount')"></v-list-item>
                  <v-list-item :to="localePath('/account/orders')" v-text="$t('orders')"></v-list-item>
                  <v-list-item @click="logout" v-text="$t('logout')">
                  </v-list-item>
                </v-list>
                <v-tabs v-else  background-color="#01235E" class="elevation-2" dark :centered="true" :prev-icon="'mdi-arrow-left-bold-box-outline'" :next-icon="'mdi-arrow-right-bold-box-outline'" :icons-and-text="true" >
                  <v-tabs-slider></v-tabs-slider>
                  <v-tab :href="`#tab-1`" >
                    
                  </v-tab>
                  <v-tab-item :value="'tab-1'">
                    <v-card flat tile style="padding: 20px;">
                      <v-card-text>
                        <div class="modal-header">
                          <h4>Հարցաթերթիկ</h4>
                          <div><span class="close-modal" @click="closeModal">x</span></div>
                        </div>
                        <v-form @submit.prevent="false" ref="form" v-model="valid" :lazy-validation="true" >
                          <div class="questionnaire_block">
                              <v-btn color="primary" text @click="loginAction" class="questionnaire_btn" style="text-transform: uppercase;">Հարցաթերթիկ</v-btn>
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

          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: function (){
      return ({
        item: 1,
        items: [
          { title: "Հարցաթերթիկ", icon: 'mdi-playlist-edit', text: "Ձեր կարծիքը շատ կարևոր է", class: 'block1' },
          { title: "Գործ կա", icon: 'mdi-calendar-check', text: "Թափուր աշխատատեղեր", class: 'block2' },
          { title: "Վճարում", icon: 'mdi-currency-usd', text: "Վճարման ամենահարմար եղանակները", class: 'block3' },
        ],
      })
    },
    methods: {
      closeModal() {
        document.querySelector('.v-menu__content').classList.remove('menuable__content__active');
        document.querySelector('.v-menu__content').style.display = 'none';
      },
      async loginAction() {
        await this.$auth.login({data: this.loginForm}).then(response => {
          this.menu = false;
        }).catch(e => {
          this.loginError = e.response;
        });
      }
    }
  }
</script>
<style scoped>
  .listGroup{
    flex-wrap: wrap;
    justify-content: center;
  }
  .listItem{
    max-width: 25%;
    min-width: 250px;
  }
  .v-list.v-sheet.block1 {
    background: #01B8BE;
  }
  .v-list.v-sheet.block2 {
    background: #B22180;
  }
  .v-list.v-sheet.block3 {
    background: #FDB813;
  }
  .v-list-item .v-list-item__subtitle, .v-list-item .v-list-item__title {
    font-size: 14px !important;
    color: white !important;
  }

  .v-list-item__icon .v-icon {
    color: white !important;
  }

  .v-list--three-line .v-list-item {
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
</style>
