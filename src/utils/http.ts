import axios from 'axios'
import qs from 'qs'
import router from '@/router'
import NProgress from 'nprogress'
import Loading from '@/utils/loading'
import Message from '@/utils/message'
import Config from '@/config/config'
import { useLocalUserStore } from '@/store/user'

export const enum Code {
  Timeout = -1,
  Success = 0,
  Failure = 1,
  Maintain = 99
}

export interface FreeData {
  [propertyname: string]: any
}

export interface ResponseData {
  code?: number
  msg?: string
  data?: any
  [propertyname: string]: any
}

export class Result {
  static success(data:any = {}, msg = '操作成功') {
    return {
      code: Code.Success,
      msg,
      data
    }
  }

  static failture(data:any = {}, msg = '操作失败') {
    return {
      code: Code.Failure,
      msg,
      data
    }
  }
}

axios.defaults.timeout = Config.http.timeout
axios.defaults.headers['Content-Type'] = 'application/json'

axios.interceptors.request.use(
  request => {
    if (!request.url?.endsWith('backend')) {
      NProgress.start()
      Loading.show()
    }
    if (request.headers) {
      request.headers.Token = useLocalUserStore.token
      if (request.method === 'post') {
        request.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      }
    }
    return request
  },
  error => {
    NProgress.done()
    Loading.close()
    Promise.reject(error)
  }
)

axios.interceptors.response.use(
  response => {
    NProgress.done()
    Loading.close()
    return response
  },
  error => {
    NProgress.done()
    Loading.close()
    Promise.reject(error)
  }
)

export default class Http {
  static get(url: string, params?:any, showSuccessTip = false, showErrTip = true) {
    return new Promise(resolve => {
      axios
        .get(url, { params })
        .then(res => {
          resolve(this.send(res, showSuccessTip, showErrTip))
        })
        .catch(error => {
          Message.error(error.data)
        })
    })
  }

  static post(url: string, data?: any, showSuccessTip = true, showErrTip = true) {
    return new Promise(resolve => {
      axios
        .post(url, qs.stringify(data))
        .then(res => {
          resolve(this.send(res, showSuccessTip, showErrTip))
        })
        .catch(error => {
          Message.error(error.data)
        })
    })
  }

  private static send(response: ResponseData, showSuccessTip = false, showErrTip = true) {
    if (response.data.code === Code.Success) {
      showSuccessTip && Message.success(response.data.msg)
    } else if (response.data.code === Code.Failure) {
      showErrTip && Message.error(response.data.msg)
    } else if (response.data.code === Code.Timeout) {
      router.push({ path: '/login', query: { from: 'timeout' } })
    } else if (response.data.code === Code.Maintain) {
      Message.error(response.data.msg)
    }
    return response.data
  }
}
