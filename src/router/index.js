import store from "@/store";
import { createRouter, createWebHistory } from "vue-router";

//route2nya
const routes = [
    {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "register" */ 
        '@/views/auth/Register.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "login" */ 
        '@/views/auth/Login.vue')
    },

    {
        path: '/customer/dashboard',
        name: 'dashboard',
        component: () => import(/* webpackChunkName: "login" */ 
        '@/views/dashboard/Index.vue'),
        //check is loggedIn
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customer/order',
        name: 'order',
        component: () => import(/* webpackChunkName: "order" */ 
        '@/views/order/Index.vue'),
        //check is loggedIn
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/customer/order/:snap_token',
        name: 'detail_order',
        component: () => import(/* webpackChunkName: "detail_order" */ 
        '@/views/order/Show.vue'),
        //check is loggedIn
        meta: {
            requiresAuth: true
        }
    },
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/home/Index.vue')
    },
    {
        path: '/product/:slug',
        name: 'detail_product',
        component: () => import('@/views/product/Show.vue')
    },
    {
        path: '/categories',
        name: 'categories',
        component: () => import('@/views/category/Index.vue')
    },
    {
        path: '/category/:slug',
        name: 'detail_category',
        component: () => import('@/views/category/Show.vue')
    },
    {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/cart/Index.vue'),
        meta: {
            requiresAuth: true
        }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    if(to.matched.some(record => record.meta.requiresAuth))
    {
        //cek nilai dari getters isLoggedin di module Auth
        if(store.getters['auth/isLoggedIn'])
        {
            next()
            return
        }
        next('/login')
    }
    else {
        next()
    }
})

export default router