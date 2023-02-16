import SecureLS from 'secure-ls'
import Config from '@/config/config'

const secureLs = new SecureLS({
  encodingType: 'aes',
  isCompression: true,
  encryptionSecret: Config.store.secret
})

export default {
  getItem: (key: string) => secureLs.get(key),
  setItem: (key: string, value: string) => secureLs.set(key, value),
  length: window.localStorage.length,
  clear: () => window.localStorage.clear(),
  key: (index: number): string | null => window.localStorage.key(index) || '',
  removeItem: (key: string) => window.localStorage.removeItem(key)
}
