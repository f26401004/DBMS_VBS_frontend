import Vue from 'vue'
import App from '@/App.vue'
import router from '@/routes/index.js'
import apolloProvider from '@/plugins/vue-apollo.js'
import 'normalize.css'
import '@/plugins/element.js'
import '@/plugins/v-charts.js'


Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  apolloProvider,
  router
}).$mount('#app')
