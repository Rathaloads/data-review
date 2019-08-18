<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'App',

  computed: {
    ...mapGetters({
      getOriginData: 'appData/getOriginData'
    })
  },

  mounted () {
    if (!this.getOriginData) {
      this.$store.dispatch('appData/fetchOriginData')
    }
    if (!this.getOriginData.length) {
      let data = []
      for (let i = 0; i < 200; i++) {
        data[i] = []
      }
      // 设置数据
      this.$store.dispatch('appData/setOriginData', data)
      // 同步数据
      this.$store.dispatch('appData/syncOriginData')
    }
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
