import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import 'nprogress/nprogress.css'
import nProgress from 'nprogress'
import Site from '@/utils/site'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/Index.vue'),
    meta: {
      title: 'TsVue',
      icon: Site.getImage('icon/logo.png')
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
