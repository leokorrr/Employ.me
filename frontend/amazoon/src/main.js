import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import Job from './components/Job.vue';
import Jobs from './components/Jobs.vue';

Vue.config.productionTip = false
Vue.use(VueRouter);

const routes = [
  {
    path: '/job',
    component: Job,
  },
  {
    path: '/',
    component: Jobs
  }
];

const router = new VueRouter({
  routes
})

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
