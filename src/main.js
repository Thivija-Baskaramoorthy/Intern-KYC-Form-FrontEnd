import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import axios from "axios";
import {Cropper} from "vue-advanced-cropper";
import 'vue-advanced-cropper/dist/style.css'
import OtpInput from "@bachdgvn/vue-otp-input"
import {createPinia,PiniaVuePlugin} from "pinia";

import VeeValidate from 'vee-validate';
import { ValidationObserver, ValidationProvider} from "vee-validate";
import './helpers/validation.js'

Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver',ValidationObserver);
Vue.use(Buefy)
Vue.use(PiniaVuePlugin)
const pinia =createPinia()
Vue.config.productionTip = false
Vue.prototype.$axios = axios
Vue.component("v-otp-input", OtpInput);


new Vue({
  router,
  pinia,
  render: h => h(App)
}).$mount('#app')
