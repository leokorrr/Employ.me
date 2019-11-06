import Vue from 'vue';
import Router from 'vue-router';
import Jobs from './components/Jobs';
import Job from './components/Job';
import SearchResults from './components/SearchResults';

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Jobs
        },
        {
            path: '/jobs',
            name: 'Jobs',
            component: Jobs
        },
        {
            path: '/job',
            name: 'Job',
            component: Job
        },
        {
            path: '/search-results',
            name: 'search-results',
            component: SearchResults
        }
    ]
})