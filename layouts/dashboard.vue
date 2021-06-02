<template>
  <v-app dark>
    <dashboardMenu></dashboardMenu>
    <v-content>
      <nuxt />
    </v-content>
    <!-- <v-footer style="justify-content: center"
    >
      <span class="m-auto"> Davmar.am &copy; {{ new Date().getFullYear() }} All rights reserved</span>
    </v-footer> -->
    <v-footer style="justify-content: space-between; background: #01B8BE; align-items: center; padding: 90px; flex-wrap: wrap;">
      <div class="col-lg-8 col-md-8 col-sm-12" style="display: flex; justify-content: space-between; align-items: baseline; flex-wrap: wrap;">
        <div>
          <div>
            <v-btn color="#fff" text class="my-2 nav_button" style="cursor: default;">
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
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button" style="border: none; min-width: 30px; padding: 0;">
              <v-icon style="margin-right: 10px; font-size: 20px;">mdi-facebook</v-icon>
            </v-btn>
            <v-btn :to="localePath('#')" color="#fff" text class="my-2 nav_button" style="border: none; min-width: 30px; padding: 0;">
              <v-icon style="margin-right: 10px; font-size: 20px;">mdi-instagram</v-icon>
            </v-btn>
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

      <div class="col-lg-3 col-md-3 col-sm-12">
        <img src="http://127.0.0.1:8000/images/Kiddok_logo_02-1.PNG" width="100%">
      </div>
    </v-footer>
  </v-app>
</template>

<script>
  import dashboardMenu from "../components/dashboardMenu";

    export default {
      components: {
        dashboardMenu,
      },
        name: "dashboard"
    }
</script>

<style scoped>
  .v-footer .theme--light.v-btn--active::before {
      opacity: 0 !important;
  }
</style>
