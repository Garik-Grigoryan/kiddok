<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-toolbar-title style="display: flex; justify-content: space-between;">
          Edit Product
        </v-toolbar-title>
        <v-form ref="form" v-model="valid" >
          <v-alert v-if="productErrors" text type="error">
            {{productErrors}}
          </v-alert>

          <v-text-field v-model="name_en" :rules="nameRules" label="Name (eng)" required ></v-text-field>
          <v-text-field v-model="name_ru" :rules="nameRules" label="Name (rus)" required ></v-text-field>
          <v-text-field v-model="name_am" :rules="nameRules" label="Name (am)" required ></v-text-field>
          <v-row >
            <v-col cols="6" >
              <v-autocomplete v-model="selectedBrand" :items="brands" label="Brand" item-text="name" item-value="brand.id">
                <template v-slot:selection="brand">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{brand.item.brand.name}}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
                <template v-slot:item="brand">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{brand.item.brand.name}}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-col>
            <v-col cols="6" >
              <!-- <v-autocomplete v-model="category" :items="categories.filter(c => c.brand == selectedBrand)" label="Category" item-text="name" item-value="id"> -->
              <v-autocomplete v-model="category" :items="categories" label="Category" item-text="name" item-value="id">
                <template v-slot:selection="category">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{category.item.name_en}}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
                <template v-slot:item="category">
                  <v-list-item-content>
                    <v-list-item-title>{{category.item.name_en}}</v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-autocomplete>
            </v-col>
          </v-row>
          <v-col cols="5" class="pl-0">
            <v-text-field type="number" v-model="price" :rules="nameRules" label="Price" required ></v-text-field>
          </v-col>
          <v-col cols="5" class="pl-0">
            <v-text-field type="text" v-model="code" label="Code" required ></v-text-field>
          </v-col>
          <v-col cols="5" class="pl-0">
            <v-text-field type="text" v-model="size" label="Size" required ></v-text-field>
          </v-col>
          <v-col cols="5" class="pl-0">
            <v-text-field type="number" min="0" v-model="quantity_wholesale" label="Quantity wholesale *" required ></v-text-field>
          </v-col>
          <v-col cols="5" class="pl-0">
            <v-text-field type="number" min="0" v-model="price_wholesale" label="The price of one product in wholesale *" required ></v-text-field>
          </v-col>


          <v-row>
            <v-col v-for="(color, i) in selectedColors" :key="i" class=" d-flex child-flex" cols="1" >
              <v-hover v-slot:default="{ hover }">
                <v-card class="mx-auto add_iamge" min-height="50" max-width="50" :color="color" >
                  <div v-show="hover" class="align-self-center" style="position:relative; height: 100%;">
                    <v-btn @click="removeColor($event, i)"  icon fab style=" position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); ">
                      <v-icon size="50" color="error">
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </div>
                </v-card>
              </v-hover>
            </v-col>


            <v-col cols="1">
              <v-card @click.stop="colorSelectDialog = true" class="mx-auto add_iamge" min-height="50" max-width="50" >
                <v-icon size="25">mdi-plus</v-icon>
              </v-card>
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col cols="12" sm="6">
              <v-select
                v-model="selectedSizes"
                :items="sizes"
                attach
                chips
                label="Sizes"
                item-value="id"
                multiple
              >
                <template v-slot:selection="size">
                  <v-chip>
                    <span>{{ size.item.name }}</span>
                  </v-chip>
                </template>
                <template v-slot:item="size">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{size.item.name}}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-select>
            </v-col>
          </v-row> -->
          <v-row>
            <v-col cols="12" sm="6">
              <v-select
                v-model="selectedAge"
                :items="ages"
                attach
                chips
                label="Age"
                item-value="name"
              >
                <template v-slot:selection="age">
                  <v-chip>
                    <span>{{ age.item.name }}</span>
                  </v-chip>
                </template>
                <template v-slot:item="age">
                  <v-list-item-content>
                    <v-list-item-title>
                      {{age.item.name}}
                    </v-list-item-title>
                  </v-list-item-content>
                </template>
              </v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" >
              <v-radio-group v-model="sex" row>
                <v-radio label="Men"  value="men"></v-radio>
                <v-radio label="Women" value="women"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" >
              <v-checkbox
                v-model="isNew"
                label="New"
              ></v-checkbox>
            </v-col>
          </v-row>
          <!-- <v-row>
            <v-col cols="12">
            <Editor v-model="description_en"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
            <Editor v-model="description_ru"/>
            </v-col>
          </v-row> -->
          <v-row>
            <v-col cols="12">
            <Editor v-model="description_am"/>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-radio-group v-model="discountType" row>
                <v-radio label="None"  value="none" @change="hasDiscount = false"></v-radio>
                <v-radio label="Price" value="price" @change="hasDiscount = true"></v-radio>
                <v-radio label="Percent" value="percent" @change="hasDiscount = true"></v-radio>
              </v-radio-group>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="5"  v-if="hasDiscount">
              <v-text-field type="number" v-model="discount" :rules="nameRules" label="Discount" required ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col v-for="(image, i) in selectedImages" :key="i" class=" d-flex child-flex" cols="3" >
              <v-hover v-slot:default="{ hover }">
                <v-card class="d-flex">
                  <v-img :src="image"  aspect-ratio="1" class="grey lighten-2" >
                    <template v-slot:placeholder>
                      <v-row class="fill-height ma-0" align="center" justify="center" >
                        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                      </v-row>
                    </template>
                    <div v-show="hover" class="align-self-center" style="position:relative; height: 100%;">
                      <v-btn @click="removeImage($event, i)"  icon fab style=" position: absolute; left: 50%; top: 50%; transform: translate(-50%, -50%); ">
                        <v-icon size="50" color="error">
                          mdi-delete
                        </v-icon>
                      </v-btn>
                    </div>
                  </v-img>
                </v-card>
              </v-hover>
            </v-col>
            <v-col cols="3">
              <v-card @click.stop="dialog = true" class="mx-auto add_iamge" min-height="200" >
                <v-icon size="40">mdi-plus</v-icon>
              </v-card>
            </v-col>
          </v-row>

          <v-btn :disabled="!valid" @click="updateProduct" color="success" class="mr-4" >Update</v-btn>
        </v-form>
      </v-col>
    </v-row>



    <v-dialog v-model="dialog" max-width="996" >
      <v-card>
        <v-card-title  style="display: flex; justify-content: space-between;" class="headline">Choose image <v-btn small @click.stop="uploadDialog = true" dark color="purple" >Add new image</v-btn></v-card-title>
        <v-container fluid>
          <v-row>
            <v-col v-for="(image, i) in images" :key="i" class="d-flex child-flex" cols="3" >
              <v-card flat tile class="d-flex" :data-url="image.path" @click="selectImage($event, image.path)">
                <v-img :src="image.path" aspect-ratio="1" class="grey lighten-2" >
                  <template v-slot:placeholder>
                    <v-row class="fill-height ma-0" align="center" justify="center" >
                      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                    </v-row>
                  </template>
                </v-img>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false" >close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="colorSelectDialog" max-width="996" >
      <v-card>
        <v-card-title  style="display: flex; justify-content: space-between;" class="headline">Choose Color <v-btn small @click.stop="colorDialog = true" dark color="purple" >Add new color</v-btn></v-card-title>
        <v-container fluid>
          <v-row>
            <v-col v-for="(color, i) in colors" :key="i" class="d-flex child-flex" cols="1" >
              <v-card @click.stop="selectColor($event, color.value)" min-height="50" max-width="50" :color="color.value">
              </v-card>
            </v-col>
          </v-row>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="colorSelectDialog = false" >close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="uploadDialog" max-width="400" >
      <v-card>
        <v-card-title  style="display: flex; justify-content: space-between;" class="headline">Choose image</v-card-title>
        <v-container fluid>
          <v-form v-model="imageUpladForm">
            <v-text-field v-model="imageName" :rules="nameRules" label="Name" required ></v-text-field>
            <v-file-input v-model="files" :rules="fileRules" label="Choose Image" accept="image/*" />
          </v-form>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!imageUpladForm" color="green darken-1" text @click="uploadImage" >Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>



    <v-dialog v-model="colorDialog" max-width="300" >
      <v-card>
        <v-card-title  style="display: flex; justify-content: space-between;" class="headline">Select color</v-card-title>
        <v-container fluid>
          <v-text-field v-model="colorName" :rules="nameRules" label="Name" required ></v-text-field>
          <v-color-picker v-model="color"></v-color-picker>
        </v-container>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="uploadColor" >Upload</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import Editor from "~/components/Editor.vue";
export default {
  name: "new",
  layout: 'dashboard',
  middleware: 'admin',
  async fetch({store, route}) {
    await store.dispatch('multimedia/fetch');
    await store.dispatch('categories/fetch');
    await store.dispatch('brands/fetch');
    await store.dispatch('color/fetch');
    await store.dispatch('sizes/fetch');
    await store.dispatch('products/getProduct', [route.params.id]);
    await store.dispatch('age/fetch');
  },
  components: {
    Editor
  },
  data () {
    return {
      valid: true,
      imageUpladForm: true,
      name_en: '',
      name_ru: '',
      name_am: '',
      isNew: false,
      imageName: '',
      dialog: false,
      uploadDialog: false,
      selectedImages: [],
      // selectedSizes: [],
      selectedAge: '',
      color: '',
      selectedBrand: '',
      colorName: '',
      price: '',
      code: '',
      size: '',
      quantity_wholesale: 0,
      price_wholesale: 0,
      ages: [],
      // description_en: '',
      // description_ru: '',
      description_am: '',
      selectedColors: [],
      sex: 'men',
      hasDiscount: false,
      colorDialog: false,
      colorSelectDialog: false,
      nameRules: [
        v => !!v || 'Field is required',
      ],
      files: [],
      fileRules: [
        v => !!v || 'File is required',
        v => !!v && v.size < 500000 || 'File should be les then 500 KB',
      ],
      category: 0,
      discountType: 'none',
      discount: '',
      productErrors: false
    }
  },
  async mounted() {
    this.ages = await this.$axios.$get(this.$axios.defaults.baseURL+'/age/get');
    this.selectedAge = this.product.age;

    this.name_en = this.product.name_en;
    this.name_ru = this.product.name_ru;
    this.name_am = this.product.name_am;
    this.category = this.product.category;
    this.price = this.product.price;
    this.code = this.product.code;
    this.size = this.product.size;
    this.quantity_wholesale = this.product.quantity_wholesale;
    this.price_wholesale = this.product.price_wholesale;
    this.selectedImages = JSON.parse(this.product.images);
    this.product.product_color.forEach(elem => {
      this.selectedColors.push(elem.color)
    });
    // this.product.product_size.forEach(elem => {
    //   this.selectedSizes.push(elem.id)
    // });
    this.selectedBrand = this.product.brand;
    this.sex = this.product.sex;
    this.isNew = this.product.isNew;
    this.discountType = this.product.discountType;
    this.hasDiscount = this.product.discountType != 'none' ? true : false,
    this.discount = this.product.discount;
    // this.description_en = this.product.description_en;
    // this.description_ru = this.product.description_ru;
    this.description_am = this.product.description_am;
  },
  methods: {
    removeImage(event, i) {
      this.$delete(this.selectedImages, i);
    },
    removeColor(event, i) {
      this.$delete(this.selectedColors, i);
    },
    selectImage(event, imageUrl) {
      this.dialog = false;
      this.selectedImages.push(imageUrl);
    },
    selectColor(event, color) {
      this.colorSelectDialog = false;
      this.selectedColors.push(color);
    },
    uploadImage() {
      this.uploadDialog = false;
      let data = new FormData();
      data.append('name', this.imageName);
      data.append('image', this.files);
      this.$axios.$post(this.$axios.defaults.baseURL+'/multimedia/upload', data).then(
        response => {
          this.files = []
          this.$store.dispatch('multimedia/fetch')
        }
      ).catch(e => {
        console.log(e);
      })
    },
    uploadColor() {
      this.colorDialog = false;
      let data = new FormData();
      data.append('name', this.colorName);
      data.append('color', this.color);
      this.$axios.$post(this.$axios.defaults.baseURL+'/color/add', data).then(
        response => {
          this.files = []
          this.$store.dispatch('color/fetch')
        }
      ).catch(e => {
        console.log(e);
      })
    },
    updateProduct() {
      console.log(this.quantity_wholesale);
      if(this.quantity_wholesale != 0 && this.quantity_wholesale !== "" && this.price_wholesale != 0 && this.price_wholesale !== "") {
        this.$store.dispatch('products/updateProduct', [this.$route.params.id, this.name_en, this.name_ru, this.name_am, this.category, this.price, this.selectedImages, this.selectedColors, this.size, this.code, this.selectedBrand, this.sex, this.isNew, this.discountType, this.discount, this.description_am, this.selectedAge, this.quantity_wholesale, this.price_wholesale]).then(r => {
          this.$router.push('/dashboard/products');
          this.productErrors = false;
        });
      } else {
        this.productErrors = "Ոչ բոլոր պարտադիր դաշտերն են լրացվաց";
      }
    }
  },
  // mounted() {
  //   this.name_en = this.product.name_en;
  //   this.name_ru = this.product.name_ru;
  //   this.name_am = this.product.name_am;
  //   this.category = this.product.category;
  //   this.price = this.product.price;
  //   this.code = this.product.code;
  //   this.size = this.product.size;
  //   this.selectedImages = JSON.parse(this.product.images);
  //   this.product.product_color.forEach(elem => {
  //     this.selectedColors.push(elem.color)
  //   });
  //   // this.product.product_size.forEach(elem => {
  //   //   this.selectedSizes.push(elem.id)
  //   // });
  //   this.selectedBrand = this.product.brand;
  //   this.sex = this.product.sex;
  //   this.isNew = this.product.isNew;
  //   this.discountType = this.product.discountType;
  //   this.hasDiscount = this.product.discountType != 'none' ? true : false,
  //   this.discount = this.product.discount;
  //   this.description_en = this.product.description_en;
  //   this.description_ru = this.product.description_ru;
  //   this.description_am = this.product.description_am;
  // },
  computed: {
    images() {
      return this.$store.getters['multimedia/images'];
    },
    categories() {
      return this.$store.getters['categories/categories'];
    },
    brands() {
      return this.$store.getters['brands/brands'];
    },
    colors() {
      return this.$store.getters['color/colors'];
    },
    sizes() {
      return this.$store.getters['sizes/sizes'];
    },
    product() {
      return this.$store.getters['products/product']
    }
  },
}

</script>

<style scoped>
  .add_iamge{
    position: relative;
    cursor: pointer;
  }
  .add_iamge i{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
</style>
