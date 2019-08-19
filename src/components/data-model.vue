<template>
  <Modal
    v-model="showModel"
    width="800"
    title="已录入数据"
    @on-cancel="onCancel"
    @on-ok="onCancel">
    <div style="width: 100%; height: 600px;">
      <Table
        border
        :columns="col"
        :data="tbData"></Table>
    </div>
  </Modal>
</template>

<script>
import { CN_NUMBER, EN_NUMBER } from '@/const/number'
import { mapGetters } from 'vuex'

export default {
  name: 'DataModel',

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      showModel: this.show
      // tbData: []
    }
  },

  watch: {
    show (newVal) {
      this.showModel = newVal
    }
  },

  computed: {
    ...mapGetters({
      getCacheData: 'appData/getCacheData'
    }),

    tbData () {
      if (!this.getCacheData) return []
      return this.getCacheData.map((arr, index) => {
        const [one, two, three, four, five, six, seven, eight, night, ten] = arr
        return {
          index: index + 1,
          one,
          two,
          three,
          four,
          five,
          six,
          seven,
          eight,
          night,
          ten
        }
      })
    },
    col () {
      let colArr = [
        {
          title: '次数',
          key: 'index'
        }
      ]
      for (let i = 0; i < CN_NUMBER.length; i++) {
        colArr.push({
          title: CN_NUMBER[i],
          key: EN_NUMBER[i]
        })
      }
      colArr.push({
        title: '操作',
        render: (h, params) => {
          console.log(params)
          let _this = this
          return h('a', {
            on: {
              'click': () => {
                _this.onRemove(params.row.index)
              }
            }
          }, '删除')
        }
      })
      return colArr
    }
  },

  methods: {
    onCancel () {
      this.$emit('on-cancel')
    },

    onRemove (index) {
      const cache = this.getCacheData
      let newCache = cache.filter((arr, i) => {
        return i !== (index - 1)
      })
      this.$store.dispatch('appData/setCacheData', newCache)
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
