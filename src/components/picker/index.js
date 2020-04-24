const FIELD = '../field/index'

export default Component({
  behaviors: ['wx://form-field'],
  relations: {
    [FIELD]: {
      type: 'parent'
    }
  },
  properties: {
    value: {
      type: Array,
      value: [],
      observer: 'fieldChangeEventer'
    },
    mode: {
      type: String,
      value: 'region'
    },
    disabled: {
      type: Boolean,
      value: false
    },
    key: String,
    range: Array,
    placeholder: String
  },
  attached() {},
  methods: {
    bindchange({ detail = {} } = {}) {
      const { value = '' } = detail
      this.setData({ value })
      this.triggerEvent('change', detail)
    },
    bindcancel({ detail = {} } = {}) {
      this.triggerEvent('cancel', detail)
    },
    fieldChangeEventer() {
      const parent = this.getRelationNodes(FIELD)[0]
      parent && parent.hideErr()
    }
  }
})
