'use strict';

const Chat = use('App/Models/Chat');
const ChatTransformer = use('App/Transformers/ChatTransformer');

/**
 * Resourceful controller for interacting with chats
 */
class ChatController {
  /**
   * Show a list of all chats.
   * GET chats
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({params, request, transform}) {
    return transform.paginate(await Chat.query().where('relation_type', params.type).where('relation_id', params.id).orderBy('created_at').paginate(1,1000), ChatTransformer);
  }

  /**
   * Delete a chat with id.
   * DELETE chats/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, request, response}) {
  }
}

module.exports = ChatController
