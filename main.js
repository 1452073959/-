import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$loginUrl = 'https://cc.zhuchenchen.com';

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
