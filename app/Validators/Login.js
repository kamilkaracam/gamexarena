'use strict'

class Login {
  get rules() {
    return {
      email: 'required|email',
      password: 'required|min:6'
    }
  }
}

module.exports = Login
