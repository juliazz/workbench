
export default Component({
  data: {
  },
  properties: {
    value: {
      type: String,
      value: '',
      observer: 'fieldChangeEventer'
    },
    type: {
      type: String,
      value: 'text'
    },
    disabled: Boolean,
    focus: Boolean,
    maxlength: {
      type: Number,
      value: 140
    },
    placeholder: {
      vlaue: 'A-maze高性能球鞋',
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
    }
  }
})
