<template>
  <div class="main-root">
    <Card class="card">
      <div slot="title" class="title">
        <Select
          v-model="seletData"
          style="width:200px"
          size="small"
          @on-change="onChange">
          <Option
            v-for="(i, index) in selectOptions"
            :key="index"
            :value="i">
            图{{i}}
          </Option>
        </Select>
      </div>
      <div class="content">
        <Table
          border
          :columns="col"
          :data="inputData"></Table>
      </div>
      <div class="foot">
        <Button
          type="primary"
          size="small"
          @click.native="onIputData">录入</Button>
        <Button
          type="primary"
          size="small"
          class="ml10"
          @click.native="onClear">删除</Button>
      </div>
    </Card>

    <Card class="card">
      <div slot="title">
        趋势走向
        <Checkbox v-model="isStraightTrend" class="ml10">直势</Checkbox>
        <Checkbox v-model="isAcrossTrend">横势</Checkbox>
        <Checkbox v-model="seletedAll">全选</Checkbox>
        <!-- <Checkbox v-model="isJi">奇数</Checkbox>
        <Checkbox v-model="isOu">偶数</Checkbox> -->
        <RadioGroup v-model="dataType">
          <Radio
            v-for="(item, index) in radioGroups"
            :key="index"
            :label="item.value">
            <span>{{ item.label }}</span>
          </Radio>
        </RadioGroup>
      </div>
      <div class="content" style="height: 600px;">
        <DataTable
          :id="seletData"
          :tb-data="chartData"
          :seleted-all="seletedAll"
          :type="dataType"/>
      </div>
    </Card>
  </div>
</template>

<script>
import { CN_NUMBER } from '@/const/number'
import DataTable from '@/components/data-table'
import store from '@/service/store'
import _ from 'lodash'

export default {
  name: 'Detail',

  components: {
    DataTable
  },

  data () {
    return {
      inputData: [],

      seletData: '',
      // 直势
      isStraightTrend: false,
      // 横势
      isAcrossTrend: false,
      // 全选
      seletedAll: false,
      // 数据类型
      dataType: 'ALL_DATA',
      // 显示的数据
      chartData: [],

      radioGroups: [
        { label: '全部', value: 'ALL_DATA' },
        { label: '奇数', value: 'ODD_DATA' },
        { label: '偶数', value: 'EVEN_DATA' }
      ]
    }
  },

  computed: {
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
          key: i + '',
          render: (h, params) => {
            let _this = this
            return h('Input', {
              props: {
                value: params.row[i + ''],
                size: 'small'
              },
              on: {
                'input': (val) => {
                  _this.inputData[params.index][i + ''] = val
                }
              },
              nativeOn: {
                'change': (ev) => {
                  if (_this.checkData(params.index, ev.target.value, i + '')) {
                    _this.inputData[params.index][i + ''] = ''
                  }
                }
              }
            })
          }
        })
      }
      return colArr
    },

    selectOptions () {
      let arr = []
      for (let i = 1; i <= 200; i++) {
        arr.push(i + '')
      }
      return arr
    }
  },

  mounted () {
    // console.log(this.$route.params.index)
    this.seletData = (this.$route.params.index || 1) + ''
    this.dataType = this.$route.query.type || 'ALL_DATA'
    console.log('路由', this.$route.query)
    this.init()
  },

  methods: {
    init () {
      let allData = store.get('charts')
      let currentData = allData ? (allData[this.seletData + ''] ?  allData[this.seletData + ''] : []) : []
      let obj = {}
      for (let i = 0; i < 10; i++) {
        obj[i + ''] = ''
      }
      if (currentData.length > 0) {
        obj.index = currentData.length + 1
      } else {
        obj.index = 1
      }
      this.inputData = _.clone([obj])
      this.chartData = currentData

      console.log(currentData)
    },

    removeData (index) {
      let newData = this.inputData.filter(item => item.index !== index)
      this.inputData = newData.map((item, index) => {
        item.index = index + 1
        return item
      })
    },
    /**
     * 数据校验
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
    },
    /**
     * 录入数据
     */
    onIputData () {
      let arr = []
      const { index, ...obj } = this.inputData[0]
      for (let i = 0; i < 10; i++) {
        arr.push(obj[i + ''])
      }
      if (arr.indexOf('') > -1) return this.$Message.error('请录入完整的数据')
      this.chartData.push(arr)
      store.set(`charts.${this.seletData + ''}`, this.chartData)
      this.init()
    },

    onClear () {
      store.set(`charts.${this.seletData + ''}`, [])
      this.init()
    },

    onChange(val) {
      this.seletData = val
      this.init()
    }
  }
}
</script>

<style lang="stylus" scoped>
.ml10 {
  margin-left 10px
}

.main-root {
  width 100%
  padding 10px
  box-sizing border-box

  .card {
    margin-top 10px

    .content {
      width 100%
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
