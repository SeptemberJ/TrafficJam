<template>
  <div class="Info">
    <div>
      <p>签到时间： {{time}}</p>
      <!-- <p>{{ftype == 4 ? '进站' : '出站'}}</p> -->
      <p>姓名： {{username}}</p>
      <p>性别： {{fsex}}</p>
      <p>身份证号： {{idnumber}}</p>
      <p>手机号： {{fmobile}}</p>
      <p>是否有旅居武汉或武汉人员接触史： {{iswuhan}}</p>
      <p>何地来： {{cfd}}</p>
      <p>去何地： {{mdd}}</p>
      <p>体温： {{thisftemp}}</p>
      <p>车次： {{bustype}}</p>
      <p>车厢号： {{bus_box}}</p>
      <p>症状： {{shenti_type}}</p>
      <p v-if="outP">第二联系人姓名： {{second_contact}}</p>
      <p v-if="outP">第二联系人工作单位： {{work_unit}}</p>
      <p v-if="outP">第二联系人工作单位电话： {{work_phone}}</p>
      <p v-if="outP">第二联系人住址或单位： {{work_address}}</p>
    </div>
  </div>
</template>
<script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
import { mapState, mapActions } from 'vuex'
import { Toast, Notify, Dialog } from 'vant'
// Dialog
import {send} from '../../util/send'
import {formatTime} from '../../util/utils.js'
export default {
  name: 'Info',
  data () {
    return {
      outP: false,
      time: '',
      username: '',
      fsex: '',
      idnumber: '',
      iswuhan: '',
      cfd: '',
      mdd: '',
      thisftemp: '',
      bustype: '',
      bus_box: '',
      shenti_type: '',
      second_contact: '',
      work_unit: '',
      work_phone: '',
      work_address: ''
    }
  },
  created () {
    this.getInfo()
    formatTime(_res.data.user.create_date.time)
  },
  computed: {
    ...mapState({
      openid: state => state.openid,
      ftype: state => state.ftype,
      AreaId: state => state.AreaId
    })
  },
  components: {
  },
  methods: {
    getInfo () {      send({
        name: '/userRecordById?id=' + this.AreaId,
        method: 'GET',
        data: {
        }
      }).then(_res => {
        // alert(_res.data.user.username)
        // alert(JSON.stringify(_res.data.user))
        switch (_res.data.code) {
          case 0:
            // 跳转到业主注册界面
            this.time = formatTime(new Date(_res.data.user.create_date.time))
            this.username = _res.data.user.username
            this.fsex = _res.data.user.fsex
            this.iswuhan = _res.data.user.iswuhan === '0' ? '无' : '有'
            this.idnumber = _res.data.user.idnumber
            this.fmobile = _res.data.user.fmobile
            this.cfd = _res.data.user.cfd
            this.mdd = _res.data.user.mdd
            this.thisftemp = _res.data.user.thisftemp
            this.bustype = _res.data.user.bustype
            this.bus_box = _res.data.user.bus_box
            this.shenti_type = _res.data.user.shenti_type
            this.second_contact = _res.data.user.second_contact
            this.work_unit = _res.data.user.work_unit
            this.work_phone = _res.data.user.work_phone
            this.work_address = _res.data.user.work_address
            this.outP = _res.data.user.second_contact ? true : false
            break
          default:
            Toast.success({
              duration: 1000,
              forbidClick: true,
              message: '信息获取失败！'
            })
        }
        // this.updateOpenId()
      }).catch((_res) => {
        console.log(_res)
      })
    }
  }
}
</script>
<style scoped>
.Info{
  padding: 0px 10px;
  margin-bottom: 20px;
}
.Info p{
  text-align: left;
  padding-top: 2px;
}
.Info .van-field__control{
  text-align: right !important;
}
.van-radio{
  display: inline-block;
  float: left;
  margin-left: 10px;
}
.van-hairline--top-bottom{
  position: inherit;
}
.van-cell{
  padding: 2px 15px;
}
</style>
