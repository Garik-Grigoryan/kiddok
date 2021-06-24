<template>
  <v-container class="mt-5">
      <div class="text-caption" style="display: contents;">
        <h1 class="text-center mb-5" v-text="$t('newProducts')" style="text-transform: uppercase; color: #352249; font-weight: 100;"></h1>
        <div style="display: flex; flex-wrap: wrap; justify-content: space-between; height: fit-content;">
          <productCard
            v-for="(product, i) in products"
            :key="i"
            :image="JSON.parse(product.images)[0]"
            :id="product.id"
            :title_en="product.name_en"
            :title_ru="product.name_ru"
            :title_am="product.name_am"
            :price="product.price"
            :price_wholesale="product.price_wholesale"
            :discountType="product.discountType"
            :discount="product.discount"
          ></productCard>
        </div>
        <div v-if="products.count > 1" class="text-center" style="margin: 10px auto;">
            <v-pagination
              v-model="page"
              :length="products.count"
              :total-visible="7"
              @input="next"
            ></v-pagination>
          </div>
      </div>
  </v-container>
</template>

<script>
import productCard from "../components/productCard";
    export default {
      name: "newProducts",
      layout: 'product',
      head() {
        return {
          title: 'New Products',
          meta: [
            { hid: 'New Products', name: 'New Products', content: 'New Products' }
          ],
        };
      },
      components: {
        productCard
      },
      data(){
          return {
            text: '',
            products: []
          }
      },
      async fetch({route, store}) {
        await store.dispatch('menus/fetch');
      },
      computed: {
      },
      async mounted() {
        this.products = await this.$axios.$get(this.$axios.defaults.baseURL+'/product/getNewProducts');
        console.log(this.products);
      }
    }
</script>

<style scoped>
  .v-application {
    color: #352249;
  }

  .mailing_btn {
    background: #B22180; 
    width: 100%; 
    padding: 12px !important; 
    border-radius: 6px !important; 
    color: white !important;
    margin-bottom: 15px;
    text-transform: none;
  }

  .partners-title {
    color: white;
    font-size: 16px;
    background: #B22180;
    padding: 8px;
    text-align: center;
    border-radius: 6px;
    margin-bottom: 30px !important;
    width: 800px;
  }

  .our-partners-block {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .our-partners-block .partner-block {
    width: 20%;
    margin: 0 2.5% 40px 2.5%;
  }

  @media (max-width: 959px) {
    .partners-title {
      margin-top: 170px;
    }
  }
</style>
