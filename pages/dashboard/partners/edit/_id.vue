<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="6">
        <v-toolbar-title style="display: flex; justify-content: space-between;">
          Edit Partner
        </v-toolbar-title>
        <v-form ref="form" v-model="valid" >
          <v-alert v-if="partnersErrors" text type="error">
            {{partnersErrors}}
          </v-alert>

          <v-text-field v-model="name" :rules="nameRules" label="Name" required ></v-text-field>
          <v-text-field v-model="link" :rules="nameRules" label="Link" required ></v-text-field>
          
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

          <v-btn :disabled="!valid" @click="updatePartner" color="success" class="mr-4" >Update</v-btn>
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
    await store.dispatch('partners/getPartner', [route.params.id]);
  },
  components: {
    Editor
  },
  data () {
    return {
      valid: true,
      imageUpladForm: true,
      name: '',
      link: '',
      isNew: false,
      imageName: '',
      dialog: false,
      uploadDialog: false,
      selectedImages: [],
      nameRules: [
        v => !!v || 'Field is required',
      ],
      files: [],
      fileRules: [
        v => !!v || 'File is required',
        v => !!v && v.size < 500000 || 'File should be les then 500 KB',
      ],
      partnersErrors: false
    }
  },
  async mounted() {
    this.name = this.partner.name;
    this.link = this.partner.partner_link;
    this.selectedImages = JSON.parse(this.partner.image);
  },
  methods: {
    removeImage(event, i) {
      this.$delete(this.selectedImages, i);
    },
    selectImage(event, imageUrl) {
      this.dialog = false;
      this.selectedImages.push(imageUrl);
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
    updatePartner() {
      if(this.name !== "" && this.link !== "" && this.selectedImages.length !== 0) {
        this.$store.dispatch('partners/updatePartner', [this.$route.params.id, this.name, this.link, this.selectedImages]).then(r => {
          this.$router.push('/dashboard/partners');
          this.partnersErrors = false;
        });
      } else {
        this.partnersErrors = "Ոչ բոլոր դաշտերն են լրացվաց";
      }
    }
  },
  computed: {
    images() {
      return this.$store.getters['multimedia/images'];
    },
    partner() {
      return this.$store.getters['partners/partner']
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
