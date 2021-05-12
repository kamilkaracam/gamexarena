'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
const Country = use('App/Models/Country')
const CountryTranformer = use('App/Transformers/CountryTransformer')

/**
 * Resourceful controller for interacting with countries
 */
class CountryController {
  /**
   * Show a list of all countries.
   * GET countries
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index({request, transform}) {
    return transform.paginate(await Country.query().paginate(1, 500), CountryTranformer)
  }

  /**
   * Display a single country.
   * GET countries/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async show({params, request, transform}) {
    return transform.item(await Country.find(params.id), CountryTranformer)
  }
}

module.exports = CountryController
