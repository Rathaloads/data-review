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
            :key="index">
            <Checkbox
              @on-change="(val) => colChange(val, index)"
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
          <td>{{ index + 1 }}</td>
          <td
            v-for="(num, i) in item"
            :key="i">
            {{ num }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { CN_NUMBER } from '@/const/number'

export default {
  name: 'DataTable',

  props: {
    id: {
      type: String,
      default: ''
    },
    tbData: {
      type: Array,
      default: () => []
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
        arr.push(i)
      }
      return arr
    },

    data () {
      return this.tbData.map((arr, index) => {
        let newArr = []
        for (let i = 0; i < 10; i++) {
          newArr.push(...arr)
        }
        return newArr
      })
    }
  },

  methods: {
    colChange (val, index) {
      for (let i = 0; i < this.$refs.tbody.children.length; i++) {
        for (let j = 0; j < this.$refs.tbody.children[i].children.length; j++) {
          let col = this.$refs.tbody.children[i].children[j]
          if (j === index + 2 && val) {
            col.className = 'avtive-col'
          }
          if (j === index + 2 && !val) {
            col.className = ''
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
    }
  }
  .avtive-col {
    background-color #FF7F24;
  }
  .avtive-row {
    td {
      background-color #FF6A6A;
      color #333 !important;
    }
    .avtive-col {
      background-color #FF4040 !important;
    }
  }
}
</style>
