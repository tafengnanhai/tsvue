import { ElNotification } from 'element-plus'

export default class Notification {
  static success(message = '操作成功', title = '提示') {
    return ElNotification({
      title,
      message,
      type: 'success'
    })
  }

  static error(message = '操作失败', title = '错误') {
    return ElNotification({
      title,
      message,
      type: 'error'
    })
  }
}
