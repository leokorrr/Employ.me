import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Job from './components/Job.vue';
import Jobs from './components/Jobs.vue';
import SearchResults from './components/SearchResults.vue';

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  {
    path: '/job/:jobId',
    component: Job,
    name: 'job'
  },
  {
    path: '/',
    component: Jobs,
    name: 'Home'
  },
  {
    path: '/search-results/:filters',
    component: SearchResults,
    name: 'search-results'
  }
];

const router = new VueRouter({
  routes,
  mode: 'history'
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
