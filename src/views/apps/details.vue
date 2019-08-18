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
            图{{i + 1}}
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
          @click.native="showModal = true">删除</Button>
      </div>
    </Card>

    <Card class="card">
      <div slot="title">
        趋势走向:
        <RadioGroup v-model="trendType" class="ml10">
          <Radio :label="0">
            <span>正常</span>
          </Radio>
          <Radio :label="1">
            <span>直势</span>
          </Radio>
          <Radio :label="2">
            <span>斜势</span>
          </Radio>
        </RadioGroup>
        <!-- <Checkbox v-model="isStraightTrend" class="ml10">直势</Checkbox>
        <Checkbox v-model="isAcrossTrend">横势</Checkbox>
        <Checkbox v-model="seletedAll">全选</Checkbox> -->
        <!-- <Checkbox v-model="isJi">奇数</Checkbox>
        <Checkbox v-model="isOu">偶数</Checkbox> -->
        数据显示:
        <RadioGroup v-model="dataType">
          <Radio
            v-for="(item, index) in radioGroups"
            :key="index"
            :label="index">
            <span>{{ item.label }}</span>
          </Radio>
        </RadioGroup>
      </div>
      <div class="content" style="height: 600px;">
        <!-- <DataTable
          :id="seletData"
          :tb-data="chartData"
          :seleted-all="seletedAll"
          :type="dataType"/> -->

        <DataTable
          :trend="trendType"
          :rowType="dataType"
          :data="chartData"></DataTable>
      </div>
    </Card>
    <Modal
      v-model="showModal"
      title="警告"
      @on-ok="onClear">
      <p>该操作将删除本图下的所有数据，是否继续?</p>
    </Modal>
  </div>
</template>

<script>
import { CN_NUMBER } from '@/const/number'
import DataTable from '@/components/data-table'
import _ from 'lodash'
import { mapGetters } from 'vuex'

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
      dataType: 0,
      // 显示的数据
      chartData: [],
      // 走势类型
      trendType: 0,

      radioGroups: [
        { label: '全部', value: 0 },
        { label: '奇数', value: 1 },
        { label: '偶数', value: 2 }
      ],
      showModal: false
    }
  },

  computed: {
    ...mapGetters({
      originData: 'appData/getOriginData'
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
      for (let i = 0; i < 200; i++) {
        arr.push(i)
      }
      return arr
    }
  },

  watch: {
    trendType (val) {
      if (val) this.dataType = 0
    },
    dataType (val) {
      if (val) this.trendType = 0
    }
  },

  mounted () {
    this.seletData = (this.$route.params.index || 1)
    // this.dataType = this.$route.query.type || 'ALL_DATA'
    console.log('路由', this.$route.params.index)
    this.init()
  },

  methods: {
    init () {
      let allData = this.originData
      let currentData = allData ? (allData[this.seletData] ? allData[this.seletData] : []) : []
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
      console.log('录入的数据:', arr)
      let origin = _.clone(this.originData)
      origin[this.seletData].push(arr)

      this.$store.dispatch('appData/setOriginData', origin)
      this.$store.dispatch('appData/syncOriginData')
      this.init()
    },

    onClear () {
      let data = _.clone(this.originData)
      data[this.seletData] = []
      this.$store.dispatch('appData/setOriginData', data)
      this.$store.dispatch('appData/syncOriginData')
      this.init()
      this.showModal = false
    },

    onChange(val) {
      this.seletData = val
      console.log(this.seletData)
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
