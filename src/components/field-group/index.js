const FIELD = '../field/index'

Component({
  relations: {
    [FIELD]: {
      type: 'child'
    }
  },
  data: {},
  methods: {
    validateEventer(rules, options, callback) {
      let fields = this.getRelationNodes(FIELD)
      let valid = true
      let toast = ''
      fields.forEach(field => {
        const { prop } = field.data
        const rule = rules[prop]
        const value = options[prop]
        if (!rule) return
        let _exit = true
        const {
          type, require, message,
          validator, typeMessage
        } = rule
        // if (!require) return

        if (type == 'Boolean') {
          _exit = !!value
        }
        if (type == 'Number') {
          _exit = value >= 0
        }
        if (type == 'Array') {
          _exit = value.length > 0
        }
        if (type == 'String' || type == 'Object') {
          _exit = !!value
        }
        // 校验，只限内容是否符合规则
        if (!require) {
          if (_exit && validator && !validator(value)) {
            field.showErr(typeMessage)
            valid = false
          }

        // 校验: 是否有值，并且值是否符合规则
        } else if (!_exit) {
          field.showErr(message)
          valid = false
        } else if (validator && !validator(value)) {
          field.showErr(typeMessage)
          valid = false
        }
      })
      callback(valid)
    }
  }
})
