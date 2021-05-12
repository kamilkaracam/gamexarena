'use strict'

class ForgotPassword {
  get rules() {
    return {
      email: 'required|email|exists:users,email'
    }
  }
}

module.exports = ForgotPassword
