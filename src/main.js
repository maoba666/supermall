import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/store'
import toast from 'components/common/toast'
import FastClick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

Vue.config.productionTip = false
Vue.use(toast)
Vue.use(VueLazyLoad)
FastClick.attach(document.body)

Vue.prototype.$bus = new Vue()
router.beforeEach((to, meta, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    next()
})
new Vue({
    render: h => h(App),
    store,
    router

}).$mount('#app')