import Http from '@/utils/http'
export default class Version {
  static check() {
    return Http.get('/api/v1/version/check')
  }
}
