
Component({
  behaviors: [],
  properties: {
    type: {
      type: Number,
      value: 1 // 身份type 1个人 2部门 3品牌 4战区
    },
    name: {
      type: String,
      value: {
        name: '个人'
      }
    },
    expandState: { // 展开状态
      type: Boolean,
      value: false
    },
    viewData: { // 页面视图数据
      type: Object,
      observer(value) {
        const can_pk = value.can_pk
        const cat_type_id = value.cat_type_id
        const {pk_list, rank_info, record_info} = value.data
        const {activity_period_project_list} = rank_info.record
        const period_swiper1 = activity_period_project_list.slice(0, 4)
        const period_swiper2 = activity_period_project_list.slice(4, 8)
        this.setData({
          pk_list,
          rank_info,
          can_pk,
          cat_type_id,
          record_info,
          period_swiper1,
          period_swiper2
        })
      }
    }
  },
  data: {
    popupType: '',
    coinRule: [{
      mainLine: ['1.有效浏览+2金币/人'],
      subLine: ['1.新人首次点开链接阅读，为有效浏览', '2.A→B→C→D；', '3.A的链接被B打开阅读，A算浏览一次，B算浏览一次；', '5.C的链接被D打开阅读，B、C、D均算浏览一次；', '6.员工本人浏览不统计。']
    }, {
      mainLine: ['2.金币享+5金币/人', '含本人、下级金币享。此项每日最高加金币10金币。']
    }, {
      mainLine: ['3.报名+10金币/人', '报名、预约直播，含本人、下级报名。员工不可报名']
    }, {
      mainLine: ['4.有效浏览+5金币/人'],
      subLine: ['1.新人首次点开链接阅读，为有效浏览', '2.A→B→C→D；', '3.A的链接被B打开阅读，A算浏览一次，B算浏览一次；', '5.C的链接被D打开阅读，B、C、D均算浏览一次；', '6.员工本人浏览不统计。']
    }, {
      mainLine: ['5.购卡+20金币/张', '含本人、下级购卡。员工不可购卡']
    }, {
      mainLine: ['6.订单+20金币/单', '含购买爆款、秒杀品订单，每订一单计算一次，含 本人、下级订单。员工不可订单']
    }, {
      mainLine: ['7.进直播间+10金币/人', ' 含本人、下级。员工本人进直播间不统计。']
    }, {
      mainLine: ['8.直播间下单+20金币/单', '每订一单计算一次，含本人、下级订单。员工不 可下单。']
    }, {
      mainLine: ['9.部门金币=本部门所有员工金币之和。']
    }, {
      mainLine: ['10.品牌金币=本品牌所有员工金币之和。']
    }, {
      mainLine: ['11.战区金币=本战区所有员工金币之和。']
    }]
  },
  lifetimes: {
    attached: function () {  this.$showLoading()},
    moved: function () { },
    detached: function () { }
  },
  attached: function () { },
  ready: function() { },
  pageLifetimes: {
    show: function () {
    },
    hide: function () { },
    resize: function () { }
  },
  methods: {
    bindImgLoad:function(){
      this.$hideLoading()
    },
    popupShow: function(eve) {
      const { popupType } = eve.currentTarget.dataset
      console.log(popupType)
      this.setData({
        popupType
      })
    },
    closePopup: function(eve) {
      this.setData({
        popupType: ''
      })
    },
    viewMore: function(eve) {
      let { expandState } = this.data
      this.setData({
        expandState: !expandState
      })
    }
  }
})
