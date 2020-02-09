<template>
  <div class="Info">
    <p class="tips">提示：{{role == 2 ? '本小区常住人员，请点击“卡点签到”' :'该人员为非本小区常住人员，请核实'}}</p>
    <div>
      <p>姓名： {{info.username}}</p>
      <p>性别： {{info.sex}}</p>
      <p>身份证号： {{info.ID}}</p>
      <p>手机号： {{info.phone}}</p>
      <p>车辆号： {{info.carNo}}</p>
      <p>住址： {{info.addr}}</p>
      <p>是否有旅居武汉或武汉人员接触史： {{info.ifContact}}</p>
      <p>若有请说明详情： {{info.detail}}</p>
      <p>登记时测量温度： {{info.temperature}}</p>
    </div>
    <div>
      <p class="">最新签到记录：</p>
      <div v-for="(Record, idx) in recordList" :key="idx" style="width:100%;float:left;">
        <span style="width: 55%;display:inline-block;float:left;text-align:left;">{{Record.dateTime}} {{Record.ftype}}</span>
        <span style="width: 45%;display:inline-block;float:left;text-align:right;">{{Record.fname}}</span>
      </div>
    </div>
    <div class="MarginT_5" style="width:100%;float:left;">
      <van-cell-group>
        <van-radio-group v-model="inOrOut">
          <van-radio name="进">进</van-radio>
          <van-radio name="出">出</van-radio>
        </van-radio-group>
        <van-field v-if="role == 1"
          v-model="addr"
          required
          label="探访对象及住址："
          label-width="115px"
          placeholder="请输入"
        />
        <van-field v-if="role == 1"
          v-model="temperature"
          required
          label="实测体温："
          label-width="115px"
          placeholder="请输入"
        />
      </van-cell-group>
    </div>
    <div class="MarginT_5" style="width:100%;float:left;text-align:center;">
      <van-button size="small" type="info" v-if="role == 2" @click="clock" style="width: 40%;">卡点签到</van-button>
      <van-button size="small" type="info" v-if="role == 1" @click="submitInfo" style="width: 40%;">提 交</van-button>
      </div>
  </div>
</template>

<script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
import { mapState, mapActions } from 'vuex'
import { Toast, Notify, Dialog } from 'vant'
// Dialog
import {send} from '../util/send'
import {formatTime} from '../util/utils.js'
export default {
  name: 'Info',
  data () {
    return {
      message: '该人员为非本小区常住人员，请核实',
      info: {
        username: '',
        sex: '',
        ID: '',
        phone: '',
        carNo: '',
        addr: '',
        ifContact: '',
        detail: '',
        temperature: ''
      },
      inOrOut: '进',
      addr: '',
      temperature: '',
      recordList: []
    }
  },
  created () {
    this.getInfo()
    this.getLasteRecord()
  },
  computed: {
    ...mapState({
      role: state => state.role,
      AreaId: state => state.AreaId,
      openid: state => state.openid
    })
  },
  components: {
  },
  methods: {
    submitInfo () {
      if (!this.addr || !this.temperature) {
        // Notify({ duration: 1500, type: 'warning', message: '请将信息填写完整!' });
        Toast({
          duration: 1500,
          forbidClick: true,
          message: '请将信息填写完整!'
        })
        return false
      }
      this.submit()
    },
    clock () {
      this.submit()
    },
    submit () {
      send({
        name: '/signInInsert?ischangzhu=' + (this.role === 1 ? 1 : 0) + '&areaid=' + this.AreaId + '&userid=' + this.openid + '&findpeople=' + this.addr + '&thisftemp=' + this.temperature + '&ftype=' + this.inOrOut,
        method: 'POST',
        data: {
        }
      }).then(_res => {
        switch (_res.data.code) {
          case 0:
            Dialog.alert({
              title: '签到成功!',
              message: '登记时间：' + formatTime(new Date())
            }).then(() => {
              this.getLasteRecord()
            })
            break
          default:
            // 身份证错误
            Toast({
              duration: 1500,
              forbidClick: true,
              message: _res.data.message + '!'
            })
        }
        // this.updateOpenId()
      }).catch((_res) => {
        console.log(_res)
      })
    },
    getInfo () {
      send({
        name: '/userInfoByOpenId?open_id=' + this.openid,
        method: 'GET',
        data: {
        }
      }).then(_res => {
        switch (_res.data.code) {
          case 0:
            // 跳转到业主注册界面
            this.info = {
              username: _res.data.user.username,
              sex: _res.data.user.fsex,
              ID: _res.data.user.idnumber,
              phone: _res.data.user.fmobile,
              carNo: _res.data.user.carno,
              addr: _res.data.user.faddress,
              ifContact: _res.data.user.iswuhan === '0' ? '无' : '有' ,
              detail: _res.data.user.fdetail,
              temperature: _res.data.user.ftemp
            }
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
    },
    getLasteRecord () {
      send({
        name: '/recordByOpenId?open_id=' + this.openid,
        method: 'GET',
        data: {
        }
      }).then(_res => {
        switch (_res.data.code) {
          case 0:
          this.recordList = _res.data.user.map(item => {
            item.dateTime = formatTime(new Date(item.create_date.time))
            return item
          })
            break
          default:
            Toast.success({
              duration: 1000,
              forbidClick: true,
              message: '记录获取失败！'
            })
        }
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
