<template>
  <div class="PointCheckIn">
    <div class="registerInfo">
      <p>普通车</p>
      <p>车牌号： {{carNo}}</p>
      <p>驾驶人</p>
      <p>姓名： {{name}}</p>
      <p>身份证号： {{ID}}</p>
      <p>手机号： {{phone}}</p>
      <p>照片: {{picture}}</p>
    </div>
    <van-cell-group>
      <van-field v-model="departure" required label="出发地" placeholder="请输入"/>
      <van-field v-model="destination" required label="旗内目的" placeholder="请输入"/>
      <van-field v-model="ifContact" required label="是否来自(途径)武汉或武汉人员接触史" label-width="250px" readonly placeholder="请输入"/>
      <van-radio-group v-model="ifContact" style="float:right;margin-top:5px;">
        <van-radio name="无">无</van-radio>
        <van-radio name="有">有</van-radio>
      </van-radio-group>
      <van-field v-model="temperature" required label="体温" placeholder="请输入"/>
    </van-cell-group>
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
      carType: '普通车',
      carNo: '',
      peopleType: '驾驶人',
      name: '',
      ID: '',
      phone:  '',
      picture: '',
      departure: '',
      destination: '',
      ifContact: '',
      temperature: ''
    }
  },
  created () {
  },
  computed: {
    ...mapState({
      openid: state => state.openid
    })
  },
  components: {
  },
  methods: {
    ...mapActions([
    ])
  }
}
</script>

<style>
.PointCheckIn{
  padding: 0px 10px;
  margin-bottom: 80px;
}
.registerInfo p{
  text-align: left;
}
.van-cell__title{
  text-align: left !important;
}
.Loading .van-field__control{
  text-align: right !important;
}
</style>
