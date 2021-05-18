<template>
  <v-app dark>

    <SystemBar></SystemBar>
    <v-content>
        <nuxt />
    </v-content>
    <MainDividers></MainDividers>
    <!-- <v-footer style="justify-content: center"
    >
      <span class="m-auto"> Davmar.am &copy; {{ new Date().getFullYear() }} All rights reserved</span>
    </v-footer> -->
    <v-footer style="justify-content: space-between; background: #01B8BE; align-items: center; padding: 90px;">
      <div style="display: flex; justify-content: space-between; align-items: baseline; width: 70%;">
        <div>
          <div>
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
              <v-icon style="margin-right: 10px; font-size: 20px;">mdi-card-account-mail</v-icon>
              <span>ԿՈՆՏԱԿՏԱՅԻՆ ՏՎՅԱԼՆԵՐ</span>
            </v-btn>
          </div>
          <div>
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
              <v-icon style="margin-right: 10px; font-size: 20px;">mdi-phone</v-icon>
              <span>+374 96 998996</span>
            </v-btn>
          </div>
          <div>
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
              <v-icon style="margin-right: 10px; font-size: 20px;">mdi-whatsapp</v-icon>
              <span>+374 96 998996</span>
            </v-btn>
          </div>
          <div>
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
              <v-icon style="margin-right: 10px; font-size: 20px;">mdi-whatsapp</v-icon>
              <span>+374 96 998996</span>
            </v-btn>
          </div>
        </div>
        <div>
          <div>
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
              <span>ՄԵՐ ՀԱՍՑԵՆԵՐԸ</span>
            </v-btn>
          </div>
          <div>
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
              <v-icon style="margin-right: 10px; font-size: 20px;">mdi-map-marker</v-icon>
              <span style="text-transform: none;">Սուրմալու առևտրի կենտրոն 51Ա տաղավար</span>
            </v-btn>
          </div>
          <div>
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
              <v-icon style="margin-right: 10px; font-size: 20px;">mdi-facebook</v-icon>
              <v-icon style="margin-right: 10px; font-size: 20px;">mdi-instagram</v-icon>
            </v-btn>
          </div>
        </div>
        <div>
          <div>
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button">
              <span>ԱՅԼ</span>
            </v-btn>
          </div>
          <div>
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button" style="text-transform: none;">
              <span>Աշխատանք</span>
            </v-btn>
          </div>
          <div>
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button" style="text-transform: none;">
              <span>Պայմաններ և կանոններ</span>
            </v-btn>
          </div>
          <div>
            <v-btn :to="localePath('/delivery_and_refund')" color="#fff" text class="my-2 nav_button" style="text-transform: none;">
              <span>Առաքում և վերադարձ</span>
            </v-btn>
          </div>
        </div>
      </div>

      <div style="width: 25%;">
        <img src="http://127.0.0.1:8000/images/Kiddok_logo_02-1.PNG" width="100%">
      </div>
    </v-footer>
    <client-only>
      <Cookie />
    </client-only>
  </v-app>
</template>

<script>
  import MainDividers from "../components/MainDividers";
  import SystemBar from '../components/systemBar'
  import Cookie from "../components/Cookie.vue"

  export default {
  components: {
    MainDividers,
    SystemBar,
    Cookie

  },
  data () {
    return {
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      name: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      checkbox: false,
      fixed: false,
      fav: true,
      menu: false,
      message: false,
      hints: true,
      leftSide: [
        { title: 'Brands',
          to: '/'
        },
        { title: 'Sales',
          to: '/'
        },
        { title: 'News',
          to: '/'
        }
      ],
      rightSide: [
        {
          title: 'For Men',
          to: '/'
        },
        {
          title: 'For Women',
          to: '/'
        },
        {
          title: 'Contact Us',
          to: '/'
        }
      ],
      items: [
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me' },
        { title: 'Click Me 2' },
      ],
      rightDrawer: false,
      title: 'Dalmar',
      windowSize: {
        x: 0,
        y: 0,
      },
    }
  },
  mounted () {
    this.onResize()
  },

  methods: {
    onResize () {
      if(window.innerWidth >= 960){
        this.drawer = false;
      }
      this.windowSize = { x: window.innerWidth, y: window.innerHeight }
    },
  },
}
</script>
<style>
  .theme--dark.v-list-item--active:hover::before, .theme--dark.v-list-item--active::before{
    opacity: 0;
  }
  a{
    text-decoration: none;
  }
  body{
    overflow-x: hidden;
  }
  .nav_button{
    /*background-color: #ccc;*/
    color: #b20839;
  }
  .theme--dark.v-btn--active:hover::before, .theme--dark.v-btn--active::before {
     opacity: 0;
  }
  .v-badge__wrapper{
    left: -25px !important;
    top: 25px !important;
  }
  .v-footer .theme--light.v-btn--active::before {
      opacity: 0 !important;
  }
</style>
