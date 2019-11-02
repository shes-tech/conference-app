import Vue from 'vue';
import App from './App.vue';
import './plugins/firebase';
import router from './router';
import store from './store';
// import './registerServiceWorker';
import './plugins/fontawesome';
import './plugins/buefy';
import './assets/styles.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
