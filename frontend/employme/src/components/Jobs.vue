<template>
    <div>
        <div v-if="noResult">
            <div class="jobs-list">
                <div class="jobs-list__item">
                    <div class="job job--noresult">
                        Nothing was found
                    </div>
                </div>
            </div>
            <div class="nothing-found-image">
                <img src="../assets/sad-suffering-crying-emoticon-face.svg" alt="">
            </div>
            
        </div>
        <ul v-if="jobs && jobs.length" class="jobs-list">
            <li class="jobs-list__item">
                 <div class="offers-counter">
                     <h1 class="job__title"> Offers counter: {{this.jobs.length}} </h1>
                 </div>
            </li>
        </ul>
        <ul v-if="jobs && jobs.length" class="jobs-list">
            <li v-for="(job, index) of jobs" v-bind:key="index" class="jobs-list__item">
                <router-link v-if="job.job_sponsored" :to="{name: 'job', params: { jobId : job._id }}"  class="job-link">
                    <div class="job">
                        <div>
                            <h2 class="job__title">{{job.job_title}} - {{job.job_company}} <span>(Sponsor)</span></h2>
                            <div class="job__description">{{job.job_description}}</div>
                        </div>
                        <div>
                            <div class="job__salary">{{job.job_salary}}$</div>
                        </div>
                    </div>
                </router-link>
            </li>
            <!-- <hr> -->
        </ul>
        <ul v-if="jobs && jobs.length" class="jobs-list">
            <li v-for="(job, index) of jobs" v-bind:key="index" class="jobs-list__item">
                <router-link :to="{name: 'job', params: { jobId : job._id }}"  class="job-link">
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
        <div v-else-if="!noResult" class="loader-box">
            <div class="loader"></div>
        </div>
        
        
        <observer  v-on:intersect="intersected" />
    </div>
</template>

<script>
import axios from 'axios';
import Observer from './Observer'


export default {
    name: 'Jobs',
    components : {
        Observer
    },
    data() {
        return {
            jobs: [],
            apiLink: process.env.VUE_APP_NETWORK_URL,
            fetchedJobs: [],
            filterBySalary: false,
            filterByTitle: false,
            filters: {},
            searchJob: '',
            noResult: false
        }
    },
    created() {
        axios.get(`${this.apiLink}/api/jobs`)
            .then(response => {
                this.jobs = response.data;

                if (this.jobs.length === 0) {
                    this.noResult = true
                }
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
        }
    }
}
</script>


<style lang="scss">
.actions {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 40px;
    margin-bottom: 20px;

    &>div {
        width: 95%;
        max-width: 1000px;
    }

    &__search {
        max-width: 1000px;
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        @media (max-width: 879px) {
            justify-content: center;
        }

        & input.search-input {
            padding: 6px 15px;
            border-radius: 4px;
            border: 1px solid #6c028a;
            width: 85%;
            font-size: 24px;
            
            @media (max-width: 879px) {
                width: 100%;
            }

        }
    }

    &__back-btn {
        max-width: 1000px;
        width: 100%;

        & button {
            background-color: transparent;
            border: 1px solid #6c028a;
            padding: 6px 15px;
            border-radius: 4px;
            color: #6c028a;
            transition: .3s;

            &:hover {
                background-color: #6c028a;
                color: white
            }
        }
    }

    &__filters {
        width: 100%;
        max-width: 1000px;
        margin-top: 15px;

        &--mobile {
            display: none;
            @media (max-width: 879px) {
                display: flex !important;
            }
        }

        & form {
            display: flex;
            align-items: center;

            & span {
                font-weight: bold;
            }

            & input {
                margin-left: 10px;
                margin-right: 5px;
                height: 17px;
                width: 17px;
            }
        }

        @media (max-width: 879px) {
            display: none;
        }

        
    }

    &__search-btn {
        color: white;
        background-color: #6c028a;
        border: 1px solid #6c028a;
        border-radius: 4px;
        padding: 9px 30px;
        font-size: 20px;

        @media (max-width: 879px) {
            margin-top: 20px;
        }
    }
}

.jobs-list{
    list-style: none;
    padding: 0;
    margin-bottom: 0;
    margin-top: 15px;

    hr {
        max-width: 1000px;
        margin-top: 20px;
        margin-bottom: 20px;
    }

    &__item{
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.job{
    padding: 25px;
    border: 1px solid #eeeeee;
    border-radius: 4px;
    display: flex;
    transition: .2s;
    margin-bottom: 15px;
    background-color: #fff;
    border-bottom: 5px solid #6c028a;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    box-shadow: 0px 0px 15px #dddddd;

    &--noresult{
        box-shadow: none;
        border: none;
        font-size: 36px;
        font-weight: bold;
    }

    &:first-of-type{
        margin-top: 15px;
    }

    &__title{
        font-size: 24px;
        font-weight: bold;

        span {
            color: #7D8795;
            font-style: italic;
            font-weight: normal;
            font-size: 16px;
        }

        &--full-view{
            font-size: 28px;
        }
    }

    &__description{
        color: #777;
    }
    
    &__salary{
        font-weight: bold;
        font-size: 16px;
    }
}

.job-link{
    color: black;
    width: 95%;
    max-width: 1000px;

    &:hover{
        color: black;
        text-decoration: none;

        &>div{
            background-color: #f8f8f8;
    transition: .2s;
        }
    }
}

.loader {
  border: 10px solid #f3f3f3; 
  border-top: 10px solid #6c028a;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  animation: spin 2s linear infinite;
}

.loader-box {
    width: 100%;
    height: calc(100vh - 60px);
    display: flex;
    justify-content: center;
    align-items: center;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.offers-counter {
    max-width: 1000px;
    width: 100%;
    margin-top: 25px;

    h1 {
        font-size: 30px;
    }
}

.nothing-found-image {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 5%;

    img {
        width: 85%;
    }
}
</style>
