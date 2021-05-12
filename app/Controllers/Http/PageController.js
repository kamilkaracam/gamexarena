'use strict'

const Page = use('App/Models/Page')
const PageTransformer = use('App/Transformers/PageTransformer')

const PageTranslation = use('App/Models/PageTranslation')
const PageTranslationTransformer = use('App/Transformers/PageTranslationTransformer')

/**
 * Resourceful controller for interacting with Faqs
 */
class PageController {
  /**
   * Show a list of all FAQ.
   * GET FAQ
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request, transform }) {
    return transform.paginate(await Page.query().paginate(), PageTransformer)
  }


  async lang({params, transform}){
      return await PageTranslation.query().where('lang',params.lang).fetch()
      //return transform.paginate( await PageTranslation.query().where('lang',params.lang).fetch() , PageTranslationTransformer)
  }

  /**
   * Get page with slug
   * @param {} param0 
   */
  async slug({params, transform}){
      return await PageTranslation.query().where('slug',params.slug).fetch()
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
    
    let page = new Faq()
    await page.save()
      
    for(const i in params){
        let pageTranslation = new PageTranslation()
        pageTranslation.page_id = page.id;
        pageTranslation.lang = params[i].lang;
        pageTranslation.title = params[i].title;
        pageTranslation.slug = params[i].slug;
        await pageTranslation.save()
    }  
    return transform.item(faq,PageTransformer)
  }

  /**
   * Display a single FAQ.
   * GET fags/:id
   *
   * @param {object} ctx
   */
  async show ({ params, transform }) {
    return transform.item(await Page.findByOrFail('id', params.id), PageTransformer)
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
      let page = Page.find(params.id)

      let postParams = request.post();
      for(const i in postParams){
        let pageTranslation = FaqTranslation.query().where('id',postParams[i].id).fetch()
        pageTranslation.lang = postParams[i].lang;
        pageTranslation.title = postParams[i].title;
        pageTranslation.slug = postParams[i].slug;
        pageTranslation.content = postParams[i].content;
        await pageTranslation.save()
      }
      return transform.item(faq, PageTransformer)
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

module.exports = PageController
