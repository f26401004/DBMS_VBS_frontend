import Vue from 'vue'
import VueRouter from 'vue-router'

import IndexPage from '@/pages/IndexPage.vue'
import TablePage from '@/pages/TablePage.vue'
import TableTypePage from '@/pages/TableTypePage.vue'

Vue.use(VueRouter)

// define the type page
const types = ['users', 'cards', 'cardTypes', 'transactions', 'transactionTypes', 'insurances', 'insuranceTypes', 'deposits', 'depositTypes', 'costs']

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/table',
      component: TablePage
    },
    {
      path: '/table/:type',
      component: TableTypePage,
      meta: {
        parent: 'table',
      },
      beforeEnter: function (to, from, next) {
        console.log(from)
        // if the type parameter do not match, then stop navigation
        if (!types.includes(to.params.type)) {
          next(false)
          return
        }
        next()
      }
    }
  ]
})