'use strict'

const User = exports = module.exports = {}
const Mail = use('Mail')

User.registered = async (user) => {
  await Mail.send('emails.auth.verify', {user: user.toJSON()}, message => {
    message.to(user.email).from('info@gamexarena.com', 'GamexArena').subject('GamexArena registration')
  })
}

User.verified = async (user) => {
  await Mail.send('emails.auth.welcome', {user: user.toJSON()}, message => {
    message.to(user.email).from('info@gamexarena.com', 'GamexArena').subject('GamexArena registration')
  })
}

User.forgotPassword = async (user) => {
  await Mail.send('emails.auth.forgot-password', {user: user.toJSON()}, message => {
    message.to(user.email).from('info@gamexarena.com', 'GamexArena').subject('GamexArena Forgot Password')
  })
}

User.changePassword = async (user) => {
  await Mail.send('emails.users.change-password', {user: user.toJSON()}, message => {
    message.to(user.email).from('info@gamexarena.com', 'GamexArena').subject('GamexArena Change Password')
  })
}
