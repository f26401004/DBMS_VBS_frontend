import Vue from 'vue'
import router from './routes/index.js'
import App from './App.vue'
import './plugins/element.js'
import apolloProvider from './plugins/vue-apollo.js'
import 'normalize.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  apolloProvider,
  router
}).$mount('#app')
