<template>
  <Checkbox
    v-model="dValue"
    @on-change="onChange" />
</template>

<script>
export default {
  name: 'DataCheck',

  props: {
    value: {
      type: Boolean,
      default: false
    },
    index: {
      type: [Number, String],
      default: 0
    }
  },

  data () {
    return {
      dValue: this.value
    }
  },

  watch: {
    value (val) {
      this.onChange(val)
    }
  },

  methods: {
    onChange (val) {
      this.dValue = val
      this.$emit('on-change', { value: val, index: this.index })
    }
  }
}
</script>
