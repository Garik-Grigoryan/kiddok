<template>
  <v-container class="mt-5">
    <v-row>
      <div class="text-caption" style="display: contents;">
        <div style="display: flex; justify-content: center; width: 100%; margin-bottom: 30px;">
          <h2 class="text-center" style="font-weight: 400;">Kidd’OK – ի հիմքը մեր ԹԻՄՆ է, իսկ ուղեցույցը՝ մեր ՀԱՃԱԽՈՐԴՆԵՐԸ։</h2>
        </div>
        <!-- <div v-html="text"></div> -->
        <div style="display: flex; justify-content: space-between;">
          <div style="width: 50%">
            <img src="http://127.0.0.1:8000/images/kd1.png" width="100%">
          </div>
          <div style="width: 45%">
            <p>
              Kidd’OK ապրանքային բրենդը հիմնադրվել է 2019 թվականին տնօրեն Հենրի Խաչատրյանի կողմից, ընկերությունը զբաղվում է խաղալիքների արտադրանքով ինչպես նաև մանրածախ և մեծածախ վաճառքով, գործունեությունը հայաստանում սկսվել է 2001 թվականից 
            </p>
            <p>
              Այստեղ դուք կարող եք գտնել գունեղ ու բազմազան խաղալիքներ, մանկական մեքենաներ, մոտոցիկլետներ, տնակներ, դպրոցական պարագաներ, ուսուցողական, գիտական խաղալիքներ, զարգացնող խաղեր և ամենատարբեր աքսեսուարներ: 
            </p>
            <p>
              Kidd’OK ընկերությունը ներկայացնում է որակյալ, էկոլոգիապես մաքուր արտադրանք, որն ապահովում է ձեր փոքրիկի անվտանգությունն ու հարմարավետությունը: Մեր նպատակն է գոհացնել մեր հաճախորդներին, առաջարկել լավագույնը և ժպիտ ու անմոռանալի պահեր պարգևել մանուկներին: 
            </p>
            <p>
              Տարիների ընթացքում ապրանքների տեսականին շատ ավելի լայն է դարձել, ընկերությունը շարունակում է անընդհատ զարգացնել և ստեղծել նոր ապրանքախմբեր:
            </p>

            <hr style="margin: 30px 0;">

            <p>
              Հերթագրվել Kidd'Ok-ի նորությունների և առաջարկների մասին առաջինն իմանալու համար
            </p>
            <v-form @submit.prevent="false" ref="form" :lazy-validation="true" style="width: 50%;">
                <v-alert v-if="subscribeError" text type="error">
                  {{subscribeError}}
                </v-alert>
                <div class="mailing_block">
                  <div>
                    <label>Email</label><br>
                    <input v-model="email" style="width: 100%;border: 2px solid #C6C3C3;border-radius: 6px;padding: 6px 12px;margin-bottom: 20px;margin-top: 10px;" required>
                  </div>
                  <div>
                    <label>ՀԵՌԱՂՈՍԱՀԱՄԱՐ</label><br>
                    <input v-model="phone" type="text" style="width: 100%;border: 2px solid #C6C3C3;border-radius: 6px;padding: 6px 12px;margin-bottom: 20px;margin-top: 10px;" required>
                  </div>

                  <v-btn color="primary" text @click="subscribe()" class="mailing_btn" style="text-transform: uppercase;">ՈՒղարկել</v-btn>
                </div>
            </v-form>

          </div>
        </div>
      </div>
    </v-row>
  </v-container>
</template>

<script>
    export default {
        name: "aboutUs",
        layout: 'product',
      head() {
        return {
          title: 'About Us',
          meta: [
            { hid: 'About Us', name: 'About Us', content: 'About Us' }
          ],
        };
      },
        data(){
            return {
              text: '',
              email: '',
              phone: '',
              subscribeError: ''
            }
        },
        async fetch({route, store}) {
          await store.dispatch('brands/fetch');
          // await store.dispatch('wishListAndCart/fetch');
          await store.dispatch('menus/fetch');
          await store.dispatch('pages/getById', [2]);

        },
      async mounted() {
        await this.$store.dispatch('wishListAndCart/fetch');
        if(this.user){
          await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [this.user.id]);
        }else{
          await this.$store.dispatch('wishListAndCart/getWishListAndCartData', [0]);
        }
        if(this.$i18n.locale === 'am'){
          this.text = this.page.html_am
        }
        else if(this.$i18n.locale === 'en'){
          this.text = this.page.html
        }
        else if(this.$i18n.locale === 'ru'){
          this.text = this.page.html_ru
        }
      },
      computed: {
        page() {
          return this.$store.getters['pages/page'];
        }
      },
      methods: {
        async subscribe() {
          if(this.email !== "" && this.phone !== "") {
            await this.$store.dispatch('user/subscribe', [this.email, this.phone]).then((res) => {
              this.subscribeError = false;
              alert("Դուք հերթագրվել եք!");
            });
          } else {
            this.subscribeError = "Ոչ բոլոր դաշտերն են լրացվաց";
            this.email = "";
            this.phone = "";
          }
        }
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
</style>
