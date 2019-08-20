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
      <div class="foot">
        <Button type="primary" size="small" @click.native="addData">录入</Button>
        <Button
          type="primary"
          size="small"
          class="ml10"
          @click.native="showModel = true">记录</Button>
        <!-- <Button
          type="primary"
          class="ml10"
          size="small">历史记录</Button> -->
        <!-- <Button
          type="primary"
          class="ml10"
          size="small">数据处理2</Button> -->
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
            :class="{'active-chart': analyChartIndex.includes(index) }"
            @click="jumpDetail(i)">
            图{{ i + 1 }}
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
            :class="{'active-chart': analyOddChartIndex.includes(index) }"
            class="item"
            @click="jumpDetail(i, 'ODD_DATA')">
            图{{ i + 1 }}
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
            :class="{'active-chart': analyEvenChartIndex.includes(index) }"
            class="item"
            @click="jumpDetail(i, 'EVEN_DATA')">
            图{{ i + 1 }}
          </div>
        </div>
      </div>
    </Card>

    <DataModel
      :show="showModel"
      @on-cancel="onModelCancel"/>
  </div>
</template>

<script>
import { APPS_DATA_INPUT_DETAIL } from '@/routers/route-names'
import { CN_NUMBER, EN_NUMBER } from '@/const/number'
import { mapGetters } from 'vuex'
import DataModel from '@/components/data-model'

export default {
  name: 'DataInput',

  components: {
    DataModel
  },

  data () {
    return {
      inputData: [
        {
          index: this.getCacheData ? this.getCacheData.length + 1 : 1,
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
      // 有横势斜势的图编号
      activeChart: [],
      // 偶数图判断
      evenActiveChart: [],
      // 奇数图判断
      oddActiveChart: [],
      showModel: false
    }
  },

  computed: {
    ...mapGetters({
      getCacheData: 'appData/getCacheData',
      getOriginData: 'appData/getOriginData'
    }),
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
      for (let i = 0; i < 200; i++) {
        arr.push(i)
      }
      return arr
    },
    // 单数数据
    singleGroupData () {
      return this.groupsData
    },
    // 双数数据
    doubleGroupData () {
      return this.groupsData
    },
    // 分析后的活动数据
    analyChartIndex () {
      return [...new Set(this.activeChart)]
    },
    analyEvenChartIndex () {
      return [...new Set(this.evenActiveChart)]
    },
    analyOddChartIndex () {
      return [...new Set(this.oddActiveChart)]
    }
  },

  mounted () {
    this.inputData = [{
      index: this.getCacheData ? this.getCacheData.length + 1 : 1,
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
    }]
    this.analyChart()
  },

  methods: {
    addData () {
      let cache = this.getCacheData || []
      const data = this.inputData[0]
      console.log('debug:', data)
      for (let key in data) {
        if (!data[key] || data[key] === '') return this.$Message.error('请录入完整数据')
      }
      const { one, two, three, four, five, six, seven, eight, night, ten } = data
      cache.push([one, two, three, four, five, six, seven, eight, night, ten])
      this.$store.dispatch('appData/setCacheData', cache)
      let defaultData = {
        index: this.getCacheData ? this.getCacheData.length + 1 : 1,
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
      this.inputData = [defaultData]
      this.analyChart()
    },

    onModelCancel () {
      this.showModel = false
      let defaultData = {
        index: this.getCacheData ? this.getCacheData.length + 1 : 1,
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
      this.inputData = [defaultData]
      this.analyChart()
    },

    /**
     * 分析数据
     */
    analyChart () {
      // 源数据
      const originData = this.getOriginData
      // 录入数据
      const cacheData = this.getCacheData || []
      if (cacheData.length < 3) return
      for (let i = 0; i < originData.length; i++) {
        if (!originData[i].length) continue
        let chart = originData[i]
        // 直势判断
        for (let colIndex = 0; colIndex < 10; colIndex++) {
          for (let rowIndex = 0; rowIndex < cacheData.length - 1; rowIndex++) {
            if (rowIndex + 1 >= cacheData.length - 1) continue
            // 如果图里面垂直方向的三个数与录入的数据的垂直方向三个数相同
            // console.log(`====================图${i}第${colIndex}列=========================`)
            // console.log('图:', chart[rowIndex][colIndex], chart[rowIndex + 1][colIndex], chart[rowIndex + 2][colIndex])
            // console.log('录入:', cacheData[rowIndex][colIndex], cacheData[rowIndex + 1][colIndex], cacheData[rowIndex + 2][colIndex])
            if ((chart[rowIndex][colIndex] === cacheData[rowIndex][colIndex] + '') && (chart[rowIndex + 1][colIndex] === cacheData[rowIndex + 1][colIndex] + '') && (chart[rowIndex + 2][colIndex] === cacheData[rowIndex + 2][colIndex] + '')) {
              console.log('判断成功!')
              this.activeChart.push(i)
            }
            if (rowIndex + 2 >= cacheData.length - 1) continue
            // 偶数行判断
            if (((rowIndex + 1) % 2 === 0) && (chart[rowIndex][colIndex] === cacheData[rowIndex][colIndex] + '') && (chart[rowIndex + 2][colIndex] === cacheData[rowIndex + 2][colIndex] + '') && (chart[rowIndex + 4][colIndex] === cacheData[rowIndex + 4][colIndex] + '')) {
              console.log('偶数判断成功!')
              this.evenActiveChart.push(i)
            }
            if (rowIndex + 3 >= cacheData.length - 1) continue
            // 奇数行判断
            if (((rowIndex + 1) % 2 > 0)(chart[rowIndex][colIndex] === cacheData[rowIndex][colIndex] + '') && (chart[rowIndex + 2][colIndex] === cacheData[rowIndex + 2][colIndex] + '') && (chart[rowIndex + 4][colIndex] === cacheData[rowIndex + 4][colIndex] + '')) {
              console.log('奇数判断成功!')
              this.oddActiveChart.push(i)
            }
          }
        }
      }
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

  .active-chart {
    background-color #FFFF00
    &:hover {
      background-color #FFFF00 !important
      color #333
    }
  }
}
</style>
