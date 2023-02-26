import Http from '@/utils/http'
export default class Version {
  static checkLogin(data: any) {
    return Http.post('/api/v1/user/check-login', data)
  }
}
