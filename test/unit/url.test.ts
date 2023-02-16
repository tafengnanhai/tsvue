import Url from '@/utils/url'
describe('Url', () => {
  const url = 'https://test.com/index?a=1&b=%E4%BD%A0%E5%A5%BD'
  it('getParam', () => {
    expect(Url.getParam('a', url)).toBe('1')
    expect(Url.getParam('b', url)).toBe('你好')
  })

  it('getSection', () => {
    expect(Url.getSection(0, url)).toBe('https:')
    expect(Url.getSection(1, url)).toBe('')
    expect(Url.getSection(2, url)).toBe('test.com')
    expect(Url.getSection(3, url)).toBe('index?a=1&b=%E4%BD%A0%E5%A5%BD')
  })
})
