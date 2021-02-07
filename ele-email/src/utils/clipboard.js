import Clipboard from 'clipboard'
import { Message } from 'element-ui'

function clipboardSuccess(msg) {
  Message({ type: 'success', message: '复制成功', duration: 1500 })
}

function clipboardError(errmsg) {
  Message({ type: 'danger', message: '复制失败', duration: 1500 })
}

export default function handleClipboard(text, event, message, errmessage) {
  const clipboard = new Clipboard(event.currentTarget, {
    text: () => text
  })
  clipboard.on('success', () => {
    clipboardSuccess(message)
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.on('error', () => {
    clipboardError(errmessage)
    clipboard.off('error')
    clipboard.off('success')
    clipboard.destroy()
  })
  clipboard.onClick(event)
}
