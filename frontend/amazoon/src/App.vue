<template>
  <div id="app">
    <Menu></Menu>
    <Job></Job>
  </div>
</template>

<script>
import Menu from './components/Menu';
import Jobs from './components/Jobs';
import Job from './components/Job';

export default {
  name: 'app',
  components: {
    Menu,
    Jobs,
    Job
  }
}
</script>

<style lang="scss">
</style>