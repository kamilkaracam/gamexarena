'use strict'

const Faq = use('App/Models/Faq')
const FaqTransformer = use('App/Transformers/FaqTransformer')

const FaqTranslation = use('App/Models/FaqTranslation')
const FaqTranslationTransformer = use('App/Transformers/FaqTranslationTransformer')

/**
 * Resourceful controller for interacting with Faqs
 */
class FaqController {
  /**
   * Show a list of all FAQ.
   * GET FAQ
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request, transform }) {
    return transform.paginate(await Faq.query().paginate(), FaqTransformer)
  }


  async lang({params, transform}){
      return await FaqTranslation.query().where('lang',params.lang).fetch()
      return transform.paginate( await FaqTranslation.query().where('lang',params.lang).fetch() , FaqTranslationTransformer)
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
    
    let faq = new Faq()
    await faq.save()
      
    for(const i in params){
        let faqTranslation = new FaqTranslation()
        faqTranslation.faq_id = faq.id;
        faqTranslation.lang = params[i].lang;
        faqTranslation.answer = params[i].answer;
        faqTranslation.question = params[i].question;
        await faqTranslation.save()
    }  
    return transform.item(faq,FaqTransformer)
  }

  /**
   * Display a single FAQ.
   * GET fags/:id
   *
   * @param {object} ctx
   */
  async show ({ params, transform }) {
    return transform.item(await Faq.findByOrFail('id', params.id), FaqTransformer)
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
      let faq = Faq.find(params.id)

      let postParams = request.post();
      for(const i in postParams){
        let faqTranslation = FaqTranslation.query().where('id',postParams[i].id).fetch()
        faqTranslation.lang = postParams[i].lang;
        faqTranslation.answer = postParams[i].answer;
        faqTranslation.question = postParams[i].question;
        await faqTranslation.save()
      }
      return transform.item(faq, FaqTransformer)
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

module.exports = FaqController
