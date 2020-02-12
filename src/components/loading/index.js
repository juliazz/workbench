import behavior from '../behavior.js'

export default Component({
  behaviors: [behavior],
  options: {
    addGlobalClass: true
  },
  properties: {
    show: {
      type: Boolean,
      value: false,
      observer: function(value) {
        value ? this.show() : this.hide()
      }
    },
    text: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: 'spinner'
    },
    color: {
      type: String,
      value: 'black'
    },
    styleType: {
      type: String,
      value: 'block'
    },
    zIndex: {
      type: Number,
      value: 1001
    }
  },
  data: {},
  methods: {
    show(options = {}) {
      this.setData(options)
      this.setVisible()
    },
    hide() {
      this.setHidden()
    }
  }
});
