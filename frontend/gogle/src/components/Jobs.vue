<template>
    <div>
        <a href="#" class="job-link">
            <div class="job">
                <div>
                    <h2 class="job__title">Gamer - Gogle</h2>
                    <div class="job__description">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusamus beatae tenetur ipsa recusandae unde animi maiores tempora magnam aperiam consequuntur, obcaecati impedit odit ab fugit! Deserunt hic officiis consectetur minima.</div>
                </div>
                <div>
                    <div class="job__salary">$1000</div>
                </div>
            </div>
        </a>
        <div>{{jobs.title}}</div>
        <div>{{err}}</div>
    </div>
</template>
<script>

export default {
    data () {
        return {
            jobs: null,
            err: null
        }
    },
    created () {
        this.fetchData()
    },
    methods: {
        fetchData () {
            fetch('https://jsonplaceholder.typicode.com/posts')
                .then((res)=>{
                    this.jobs = res;
                    return this.jobs
                })
        }
    }
}
</script>


<style lang="scss">
.job{
    padding: 25px;
    border: 1px solid #eeeeee;
    border-radius: 4px;
    margin: 15px 17%;
    display: flex;
    transition: .2s;

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

