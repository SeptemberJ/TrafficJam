<template>
  <div class="Loading">
    <span @click="Inp" style="width: 320px;height:100px;display:block;line-height:100px;text-align:center;margin:10px auto;border:1px solid #409eff;font-size:18px;font-weight:bold;background:#409eff;color:#fff;">内蒙古籍近14天未出省人员登记入口</span>
    <span @click="OutP" style="width: 320px;height:100px;display:block;line-height:100px;text-align:center;margin:40px auto 0 auto;border:1px solid #409eff;font-size:18px;font-weight:bold;background:#409eff;color:#fff">外省籍近14日内途径省外人员登记入口</span>
  </div>
</template>

<script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
import { mapState, mapActions } from 'vuex'
import { Toast } from 'vant'
// Dialog
import {send} from '../../util/send'
import {formatTime} from '../../util/utils.js'
export default {
  name: 'Scan',
  data () {
    return {
    }
  },
  created () {
    // this.updateAreaId(this.QueryString()['state'])
    // this.getAreaInfo()
    // this.getOpenid()
  },
  computed: {
    ...mapState({
    })
  },
  components: {
  },
  methods: {
    ...mapActions([
      'updateInOrOutP'
    ]),
    Inp () {
      this.updateInOrOutP('内蒙古籍近14天未出省外')
      this.$router.push({name: 'OutStationInside'})
    },
    OutP () {
      this.updateInOrOutP('外省籍或近14日内途径省外')
      this.$router.push({name: 'OutStationOutside'})
    },
  }
}
</script>

<style>
.Loading{
  padding: 0px 10px;
  margin-bottom: 80px;
}
.van-cell__title{
  text-align: left !important;
}
.Loading .van-field__control{
  text-align: right !important;
}
</style>
