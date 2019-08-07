<template>
  <div class="table-root">
    <table border=1 cellspacing="0" cellpadding="0" class="table" ref="table">
      <thead>
        <tr>
          <th rowspan="2">勾选</th>
          <th rowspan="2">次数</th>
          <th
            v-for="(item, index) in enNumber"
            :key="index"
            colspan="10">
            {{ item }}
          </th>
        </tr>
        <tr>
          <th
            v-for="(item, index) in colNumberArr"
            :key="index"
            :class="{'last-td': (index + 1) % 10 === 0}">
            <DataCheck
              ref="check"
              :value="item.selection"
              :index="index"
              @on-change="colChange"
              style="margin: 0 auto;"/>
          </th>
        </tr>
      </thead>
      <tbody ref="tbody">
        <tr
          v-for="(item, index) in data"
          :key="index">
          <td>
            <Checkbox
              @on-change="(val) => rowChange(val, index)"
              style="margin: 0 auto;"/>
          </td>
          <td>{{ item.index + 1 }}</td>
          <td
            v-for="(num, i) in item.value"
            :key="i"
            :class="{'last-td': (i + 1) % 10 === 0}">
            {{ num }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { CN_NUMBER } from '@/const/number'
import DataCheck from '@/components/data-check'
import { DATA_TYPE } from '@/const/data-type'

export default {
  name: 'DataTable',

  components: {
    DataCheck
  },

  props: {
    id: {
      type: String,
      default: ''
    },
    tbData: {
      type: Array,
      default: () => []
    },
    // 全选
    seletedAll: {
      type: Boolean,
      default: false
    },
    // 数据类型
    type: {
      type: String,
      default: DATA_TYPE.ALL_DATA
    }
  },

  data () {
    return {
      // tbData: []
    }
  },

  computed: {
    enNumber () {
      let arr = []
      for (let i = 0; i < CN_NUMBER.length; i++) {
        arr.push(CN_NUMBER[i])
      }
      return arr
    },

    colNumberArr () {
      let arr = []
      for (let i = 0; i < 100; i++) {
        arr.push({
          selection: this.seletedAll,
          value: i
        })
      }
      return arr
    },

    data () {
      let data = this.tbData.map((arr, index) => {
        let newArr = []
        for (let i = 0; i < 10; i++) {
          newArr.push(...arr)
        }
        return {
          index,
          value: newArr
        }
      })
      return data.filter((val, index) => {
        if (this.type === DATA_TYPE.EVEN_DATA || '') {
          return (val.index + 1) % 2 === 0
        } else if (this.type === DATA_TYPE.ODD_DATA) {
          return (val.index + 1) % 2 > 0 || val.index === 0
        } else {
          return true
        }
      })
    }
  },

  watch: {
  },

  methods: {
    colChange ({ value, index }) {
      for (let i = 0; i < this.$refs.tbody.children.length; i++) {
        for (let j = 0; j < this.$refs.tbody.children[i].children.length; j++) {
          let col = this.$refs.tbody.children[i].children[j]
          if (j === index + 2 && value) {
            col.className = (index + 1) % 10 === 0 ? 'last-td avtive-col' : 'avtive-col'
          }
          if (j === index + 2 && !value) {
            col.className = (index + 1) % 10 === 0 ? 'last-td' : ''
          }
        }
      }
    },
    rowChange (val, index) {
      for (let i = 0; i < this.$refs.tbody.children.length; i++) {
        if (i === index && val) {
          this.$refs.tbody.children[i].className = 'avtive-row'
        }
        if (i === index && !val) {
          this.$refs.tbody.children[i].className = ''
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.table-root {
  width 100%
  height 100%
  overflow auto
  .table {
    width 100%
    th {
      border 1px solid #ccc
      text-align center
      padding 5px
    }
    td {
      border 1px solid #ccc
      text-align center
      padding 5px
      font-weight 700
    }
    .last-td {
      border-right 2px solid #388E8E
    }
  }
  .avtive-col {
    background-color #00F5FF;
  }
  .avtive-row {
    td {
      background-color #00EE00;
      color #333 !important;
    }
    .avtive-col {
      background-color #FF4040 !important;
    }
  }
}
</style>
