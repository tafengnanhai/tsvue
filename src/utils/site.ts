import Version from '@/api/version'
import Config from '@/config/config'
export default class Site {
  static setRem() {
    const fontSize = 10
    function changeRem() {
      const scale = document.documentElement.clientWidth / 750
      document.documentElement.style.fontSize = fontSize * Math.min(scale, 2) + 'px'
    }
    changeRem()
    window.onresize = () => {
      changeRem()
    }
  }

  static setIcon(iconUrl: string): void {
    let icon: HTMLLinkElement | null = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
    if (icon !== null) {
      icon.href = iconUrl
    } else {
      icon = document.createElement('link')
      icon.rel = 'icon'
      icon.href = iconUrl
      document.head.appendChild(icon)
    }
  }

  static getImage(imageUrl: string) {
    return new URL(`../assets/images/${imageUrl}`, import.meta.url).href
  }

  static checkVersion(): void {
    Version.check().then((res: any) => {
      if (res.data.tv_version > Config.site.version) {
        location.reload()
      }
    })
  }
}
