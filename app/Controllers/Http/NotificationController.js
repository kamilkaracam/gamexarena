'use strict'

const NotificationTransformer = use('App/Transformers/NotificationTransformer')

/**
 * Resourceful controller for interacting with notifications
 */
class NotificationController {
  /**
   * [GET] /me/notifications
   * @param auth
   * @param transform
   */
  async index({auth, transform}) {
    const notifications = await auth.user.notifications().paginate(1, 10)

    return transform.paginate(notifications, NotificationTransformer)
  }

  /**
   * Create/save a new notification.
   * POST notifications
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({request, response}) {
  }

  /**
   * Display a single notification.
   * GET notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({params, request, response, view}) {
  }

  /**
   * Update notification details.
   * PUT or PATCH notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async update({auth, params, request, response}) {
    const notification = await auth.user.notifications()
      .where('id', params.id)
      .update({
        is_read: request.input('is_read', false),
      })

    return response.status(notification ? 200 : 403).json({})
  }

  /**
   * Delete a notification with id.
   * DELETE notifications/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, request, response}) {
  }
}

module.exports = NotificationController
