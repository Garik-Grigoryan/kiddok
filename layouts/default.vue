<template>
  <v-app dark>

    <SystemBar></SystemBar>
    <v-content>
        <nuxt />
    </v-content>
    <!-- <MainDividers></MainDividers> -->
    <!-- <v-footer style="justify-content: center"
    >
      <span class="m-auto"> Davmar.am &copy; {{ new Date().getFullYear() }} All rights reserved</span>
    </v-footer> -->
    <v-footer class="footer-block">
      <div class="col-lg-8 col-md-8 col-sm-12" style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap;">
        <div>
          <div>
            <v-btn color="#fff" text class="my-2 nav_button" style="cursor: default;">
              <v-icon style="margin-right: 10px; font-size: 20px;">mdi-card-account-mail</v-icon>
              <span>ԿՈՆՏԱԿՏԱՅԻՆ ՏՎՅԱԼՆԵՐ</span>
            </v-btn>
          </div>
          <div>
            <a href="tel:+37496998996" class="my-2 nav_button" style="display: block; color: white; font-size: 12px; padding: 4px 16px;">
              <v-icon style="margin-right: 10px; font-size: 20px; color: white;">mdi-phone</v-icon>
              <span>+374 96 998996</span>
            </a>
          </div>
          <div>
            <a title="Viber" href="viber://chat?number=+37496998996" class="my-2 nav_button" style="display: block; color: white; font-size: 12px; padding: 4px 16px;">
              <v-icon style="margin-right: 10px; font-size: 20px; color: white;">mdi-whatsapp</v-icon>
              <span>+374 96 998996</span>
            </a>
          </div>
          <div>
            <a title="WhatsApp" href="whatsapp://send?phone=+37496998996" class="my-2 nav_button" style="display: block; color: white; font-size: 12px; padding: 4px 16px;">
              <v-icon style="margin-right: 10px; font-size: 20px; color: white;">mdi-whatsapp</v-icon>
              <span>+374 96 998996</span>
            </a>
          </div>
        </div>
        <div>
          <div>
            <v-btn :to="localePath('/address')" color="#fff" text class="my-2 nav_button">
              <span>ՄԵՐ ՀԱՍՑԵՆԵՐԸ</span>
            </v-btn>
          </div>
          <div>
            <v-btn :to="localePath('/address')" color="#fff" text class="my-2 nav_button">
              <v-icon style="margin-right: 10px; font-size: 20px;">mdi-map-marker</v-icon>
              <span style="text-transform: none;">Սուրմալու առևտրի կենտրոն 51Ա տաղավար</span>
            </v-btn>
          </div>
          <div style="padding: 0 16px;">
            <a href="https://www.facebook.com/KiddOk-106820318174128" class="my-2 nav_button" style="border: none; min-width: 30px; padding: 0;">
              <v-icon style="margin-right: 10px; font-size: 20px;" color="#fff">mdi-facebook</v-icon>
            </a>
            <a href="https://www.instagram.com/kiddok.am/" class="my-2 nav_button" style="border: none; min-width: 30px; padding: 0;">
              <v-icon style="margin-right: 10px; font-size: 20px;" color="#fff">mdi-instagram</v-icon>
            </a>
            <!-- <v-btn to="https://www.facebook.com/KiddOk-106820318174128" color="#fff" text class="my-2 nav_button" style="border: none; min-width: 30px; padding: 0;">
              <v-icon style="margin-right: 10px; font-size: 20px;">mdi-facebook</v-icon>
            </v-btn>
            <v-btn to="https://www.instagram.com/kiddok.am/" color="#fff" text class="my-2 nav_button" style="border: none; min-width: 30px; padding: 0;">
              <v-icon style="margin-right: 10px; font-size: 20px;">mdi-instagram</v-icon>
            </v-btn> -->
          </div>
        </div>
        <div>
          <div>
            <v-btn color="#fff" text class="my-2 nav_button" style="cursor: default;">
              <span>ԱՅԼ</span>
            </v-btn>
          </div>
          <div>
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button" style="text-transform: none;">
              <span>Աշխատանք</span>
            </v-btn>
          </div>
          <div>
            <v-btn :to="localePath('/condition')" color="#fff" text class="my-2 nav_button" style="text-transform: none;">
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

      <div class="col-lg-3 col-md-3 col-sm-12">
        <img src="https://back.kiddok.am/images/Kiddok_logo_02-1.png" width="100%">
      </div>
    </v-footer>
    <!-- <client-only>
      <Cookie />
    </client-only> -->
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
  .theme--light.v-footer.footer-block {
    justify-content: space-between;
    align-items: center;
    padding: 340px 90px 90px 90px;
    flex-wrap: wrap;
    background-image: url(https://back.kiddok.am/images/footer_background.png);
    min-height: 590px;
    height: auto;
    background-color: white;
    background-size: cover;
  }

  @media (max-width: 959px) {
    .theme--light.v-footer.footer-block {
      height: max-content;
      background-color: rgb(1, 184, 190);
      background-image: none;
      padding: 90px;
    }
  }
</style>
