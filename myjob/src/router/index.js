import Vue from 'vue'
import Router from 'vue-router'
// import index from '@/views/index'
// import SignIn from '@/views/signIn'
// import WinningRecord from '@/views/winningRecord'
// import getstar from '@/views/getstar'
// import back from '@/views/back'
// import friendstar from '@/views/friends-star'
// import rules from '@/views/rules'
// import FriendSignIn from '@/views/friends-signIn'

Vue.use(Router)

const my_router = new Router({
  routes: [
    {
      path: '/index2',
      name: 'index2',
      // component: index
      component: resolve => require(['@/views/index2'], resolve),
    },
    {
      path: '/rules',
      name: 'rules',
      // component: rules
      component: resolve => require(['@/views/rules'], resolve),
    },
    {
      path: '*',
      redirect:'/index2'
    }
  ]
})


export default my_router