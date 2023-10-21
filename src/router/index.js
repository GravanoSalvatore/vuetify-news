import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/category',
        name: 'Category',
        component: () => import("@/views/Category.vue"),
    },
    {
        path: '/detail',
        name: 'Detail',
        component: () => import("@/views/Detail.vue"),
    },
    {
        path: '/authors',
        name: 'Authors',
        component: () => import("@/views/Authors.vue"),
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import("@/views/Login.vue"),
    },
    {
        path: '/business',
        name: 'Business',
        component: () => import("@/views/Business.vue"),
    },
    {
        path: '/tech',
        name: 'Tech',
        component: () => import("@/views/Tech.vue"),
    },
    {
        path: '/sport',
        name: 'Sport',
        component: () => import("@/views/Sport.vue"),
    },
    {
        path: '/health',
        name: 'Health',
        component: () => import("@/views/Health.vue"),
    },
    {
        path: '/enter',
        name: 'Enter',
        component: () => import("@/views/Enter.vue"),
    },
    {
        path: '/science',
        name: 'Science',
        component: () => import("@/views/Science.vue"),
    },
    {
        path: '/about',
        name: 'About',
        component: () => import("@/views/About.vue"),
    }
]

const router = new VueRouter({
    routes,
    scrollBehavior() {
        document.getElementById('app').scrollIntoView();
    }
})

export default router
