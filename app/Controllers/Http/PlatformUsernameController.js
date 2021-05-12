'use strict'

const PlatformUsername = use('App/Models/PlatformUsername');
const User = use('App/Models/User')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const PlatformUsernameTransformer = use('App/Transformers/PlatformUsernameTransformer')

/**
 * Resourceful controller for interacting with usernames
 */
class PlatformUsernameController {
  /**
   * Show a list of all platformusernames.
   * GET me/usernames
   */
  async index({auth, transform}) {
    return transform.collection(await auth.user.usernames().fetch(), PlatformUsernameTransformer)
  }

  /**
   * Create/save a new me/username.
   * POST me/usernames
   */
  async store({auth, request, response}) {
    const params = request.only(['items'])
    let param = {}
    let created = false
    
    const usernames = auth.user.usernames()
    
    while (param = params['items'].shift()) {
      const username = await auth.user.usernames()
        .where(function () {
          this.where('platforms.is_platform', true)
        })
        .wherePivot('platform_id', param.platform_id)
        .wherePivot('username', param.username)
        .count('* as total')
      
        
        let userPlatformName = await PlatformUsername.query().where('platform_id',param.platform_id).where('user_id',auth.user.id).first()
        if(userPlatformName){
          userPlatformName.username = param.username
          await userPlatformName.save()
        }
      
      
      await usernames.attach([param.platform_id], (row) => {
        row.username = param.username
      })

      created = true
    }

    return response.status(created ? 201 : 200).json({})
  }

  /**
   * Display a single me/username.
   * GET me/usernames/:id
   */
  async show({params, request, response, view}) {
  }

  /**
   * Update me/username details.
   * PUT or PATCH me/usernames/:id
   */
  async changename({auth, request, response}) {
    
    const params = request.only(['items'])
    let param = {}
    let updated = false
    
    const usernames = auth.user.usernames()

    await PlatformUsername.query().where('user_id',auth.user.id).delete()
    
    for(const i in params.items){

      let username = await auth.user.usernames()
        .where(function () {
          this.where('platforms.is_platform', true)
        })
        .wherePivot('platform_id', params.items[i].platform_id)
        .wherePivot('user_id', auth.user.id)
        .first()

        await usernames.attach([params.items[i].platform_id], (row) => {
          row.username = params.items[i].username
        })  

      updated = true
    }

    return response.status(updated ? 201 : 200).json({})
  }

  /**
   * Delete a me/username with id.
   * DELETE me/usernames/:id
   */
  async destroy({params, request, response}) {
  }
}

module.exports = PlatformUsernameController
