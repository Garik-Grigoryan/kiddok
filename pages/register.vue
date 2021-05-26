<template>
  <v-container class="mt-5">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
    <div id="app">
      <div class="container">
        <ul class="nav nav-tabs nav-justified">
          <li class="nav-item">
            <v-icon v-if="isActive('step1')" color="#B22381">mdi-check-circle</v-icon>
            <v-icon v-else color="#C6C3C3">mdi-numeric-1-circle</v-icon>
            <a class="nav-link" @click.prevent="setActive('step1')" :class="{ active: isActive('step1') }" href="#step1">Քայլ 1</a>
          </li>
          <li style="display: flex; align-items: center;">
            <hr style="width: 100px; border-top: 2px solid rgba(0,0,0,.1);">
          </li>
          <li class="nav-item">
            <v-icon v-if="isActive('step2')" color="#B22381">mdi-check-circle</v-icon>
            <v-icon v-else color="#C6C3C3">mdi-numeric-2-circle</v-icon>
            <a class="nav-link" :class="{ active: isActive('step2') }">Քայլ 2</a>
          </li>
          <li style="display: flex; align-items: center;">
            <hr style="width: 100px; border-top: 2px solid rgba(0,0,0,.1);">
          </li>
          <li class="nav-item">
            <v-icon v-if="isActive('step3')" color="#B22381">mdi-check-circle</v-icon>
            <v-icon v-else color="#C6C3C3">mdi-numeric-3-circle</v-icon>
            <a class="nav-link" :class="{ active: isActive('step3') }">Քայլ 3</a>
          </li>
        </ul>
        <div class="tab-content py-3" id="myTabContent">
          <div class="tab-pane fade" :class="{ 'active show': isActive('step1') }" id="step1">
            <v-row style="display: block;">
              <div>
                <span>Գրանցվել ՝ լրացնելով Ձեր տվյալները ստորև</span>
              </div>
              <v-form @submit.prevent="false" ref="form" :lazy-validation="true" style="width: 30%; margin-top: 30px;">
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ԱՆՈՒՆ *</label>
                  <input type="text" v-model="registerPhysicalPerson.name" :rules="nameRules" class="register-input" required>
                </v-card-actions>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ԱԶԳԱՆՈՒՆ *</label>
                  <input type="text" v-model="registerPhysicalPerson.lastname" :rules="nameRules" class="register-input" required>
                </v-card-actions>

                <div>
                  <div class="radio-input">
                    <input type="radio" name="person" value="physical">
                    <label>Ֆիզիկական անձ</label>
                  </div>
                  <div class="radio-input">
                    <input type="radio" name="person" value="juridical">
                    <label>Իրավաբանական անձ</label>
                  </div>
                </div>

                <div style="margin: 20px 0; display: flex;">
                  <a class="white--text approve-btn" @click="step1Action()" href="#">
                    Հաստատել
                  </a>
                  <a class="go-to-physical-register" href="#step2" style="display: none;"></a>
                  <a class="go-to-juridical-register" href="#step3" style="display: none;"></a>
                </div>
              </v-form>
            </v-row>
          </div>
          <div class="tab-pane fade" :class="{ 'active show': isActive('step2') }" id="step2">
            <v-row style="display: block;">
              <div class="step2-block-title">
                Ֆիզիկական անձ
              </div>
              <div>
                <span>Գրանցվել ՝ լրացնելով Ձեր տվյալները ստորև</span>
              </div>
              <v-form @submit.prevent="false" ref="form" :lazy-validation="true" style="width: 30%; margin-top: 30px;">
                <v-alert v-if="registrationError" text type="error">
                  {{JSON.stringify(registrationError.data.errors)}}
                </v-alert>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ԱՆՈՒՆ *</label>
                  <input type="text" v-model="registerPhysicalPerson.name" :rules="nameRules" class="register-input" required>
                </v-card-actions>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ԱԶԳԱՆՈՒՆ *</label>
                  <input type="text" v-model="registerPhysicalPerson.lastname" :rules="nameRules" class="register-input" required>
                </v-card-actions>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ՀԵՌ. *</label>
                  <input type="text" v-model="registerPhysicalPerson.phone" :rules="phoneRules" class="register-input" required>
                </v-card-actions>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ԷԼԵԿՏՐՈՆԱՅԻՆ ՀԱՍՑԵ *</label>
                  <div style="position: relative;">
                    <input type="email" v-model="registerPhysicalPerson.email" :rules="emailRules" class="register-input" required>
                    <v-icon style="position: absolute; top: 15%; right: 3%;">mdi-email-outline</v-icon>
                  </div>
                </v-card-actions>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ԳԱՂՏՆԱԲԱՌ *</label>
                  <div style="position: relative;">
                    <input type="password" v-model="registerPhysicalPerson.password" :rules="passwordRules" class="register-input" required>
                    <v-icon style="position: absolute; top: 15%; right: 3%;">mdi-lock-outline</v-icon>
                  </div>
                  <div>
                    <span style="color: #C6C3C3;">Ձեր գաղտնաբառը պետք է պարունակի առնվազն 8 նիշ:</span>
                  </div>
                </v-card-actions>

                <div style="margin: 20px 0; display: flex;">
                  <a class="white--text approve-btn" @click="registerPhysicalAction()" href="#">
                    Հաստատել
                  </a>
                </div>
              </v-form>
            </v-row>
          </div>
          <div class="tab-pane fade" :class="{ 'active show': isActive('step3') }" id="step3">
            <v-row style="display: block;">
              <div class="step2-block-title">
                Իրավաբանական անձ
              </div>
              <div>
                <span>Գրանցվել ՝ լրացնելով Ձեր տվյալները ստորև</span>
              </div>
              <v-form @submit.prevent="false" ref="form" :lazy-validation="true" style="width: 30%; margin-top: 30px;">
                <v-alert v-if="registrationError && registrationError.data.errors" text type="error">
                  {{JSON.stringify(registrationError.data.errors).match(/\[(.*?)\]/)[1]}}
                </v-alert>
                <v-alert v-if="registrationError2" text type="error">
                  {{registrationError2}}
                </v-alert>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ԱՆՈՒՆ *</label>
                  <input type="text" v-model="registerJuridicalPerson.name" :rules="nameRules" class="register-input" required>
                </v-card-actions>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ԱԶԳԱՆՈՒՆ *</label>
                  <input type="text" v-model="registerJuridicalPerson.lastname" :rules="nameRules" class="register-input" required>
                </v-card-actions>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ՀԵՌ. *</label>
                  <input type="text" v-model="registerJuridicalPerson.phone" :rules="phoneRules" class="register-input" required>
                </v-card-actions>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ԿԱԶՄԱԿԵՐՊՈՒԹՅԱՆ ԱՆՎԱՆՈՒՄ *</label>
                  <input type="text" v-model="registerJuridicalPerson.company_name" :rules="nameRules" class="register-input" required>
                </v-card-actions>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ԿԱԶՄԱԿԵՐՊՈՒԹՅԱՆ ՀՎՀՀ *</label>
                  <input type="text" v-model="registerJuridicalPerson.company_hvhh" class="register-input" required>
                </v-card-actions>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ԿԱԶՄԱԿԵՐՊՈՒԹՅԱՆ ՀԵՌԱՂՈՍԱՀԱՄԱՐ*</label>
                  <input type="text" v-model="registerJuridicalPerson.company_phone" :rules="phoneRules" class="register-input" required>
                </v-card-actions>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ԿԱԶՄԱԿԵՐՊՈՒԹՅԱՆ ԷԼԵԿՏՐՈՆԱՅԻՆ ՀԱՍՑԵ*</label>
                  <div style="position: relative;">
                    <input type="email" v-model="registerJuridicalPerson.email" :rules="emailRules" class="register-input" required>
                    <v-icon style="position: absolute; top: 15%; right: 3%;">mdi-email-outline</v-icon>
                  </div>
                </v-card-actions>
                <v-card-actions style="display: block; padding: 0;">
                  <label style="color: #C6C3C3;">ԳԱՂՏՆԱԲԱՌ *</label>
                  <div style="position: relative;">
                    <input type="password" v-model="registerJuridicalPerson.password" :rules="passwordRules" class="register-input" required>
                    <v-icon style="position: absolute; top: 15%; right: 3%;">mdi-lock-outline</v-icon>
                  </div>
                  <div>
                    <span style="color: #C6C3C3;">Ձեր գաղտնաբառը պետք է պարունակի առնվազն 8 նիշ:</span>
                  </div>
                </v-card-actions>

                <div style="margin: 20px 0; display: flex;">
                  <a class="white--text approve-btn" @click="registerJuridicalAction()">
                    Հաստատել
                  </a>
                </div>
              </v-form>
            </v-row>
          </div>
        </div>
      </div>
    </div>

    <div id="successModal" style="display: none;" class="modal-shadow" @click.self="closeModal">
        <div class="modal">
            <slot name="body">
                <div class="modal-content">
                    <div class="modal-block-title">
                      Իրավաբանական անձ
                    </div>
                    <div style="margin-bottom: 30px;">
                      <p style="color: #352249; font-size: 20px;">Հաստատումը տեղի կունենա 24 ժամվա ընդհացքում</p>
                    </div>
                </div>
            </slot>
        </div>
    </div>
  </v-container>
</template>

<script>
    export default {
        name: "register",
        layout: 'product',
        head() {
          return {
            title: 'Register',
            meta: [
              { hid: 'Register', name: 'Register', content: 'Register' }
            ],
          };
        },
        data(){
            return {
              text: '',
              activeItem: 'step1',
              registrationError: false,
              registrationError2: false,
              registerPhysicalPerson: {
                name: '',
                lastname: '',
                email: '',
                phone: '',
                password: '',
              },
              registerJuridicalPerson: {
                name: '',
                lastname: '',
                phone: '',
                password: '',
                company_name: '',
                company_hvhh: '',
                company_phone: '',
                email: ''
              },
              passwordRules: [
                v => !!v || 'Password is required',
              ],
              nameRules: [
                v => !!v || 'Name is required',
              ],
              emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
              ],
              phoneRules: [
                v => !!v || 'Phone is required',
              ],
            }
        },
        async fetch({route, store}) {
          await store.dispatch('brands/fetch');
          // await store.dispatch('wishListAndCart/fetch');
          await store.dispatch('menus/fetch');
          await store.dispatch('pages/getById', [2]);

        },
      async mounted() {
      },
      computed: {
      },
      methods: {
        isActive (menuItem) {
          return this.activeItem === menuItem
        },
        setActive (menuItem) {
          this.activeItem = menuItem
        },
        openSuccessModal() {
          document.getElementById('successModal').style.display = 'block';
        },
        closeModal: function () {
          document.getElementById('successModal').style.display = 'none';
        },
        step1Action() {
          var elements = document.querySelectorAll('input[name="person"]');

          for (var i = 0; i < elements.length; i++) {
            if (elements[i].checked && elements[i].value === "physical") {
              this.setActive('step2');
              document.querySelector('.go-to-physical-register').click();
            } else if(elements[i].checked && elements[i].value === "juridical") {
              this.setActive('step3');
              document.querySelector('.go-to-juridical-register').click();
            }
          }
        },
        async registerPhysicalAction() {
          await this.$axios.post('http://127.0.0.1:8000/api/auth/register', this.registerPhysicalPerson).then(response => {
            this.menu = false;
            this.$auth.login({data: this.registerPhysicalPerson});
            window.location.href = '/account';
          }).catch(e => {
            this.registrationError = e.response;
          });
        },
        async registerJuridicalAction() {
          if(this.registerJuridicalPerson.company_name !== "") {
            this.registrationError2 = false;
            await this.$axios.post('http://127.0.0.1:8000/api/auth/register', this.registerJuridicalPerson).then(response => {
              this.menu = false;
              this.$auth.login({data: this.registerJuridicalPerson});
              this.openSuccessModal();
            }).catch(e => {
              this.registrationError = e.response;
            });
          } else {
            this.registrationError2 = "The copmany name field is required.";
          }
        },
      }
    }
</script>

<style scoped>
  .v-application {
    color: #352249;
  }

  .nav-tabs .nav-item.show .nav-link, .nav-tabs .nav-link.active, .nav-tabs .nav-item .nav-link:hover, .nav-tabs .nav-link.active:hover, .nav-tabs {
    border: none;
  }

  .nav-tabs .nav-link {
    color: #352249;
  }

  .nav-tabs .nav-item {
    display: flex;
    justify-content: center;
  }

  .nav-tabs {
    margin: 20px 0 40px 0;
  }

  .approve-btn {
    background: #B22180 !important;
    color: white !important;
    padding: 5px 20px !important;
    width: max-content !important;
    border-radius: 6px !important;
    text-decoration: none;
  }

  .radio-input {
    margin-bottom: 15px;
    display: flex;
    background: white;
    padding: 8px;
    border-radius: 6px;
    border: 1px solid #C6C3C3;
  }

  .radio-input label {
    margin: 0;
  }

  .radio-input input {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }

  .step2-block-title {
    border-bottom: 3px solid #B22180;
    width: max-content;
    padding: 10px 50px 5px 0;
    margin-bottom: 30px;
  }

  .modal-block-title {
    color: #B22180;
    border-bottom: 2px solid #C6C3C3;
    width: max-content;
    padding: 10px 50px 5px 0;
    margin-bottom: 30px;
    font-size: 20px;
  }

  .register-input {
    width: 100%;
    border: 2px solid #C6C3C3;
    border-radius: 6px;
    padding: 6px 12px;
    margin-bottom: 20px;
  }

</style>

<style scoped lang="scss">
    .modal-shadow {
        position: absolute;
        top: 0;
        left: 0;
        min-height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.39);
    }
 
    .modal {
        background: #EBE7E7;
        border-radius: 0;
        /* padding: 15px; */
        min-width: 700px;
        max-width: 700px;
        position: absolute;
        top: 25%;
        left: 28%;
        // transform: translate(-50%, -50%);
        display: block;
        height: fit-content;
 
        &-close {
            border-radius: 50%;
            color: #fff;
            background: #2a4cc7;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 7px;
            right: 7px;
            width: 30px;
            height: 30px;
            cursor: pointer;
        }
 
        &-title {
            color: white;
            background: #B22180;
            padding: 10px 30px;
            font-weight: 300;
            font-size: 16px;
        }
 
        &-content {
            padding: 30px;
            padding-bottom: 0;
            width: 100%;
        }
 
        &-footer {
            &__button_cart {
                background-color: #B22180;
                color: #fff;
                border: none;
                text-align: center;
                padding: 10px 35px;
                font-size: 16px;
                font-weight: 500;
                border-radius: 8px;
                min-width: 150px;
            }
            &__button_continue {
                background-color: #C6C3C3;
                color: #352249;
                border: none;
                text-align: center;
                padding: 10px 35px;
                font-size: 16px;
                font-weight: 500;
                border-radius: 8px;
                min-width: 150px;
            }
            padding: 30px;
            display: flex;
            justify-content: space-between;
        }
    }
</style>
