import Mock from 'mockjs'
import { Result } from '@/utils/http'
import Url from '@/utils/url'
import { useUserStore } from '@/store/user'

const userData = [
  {
    user_id: 1,
    user_username: 'admin',
    user_password: 'admin',
    user_status: '1'
  },
  {
    user_id: 2,
    user_username: 'other',
    user_password: '123456',
    user_status: '1'
  },
  {
    user_id: 3,
    user_username: 'test',
    user_password: '123456',
    user_status: '1'
  }
]

Mock.mock('/api/v1/user/check-login', 'post', options => {
  const data = options.body
  const username = Url.getParam('username', data)
  const password = Url.getParam('password', data)
  const captcha = Url.getParam('captcha', data)
  if (captcha?.toLowerCase() !== useUserStore().captcha?.toLowerCase()) {
    return Result.failture({}, '图形验证码错误')
  }
  let status
  const exists = userData.some(user => {
    if (user.user_username === username && user.user_password === password) {
      status = user.user_status
      return true
    }
    return false
  })
  if (!exists) {
    return Result.failture({}, '用户名或密码错误')
  } else if (status === 0) {
    return Result.failture({}, '用户已禁用')
  } else {
    return Result.success()
  }
})
