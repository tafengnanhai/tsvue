import Mock from 'mockjs'
const versionNumber = 202302131801
Mock.mock('/api/v1/version/check', 'get', {
  code: 0,
  msg: '操作成功',
  data: {
    tv_version: versionNumber
  }
})
