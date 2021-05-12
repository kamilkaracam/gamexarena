'use strict';

const Bumblebee = use('Adonis/Addons/Bumblebee');

const Chat = use('App/Models/Chat');

const ChatTransformer = use('App/Transformers/ChatTransformer');

class ChatController {
  constructor({socket, request, auth}) {
    this.socket = socket;
    this.request = request;
    this.auth = auth;
  }

  async onMessage(message) {
    if (!((this.request.all()).token || null)) {
      let user = {uuid: null, username: 'guest'};
      this.socket.emitTo('newMessage', {user, message: 'Üye girişi yapmadan mesaj gönderemezsiniz.'}, [this.socket.id]);
    } else if (await this.auth.check()) {

      let [, type, id] = this.socket.topic.split(':');

      let chat = await Chat.create({
        user_id: this.auth.user.id,
        relation_type: type,
        relation_id: id,
        message: message,
      });

      this.socket.broadcastToAll('newMessage', await Bumblebee.create().item(chat, ChatTransformer));
    }
  }
}

module.exports = ChatController;
