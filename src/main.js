import Vue from 'vue'
import Vuex from 'vuex'
// import VueRouter from 'vue-router'
import store from './vuex/store'
import Counter from './components/counter'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  components: {
    Counter
  }
})

Vue.use(Vuex)
// Vue.use(VueRouter)

// let router = new VueRouter({})

// router.map({
//   '/login': {
//     component (resolve) {
//       require(['./components/login/components/login.vue'], resolve)
//     }
//   },
//   '/index': {
//     component (resolve) {
//       require(['./components/index/components/index.vue'], resolve)
//     },
//     subRoutes: {
//       '/first': {
//         component (resolve) {
//           require(['./components/index/components/first.vue'], resolve)
//         }
//       },
//       '/second': {
//         component (resolve) {
//           require(['./components/index/components/second.vue'], resolve)
//         }
//       }
//     }
//   }
// })

// router.start({
//   store,
//   components: {
//     App
//   }
// }, 'body')
