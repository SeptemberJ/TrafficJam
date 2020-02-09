<template>
  <div class="InPprovince">
    <van-cell-group>
      <div class="InputItem">
        <span class="LabelBlock" style="width: 100px;">车次</span>
        <div class="InputCon">
          <span @click="chooseCar">{{car}}</span>
        </div>
      </div>
      <van-field v-model="name" required label="姓名" placeholder="请输入"/>
      <van-field v-model="sex" required readonly label="性别"/>
      <van-radio-group v-model="sex" style="float:right;">
        <van-radio name="男">男</van-radio>
        <van-radio name="女">女</van-radio>
      </van-radio-group>
      <van-field v-model="ID" required label="身份证号" placeholder="请输入"/>
      <van-field v-model="phone" required label="联系电话" placeholder="请输入"/>
      <van-field v-model="carNo" required label="车厢号" placeholder="请输入"/>
      <div class="InputItem">
        <span class="LabelBlock" style="width: 100px;">身体症状</span>
        <div class="InputCon">
          <span @click="chooseSymptom">{{symptom}}</span>
        </div>
      </div>
      <div class="InputItem">
        <span class="LabelBlock" style="width: 100px;">旗内地址</span>
        <div class="InputCon">
          <span>准格尔旗</span>
          <span @click="chooseT">{{Tt}} 镇</span>
          <span @click="chooseC">{{Ct}} 村</span>
        </div>
      </div>
      <!-- <div class="InputItem">
        <span class="LabelBlock" style="width: 100px;">何地来</span>
        <div class="InputCon">
          <span @click="chooseS">{{St}} 省</span>
          <span @click="chooseZ">{{Zt}} 市</span>
          <span @click="chooseQ">{{Qt}} 区</span>
        </div>
      </div> -->
      <van-field v-model="addr_D" required label="详细地址" placeholder="请输入"/>
      <div class="InputItem">
        <span class="LabelBlock" style="width: 100px;">去何地</span>
        <div class="InputCon">
          <span @click="chooseS_M">{{St_M}} 省</span>
          <span @click="chooseZ_M">{{Zt_M}} 市</span>
          <span @click="chooseQ_M">{{Qt_M}} 区</span>
        </div>
      </div>
      <van-field v-model="addr_M" required label="详细地址" placeholder="请输入"/>
      <van-field
        v-model="ifContact"
        required
        readonly
        label="近期是否去过(途径湖北)或与湖北人有接触史："
        label-width="300px"
      />
      <van-radio-group v-model="ifContact" style="float:right;">
        <van-radio name="无">无</van-radio>
        <van-radio name="有">有</van-radio>
      </van-radio-group>
      <van-field v-model="temperature" required label="体温：" placeholder="请输入" />
      <van-button size="small" type="info" @click="submitInfo" style="margin-top:20px;width: 40%;">提 交</van-button>
    </van-cell-group>
    <!--  -->
    <van-popup v-model="selectCar" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择车次" show-toolbar :columns="Carcolumns" @change="onChangeCar" @confirm="onConfirmCar" @cancel="onCancelCar"/>
    </van-popup>
    <van-popup v-model="selectSymptom" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择身体症状" show-toolbar :columns="Symptomcolumns" @change="onChangeSymptom" @confirm="onConfirmSymptom" @cancel="onCancelSymptom"/>
    </van-popup>
    <!-- 弹窗 -->
    <van-popup v-model="selectC" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择村" show-toolbar :columns="Ccolumns" @change="onChangeC" @confirm="onConfirmC" @cancel="onCancel"/>
    </van-popup>
    <van-popup v-model="selectT" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择镇" show-toolbar :columns="Tcolumns" @change="onChangeT" @confirm="onConfirmT" @cancel="onCancel"/>
    </van-popup>
    <!-- <van-popup v-model="selectS" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择省" show-toolbar :columns="Scolumns" @change="onChangeS" @confirm="onConfirmS" @cancel="onCancel"/>
    </van-popup>
    <van-popup v-model="selectZ" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择市" show-toolbar :columns="Zcolumns" @change="onChangeZ" @confirm="onConfirmZ" @cancel="onCancel"/>
    </van-popup>
    <van-popup v-model="selectQ" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择区" show-toolbar :columns="Qcolumns" @change="onChangeQ" @confirm="onConfirmQ" @cancel="onCancel"/>
    </van-popup> -->
    <!-- 弹窗 -->
    <van-popup v-model="selectS_M" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择省" show-toolbar :columns="Scolumns_M" @change="onChangeS_M" @confirm="onConfirmS_M" @cancel="onCancel_M"/>
    </van-popup>
    <van-popup v-model="selectZ_M" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择市" show-toolbar :columns="Zcolumns_M" @change="onChangeZ_M" @confirm="onConfirmZ_M" @cancel="onCancel_M"/>
    </van-popup>
    <van-popup v-model="selectQ_M" position="bottom" :style="{ height: '30%' }">
      <van-picker title="选择区" show-toolbar :columns="Qcolumns_M" @change="onChangeQ_M" @confirm="onConfirmQ_M" @cancel="onCancel_M"/>
    </van-popup>
    <!--  -->
    <van-dialog v-model="show" title="登记成功" :showConfirmButton="false">
      <van-loading v-if="!codeSrc" type="spinner" style="width: 200px;height:200px"/>
      <img v-if="codeSrc" :src="codeSrc" style="width: 200px;height:200px">
    </van-dialog>
  </div>
</template>
<script src="https://res.wx.qq.com/open/js/jweixin-1.2.0.js"></script>
<script>
import { mapState, mapActions } from 'vuex'
import { Toast,Dialog } from 'vant'
// Dialog
import {send} from '../../util/send'
import {formatTime} from '../../util/utils.js'
export default {
  name: 'Scan',
  data () {
    return {
      show: false,
      selectSymptom: false,
      codeSrc: '',
      car: '请选择',
      name: '',
      sex: '',
      ID: '',
      phone:  '',
      carNo: '',
      addr_D: '',
      addr_M: '',
      ifContact: '',
      temperature: '',
      symptom: '请选择',
      Carcolumns: ['D6968', 'D6967', 'D6962', 'D6960'],
      Symptomcolumns: ['无', '咳嗽', '发热', '胸闷', '呼吸困难'],
      selectCar: false,
      Tt: '请选择',
      Ct: '请选择',
      // St: '请选择',
      // Zt: '请选择',
      // Qt: '请选择',
      St_M: '请选择',
      Zt_M: '请选择',
      Qt_M: '请选择',
      selectT: false,
      selectC: false,
      // selectS: false,
      // selectZ: false,
      // selectQ: false,
      selectS_M: false,
      selectZ_M: false,
      selectQ_M: false,
      Tcolumns: [],
      Ccolumns: [],
      // Scolumns: [],
      // Zcolumns: [],
      // Qcolumns: [],
      Scolumns_M: [],
      Zcolumns_M: [],
      Qcolumns_M: [],
      TcolumnsID: [],
      CcolumnsID: [],
      // ScolumnsID: [],
      // ZcolumnsID: [],
      // QcolumnsID: [],
      ScolumnsID_M: [],
      ZcolumnsID_M: [],
      QcolumnsID_M: []
    }
  },
  created () {
    if (this.userInfo.username) {
      this.name = this.userInfo.username
      this.sex = this.userInfo.fsex
      this.ID = this.userInfo.idnumber
      this.phone = this.userInfo.fmobile
      this.ifContact = this.userInfo.iswuhan === '0' ? '无' : '有'
    }
  },
  computed: {
    ...mapState({
      openid: state => state.openid,
      AreaId: state => state.AreaId,
      ftype: state => state.ftype,
      userInfo: state => state.userInfo
    })
  },
  components: {
  },
  methods: {
    ...mapActions([
    ]),
    onConfirmCar (value, index) {
      this.car = value
      this.onCancelCar()
    },
    onCancelCar () {
      this.selectCar = false
    },
    onChangeCar () {},
    chooseCar () {
      this.selectCar = true
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
        // Toast.fail('Interface error！')
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
        // Toast.fail('Interface error！')
      })
    },
    // chooseS () {
    //   this.selectS = true
    //   send({
    //     name: '/serSheng',
    //     method: 'GET',
    //     data: {
    //     }
    //   }).then(_res => {
    //     this.Scolumns = _res.data.shenglist.map(item => {
    //       return item.fname
    //     })
    //     this.ScolumnsID = _res.data.shenglist.map(item => {
    //       return item.id
    //     })
    //   }).catch((res) => {
    //     // Toast.fail('Interface error！')
    //   })
    // },
    // chooseZ () {
    //   this.selectZ = true
    //   send({
    //     name: '/serShi?fid=' + this.StID,
    //     method: 'GET',
    //     data: {
    //     }
    //   }).then(_res => {
    //     this.Zcolumns = _res.data.shilist.map(item => {
    //       return item.fname
    //     })
    //     this.ZcolumnsID = _res.data.shilist.map(item => {
    //       return item.id
    //     })
    //   }).catch((res) => {
    //     // Toast.fail('Interface error！')
    //   })
    // },
    // chooseQ () {
    //   this.selectQ = true
    //   send({
    //     name: '/serQu?fid=' + this.ZtID,
    //     method: 'GET',
    //     data: {
    //     }
    //   }).then(_res => {
    //     this.Qcolumns = _res.data.qulist.map(item => {
    //       return item.fname
    //     })
    //     this.QcolumnsID = _res.data.qulist.map(item => {
    //       return item.id
    //     })
    //   }).catch((res) => {
    //     // Toast.fail('Interface error！')
    //   })
    // },
    chooseS_M () {
      this.selectS_M = true
      send({
        name: '/serSheng',
        method: 'GET',
        data: {
        }
      }).then(_res => {
        this.Scolumns_M = _res.data.shenglist.map(item => {
          return item.fname
        })
        this.ScolumnsID_M = _res.data.shenglist.map(item => {
          return item.id
        })
      }).catch((res) => {
        // Toast.fail('Interface error！')
      })
    },
    chooseZ_M () {
      this.selectZ_M = true
      send({
        name: '/serShi?fid=' + this.StID_M,
        method: 'GET',
        data: {
        }
      }).then(_res => {
        this.Zcolumns_M = _res.data.shilist.map(item => {
          return item.fname
        })
        this.ZcolumnsID_M = _res.data.shilist.map(item => {
          return item.id
        })
      }).catch((res) => {
        // Toast.fail('Interface error！')
      })
    },
    chooseQ_M () {
      this.selectQ_M = true
      send({
        name: '/serQu?fid=' + this.ZtID_M,
        method: 'GET',
        data: {
        }
      }).then(_res => {
        this.Qcolumns_M = _res.data.qulist.map(item => {
          return item.fname
        })
        this.QcolumnsID_M = _res.data.qulist.map(item => {
          return item.id
        })
      }).catch((res) => {
        // Toast.fail('Interface error！')
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
    onConfirmS_M (value, index) {
      this.St_M  = value
      this.StID_M  = this.ScolumnsID_M [index]
      this.onCancel_M()
    },
    onConfirmZ_M  (value, index) {
      this.Zt_M  = value
      this.ZtID_M  = this.ZcolumnsID_M [index]
      this.onCancel_M()
    },
    onConfirmQ_M  (value, index) {
      this.Qt_M  = value
      this.QtID_M  = this.QcolumnsID_M [index]
      this.onCancel_M()
    },
    onCancel () {
      // this.selectS = false
      // this.selectZ = false
      // this.selectQ = false
      this.selectT = false
      this.selectC = false
    },
    onCancel_M () {
      this.selectS_M = false
      this.selectZ_M = false
      this.selectQ_M = false
    },
    onChangeC (res) {
      console.log(res)
    },
    onChangeT (res) {
      console.log(res)
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
    // onChangeS (res) {
    //   console.log(res)
    // },
    // onChangeZ (res) {
    //   console.log(res)
    // },
    // onChangeQ (res) {
    //   console.log(res)
    // },
    onChangeS_M (res) {
      console.log(res)
    },
    onChangeZ_M (res) {
      console.log(res)
    },
    onChangeQ_M (res) {
      console.log(res)
    },
    chooseSymptom () {
      this.selectSymptom = true
    },
    onChangeSymptom () {},
    onConfirmSymptom (value, index) {
      this.symptom = value
      this.onCancelSymptom()
    },
    onCancelSymptom () {
      this.selectSymptom = false
    },
    submitInfo () {
      if (this.userInfo.check_status) {
        // 之前填过 现在是签到
        this.submitSign()
      } else {
        // 第一次提交
        this.submitInsert()
      }
    },
    submitSign () {
      // if (this.car === '请选择' || !this.name || !this.sex || !this.ID || !this.phone || !this.carNo || !this.St || !this.Qt || !this.Zt || !this.St_M || !this.Qt_M || !this.Zt_M || !this.addr_D || !this.addr_M || !this.ifContact || !this.symptom) {
      //   Toast({
      //     duration: 1500,
      //     forbidClick: true,
      //     message: '请将信息填写完整!'
      //   })
      //   return false
      // }
      send({
        name: '/signInInsert?ischangzhu=0&userid=' + this.openid + '&bustype=' + this.car + '&username=' + this.name + '&fsex=' + this.sex + '&idnumber=' + this.ID + '&fmobile=' + this.phone + '&iswuhan=' + (this.ifContact === '有' ? 1 : 0) + '&areaid=' + this.AreaId  + '&ftype=' + this.ftype + '&cfd=' + this.Tt + this.Ct + this.addr_D + '&mdd=' + this.St_M + this.Zt_M  + this.Qt_M + this.addr_M + '&bus_box=' + this.carNo + '&shenti_type=' + this.symptom + '&thisftemp=' + this.temperature,
        method: 'POST',
        data: {
        }
      }).then(_res => {
        switch (_res.data.code) {
          case 0:
            // this.codeSrc = _res.data.id
            this.show = true
            setTimeout(() => {
              this.codeSrc = _res.data.id
            }, 2000)
            // Dialog.alert({
            //   title: '进站登记成功！',
            //   message: '登记时间：' + formatTime(new Date())
            // }).then(() => {
            //   // on close
            // })
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
    submitInsert () {
      // if (this.car === '请选择' || !this.name || !this.sex || !this.ID || !this.phone || !this.carNo || !this.St || !this.Qt || !this.Zt || !this.St_M || !this.Qt_M || !this.Zt_M || !this.addr_D || !this.addr_M || !this.ifContact || !this.symptom) {
      //   Toast({
      //     duration: 1500,
      //     forbidClick: true,
      //     message: '请将信息填写完整!'
      //   })
      //   return false
      // }
      send({
        name: '/userinsert?ischangzhu=0&open_id=' + this.openid + '&bustype=' + this.car + '&username=' + this.name + '&fsex=' + this.sex + '&idnumber=' + this.ID + '&fmobile=' + this.phone + '&iswuhan=' + (this.ifContact === '有' ? 1 : 0) + '&areaid=' + this.AreaId  + '&ftype=' + this.ftype + '&cfd=' + this.Tt + this.Ct + this.addr_D + '&mdd=' + this.St_M + this.Zt_M  + this.Qt_M + this.addr_M + '&bus_box=' + this.carNo + '&shenti_type=' + this.symptom + '&thisftemp=' + this.temperature,
        method: 'POST',
        data: {
        }
      }).then(_res => {
        switch (_res.data.code) {
          case 0:
            this.show = true
            setTimeout(() => {
              this.codeSrc = _res.data.id
            }, 2000)
            // Dialog.alert({
            //   title: '进站登记成功！',
            //   message: '登记时间：' + formatTime(new Date())
            // }).then(() => {
            //   // on close
            // })
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
.InPprovince{
  padding: 0px 10px;
  margin-bottom: 80px;
}
.van-cell__title{
  text-align: left !important;
}
.InPprovince .van-field__control{
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
