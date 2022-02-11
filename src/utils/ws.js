// const ws = null
// const lock = false
// function createConnection(url) {
//   try {
//     if (WebSocket) {
//       ws = new WebSocket(url)
//     } else if (MozWebSocket) {
//       ws = new MozWebSocket(url)
//     }
//     initEvent()
//   } catch (e) {
//     reconnect(url)
//   }
// }
// initEvent
class Wsclass {
  constructor(url) {
    this.eventsPool = {}
    this.lock = false
    this.create(url)
  }

  create(url) {
    try {
      if (WebSocket) {
        this.ws = new WebSocket(url)
      }
      this.initEvent(url)
    } catch (e) {
      this.reconnect(url)
    }
    return this.ws
  }

  reconnect(url) {
    self.canSend = false
    if (this.lock) return
    this.lock = true
    setTimeout(() => {
      this.create(url)
      this.lock = false
    }, 2000)
  }

  initEvent(url) {
    const self = this
    this.ws.onclose = function () {
      self.reconnect(url)
    }

    this.ws.onerror = function (error) {
      console.log(error)
      self.reconnect(url)
    }
    this.ws.onopen = function () {
      self.canSend = true
      self.heartCheckStart()
    }
    this.ws.onmessage = function (event) {
      self.dealWithData(event.data)
    }
  }

  dealWithData(data) {
    const parseData = JSON.parse(data)
    const type = parseData.event
    const value = parseData.data
    if (this.eventsPool[type] && this.eventsPool[type].length) {
      this.eventsPool[type].forEach(callBack => {
        callBack(value)
      })
    }
  }

  // 心跳
  heartCheckStart() {
    if (!this.timer) {
      this.timer = setInterval(() => {
        this.ws && this.sendData({ bt: 'bt' })
      }, 50000)
    }
  }

  // 发送数据
  sendData(data) {
    if (this.canSend) {
      this.ws.send(JSON.stringify(data))
    } else {
      setTimeout(() => {
        this.sendData(data)
      }, 200)
    }
  }

  dispatchEvent(event, data) {
    if (!data) {
      data = {}
    }
    data = { ...data, event }
    this.sendData(data)
  }

  // 订阅
  sub(eveObj) {
    for (const key in eveObj) {
      if (!this.eventsPool[key]) {
        this.eventsPool[key] = []
      }
      this.eventsPool[key].push(eveObj[key])
    }
  }

  // 取消订阅
  unsub(eveObj) {
    for (const key in eveObj) {
      if (!this.eventsPool[key] || !this.eventsPool[key].length) {
        return
      }
      const index = this.eventsPool[key].findIndex(el => el === eveObj.key)
      if (index > -1) {
        this.eventsPool[key].splice(index, 1)
      }
    }
  }
}

export default new Wsclass('wss://mail.ipwangxin.cn/ws/email')
