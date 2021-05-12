'use strict'

class NotificationController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onNew(data) {
    this.socket.broadcastToAll('new', {})
  }

}

module.exports = NotificationController
