<template>
  <div id="app">
    <Menu></Menu>
    <router-view />
  </div>
</template>

<script>
import Menu from './components/Menu';
import Jobs from './components/Jobs';
import Job from './components/Job';

export default {
  name: 'app',
  components: {
    Menu
  }
}
</script>

<style lang="scss">
#app{
  background-color: #eee;
  min-height: 100vh;
}
</style>