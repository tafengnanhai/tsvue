import Mock, { Random } from 'mockjs'
import { Result } from '@/utils/http'

Mock.mock('/api/v1/captcha/login', 'get', () => {
  const strCaptcha = Random.string('upper', 4)
  const imgCaptcha = Random.dataImage('80x35', strCaptcha)
  return Result.success({ captcha: imgCaptcha })
})
