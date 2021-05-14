<template>
  <v-container style="margin-bottom: 120px; max-width: 900px;">
    <v-row>
      <v-col sm="6" xs="12" md="4" v-for="(item, i) in items" :key="i">
        <v-list :three-line="true" :class="item.class">
          <v-list-item>
            <!-- <v-list-item-content style="display: block;">
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon v-text="item.icon" size="40"></v-icon>
            </v-list-item-icon> -->


            <v-menu v-model="loginMenu" :close-on-content-click="false" :nudge-width="200" offset-y bottom>
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
                        <h3 style="text-align: center; margin-bottom: 30px;">Հարցաթերթիկ</h3>
                        <v-form @submit.prevent="false" ref="form" v-model="valid" :lazy-validation="true" >
                          
                          <div id="app" style="border: 1px solid #C6C3C3; border-radius: 20px; padding: 15px; margin-bottom: 18px;">
                              <div style="margin-bottom: 20px;"><span>Որտեղի՞ց եք իմացել Kidd'Ok կազմակերպության մասին *</span></div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" v-bind:value="{title:'Համացանցից'}" name="how_find_out">
                                <label style="margin-left: 10px;">Համացանցից</label>
                              </div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" v-bind:value="{title:'Կազմակերպության աշխատակիցներից'}" name="how_find_out">
                                <label style="margin-left: 10px;">Կազմակերպության աշխատակիցներից</label>
                              </div>
                              <div style="margin-bottom: 15px;">
                                <input type="radio" v-bind:value="{title:'Երրորդ անձից'}" name="how_find_out">
                                <label style="margin-left: 10px;">Երրորդ անձից</label>
                              </div>
                          </div>

                          <v-card-actions style="padding: 0;">
                            <v-spacer></v-spacer>
                            <v-btn color="primary" text @click="loginAction" style="background: #B22180; width: 100%; padding: 12px; border-radius: 6px; color: white !important;">Հաստատել</v-btn>
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
</style>
