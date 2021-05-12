'use strict'

const Event = use('Event')
const Helpers = use('Helpers')
const Drive = use('Drive');
const fs = use('fs')
const readFile = Helpers.promisify(fs.readFile)

/**
 * Resourceful controller for interacting with us
 */
class FileController {
  /**
   * Display image.
   * GET image/path
   */
  async show({params, response}) {
    //return await readFile('tmp/uploads/avatars/' + params.file )
    return response.download(Helpers.tmpPath('uploads/avatars/' + params.file))
    //return Drive.getStream('uploads/avatars/' + params.file)
  }

  async identity({params, response}) {
    return response.download(Helpers.tmpPath('uploads/identities/' + params.file))
  }

  async disputes({params, response}) {
    return response.download(Helpers.tmpPath('uploads/disputes/' + params.file))
  }

  async banners({params, response}) {
    return response.download(Helpers.tmpPath('banner/' + params.file))
  }
  



  

 
}

module.exports = FileController
