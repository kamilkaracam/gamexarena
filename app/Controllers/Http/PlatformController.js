'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Platform = use('App/Models/Platform')
const PlatformTransformer = use('App/Transformers/PlatformTransformer')

/**
 * Resourceful controller for interacting with platforms
 */
class PlatformController {
  /**
   * Show a list of all platforms.
   * GET platforms
   */
  async index({transform}) {
    return transform.include('games.types.rules').paginate(
      await Platform.query().has('games').paginate(1),
      PlatformTransformer,
    )
  }

  /**
   * Create/save a new platform.
   * POST platforms
   */
  async store({request, response}) {
  }

  /**
   * Display a single platform.
   * GET platforms/:id
   */
  async show({params, transform}) {
    return transform.item(await Platform.find(params.id), PlatformTransformer)
  }

  /**
   * Update platform details.
   * PUT or PATCH platforms/:id
   */
  async update({params, request, response}) {
  }

  /**
   * Delete a platform with id.
   * DELETE platforms/:id
   */
  async destroy({params, request, response}) {
  }

  async socials({transform}) {
    return transform.paginate(
      await Platform.query().isSocial().paginate(1),
      PlatformTransformer
    )
  }
}

module.exports = PlatformController
