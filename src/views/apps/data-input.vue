<template>
  <div class="data-input-root">
    <Card class="card">
      <p slot="title">录入数据</p>
      <div class="content">
        <Table
          border
          :columns="col"
          :data="inputData"></Table>
      </div>
      <!-- <div class="options">
        <Icon
          :size="20"
          style="cursor: pointer;"
          type="ios-add-circle-outline"
          @click="addData" />
      </div> -->
      <div class="foot">
        <Button type="primary" size="small">录入</Button>
        <Button
          type="primary"
          size="small"
          class="ml10">记录</Button>
        <Button
          type="primary"
          class="ml10"
          size="small">数据处理1</Button>
        <Button
          type="primary"
          class="ml10"
          size="small">数据处理2</Button>
      </div>
    </Card>

    <Card class="card">
      <p slot="title">全表</p>
      <div class="content">
        <div class="group">
          <div
            v-for="(i, index) in groupsData"
            :key="index"
            class="item"
            @click="jumpDetail(i)">
            图{{ i }}
          </div>
        </div>
      </div>
    </Card>

    <Card class="card">
      <p slot="title">奇数表</p>
      <div class="content">
        <div class="group">
          <div
            v-for="(i, index) in singleGroupData"
            :key="index"
            class="item"
            @click="jumpDetail(i, 'ODD_DATA')">
            图{{ i }}
          </div>
        </div>
      </div>
    </Card>

    <Card class="card">
      <p slot="title">偶数表</p>
      <div class="content">
        <div class="group">
          <div
            v-for="(i, index) in doubleGroupData"
            :key="index"
            class="item"
            @click="jumpDetail(i, 'EVEN_DATA')">
            图{{ i }}
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
import { APPS_DATA_INPUT_DETAIL } from '@/routers/route-names'
import { CN_NUMBER, EN_NUMBER } from '@/const/number'

export default {
  name: 'DataInput',

  data () {
    return {
      inputData: [
        {
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
    }
  },

  computed: {
    col () {
      let colArr = [
        {
          title: '次数',
          type: 'index'
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
      return colArr
    },

    // 组数据
    groupsData () {
      let arr = []
      for (let i = 1; i <= 200; i++) {
        arr.push(i)
      }
      return arr
    },
    // 单数数据
    singleGroupData () {
      let singles = this.groupsData.filter(i => i % 2 > 0)
      return singles
    },
    // 双数数据
    doubleGroupData () {
      let doubles = this.groupsData.filter(i => i % 2 === 0)
      return doubles
    }
  },

  methods: {
    addData () {
      let defaultData = {
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
      defaultData.index = this.inputData.length + 1
      this.inputData.push(defaultData)
    },

    removeData (index) {
      let newData = this.inputData.filter(item => item.index !== index)
      this.inputData = newData.map((item, index) => {
        item.index = index + 1
        return item
      })
    },

    jumpDetail (index, dataType = 'ALL_DATA') {
      this.$router.push({ name: APPS_DATA_INPUT_DETAIL, params: { index }, query: { type: dataType } })
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
.ml10 {
  margin-left 10px
}
.data-input-root {
  width 100%
  padding 10px
  box-sizing border-box

  .card {
    margin-top 10px

    .content {
      width 100%

      .group {
        width 100%
        height 100%
        display flex
        flex-wrap wrap
        box-sizing border-box
        padding 5px
        .item {
          width 40px
          height 40px
          box-sizing border-box
          border 1px solid #333
          text-align center
          line-height 40px
          font-size 12px
          border-radius 5px
          margin-top 5px
          margin-left 5px
          cursor pointer
          &:hover {
            background-color #f2f2f2
            color #333
          }
        }
      }
    }

    .options {
      width 100%
      box-sizing border-box
      text-align center
      padding-top 10px
      padding-bottom 10px
    }
    .foot {
      width 100%
      box-sizing border-box
      padding-top 10px
      padding-bottom 10px
    }
  }
}
</style>
