<template>
  <div class="main-root">
    <Card class="card">
      <div slot="title" class="title">
        <Select v-model="seletData" style="width:200px" size="small">
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
      <div class="options">
        <Icon
          :size="20"
          style="cursor: pointer;"
          type="ios-add-circle-outline"
          @click="addData" />
      </div>
      <div class="foot">
        <Button type="primary" size="small">录入</Button>
      </div>
    </Card>

    <Card class="card">
      <div slot="title">
        趋势走向
        <Button type="primary" size="small" class="ml10">删除</Button>
        <Checkbox v-model="isStraightTrend" class="ml10">直势</Checkbox>
        <Checkbox v-model="isAcrossTrend">横势</Checkbox>
      </div>
      <div class="content">
        <Table
          border
          :columns="column"
          :data="trendData"></Table>
      </div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'Detail',

  data () {
    return {
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

      seletData: '1',
      // 趋势数据
      trendData: [],
      // 直势
      isStraightTrend: false,
      // 横势
      isAcrossTrend: false
    }
  },

  computed: {
    col () {
      return [
        {
          title: '次数',
          key: 'index'
        },
        {
          title: '一',
          key: 'one',
          render: (h, params) => {
            let _this = this
            return h('Input', {
              props: {
                value: params.row.one,
                size: 'small'
              },
              on: {
                'input': (val) => {
                  _this.inputData[params.index].one = val
                }
              }
            })
          }
        },
        {
          title: '二',
          key: 'two',
          render: (h, params) => {
            let _this = this
            return h('Input', {
              props: {
                value: params.row.two,
                size: 'small'
              },
              on: {
                'input': (val) => {
                  _this.inputData[params.index].two = val
                }
              }
            })
          }
        },
        {
          title: '三',
          key: 'three',
          render: (h, params) => {
            let _this = this
            return h('Input', {
              props: {
                value: params.row.three,
                size: 'small'
              },
              on: {
                'input': (val) => {
                  _this.inputData[params.index].three = val
                }
              }
            })
          }
        },
        {
          title: '四',
          key: 'four',
          render: (h, params) => {
            let _this = this
            return h('Input', {
              props: {
                value: params.row.four,
                size: 'small'
              },
              on: {
                'input': (val) => {
                  _this.inputData[params.index].four = val
                }
              }
            })
          }
        },
        {
          title: '五',
          key: 'five',
          render: (h, params) => {
            let _this = this
            return h('Input', {
              props: {
                value: params.row.five,
                size: 'small'
              },
              on: {
                'input': (val) => {
                  _this.inputData[params.index].five = val
                }
              }
            })
          }
        },
        {
          title: '六',
          key: 'six',
          render: (h, params) => {
            let _this = this
            return h('Input', {
              props: {
                value: params.row.six,
                size: 'small'
              },
              on: {
                'input': (val) => {
                  _this.inputData[params.index].six = val
                }
              }
            })
          }
        },
        {
          title: '七',
          key: 'seven',
          render: (h, params) => {
            let _this = this
            return h('Input', {
              props: {
                value: params.row.seven,
                size: 'small'
              },
              on: {
                'input': (val) => {
                  _this.inputData[params.index].seven = val
                }
              }
            })
          }
        },
        {
          title: '八',
          key: 'eight',
          render: (h, params) => {
            let _this = this
            return h('Input', {
              props: {
                value: params.row.eight,
                size: 'small'
              },
              on: {
                'input': (val) => {
                  _this.inputData[params.index].eight = val
                }
              }
            })
          }
        },
        {
          title: '九',
          key: 'night',
          render: (h, params) => {
            let _this = this
            return h('Input', {
              props: {
                value: params.row.night,
                size: 'small'
              },
              on: {
                'input': (val) => {
                  _this.inputData[params.index].night = val
                }
              }
            })
          }
        },
        {
          title: '十',
          key: 'ten',
          render: (h, params) => {
            let _this = this
            return h('Input', {
              props: {
                value: params.row.ten,
                size: 'small'
              },
              on: {
                'input': (val) => {
                  _this.inputData[params.index].ten = val
                }
              }
            })
          }
        },
        {
          title: '操作',
          render: (h, params) => {
            let _this = this
            return h('a', {
              on: {
                click: () => {
                  if (_this.inputData.length === 1) return
                  _this.removeData(params.row.index)
                }
              }
            }, '删除')
          }
        }
      ]
    },

    column () {
      return [
        {
          type: 'selection',
          width: 60
        },
        {
          title: '次数',
          key: 'index',
          width: 80
        },
        {
          title: '一',
          key: 'one'
        },
        {
          title: '二',
          key: 'two'
        },
        {
          title: '三',
          key: 'three'
        },
        {
          title: '四',
          key: 'four'
        },
        {
          title: '五',
          key: 'five'
        },
        {
          title: '六',
          key: 'six'
        },
        {
          title: '七',
          key: 'seven'
        },
        {
          title: '八',
          key: 'eight'
        },
        {
          title: '九',
          key: 'night'
        },
        {
          title: '十',
          key: 'ten'
        }
      ]
    },

    selectOptions () {
      let arr = []
      for (let i = 1; i <= 200; i++) {
        arr.push(i)
      }
      return arr
    }
  },

  mounted () {
    // console.log(this.$route.params.index)
    this.seletData = this.$route.params.index || 1
    this.mockData()
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
    // 造数据
    mockData () {
      for (let i = 0; i < 20; i++) {
        this.trendData.push({
          index: i + 1,
          one: Math.floor(Math.random() * 10 + 1),
          two: Math.floor(Math.random() * 10 + 1),
          three: Math.floor(Math.random() * 10 + 1),
          four: Math.floor(Math.random() * 10 + 1),
          five: Math.floor(Math.random() * 10 + 1),
          six: Math.floor(Math.random() * 10 + 1),
          seven: Math.floor(Math.random() * 10 + 1),
          eight: Math.floor(Math.random() * 10 + 1),
          night: Math.floor(Math.random() * 10 + 1),
          ten: Math.floor(Math.random() * 10 + 1)
        })
      }
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
