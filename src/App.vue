<template>
  <div id="app">
    <p class="tit">{{ftypeTxt == 4 ? '高铁站进站卡点' : '高铁站出站卡点'}}个人信息自助登记</p>
    <!-- <p>areaId: {{areaId}}</p> -->
   <!--  <p>str: {{str}}</p>
    <p>code: {{code}}</p>
    <p>areaId: {{areaId}}</p>
    <p>openid: {{openid}}</p> -->
    <router-view/>
    <p class="footer">鄂尔多斯市易领网络科技提供技术支持</p>
  </div>
</template>
<script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
import { mapState, mapActions } from 'vuex'
import {MySha1} from './util/utils'
import {send} from './util/send'
import { Toast } from 'vant'
export default {
  name: 'App',
  data () {
    return {
      code: '',
      areaId: '',
      str: '',
      ftypeTxt: ''
    }
  },
  computed: {
    openid: {
      get: function () {
        return this.$store.state.openid
      },
      set: function (newValue) {
        this.$store.state.openid = newValue
      }
    },
    ftype: {
      get: function () {
        return this.$store.state.ftype
      },
      set: function (newValue) {
        this.$store.state.ftype = newValue
      }
    }
  },
  watch: {
  },
  created () {
    // 配置
    this.getTicket()
    this.QueryString()
    // this.getOpenid()
    // this.getAreaInfo()
  },
  methods: {
    ...mapActions([
      'updateOpenId',
      'updateAreaName',
      'updateRole',
      'updateAreaId',
      'updateFtype',
      'updatesmType',
      'updateUsrInfo'
    ]),
    // 获取url参数
    QueryString () {
      let urlData = {}
      let aPairs
      let aTmp
      let queryString = new String(location.search)
      queryString = queryString.substr(1, queryString.length)
      aPairs = queryString.split("&")
      for (let i = 0; i < aPairs.length; i++) {
        aTmp = aPairs[i].split("=")
        urlData[aTmp[0]] = aTmp[1]
      }
      this.str = urlData['state']
      let stateStr = urlData['state']
      let code = urlData['code']
      let areaId = stateStr.substr(0, stateStr.length - 2)
      let codeType = stateStr.substr(stateStr.length - 1, 1)
      let ftype = stateStr.substr(stateStr.length - 2, 1)
      this.getAreaInfo(areaId)
      this.getOpenid(code, areaId, ftype, codeType)
      this.updatesmType(codeType)
      // if (ftype === 2 || ftype === '2') {
      //   this.$router.push({name: 'RegisterMain'})
      // } else {
      //   this.$router.push({name: 'RegisterMain'})
      // }
      return urlData
    },
    ConfigFn (JsapiTicket) {
      var mytimestamp = (Date.parse(new Date())) / 1000
      var mynonceStr = MySha1(String(mytimestamp)).substring(0, 16)
      var mysignature = 'jsapi_ticket=' + JsapiTicket + '&noncestr=' + mynonceStr + '&timestamp=' + mytimestamp + '&url=' + window.location.href.split("#")[0]
      wx.config({
        beta: true,
        debug: false,
        appId: 'wx1197fd93f588c883',
        timestamp: mytimestamp,
        nonceStr: mynonceStr,
        signature: MySha1(mysignature),
        jsApiList: [
          'scanQRCode',
          'chooseImage',
          'uploadImage'
        ]
      })
      wx.error(function (res) {
        console.log('config失败---')
      })
      wx.ready(function () {
        console.log('config成功---')
      })
    },
    // 获取openid
    getOpenid (code, areaId, ftype, codeType) {
      this.code = code
      this.areaId = areaId
      this.ftypeTxt = ftype
      send({
        name: '/getOpenId?code=' + code + '&areaid=' + areaId + '&ftype=' + ftype,
        method: 'GET',
        data: {
        }
      }).then(_res => {
        this.updateOpenId(_res.data.openid)
        this.updateAreaId(areaId)
        this.updateFtype(ftype)
        // alert('ftype:' + ftype)
        // alert('codeType:' + codeType)
        // alert('_res.data.code)' + _res.data.code)
        if (codeType === 7 || codeType === '7') {
          if (_res.data.user) {
            let Info = {
              username: _res.data.user.username,
              fsex: _res.data.user.fsex,
              iswuhan: _res.data.user.iswuhan,
              idnumber: _res.data.user.idnumber,
              fmobile: _res.data.user.fmobile,
              check_status: _res.data.user.check_status
            }
            // alert(JSON.stringify(Info))
            this.updateUsrInfo(Info)
          }
          switch (_res.data.code) {
            case 1:
              break
            case 2:
              break
            case 3:
              break
            case 4:
              // 跳转高铁进站码页面
              this.$router.push({name: 'EenterStation'})
              break
            case 5:
            // 跳转高铁出站码页面
              this.$router.push({name: 'Choose'})
              break
            case 6:
              break
            case 7:
              break
            default:
              this.$router.push({name: 'Choose'})
          }
        } else {
          this.$router.push({name: 'MotorCarInfo'})
        }
      }).catch((_res) => {
        console.log(_res)
      })
    },
    getAreaInfo (AreaId) {
      send({
        name: '/areaById?id=' + AreaId,
        method: 'GET',
        data: {
        }
      }).then(_res => {
        this.updateAreaName(_res.data.area.fname)
      }).catch((res) => {
        // Toast.fail('Interface error！')
      })
    },
    getTicket (acessToken) {
      send({
        name: '/getJSApiTicket',
        method: 'GET',
        data: {
        }
      }).then(_res => {
        this.ConfigFn(_res.data.ticket)
      }).catch((res) => {
        Toast.fail('Interface error！')
      })
    }
  }
}
</script>

<style scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
.tit{
  width: 100%;
  height: 55px;
  line-height: 35px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}
.footer{
  width: 100%;
  height: 25px;
  background: #fff;
  line-height: 25px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 10px;
  color: #666;
}
.van-nav-bar{
  background: cadetblue !important;
  color: #fff;
}
</style>
