<template>
    <ul v-if="jobs && jobs.length" class="jobs-list">
        <li v-for="job of jobs" v-bind:key="job.id" class="jobs-list__item">
            <a href="#" class="job-link">
                <div class="job">
                    <div>
                        <h2 class="job__title">{{job.job_title}} - {{job.job_company}}</h2>
                        <div class="job__description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus beatae tenetur ipsa recusandae unde animi maiores tempora magnam aperiam consequuntur, obcaecati impedit odit ab fugit! Deserunt hic officiis consectetur minima.</div>
                    </div>
                    <div>
                        <div class="job__salary">{{job.job_salary}}$</div>
                    </div>
                </div>
            </a>
        </li>
    </ul>
</template>
<script>
import axios from 'axios';

export default {
    
    data () {
        return {
            jobs: [],
            apiLink: 'http://localhost:5000/api/jobs'
        }
    },
    created () {
        axios.get(this.apiLink)
            .then(response => {
                this.jobs = response.data
            })
            .catch(error => {
                console.log(error);
            })
    },
    methods: {
    }
}
</script>


<style lang="scss">
.jobs-list{
    list-style: none;
    padding: 0;

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

    &:first-of-type{
        margin-top: 15px;
    }

    &__title{
        font-size: 24px;
        font-weight: bold;
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
    width: 70%;
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
</style>
