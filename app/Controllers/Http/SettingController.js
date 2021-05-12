'use strict'

const Setting = use('App/Models/Setting')
const SettingTransformer = use('App/Transformers/SettingTransformer')


/**
 * Resourceful controller for interacting with Faqs
 */
class SettingController {
  /**
   * Show a list of all FAQ.
   * GET FAQ
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request, transform,response }) {
    let params = request.get();

    if(params.group){
      return transform.paginate(await Setting.query().where('group',params.group).paginate(), SettingTransformer )
    }else{  
      return transform.paginate(await Setting.query().paginate(), SettingTransformer)
    }

    
  }

  async search({request,transform,resposne}){
      
  }

  /**
   * Create/save a new FAQ.
   * POST FAQ
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ request, response,transform }) {
    let params = request.post()  
    
    let setting = new Setting()
    setting.group = postParams.group
    setting.key = postParams.key
    setting.value = postParams.value
    setting.save()
    await setting.save()
      
    return transform.item(setting,SettingTransformer)
  }

  /**
   * Display a single FAQ.
   * GET fags/:id
   *
   * @param {object} ctx
   */
  async show ({ params, transform }) {
    return transform.item(await Setting.findByOrFail('id', params.id), SettingTransformer)
  }

  /**
   * Update faq details.
   * PUT or PATCH faqs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update ({ params, request, response }) {
    let postParams = request.post();  
    
    let setting = Setting.find(params.id)
    setting.group = postParams.group
    setting.key = postParams.key
    setting.value = postParams.value
    setting.save()

    return transform.item(setting, SettingTransformer)
  }

  async updateCommission ({params,request,response,transform}){
    let postParams = request.post()
    await Setting.query()
            .where('group','=','commission')
            .where('key','=','commission_rate')
            .update({value: postParams.commissionRate})
    await Setting.query()
          .where('group','=','commission')
          .where('key','=','started_at')
          .update({value:postParams.started_at})
    await Setting.query()
          .where('group','=','commission')
          .where('key','=','finished_at')
          .update({value:postParams.finished_at})

    return response.status(201).json({r: postParams.commissionRate})
  }

  async updatePaypal ({params,request,response,transform}){
    let postParams = request.post()
    await Setting.query()
            .where('group','=','paypal')
            .where('key','=','client_id')
            .update({value: postParams.client_id})
    await Setting.query()
          .where('group','=','paypal')
          .where('key','=','client_secret')
          .update({value:postParams.client_secret})
    await Setting.query()
          .where('group','=','paypal')
          .where('key','=','email')
          .update({value:postParams.email})
    await Setting.query()
          .where('group','=','paypal')
          .where('key','=','mode')
          .update({value:postParams.mode})
    return response.status(201).json({r: postParams.commissionRate})
  }

  /**
   * Delete a faq with id.
   * DELETE faqs/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = SettingController
