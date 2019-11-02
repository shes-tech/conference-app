import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
// import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faClock, faMapMarkerAlt);
Vue.component('font-awesome-icon', FontAwesomeIcon);
