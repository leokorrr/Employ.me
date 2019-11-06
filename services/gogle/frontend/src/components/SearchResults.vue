<template>
    <div>
        <div class="actions">
            <div class="actions__back-btn">
                <router-link to="/"><button>Back</button></router-link>
            </div>
        </div>
        <ul v-if="jobs && jobs.length" class="jobs-list">
            <li v-for="(job, index) of jobs" v-bind:key="index" class="jobs-list__item">
                <router-link :to="{name: 'job', params: { jobId : index}}"  class="job-link">
                    <div class="job">
                        <div>
                            <h2 class="job__title">{{job.job_title}} - {{job.job_company}}</h2>
                            <div class="job__description">{{job.job_description}}</div>
                        </div>
                        <div>
                            <div class="job__salary">{{job.job_salary}}$</div>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
        <observer  v-on:intersect="intersected" />
    </div>
</template>

<script>
import axios from 'axios';
import Observer from './Observer'


export default {
    name: 'search-results',
    components : {
        Observer
    },
    data() {
        return {
            jobs: [],
            apiLink: 'http://localhost:5000/api/jobs',
            fetchedJobs: [],
            // filters: this.$route.params.filters,
            searchJob: this.$route.params.searchJob
        }
    },
    created() {
        // if((this.filters.filterByTitle || this.filters.filterBySalary ) === undefined) {
        //     this.$router.push('/') 
        // }
        axios.get(this.apiLink)
            .then(response => {
                this.fetchedJobs = response.data;
                this.fetchedJobs.filter(this.findJobs);
                // if (this.filters.filterBySalary) {
                //     this.fetchedJobs.sort(this.compareSalary)
                // }

                // if(this.filters.filterByTitle) {
                //     this.fetchedJobs.sort(this.compareTitles)
                // }

            })
            .catch(error => {
                alert(error);
            })
    },
    methods: {
         intersected() {
            var jobsCount = Number(this.jobs.length + 10);

            for (var i = this.jobs.length; i < jobsCount; i++) {
                this.jobs.push(this.fetchedJobs[i])
            }
        },
        money() {
            this.fetchedJobs.sort(this.compareSalary)
            this.filterByMoney = true
        },
        findJobs (a) {
            const jobTitle = a.job_title;
            return jobTitle.toLowerCase() == this.searchJob.toLowerCase();
        },
        compareSalary(a,b) {
            const salaryA = a.job_salary;
            const salaryB = b.job_salary;

            let comparison = 0;

            if (salaryA > salaryB) {
                comparison = -1;
            } else if (salaryA < salaryB) {
                comparison = 1;
            }

            return comparison;
        },
        compareTitles(a, b) {
            const genreA = a.job_title.toUpperCase();
            const genreB = b.job_title.toUpperCase();
            
            let comparison = 0;
            if (genreA > genreB) {
                comparison = 1;
            } else if (genreA < genreB) {
                comparison = -1;
            }
            return comparison;
        }
    }
}
</script>