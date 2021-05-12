'use strict'

const TransformerAbstract = use('Adonis/Addons/Bumblebee/TransformerAbstract')

/**
 * NotificationTransformer class
 *
 * @class NotificationTransformer
 * @constructor
 */
class NotificationTransformer extends TransformerAbstract {
  /**
   * This method is used to transform the data.
   */
  transform(notification) {
    return {
      id: notification.id,
      message: notification.message,
      href: notification.href || null,
      is_read: Boolean(notification.is_read),
      created_at: notification.created_at,
    }
  }
}

module.exports = NotificationTransformer
