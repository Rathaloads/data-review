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
      <div class="options">
        <Icon
          :size="20"
          style="cursor: pointer;"
          type="ios-add-circle-outline"
          @click="addData" />
      </div>
      <div class="foot">
        <Button type="primary" size="small">录入</Button>
        <Button type="primary" size="small" class="ml10">记录</Button>
      </div>
    </Card>

    <Card class="card">
      <p slot="title">表格一</p>
      <div class="content"></div>
    </Card>

    <Card class="card">
      <p slot="title">表格二</p>
      <div class="content"></div>
    </Card>

    <Card class="card">
      <p slot="title">表格三</p>
      <div class="content"></div>
    </Card>
  </div>
</template>

<script>
export default {
  name: 'DataInput',

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
      ]
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
