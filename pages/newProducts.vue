<template>
  <v-container class="mt-5">
      <div class="text-caption" style="display: contents;">
        <h1 class="text-center mb-5 new-products-block" v-text="$t('newProducts')" style="text-transform: uppercase; color: #352249; font-weight: 100;"></h1>
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

  @media (min-width: 767px) and (max-width: 959px) {
    .new-products-block {
      margin-top: 60px;
    }
  }

  @media (max-width: 455px) {
    .new-products-block {
      margin-top: 60px;
    }
  }
</style>
