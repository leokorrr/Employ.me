<template>
    <div class="observer"></div>
</template>

<script>
export default {
    data () {
        return {
            observer: null
        };
    },
    mounted () {
        setTimeout(()=> {
            this.observer = new IntersectionObserver(([entry]) => {
                if (entry && entry.isIntersecting) {
                    this.$emit('intersect');
                }
            })

            this.observer.observe(this.$el);
        }, 1000)
        
    }
}   
</script>

<style scoped> 
.observer{
    height: 1px;
}
</style>
