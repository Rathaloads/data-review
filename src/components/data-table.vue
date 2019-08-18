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
              @on-change="onColSeleted(index)"
              style="margin: 0 auto;"/>
          </th>
        </tr>
      </thead>
      <tbody ref="tbody">
        <tr
          v-for="(arr, index) in optionsData"
          :key="index"
          :class="{'avtive-row': rowSeleted.includes(index)}"
          v-show="checkIsRowShow(index)">
          <td>
            <Checkbox
              style="margin: 0 auto;"
              :index="index"
              @on-change="onRowSeleted(index)"/>
          </td>
          <td>{{ index + 1 }}</td>
          <td
            v-for="(item, i) in arr"
            :key="i"
            :class="{'last-td': (i + 1) % 10 === 0, 'avtive-col': colSeleted.includes(i)}">
            {{ item.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { CN_NUMBER } from '@/const/number'
import DataCheck from '@/components/data-check'
// import { DATA_TYPE } from '@/const/data-type'

export default {
  name: 'DataTable',

  components: {
    DataCheck
  },

  props: {
    // 走势: 0-无势, 1-横势，2-斜势
    trend: {
      type: Number,
      default: 0
    },
    // 选择行: 0-不选，1-单行，2-双行
    rowType: {
      type: Number,
      default: 0
    },
    // 图数据: [[1,2,3....10], [1,2,3....10],....]
    data: {
      type: Array,
      default: () => []
    }
  },

  data () {
    return {
      // 列选中的序号
      colSeleted: [],
      // 行选中的序号
      rowSeleted: []
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

    // 数据操作
    optionsData () {
      // 根据源数据生成操作数据
      let data = this.data.map((rowDatas, rowIndex) => {
        // 行
        let isRowCheck = this.rowSeleted.includes(rowIndex)
        let arr = []
        for (let i = 0; i < 10; i++) {
          arr.push(...rowDatas)
        }
        let colDatas = arr.map((col, colIndex) => {
          // 列
          let isColCheck = this.colSeleted.includes(colIndex)
          return {
            value: col,
            order: rowIndex,
            rowSeleted: isRowCheck,
            colSeleted: isColCheck,
            asyncSeleted: false
          }
        })
        return colDatas
      })
      return data
    }
  },

  watch: {
  },

  methods: {
    // 监测当前行是否显示
    checkIsRowShow (rowIndex) {
      if (!this.rowType) return true
      if (this.rowType === 1) return (rowIndex + 1) % 2 > 0
      if (this.rowType === 2) return (rowIndex + 1) % 2 === 0
    },
    // 选中行的操作
    onRowSeleted (rowIndex) {
      if (this.rowSeleted.includes(rowIndex)) {
        // 取消
        let arr = this.rowSeleted.filter((num) => {
          return num !== rowIndex
        })
        this.rowSeleted = arr
      } else {
        // 选中
        this.rowSeleted.push(rowIndex)
      }
    },
    // 选中列的操作
    onColSeleted (colIndex) {
      if (this.colSeleted.includes(colIndex)) {
        // 取消
        let arr = this.colSeleted.filter((num) => {
          return num !== colIndex
        })
        this.colSeleted = arr
      } else {
        // 选中
        this.colSeleted.push(colIndex)
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
