import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress'
import Site from '@/utils/site'
import Config from '@/config/config'
import { useUserStore } from '@/store/user'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index.vue'),
    meta: {
      title: Config.site.name
    }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login.vue'),
    meta: {
      title: '后台登录_' + Config.site.name
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'error404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '页面不存在'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  nProgress.start()
  if (typeof to.meta?.title === 'string') {
    document.title = to.meta.title
  }
  if (typeof to.meta?.icon === 'string') {
    Site.setIcon(to.meta.icon)
  }
  if (to.name !== 'login' && to.name !== 'error404') {
    useUserStore().checkLoginStatus()
  }
  next()
})

router.afterEach(() => {
  nProgress.done()
})

export default router
