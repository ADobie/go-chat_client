import Vue from 'vue'
import App from './App'
import router from './router'
import Vuetify from 'vuetify'
import vuetify from '@/plugins/vuetify'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueAxios from 'vue-axios'
import axios from 'axios'
import Chat from 'jwchat';



Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(Vuetify);
Vue.use(VueAxios, axios);
Vue.use(Chat);

/* eslint-disable no-new */
new Vue({
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
