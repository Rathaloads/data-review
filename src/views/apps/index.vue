<template>
  <div class="wrapper">
    <div class="top-bar">
      <Menu
        mode="horizontal"
        theme="dark"
        :active-name="currentActiveMenu"
        @on-select="jump">
        <template v-for="(item, index) in menu">
          <MenuItem
            :name="item.name"
            :key="index">
            <Icon :type="item.icon" />
            {{ item.label }}
          </MenuItem>
        </template>
      </Menu>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
import { APPS_DATA_INPUT, APPS_DATA_REVIEW, AUTH_LOGIN } from '@/routers/route-names'
import { mapGetters } from 'vuex'

export default {
  name: 'Apps',

  data () {
    return {
      menu: [
        {
          icon: 'ios-paper',
          label: '数据录入',
          name: APPS_DATA_INPUT
        },
        {
          icon: 'md-build',
          label: '数据统计',
          name: APPS_DATA_REVIEW
        },
        {
          icon: 'ios-settings',
          label: '设置',
          name: AUTH_LOGIN
        }
      ]
    }
  },

  computed: {
    ...mapGetters({
      currentActiveMenu: 'menu/getCurrentActive'
    })
  },

  methods: {
    jump (routeName) {
      this.$store.dispatch('menu/setActiveMenu', routeName)
      this.$router.push({ name: routeName })
      console.log(routeName)
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper {
  width 100%
  height 100%
  overflow hidden
  box-sizing border-box
  position relative
  padding-top 63px

  .top-bar {
    position absolute
    width 100%
    top 0px
    left 0px
    z-index 10
  }
  .content {
    width 100%
    height 100%
    background-color #F6F6F6
    overflow auto
    &::-webkit-scrollbar {
      width 4px
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
      background: rgba(0,0,0,0.2)
    }
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 5px rgba(0,0,0,0.2)
      border-radius: 0
      background: rgba(0,0,0,0.1)
    }
  }
}
</style>
