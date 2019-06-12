<template>
    <div class="job-full">
        <div class="job-full__main-info">
            <div>
                <h1 class="job__title job__title--full-view">{{job.job_title}}</h1>
                <h3 class="job-full__salary">{{job.job_salary}}$</h3>
                <div class="job-full__company"><span>Company:</span> {{job.job_company}}</div>
            </div>
            <div>
                <button class="job-full__apply-btn">Apply</button>
            </div>
        </div>
        <div class="job-full__desc">
            <h2 class="job-full__subheader">Description:</h2>
            <p>{{job.job_description}}</p>
        </div>
        <div class="job-full__requirements">
            <h2 class="job-full__subheader">Requirements:</h2>
            <ul class="job-full__skills-list">
                <li class="job-full__skills-list-item" v-for="(requirements, index) in job.job_requirements" v-bind:key="index">{{requirements}}</li>
            </ul>
        </div>
        <div class="job-full__benefits">
            <h2 class="job-full__subheader">Benefits:</h2>
            <ul>
                <li v-for="(benefit, index) in job.job_benefits" v-bind:key="index"><i class="fa fa-check-square" aria-hidden="true"></i> {{benefit}}</li>
            </ul>
        </div>
        <div class="job-full__company">
            <h2 class="job-full__subheader">About company:</h2>
            <ul>
                <li v-for="(isDevTool, index) in job.job_about_company" v-bind:key="index"><i class="fa" :class="{'fa-smile-o': isDevTool, 'fa-frown-o': !isDevTool}" aria-hidden="true"></i> DevTool {{index + 1}} </li>
            </ul>

        </div>
        <div>
            <div>
                <button class="job-full__apply-btn">Apply</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    name: 'job',
    data () {
        return {
            jobs: [],
            apiLink: 'http://localhost:5000/api/jobs',
            job: [],
            hasAbout: false
        }
    },
    created () {
        axios.get(this.apiLink)
            .then(response => {
                this.jobs = response.data
                this.job = this.jobs[this.$route.params.jobId];
            })
            .catch(error => {
                alert(error);
            })
    },
    methods: {
        isFirmHasDevelopmentTool () {
            this.job.job_about_company
        }
    }
}
</script>

<style lang="scss">
    $color-main: #185682;

    .job-full{
        width: 50%;
        margin-left: 25%;
        padding: 15px;

        & > div{
            padding: 25px;
            margin-top: 30px;
            border-bottom: 5px solid #185682;
            background-color: #fff;
            box-shadow: 0px 0px 15px #dddddd;

            &:first-of-type{
                box-shadow: none;
                margin-top: 0;
                border-radius: 0;
                border-top-right-radius: 4px;
                border-top-left-radius: 4px;
            }

            &:last-of-type{
                border-bottom-left-radius: 4px;
                border-bottom-right-radius: 4px;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }

        &__main-info{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
        }

        &__salary{
            font-size: 22px;
        }

        &__apply-btn{
            border: none;
            background-color: $color-main;
            padding: 14px 64px;
            border-radius: 4px;
            color: white;
            transition: .25s;

            &:hover{
                box-shadow: 0 0 15px #8b8b8b;
            }
        }

        &__company{
            font-size: 16px;

            & span {
                color: #7D8795;
            }
        }

        &__requirements{
        }

        &__benefits{
            & ul {
                padding: 0;
                list-style: none;

                & li {
                    display: flex;
                    font-size: 18px;
                    align-items: center;

                    & i {
                        font-size: 20px;
                        margin-right: 5px;
                        color: lighten($color-main, 15%);
                    }
                }
            }
        }

        &__subheader{
            font-size: 22px;
            text-transform: uppercase;
        }

        &__desc{
            & p {
                margin-bottom: 0;
            }
        }

        &__skills-list{
            padding: 0;
            list-style-type: none;
            display: flex;
            margin-top: 15px;
            flex-wrap: wrap;
            margin-bottom: 0;
        }

        &__skills-list-item{
            background-color: lighten($color-main, 15%);
            padding: 2px 6px;
            margin-right: 10px;
            border-radius: 4px;
            color: white;
            margin: 0 8px 10px 0;

        }

        &__company{
            & ul {
                padding: 0;
                margin-bottom: 0;
                list-style-type: none;

                & li {
                    font-size: 18px;

                    & i {
                        font-size: 20px;

                        &.fa-frown-o {
                            color: #e30808;
                        }

                        &.fa-smile-o {
                            color:#00c900;
                        }
                    }
                }
            }
        }
    }
</style>
