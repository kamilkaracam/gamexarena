'use strict'

const Banner = use('App/Models/Banner')
const BannerTransformer = use('App/Transformers/BannerTransformer')
const Database = use('Database');
const Transaction = use('App/Models/Transaction')
const Uuid = use('uuid/v4');
const Drive = use('Drive');

/**
 * Resourceful controller for interacting with Faqs
 */
class BannerController {
  /**
   * Show a list of all FAQ.
   * GET FAQ
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   */
  async index ({ request, transform,response }) {
    return transform.paginate(await Banner.query().orderBy('created_at','DESC').paginate(1,50), BannerTransformer )    
  }

  /**
   * Create/save a new FAQ.
   * POST FAQ
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store ({ auth, request, response,transform }) {
    let params = request.only(['title','target_url','banner_image','banner_mobile_image','description','is_active']);  
    
    const banner = new Banner;
    banner.title = params.title;
    banner.description = params.description;
    banner.target_url = params.target_url;
    banner.is_active = 1;

    if(params.banner_image){
      const pattern = /^data:image\/(png|jpeg|jpg);base64,/;
      const banner_image = params.banner_image.replace(pattern, "");
      let ext = null;
      const fileType = params.banner_image.match(pattern);

      switch (fileType[1]) {
        case 'png':
          ext = '.png';
          break;
        case 'jpg':
        case 'jpeg':
          ext = '.jpg';
          break;
        default:
          throw new MatchBusinessValidationException('Desteklenmeyen dosya tipi', 403);
        break;
      }

      const filePath = 'banner/';
      const fullPath = filePath + Uuid() + ext;
      await Drive.put(fullPath, Buffer.from(banner_image, 'base64'));
      banner.banner_image = fullPath;
    }

    if(params.banner_mobile_image){
      const pattern = /^data:image\/(png|jpeg|jpg);base64,/;
      const banner_mobile_image = params.banner_mobile_image.replace(pattern, "");
      let ext = null;
      const fileType = params.banner_mobile_image.match(pattern);

      switch (fileType[1]) {
        case 'png':
          ext = '.png';
          break;
        case 'jpg':
        case 'jpeg':
          ext = '.jpg';
          break;
        default:
          throw new MatchBusinessValidationException('Desteklenmeyen dosya tipi', 403);
        break;
      }

      const filePath = 'banner/';
      const fullPath = filePath + Uuid() + ext;
      await Drive.put(fullPath, Buffer.from(banner_mobile_image, 'base64'));
      banner.banner_mobile_image = fullPath;
    }
    await banner.save();
      
    return transform.item(banner,BannerTransformer)
  }

  /**
   * Display a single FAQ.
   * GET fags/:id
   *
   * @param {object} ctx
   */
  async show ({ params, transform }) {
    return transform.item(await Banner.findByOrFail('id', params.id), BannerTransformer)
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
    
    //return transform.item(withdraw, BannerTransformer)
  }

  /**
   * Set status of banner
   * @param {boolean} is_active 
   */
  async set_status ({ params, request, response }) {
    const req = request.only(['is_active']);
    if(req.is_active){
      const active_banners = await Banner.query().where('is_active','=',1).fetch();
      if(active_banners.id){
        active_banners.is_active = 0;
        active_banners.save();
      }

      const current_banner = await Banner.find(params.id);
      current_banner.is_active = 1;
      current_banner.save();
    }else{
      const current_banner = await Banner.find(params.id);
      current_banner.is_active = 0;
      current_banner.save();
    }
    return response.status(202).json({});
  }

  /**
   * GET Active Banner
   */
  async get_active_banner({transform,response}){
    const banner = await Banner.query().where('is_active','=',1).first();
    if(banner.id){
      return transform.item(banner, BannerTransformer)
    }else{
      return response.status(403).json({})
    }
  }

  /**
   * Delete a banners with id.
   * DELETE banners/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
    const banner = await Banner.find(params.id)
    if(banner.banner_image){
      const image_exists = await Drive.exists(banner.banner_image)
      if(image_exists){
        await Drive.delete(banner.banner_image)
      }
    }
    
    if(banner.banner_mobile_image){
      const mobile_exists = await Drive.exists(banner.banner_mobile_image)
      if(mobile_exists){
        await Drive.delete(banner.banner_mobile_image)
      }
    }
    
    await banner.delete()

  }
}

module.exports = BannerController
