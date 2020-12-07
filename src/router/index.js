import Vue from 'vue'
import Vuerouter from 'vue-router'

Vue.use(Vuerouter)
const Home = () =>
    import ('../views/home/Home')
const Category = () =>
    import ('../views/category/Category')
const Cart = () =>
    import ('../views/cart/Cart')
const Profile = () =>
    import ('../views/profile/Profile')
const Detail = () =>
    import ('../views/detail/Detail')

const routes = [{
        path: '',
        redirect: '/home'
    },
    {
        path: '/home',
        component: Home,
        meta: {
            title: '首页'
        }
    },
    {
        path: '/category',
        component: Category,
        meta: {
            title: '商品分类'
        }
    },
    {
        path: '/cart',
        component: Cart,
        meta: {
            title: '购物车'
        }
    },
    {
        path: '/profile',
        component: Profile,
        meta: {
            title: '我'
        }
    },
    {
        path: '/detail/:iid',
        component: Detail,
        meta: {
            title: '商品详情'
        }
    }
]
const router = new Vuerouter({
    routes,
    mode: 'history'
})
export default router