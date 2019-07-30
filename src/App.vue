<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',

  mounted () {
    this.$store.dispatch('appData/getUserData')
    this.$store.dispatch('appData/getDatas')
  }
}
</script>

<style lang="stylus">
html,
body,
#app {
  width 100%
  height 100%
  overflow hidden
  color #333333
}
</style>
