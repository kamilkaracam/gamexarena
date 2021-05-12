'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Game = use('App/Models/Game')
const GameTransformer = use('App/Transformers/GameTransformer')

/**
 * Resourceful controller for interacting with games
 */
class GameController {
  /**
   * Show a list of all games.
   * GET games
   *
   */
  async index ({transform}) {
    return transform.paginate(await Game.query().paginate(1), GameTransformer)
  }

  /**
   * Create/save a new game.
   * POST games
   */
  async store ({request, response}) {
  }

  /**
   * Display a single game.
   * GET games/:id
   */
  async show ({params, transform}) {
    return transform.item(await Game.find(params.id), GameTransformer)
  }

  /**
   * Update game details.
   * PUT or PATCH games/:id
   */
  async update ({params, request, response}) {
  }

  /**
   * Delete a game with id.
   * DELETE games/:id
   */
  async destroy ({params, request, response}) {
  }
}

module.exports = GameController
