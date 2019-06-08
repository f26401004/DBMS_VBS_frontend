import Vue from 'vue'
import VueRouter from 'vue-router'

import IndexPage from '@/pages/IndexPage.vue'
import TablePage from '@/pages/TablePage.vue'
import TableTypePage from '@/pages/TableTypePage.vue'
import GeneralPage from '@/pages/GeneralPage.vue'
// import DepositPage from '@/pages/DepositPage.vue'
import InsurancePage from '@/pages/InsurancePage.vue'
import InsuranceCheckPage from '@/pages/InsuranceCheckPage.vue'
import UserPage from '@/pages/UserPage.vue'
import UserDetailPage from '@/pages/UserDetailPage.vue'
import StatisticsPage from '@/pages/StatisticsPage.vue'

Vue.use(VueRouter)

// define the type page
const types = ['users', 'cards', 'cardTypes', 'transactions', 'transactionTypes', 'insurances', 'insuranceTypes', 'insurancePayments', 'deposits', 'depositTypes', 'depositPayments', 'costs']

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: IndexPage
    },
    {
      path: '/general',
      component: GeneralPage
    },
    {
      path: '/users',
      component: UserPage
    },
    {
      path: '/users/:SSN',
      component: UserDetailPage
    },
    {
      path: '/insurance/apply',
      component: InsurancePage
    },
    {
      path: '/insurance/check',
      component: InsuranceCheckPage
    },
    {
      path: '/statistics',
      component: StatisticsPage
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