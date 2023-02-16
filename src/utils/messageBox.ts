import { ElMessageBox, ElMessageBoxOptions } from 'element-plus'

export default class MessageBox {
  static show(message: ElMessageBoxOptions['message'], title: ElMessageBoxOptions['title'] = '提示', options: ElMessageBoxOptions = { confirmButtonText: '确定', type: 'warning' }) {
    return new Promise(resolve => {
      ElMessageBox.alert(message, title, options).then(res => resolve(res))
    })
  }
}
