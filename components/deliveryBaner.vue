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
            <v-list-item-content v-else-if="item.class === 'block1'" style="display: block; cursor: pointer;" @click="openQuestionnaireModal()">
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon v-text="item.icon" size="40"></v-icon>
            </v-list-item-icon>

            <!-- <v-menu v-if="item.class === 'block1'" :close-on-content-click="false" :nudge-width="200" offset-y bottom>
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
                <v-tabs background-color="#01235E" class="elevation-2" dark :centered="true" :prev-icon="'mdi-arrow-left-bold-box-outline'" :next-icon="'mdi-arrow-right-bold-box-outline'" :icons-and-text="true" >
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

          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

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
  export default {
    data: function (){
      return ({
        item: 1,
        items: [
          { title: "Հարցաթերթիկ", icon: 'mdi-playlist-edit', text: "Ձեր կարծիքը շատ կարևոր է", class: 'block1' },
          { title: "Գործ կա", icon: 'mdi-calendar-check', text: "Թափուր աշխատատեղեր", class: 'block2' },
          { title: "Վճարում", icon: 'mdi-currency-usd', text: "Վճարման ամենահարմար եղանակները", class: 'block3' },
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
      })
    },
    methods: {
      closeModal() {
        // document.querySelector('.v-menu__content').classList.remove('menuable__content__active');
        // document.querySelector('.v-menu__content').style.display = 'none';
        document.getElementById('questionnaireModal').style.display = 'none';
      },
      openQuestionnaireModal() {
        document.getElementById('questionnaireModal').style.display = 'flex';
      },
      async sendQuestionnaireForm() {
        if(this.questionnaireForm.name !== "" && this.questionnaireForm.phone !== "" && this.questionnaireForm.rating !== "" && this.questionnaireForm.use_site !== "" && this.questionnaireForm.how_find_out !== "") {
          if(this.user){
            this.questionnaireForm.user_id = this.user.id;
          }
          await this.$axios.post(this.$axios.defaults.baseURL+'/questionnaire/store', this.questionnaireForm).then(response => {
            window.location.href = '/';
          }).catch(e => {
            this.questionnaireError = e.response;
          });
        } else {
          this.questionnaireError = "Ոչ բոլոր պարտադիր դաշտերն են լրացվաց";
        }
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

  @media (max-width: 767px) {
    .modal {
      min-width: 90%;
      max-width: 90%;
      top: 28% !important;
      max-height: 500px !important;
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
      min-width: 700px;
      max-width: 700px;
      top: 12%;
    }
  }
</style>

<style scoped lang="scss">
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
            padding: 35px;
            padding-bottom: 0;
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