/*
 * @Description: 重写element-ui message，只弹一次，避免重复弹
 */
import { Message } from 'element-ui'

const showMessage = Symbol('showMessage')
let messageInstance = null
class DoneMessage {
  [showMessage](type, options, single) {
    if (messageInstance && single) {
      messageInstance.close()
    }
    messageInstance = Message[type](options)
  }

  info(options, single = true) {
    this[showMessage]('info', options, single)
  }

  warning(options, single = true) {
    this[showMessage]('warning', options, single)
  }

  error(options, single = true) {
    this[showMessage]('error', options, single)
  }

  success(options, single = true) {
    this[showMessage]('success', options, single)
  }
}
export const message = new DoneMessage()
