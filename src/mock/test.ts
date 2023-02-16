import Mock from 'mockjs'
import { Result, FreeData } from '@/utils/http'
import Url from '@/utils/url'
Mock.mock(/\/api\/v1\/test\/success.*/, (options) => {
  const id = Url.getParam('id', options.body || options.url)
  const data:FreeData = { test: 1 }
  if (id !== null) {
    data.id = parseInt(id)
  }
  const result = Result.success(data)
  return result
})

Mock.mock('/api/v1/test/failure', Result.failture({ test: 1 }))
