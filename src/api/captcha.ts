import Http from '@/utils/http'
export default class Captcha {
  static login() {
    return Http.get('/api/v1/captcha/login')
  }
}
