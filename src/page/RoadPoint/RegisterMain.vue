<template>
  <div class="RegisterMain">
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
      <div class="InputItem">
        <span class="LabelBlock" style="width: 100px;">出发地</span>
        <div class="InputCon">
          <span @click="chooseS">{{St}} 省</span>
          <span @click="chooseZ">{{Zt}} 市</span>
          <span @click="chooseQ">{{Qt}} 区</span>
        </div>
      </div>
      <van-field v-model="addr" required label="详细地址" placeholder="请输入"/>
      <div class="InputItem">
        <span class="LabelBlock" style="width: 100px;">旗内目的</span>
        <div class="InputCon">
          <span>准格尔旗</span>
          <span @click="chooseT">{{Tt}} 镇</span>
          <span @click="chooseC">{{Ct}} 村</span>
        </div>
      </div>
      <van-field v-model="addrQ" required label="详细地址" placeholder="请输入"/>
      <van-field v-model="temperature" required label="体温" placeholder="请输入"/>
      <van-field required label="照片" readonly/>
      <div class="PictureBlock">
        <span class="AddIcon" v-if="!picture" @click="chooseImage">
          <img src="../../../static/images/tianjia.png" v-if="!picture" @click="chooseImage">
        </span>
        <span class="AddIcon" v-if="picture" @click="chooseImage">
          <img :src="picture">
        </span>
      </div>
      <van-button size="small" type="info" @click="submitInfo" style="margin-top:20px;width: 40%;">提 交</van-button>
    </van-cell-group>
    <!-- 弹窗 -->
    <van-popup v-model="selectS" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择省" show-toolbar :columns="Scolumns" @change="onChangeS" @confirm="onConfirmS" @cancel="onCancel"/>
    </van-popup>
    <van-popup v-model="selectZ" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择市" show-toolbar :columns="Zcolumns" @change="onChangeZ" @confirm="onConfirmZ" @cancel="onCancel"/>
    </van-popup>
    <van-popup v-model="selectQ" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择区" show-toolbar :columns="Qcolumns" @change="onChangeQ" @confirm="onConfirmQ" @cancel="onCancel"/>
    </van-popup>
    <van-popup v-model="selectC" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择村" show-toolbar :columns="Ccolumns" @change="onChangeC" @confirm="onConfirmC" @cancel="onCancel"/>
    </van-popup>
    <van-popup v-model="selectT" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择镇" show-toolbar :columns="Tcolumns" @change="onChangeT" @confirm="onConfirmT" @cancel="onCancel"/>
    </van-popup>
  </div>
</template>
<script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
import { mapState, mapActions } from 'vuex'
import { Toast, Picker } from 'vant'
// Dialog
import {send} from '../../util/send'
import {formatTime} from '../../util/utils.js'
export default {
  name: 'Scan',
  data () {
    return {
      carType: '',
      carNo: '',
      peopleType: '',
      name: '',
      ID: '',
      phone:  '',
      St: '请选择',
      Zt: '请选择',
      Qt: '请选择',
      Ct: '请选择',
      Tt: '请选择',
      addr: '',
      addrQ: '',
      StID: '',
      ZtID: '',
      QtID: '',
      CtID: '',
      TtID: '',
      departure: '',
      temperature: '',
      picture: '',
      selectS: false,
      selectZ: false,
      selectQ: false,
      selectC: false,
      selectT: false,
      Scolumns: [],
      Zcolumns: [],
      Qcolumns: [],
      Ccolumns: [],
      Tcolumns: [],
      ScolumnsID: [],
      ZcolumnsID: [],
      QcolumnsID: [],
      CcolumnsID: [],
      TcolumnsID: []
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
    ]),
    chooseImage () {
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], // 指定是原图还是压缩图，默认都有
        sourceType: ['album', 'camera'], // 指定来源是相册还是相机，默认都有
        success: (res) => {
          alert('chooseImage:' + JSON.stringify(res))
          var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          this.picture = localIds
          wx.getLocalImgData({
            localId: localIds[0],//图片的本地ID
            success: (res) => {
              var localData = res.localData;
              alert('getLocalImgData:' + localData)
            }
          })
          // wx.uploadImage({
          //   localId: localIds.toString(), // 需要上传的图片的ID，由chooseImage接口获得
          //   isShowProgressTips: 1, // 进度提示
          //   success: (res) => {
          //     alert('uploadImage:' + JSON.stringify(res))
          //     var mediaId = res.serverId; // 返回图片的服务器端ID，即mediaId
          //     //将获取到的 mediaId 传入后台 方法savePicture
          //     fail: (res) => {
          //     }
          //   }
          // })
        }
      })
    },
    chooseS () {
      this.selectS = true
      send({
        name: '/serSheng',
        method: 'GET',
        data: {
        }
      }).then(_res => {
        this.Scolumns = _res.data.shenglist.map(item => {
          return item.fname
        })
        this.ScolumnsID = _res.data.shenglist.map(item => {
          return item.id
        })
      }).catch((res) => {
        Toast.fail('Interface error！')
      })
    },
    chooseZ () {
      this.selectZ = true
      send({
        name: '/serShi?fid=' + this.StID,
        method: 'GET',
        data: {
        }
      }).then(_res => {
        this.Zcolumns = _res.data.shilist.map(item => {
          return item.fname
        })
        this.ZcolumnsID = _res.data.shilist.map(item => {
          return item.id
        })
      }).catch((res) => {
        Toast.fail('Interface error！')
      })
    },
    chooseQ () {
      this.selectQ = true
      send({
        name: '/serQu?fid=' + this.ZtID,
        method: 'GET',
        data: {
        }
      }).then(_res => {
        this.Qcolumns = _res.data.qulist.map(item => {
          return item.fname
        })
        this.QcolumnsID = _res.data.qulist.map(item => {
          return item.id
        })
      }).catch((res) => {
        Toast.fail('Interface error！')
      })
    },
    chooseT () {
      this.selectT = true
      send({
        name: '/serZhen',
        method: 'GET',
        data: {
        }
      }).then(_res => {
        this.Tcolumns = _res.data.zhenlist.map(item => {
          return item.zhen_name
        })
        this.TcolumnsID = _res.data.zhenlist.map(item => {
          return item.id
        })
      }).catch((res) => {
        Toast.fail('Interface error！')
      })
    },
    chooseC () {
      this.selectC = true
      send({
        name: '/serCun?id=' + this.TtID,
        method: 'GET',
        data: {
        }
      }).then(_res => {
        this.Ccolumns = _res.data.cunlist.map(item => {
          return item.cun_name
        })
        this.CcolumnsID = _res.data.cunlist.map(item => {
          return item.id
        })
      }).catch((res) => {
        Toast.fail('Interface error！')
      })
    },
    onConfirmS (value, index) {
      this.St = value
      this.StID = this.ScolumnsID[index]
      this.onCancel()
    },
    onConfirmZ (value, index) {
      this.Zt = value
      this.ZtID = this.ZcolumnsID[index]
      this.onCancel()
    },
    onConfirmQ (value, index) {
      this.Qt = value
      this.QtID = this.QcolumnsID[index]
      this.onCancel()
    },
    onConfirmC (value, index) {
      this.Ct = value
      this.CtID = this.CcolumnsID[index]
      this.onCancel()
    },
    onConfirmT (value, index) {
      this.Tt = value
      this.TtID = this.TcolumnsID[index]
      this.onCancel()
    },
    onCancel () {
      this.selectS = false
      this.selectZ = false
      this.selectQ = false
      this.selectT = false
      this.selectC = false
    },
    onChangeS (res) {
      console.log(res)
    },
    onChangeZ (res) {
      console.log(res)
    },
    onChangeQ (res) {
      console.log(res)
    },
    onChangeC (res) {
      console.log(res)
    },
    onChangeT (res) {
      console.log(res)
    },
    submitInfo () {
      if (!this.carType || !this.carNo || !this.peopleType || this.name || !thi.ID || this.phone || this.picture) {
        Toast({
          duration: 1500,
          forbidClick: true,
          message: '请将信息填写完整!'
        })
        return false
      }
      send({
        name: '/userinsert?open_id=' + this.openid + '&username=' + this.username + '&fsex=' + this.sex + '&idnumber=' + this.ID + '&fmobile=' + this.phone + '&carno=' + this.carNo + '&faddress=' + this.addr + '&iswuhan=' + (this.ifContact === '有' ? 1 : 0) + '&fdetail=' + this.detail + '&ftemp=' + this.temperature + '&areaid=' + this.AreaId,
        method: 'POST',
        data: {
        }
      }).then(_res => {
        switch (_res.data.code) {
          case 0:
            Dialog.alert({
              title: '登记成功！',
              message: '登记时间：' + formatTime(new Date())
            }).then(() => {
              // on close
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
    }
  }
}
</script>

<style>
.RegisterMain{
  padding: 0px 10px;
  margin-bottom: 80px;
}
.van-cell__title{
  text-align: left !important;
}
.RegisterMain .van-field__control{
  text-align: right !important;
}
.van-radio{
  display: inline-block;
  float: left;
  margin-left: 10px;
}
.van-hairline--top-bottom::after{
  border: 0px;
}
.PictureBlock{
  width: 100%;
  height: 120px;
  float: left;
}
.AddIcon{
  width:100px;
  height:100px;
  margin: 0 auto;
  display:inline-block;
  border: 1px dashed #1296db;
}
.PictureBlock img{
  width:80px;
  height:80px;
  margin: 10px;
}
.InputItem{
  color: #323233;
  font-size: 14px;
  line-height: 24px;
  background-color: #fff;
  padding: 10px 0;
}
.LabelBlock::before {
  content: '*';
  position: absolute;
  left: 7px;
  font-size: 14px;
  color: #f44;
}
.InputCon{
  width:calc(100% - 100px);
  display:inline-block;
  text-align:right;
}
</style>
