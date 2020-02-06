import Vue from 'vue'
import App from './App.vue'

import VueLogger from 'vuejs-logger';
const isProduction = process.env.NODE_ENV === 'production';

const options = {
  isEnabled: true,
  logLevel : isProduction ? 'error' : 'debug',
  stringifyArguments : false,
  showLogLevel : true,
  showMethodName : true,
  separator: '|',
  showConsoleColors: true
};

Vue.use(VueLogger, options);

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEye, faHeart, faTags } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEye, faHeart, faTags);

Vue.component('fa', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
