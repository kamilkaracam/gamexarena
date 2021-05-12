'use strict'

class ChangePassword {
  get rules () {
    return {
      new_password: 'required|min:6',
      repeat_password: 'required|same:new_password',
    }
  }
}

module.exports = ChangePassword
