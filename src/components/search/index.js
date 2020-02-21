
export default Component({
  data: {
  },
  properties: {
    value: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'text'
    },
    disabled: Boolean,
    focus: {
      type: Boolean,
      value: false,
      observer: 'focusChangeEventer'
    },
    maxlength: {
      type: Number,
      value: 140
    },
    placeholder: {
      vlaue: '',
      type: String
    }
  },
  methods: {
    chageEventer({ detail = {} } = {}) {
      const { value = '' } = detail

      this.setData({ value })

      this.triggerEvent('change', detail)
    },
    focusEventer({ detail = {} } = {}) {
      this.triggerEvent('focus', detail)
    },
    blurEventer({ detail = {} } = {}) {
      this.triggerEvent('blur', detail)
    },
    searchEventer({ detail = {} } = {}) {
      this.triggerEvent('confirm', detail)
    },
    focusChangeEventer(newVal, oldVal) {
      console.log(newVal, oldVal)
      this.setData({
        isfocus: newVal
      })
    }
  }
})
