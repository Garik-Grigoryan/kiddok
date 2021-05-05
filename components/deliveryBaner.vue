<template>
  <v-container>
    <v-row>
      <v-col sm="6" xs="12" md="4" v-for="(item, i) in items" :key="i">
        <v-list :three-line="true" :class="item.class">
          <v-list-item>
            <v-list-item-content style="display: block;">
              <v-list-item-title v-text="item.title"></v-list-item-title>
              <v-list-item-subtitle v-text="item.text"></v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon v-text="item.icon" size="40"></v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    // data: function (){
    //   return ({
    //     item: 1,
    //     items: [
    //       { title: this.$t('freeDeliveryTitle'), icon: 'mdi-car', text: this.$t('freeDeliveryText'), class: 'block1' },
    //       { title: this.$t('support'), icon: 'mdi-help', text: this.$t('supportText'), class: 'block2' },
    //       { title: this.$t('returnTitle'), icon: 'mdi-backup-restore', text: this.$t('returnText'), class: 'block3' },
    //     ],
    //   })
    // }
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
