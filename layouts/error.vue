<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound }}
    </h1>
    <h1 v-else>
      {{ otherError }}
    </h1>
    <NuxtLink to="/">
      Home page
    </NuxtLink>
    <!-- <v-footer style="justify-content: center"
    >
      <span class="m-auto"> Davmar.am &copy; {{ new Date().getFullYear() }} All rights reserved</span>
    </v-footer> -->
    
    <!-- <v-footer style="justify-content: space-between; background: #01B8BE; align-items: center; padding: 90px;">
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
            <v-btn :to="localePath('/condition')" color="#fff" text class="my-2 nav_button" style="text-transform: none;">
              <span>Պայմաններ և կանոններ</span>
            </v-btn>
          </div>
          <div>
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button" style="text-transform: none;">
              <span>Առաքում և վերադարձ</span>
            </v-btn>
          </div>
        </div>
      </div>

      <div style="width: 25%;">
        <img src="http://kiddokback.neoteric-software.com/images/Kiddok_logo_02-1.PNG" width="100%">
      </div>
    </v-footer> -->
  </v-app>

</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
  h1 {
    font-size: 20px;
  }
  .v-footer .theme--light.v-btn--active::before {
      opacity: 0 !important;
  }
</style>
