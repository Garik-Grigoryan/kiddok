<template>
  <v-app dark>

    <v-content>
      <nuxt />
    </v-content>

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
    export default {
        name: "empty"
    }
</script>

<style scoped>
  .v-footer .theme--light.v-btn--active::before {
      opacity: 0 !important;
  }
  .theme--light.v-footer.footer-block {
    justify-content: space-between;
    align-items: center;
    padding: 340px 90px 90px 90px;
    flex-wrap: wrap;
    background-image: url(http://127.0.0.1:8000/images/footer_background.png);
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
