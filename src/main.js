import Vue from 'vue';
import Buefy from 'buefy';
import App from './App.vue';
import './plugins/firebase';
import router from './router';
import store from './store';
// import './registerServiceWorker';
import './assets/styles.scss';

Vue.use(Buefy);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
