'use strict'

const _ = use('lodash')
const onlineUsers = {}

class UserController {
  constructor({socket, request, auth}) {
    this.socket = socket;
    this.request = request;
    this.auth = auth;
  }

  onJoin() {
    _.assign(onlineUsers, {[this.auth.user.uuid]: this.auth.user.username});
    this.socket.broadcastToAll('online', onlineUsers);
  }

  onLeave() {
    _.unset(onlineUsers, this.auth.user.uuid);
    this.socket.broadcastToAll('online', onlineUsers);
  }
}

module.exports = UserController;
