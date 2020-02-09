import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import Loading from '@/page/Loading'
// import RegisterMain from '@/page/RoadPoint/RegisterMain'
import RegisterCheckIn from '@/page/RoadPoint/RegisterCheckIn'
import PointCheckIn from '@/page/RoadPoint/PointCheckIn'
import EenterStation from '@/page/MotorCar/EenterStation'
import Choose from '@/page/MotorCar/Choose'
import OutStationOutside from '@/page/MotorCar/OutStationOutside'
import OutStationInside from '@/page/MotorCar/OutStationInside'
import MotorCarInfo from '@/page/MotorCar/Info'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/MotorCarInfo',
      name: 'MotorCarInfo',
      component: MotorCarInfo
    },
    {
      path: '/OutStationInside',
      name: 'OutStationInside',
      component: OutStationInside
    },
    {
      path: '/OutStationOutside',
      name: 'OutStationOutside',
      component: OutStationOutside
    },
    {
      path: '/RegisterCheckIn',
      name: 'RegisterCheckIn',
      component: RegisterCheckIn
    },
    {
      path: '/PointCheckIn',
      name: 'PointCheckIn',
      component: PointCheckIn
    },
    {
      path: '/EenterStation',
      name: 'EenterStation',
      component: EenterStation
    },
    {
      path: '/Choose',
      name: 'Choose',
      component: Choose
    }
    // {path: '*', redirect: '/Loading'}
  ]
})
// 登录控制
router.beforeEach((to, from, next) => {
  next()
  // if (window.localStorage['registerId']) {
  //   next()
  // } else {
  //   next({path: '/Login'})
  // }
})
export default router
// export default new Router({
//   routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
//   ]
// })
