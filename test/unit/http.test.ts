import Http, { Result } from '@/utils/http'
import '@/mock/test'
describe('Http', () => {
  it('get: success', async() => {
    const result = Result.success({ test: 1, id: 1 })
    const responseData = await Http.get('/api/v1/test/success', { id: 1 })
    expect(responseData).toEqual(result)
  })

  it('get: failture', async() => {
    const result = Result.failture({ test: 1 })
    const responseData = await Http.get('/api/v1/test/failure')
    expect(responseData).toEqual(result)
  })

  it('post: success', async() => {
    const result = Result.success({ test: 1, id: 2 })
    const responseData = await Http.post('/api/v1/test/success', { id: 2 })
    expect(responseData).toEqual(result)
  })

  it('post: failture', async() => {
    const result = Result.failture({ test: 1 })
    const responseData = await Http.post('/api/v1/test/failure')
    expect(responseData).toEqual(result)
  })
})
