'use strict';

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract');
const UserTransformer = use('App/Transformers/UserTransformer');

/**
 * ChatTransformer class
 *
 * @class ChatTransformer
 * @constructor
 */
class ChatTransformer extends TransformerAbstract {
  availableInclude() {
    return [
      'user',
    ];
  }

  defaultInclude() {
    return [
      'user',
    ];
  }

  /**
   * This method is used to transform the data.
   */
  transform(chat) {
    return {
      uuid: chat.uuid,
      message: chat.message,
      created_at: chat.created_at,
    }
  }

  includeUser(chat) {
    return this.item(chat.getRelated('user'), UserTransformer);
  }
}

module.exports = ChatTransformer;
