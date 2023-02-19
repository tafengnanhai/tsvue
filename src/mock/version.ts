import Mock from 'mockjs'
import { Result } from '@/utils/http'
const versionNumber = 202302131801
Mock.mock('/api/v1/version/check', 'get', Result.success({ tv_version: versionNumber }))
