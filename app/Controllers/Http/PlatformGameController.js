'use strict'

const PlatformGame = use('App/Models/PlatformGame')
const UserPlatformGame = use('App/Models/UserPlatformGame')

class PlatformGameController {
  async store({auth, request, response}) {
    const params = request.only(['games'])
    let paramsArr = params.games

    if(paramsArr.length >= 1){
      const userPlatformGame = UserPlatformGame.query().where('platform_game_id',5).first()
      if(userPlatformGame.length > 0){
        await userPlatformGame.delete()
      }
    }

    let platformGameIds = []
    for(const i in paramsArr){
      let ids = paramsArr[i].split('|')
      const platform_id = parseInt(ids[0]) + 1
      const platformGame = await PlatformGame.query().where('game_id',ids[1]).where('platform_id',ids[0]).first()
      platformGameIds.push(platformGame.id)
    }
    await auth.user.platformGames().sync(platformGameIds)
    
    return response.status(201).json({message:'Game settings saved!'})
  
  }

  async destroy({auth, request, response}) {

  }
}

module.exports = PlatformGameController