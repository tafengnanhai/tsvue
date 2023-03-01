import { ElMessage } from 'element-plus'

export default class Toast {
  static success(message = '操作成功', duration = 1500) {
    return ElMessage({
      message,
      type: 'success',
      duration
    })
  }

  static error(message = '操作失败', duration = 2000) {
    return ElMessage({
      message,
      type: 'error',
      duration
    })
  }
}
