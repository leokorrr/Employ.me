<template>
  <div id="app">
    <Menu></Menu>
    <Jobs></Jobs>
  </div>
</template>

<script>
import Menu from './components/Menu';
import Jobs from './components/Jobs';

export default {
  name: 'app',
  components: {
    Menu,
    Jobs
  }
}
</script>

<style lang="scss">
</style>
