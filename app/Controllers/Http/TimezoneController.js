'use strict'

const Timezone = use('App/Models/Timezone')
const TimezoneTransformer = use('App/Transformers/TimezoneTransformer')

/**
 * Resourceful controller for interacting with timezones
 */
class TimezoneController {
  /**
   * Show a list of all timezones.
   * GET timezones
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({request, transform}) {
    return transform.paginate(await Timezone.query().orderBy('zone','ASC').paginate(1, 500), TimezoneTransformer)
  }

  /**
   * Display a single timezone.
   * GET timezones/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({params, transform}) {
    return transform.item(await Timezone.find(params.id), TimezoneTransformer)
  }
}

module.exports = TimezoneController
