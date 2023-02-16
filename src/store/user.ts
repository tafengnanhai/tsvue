import secureLocalStorage from './storage'

interface UserData {
  name: string
  token: string
}

const storeId = 'user'

// should be called from inside of the setup
const useUserStore = defineStore(storeId, {
  state: (): UserData => {
    return {
      name: '',
      token: ''
    }
  },
  getters: {},
  actions: {
    clearUserData() {
      this.name = ''
      this.token = ''
    }
  },
  persist: {
    storage: secureLocalStorage
  }
})

// should be called from outside of the setup
const useLocalUserStore: UserData = secureLocalStorage.getItem(storeId) ? JSON.parse(secureLocalStorage.getItem(storeId) as string) : {}

export { useUserStore, useLocalUserStore }
