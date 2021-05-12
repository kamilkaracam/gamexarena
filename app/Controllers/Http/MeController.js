'use strict'

const Event = use('Event')
const MeTransformer = use('App/Transformers/MeTransformer')
const UserIdentity = use('App/Models/UserIdentity')

const Helpers = use('Helpers')
const Drive = use('Drive')
const Uuid = use('uuid/v4')
const fs = use('fs')

/**
 * Resourceful controller for interacting with us
 */
class MeController {
  /**
   * Display a single me.
   * GET me
   */
  async show({auth, transform}) {
    return transform.item(auth.getUser(), MeTransformer)
  }

  /**
   * Update me details.
   * PUT or PATCH me
   */
  async update({auth, request, response}) {
    const params = request.only(['state', 'postal_code', 'city', 'country_id', 'timezone_id', 'gender'])
    auth.user.merge(params)
    await auth.user.save()

    return {}
  }

  /**
   * POST /me/change-avatar
   * Update me avatar
   * PUT or PATCH me avatar 
   */
  async changeAvatar({auth, request, response,transform}){
    
    const avatar = request.file('avatar', {
        types: ['image']
    })

    const fullPath = 'avatars/' + Uuid() + '.' + avatar.subtype;
    
    //await Drive.put('uploads/' + fullPath, avatar);

    /*request.multipart.file('avatar', {}, async (file) => {
      await Drive.put('uploads/avatars' + fullPath, file)
    })*/

    const oldFile = Helpers.tmpPath('uploads') + '/' + auth.user.avatar
    Drive.delete(oldFile)

    await avatar.move(Helpers.tmpPath('uploads'), {
      name: fullPath,
      overwrite: true
    })

    const params = {
      'avatar': fullPath
    }

    auth.user.merge(params);
    auth.user.save();
    
    return transform.item(auth.getUser(), MeTransformer)

  }

  /**
   * POST /me/identity
   * Update me identity
   * @param {identiy_front,identity_back,identity_selfie} param0 
   */
  async identity({auth,request,response}) {
    let userIdentity = await UserIdentity.query().where('user_id',auth.user.id).first()

    
    if(userIdentity){
      //Check and delete old files
      const oldIdentity_front = Helpers.tmpPath('uploads') + userIdentity.identity_front
      Drive.delete(oldIdentity_front)
      const oldIdentity_back = Helpers.tmpPath('uploads') + userIdentity.identity_back
      Drive.delete(oldIdentity_back)
      const oldIdentity_selfie = Helpers.tmpPath('uploads') + userIdentity.identity_selfie
      Drive.delete(oldIdentity_selfie)

    }

    const identity_front = request.file('identity_front',{
      types:['image']
    })
    const identity_front_path = 'identities/' + auth.user.uuid + '_front.' + identity_front.subtype;
    await identity_front.move(Helpers.tmpPath('uploads'), {
      name: identity_front_path,
      overwrite: true
    })

    const identity_back = request.file('identity_back',{
      types:['image']
    })
    const identity_back_path = 'identities/' + auth.user.uuid + '_back.' + identity_back.subtype;
    await identity_back.move(Helpers.tmpPath('uploads'), {
      name: identity_back_path,
      overwrite: true
    })

    const identity_selfie = request.file('identity_selfie',{
      types:['image']
    })
    const identity_selfie_path = 'identities/' + auth.user.uuid + '_selfie.' + identity_selfie.subtype;
    await identity_selfie.move(Helpers.tmpPath('uploads'), {
      name: identity_back_path,
      overwrite: true
    })

    if(userIdentity==null){
      userIdentity = new UserIdentity();
    }
    userIdentity.user_id = auth.user.id;
    userIdentity.identity_front = identity_front_path;
    userIdentity.identity_back = identity_back_path;
    userIdentity.identity_selfie = identity_selfie_path;
    await userIdentity.save();

    return response.status(201).json({})
    

    


  }

  /**
   * POST /me/change-password
   *
   * @param auth
   * @param request
   * @param response
   * @returns {Promise<{}>}
   */
  async changePassword({auth, request, response}) {
    const params = request.only(['new_password']);

    auth.user.password = params.new_password;
    await auth.user.save();

    Event.fire('change-password::user', auth.user);

    return {}
  }
}

module.exports = MeController
