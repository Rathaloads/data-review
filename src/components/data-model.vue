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
        :height="400"
        :columns="col"
        :data="tbData"></Table>
      <div
        v-show="showEdit"
        style="margin-top: 20px;">
        <p style="font-size: 16px; font-weight: 700; margin-bottom: 10px;">编辑</p>
        <Table
          border
          :columns="editCol"
          :data="inputData"></Table>
      </div>
    </div>
  </Modal>
</template>

<script>
import { CN_NUMBER, EN_NUMBER } from '@/const/number'
import { mapGetters } from 'vuex'
import _ from 'lodash'

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
      showModel: this.show,
      inputData: [
        {
          index: 1,
          one: '',
          two: '',
          three: '',
          four: '',
          five: '',
          six: '',
          seven: '',
          eight: '',
          night: '',
          ten: ''
        }
      ],
      showEdit: false
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
          let _this = this
          let removeOpt = h('a', {
            on: {
              'click': () => {
                _this.onRemove(params.row.index)
              }
            }
          }, '删除')
          let editOpt = h('a', {
            on: {
              'click': () => {
                if (_this.showEdit) return this.$Message.error('请先保存之前的数据')
                _this.onEdit(params.row.index)
              }
            }
          }, '编辑')
          return h('span', [removeOpt, editOpt])
        }
      })
      return colArr
    },

    // 编辑表表头
    editCol () {
      let colArr = [
        {
          title: '次数',
          key: 'index'
        }
      ]
      for (let i = 0; i < CN_NUMBER.length; i++) {
        colArr.push({
          title: CN_NUMBER[i],
          key: EN_NUMBER[i],
          render: (h, params) => {
            let _this = this
            return h('Input', {
              props: {
                value: params.row[EN_NUMBER[i]],
                size: 'small'
              },
              on: {
                'input': (val) => {
                  _this.inputData[params.index][EN_NUMBER[i]] = val
                }
              },
              nativeOn: {
                'change': (ev) => {
                  if (_this.checkData(params.index, ev.target.value, EN_NUMBER[i])) {
                    _this.inputData[params.index][EN_NUMBER[i]] = ''
                  }
                }
              }
            })
          }
        })
      }
      colArr.push({
        title: '操作',
        render: (h, params) => {
          let _this = this
          let saveOpt = h('a', {
            on: {
              'click': () => {
                _this.onSave()
              }
            }
          }, '保存')
          return h('span', [saveOpt])
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
    },
    /**
     * 编辑操作
     */
    onEdit (index) {
      const [one, two, three, four, five, six, seven, eight, night, ten] = this.getCacheData[index - 1]
      this.inputData = [{
        index: index,
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
      }]
      this.showEdit = true
      console.log('编辑操作.....', index)
    },
    /**
     * 保存操作
     */
    onSave () {
      const cache = this.getCacheData
      const data = this.inputData[0]
      const { one, two, three, four, five, six, seven, eight, night, ten, index } = data
      console.log('进来了....')
      const newArr = [one, two, three, four, five, six, seven, eight, night, ten]
      cache[index - 1] = _.clone(newArr)
      this.$store.dispatch('appData/setCacheData', cache)
      this.inputData = [
        {
          index: 1,
          one: '',
          two: '',
          three: '',
          four: '',
          five: '',
          six: '',
          seven: '',
          eight: '',
          night: '',
          ten: ''
        }
      ]
      this.showEdit = false
    },
    /**
     * 数字校验
     */
    checkData (index, val, prop) {
      if (!parseInt(val)) return false
      let isExist = false
      for (let key in this.inputData[index]) {
        if (key !== 'index' && key !== prop) {
          let num = parseInt(this.inputData[index][key])
          if (num === parseInt(val)) {
            console.log(parseInt(val), num)
            isExist = true
          }
        }
      }
      if (isExist) {
        this.$Message.error('同一行的数字重复')
      }
      return isExist
    }
  }
}
</script>

<style lang="stylus" scoped>

</style>
