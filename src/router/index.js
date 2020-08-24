import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '@/views/layout/Layout.vue'

const routes = [
    {
      path: '/', 
      redirect: '/Login',
      hidden: true,
      meta: {
        name: '主页'
      }
    },
    {
      path: '/login',
      name: 'Login',
      hidden: true,
      meta: {
        name: '登录'
      },
      component: () => import('../views/login/Login.vue')
    },
    {
      path: '/console',
      name: 'Console',
      redirect: '/index',
      meta: {
        name: '控制台',
        icon: 'el-icon-s-help'
      },
      component: Layout,
      children: [
        {
          path: '/index',
          name: 'Index',
          meta: {
            name: '首页'
          },
          component: () => import('../views/console/index.vue'),
        }
      ]
    },
    {
      path: '/info',
      name: 'Info',
      meta: {
        name: '信息管理',
        icon: 'el-icon-help'
      },
      component: Layout,
      children: [
        {
          path: '/infoList',
          name: 'InfoList',
          meta: {
            name: '信息列表'
          },
          component: () => import('../views/info/InfoList.vue'),
        },
        {
          path: '/infoCategory',
          name: 'InfoCategory',
          meta: {
            name: '信息分类'
          },
          component: () => import('../views/info/InfoCategory.vue'),
        }
      ]
    },
    {
      path: '/user',
      name: 'User',
      meta: {
        name: '用户管理'
      },
      component: Layout,
      children: [
        {
          path: '/userList',
          name: 'UserList',
          meta: {
            name: '用户列表'
          },
          component: () => import('../views/user/userList.vue'),
        }
      ]
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
