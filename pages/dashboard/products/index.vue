<template>
  <v-container>
    <v-toolbar-title style="display: flex; justify-content: space-between;">
      Products
      <v-btn small dark to="products/new" color="purple" >Add new product</v-btn>
    </v-toolbar-title>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Image</th>
            <th class="text-left">Name</th>
            <th class="text-left">Bestsellers</th>
            <th class="text-left">Is New</th>
            <th class="text-left">In Stock</th>
            <th class="text-left">Action</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="item in products" :key="item.name">
          <td><v-img :src="JSON.parse(item.images)[0]" max-width="100"></v-img></td>
          <td>{{ item.name_am }}</td>
          <td>
            <div v-if="item.bestsellers === '1'">
              <input type="checkbox" name="bestsellers" checked @click="bestsellers(item.id, $event)">
            </div>
            <div v-else>
              <input type="checkbox" name="bestsellers" @click="bestsellers(item.id, $event)">
            </div>
            <!-- <v-radio-group v-if="item.bestsellers === '1'" row @change="bestsellers(item.id, item.bestsellers)">
              <v-radio label="Yes" value="1" checked></v-radio>
              <v-radio label="No" value="0"></v-radio>
            </v-radio-group>
            <v-radio-group v-else row @change="bestsellers(item.id, item.bestsellers)">
              <v-radio label="Yes" value="1"></v-radio>
              <v-radio label="No" value="0" checked></v-radio>
            </v-radio-group> -->
          </td>
          <td>
            <div v-if="item.isNew === 1">
              <input type="checkbox" name="is_new" checked @click="is_new(item.id, $event)">
            </div>
            <div v-else>
              <input type="checkbox" name="is_new" @click="is_new(item.id, $event)">
            </div>
          </td>
          <td>
            <div v-if="item.in_stock === '1'">
              <input type="checkbox" name="in_stock" checked @click="in_stock(item.id, $event)">
            </div>
            <div v-else>
              <input type="checkbox" name="in_stock" @click="in_stock(item.id, $event)">
            </div>
          </td>
          <td><v-btn small :to="`products/edit/${item.id}`" :elevation="0" dark fab color="primary" ><v-icon>mdi-pencil</v-icon></v-btn> <v-btn small :elevation="0" @click="deleteProducts($event, item.id )" dark fab color="error" ><v-icon>mdi-delete</v-icon></v-btn></td>
        </tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-container>
</template>

<script>
  export default {
    async fetch({store}) {
      await store.dispatch('products/fetch')
    },
    layout: 'dashboard',
    middleware: 'admin',
    name: "index",
    data () {
      return {
      }
    },
    computed: {
      products() {
        return this.$store.getters['products/products'];
      }
    },
    methods: {
      deleteProducts(event, id) {
        this.$store.dispatch('products/delete', [id]).then( r => {
          this.$store.dispatch('products/fetch')
        })
      },
      async bestsellers(id, e) {
        let bestseller = (e.path[0].checked) ? '1' : '0';
        await this.$axios.$post(this.$axios.defaults.baseURL+'/product/bestsellers', {id, bestseller});
      },
      async in_stock(id, e) {
        let in_stock = (e.path[0].checked) ? '1' : '0';
        await this.$axios.$post(this.$axios.defaults.baseURL+'/product/in_stock', {id, in_stock});
      },
      async is_new(id, e) {
        let is_new = (e.path[0].checked) ? 1 : 0;
        await this.$axios.$post(this.$axios.defaults.baseURL+'/product/is_new', {id, is_new});
      }
    }
  }
</script>

<style scoped>

</style>
