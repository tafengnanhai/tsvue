import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress'
import Site from '@/utils/site'
import Config from '@/config/config'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/index.vue'),
    meta: {
      title: Config.site.name,
      icon: Site.getImage('icon/logo.png')
    }
  },
  {
    path: '/:pathMatch(.*)',
    name: 'error404',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '404 Not Found'
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(to => {
  nProgress.start()
  if (typeof to.meta?.title === 'string') {
    document.title = to.meta.title
  }
  if (typeof to.meta?.icon === 'string') {
    Site.setIcon(to.meta.icon)
  }
})

router.afterEach(() => {
  nProgress.done()
})

export default router
