'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

const User = use('App/Models/User')
const Event = use('Event')
const Uuid = use('uuid/v4')

class AuthController {
  async login({request, auth,response}) {
    const {email, password} = request.all()

    let chkUser = await User.query().where('email',email).first()
    if(chkUser.verified_at == null){
      return response.status(400).json({message:'User email is not validated! <a href="/auth/verify-email/'+chkUser.uuid+'">Validate Email</a>'})
    }else if(chkUser.is_banned === 1){
      return response.status(400).json({message: 'This account is banned!'});
    }else{
      return await auth.attempt(email, password)
    }


  }

  async register({request, response}) {
    const {email, password, username, first_name, last_name, birth_date, tournament} = request.all()
    // console.log(request.all())

    const user = await User.create({
      email,
      password,
      username,
      first_name,
      last_name,
      birth_date,
      tournament,
    })

    Event.fire('new::user', user)

    return response.status(201).send({uuid: user.uuid})
  }

  async forgotPassword({request}) {
    const {email} = request.all()

    // TODO: 24 saat sınırı konacak
    const user = await User.findByOrFail('email', email)
    user.forgot_key = Uuid()
    await user.save();

    Event.fire('forgot-password::user', user)

    return {}
  }

  async passwordReset({params, request}) {
    const {password} = request.all()

    const user = await User.findByOrFail('forgot_key', params.forgotKey)
    user.password = password
    user.forgot_key = null

    await user.save()

    Event.fire('password-reset::user', user)

    return {}
  }

  async verifyEmail({params, request,response}) {
    const req = request.all()

    const user = await User.findByOrFail('uuid', req.uuid)
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date+' '+time;
    user.verified_at = dateTime
    await user.save()

    Event.fire('user::verified', user)
    return response.status(200)
      .json({success: true, uuid: req.uuid})
  }


}

module.exports = AuthController
