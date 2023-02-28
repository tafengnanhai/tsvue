import secureLocalStorage from './storage'
import Message from '@/utils/message'
import router from '@/router'

interface UserData {
  name: string
  token: string
  captcha: string
  elements: string[]
}

const storeId = 'user'

// should be called from inside of the setup
const useUserStore = defineStore(storeId, {
  state: (): UserData => {
    return {
      name: '',
      token: '',
      captcha: '',
      elements: []
    }
  },
  getters: {},
  actions: {
    setName(name: string) {
      this.name = name
    },
    setToken(token: string) {
      this.token = token
    },
    setCaptcha(captcha: string) {
      this.captcha = captcha
    },
    setElements(elements: string[]) {
      this.elements = elements
    },
    clearUserData() {
      this.setName('')
      this.setToken('')
      this.setCaptcha('')
      this.setElements([])
    },
    checkLoginStatus() {
      if (this.token === '') {
        Message.error('已超时，请重新登录')
        router.replace('login')
      }
    }
  },
  persist: {
    storage: secureLocalStorage
  }
})

// should be called from outside of the setup
const useLocalUserStore = (): UserData =>
  secureLocalStorage.getItem(storeId)
    ? JSON.parse(secureLocalStorage.getItem(storeId) as string)
    : {
        name: '',
        token: '',
        captcha: '',
        elements: []
      }

export { useUserStore, useLocalUserStore }
