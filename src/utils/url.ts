export default class Url {
  static getParam(name: string, url: string): string | null {
    const paramUrl = url.slice(url.indexOf('?') + 1)
    const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
    const result = paramUrl.match(reg)
    return result === null ? null : decodeURI(result[2])
  }

  static getSection(loc: number, url: string): string | null {
    const result = url.split('/')
    return result.length > loc ? result[loc] : null
  }
}
