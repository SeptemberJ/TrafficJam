<template>
  <div class="RegisterCheckIn">
    <van-cell-group>
      <van-radio-group v-model="carType">
        <van-radio name="普通车">普通车</van-radio>
        <van-radio name="货车">货车</van-radio>
      </van-radio-group>
      <van-field v-model="carNo" required label="车牌号" placeholder="请输入"/>
      <van-radio-group v-model="peopleType" style="margin-top:10px;">
        <van-radio name="驾驶人">驾驶人</van-radio>
        <van-radio name="同乘人">同乘人</van-radio>
      </van-radio-group>
      <van-field v-model="name" required label="姓名" placeholder="请输入"/>
      <van-field v-model="ID" required label="身份证号" placeholder="请输入"/>
      <van-field v-model="phone" required label="手机号" placeholder="请输入"/>
      <van-field v-model="picture" required label="图片" placeholder="请输入"/>
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
.RegisterCheckIn{
  padding: 0px 10px;
  margin-bottom: 80px;
}
.van-cell__title{
  text-align: left !important;
}
.Loading .van-field__control{
  text-align: right !important;
}
.van-radio{
  display: inline-block;
  float: left;
  margin-left: 10px;
}
[class*=van-hairline]::after{
  border: 0px;
}
.van-hairline--top-bottom::after{
  border: 0px;
}
</style>
