'use strict'

class Register {
  get rules() {
    return {
      first_name: 'required|min:2|max:20',
      last_name: 'required|min:2|max:20',
      email: 'required|email|unique:users,email',
      username: 'required|min:3|max:20|unique:users,username',
      password: 'required|min:6',
      birth_date: 'required|date',
      tournament: 'string',
    }
  }
}

module.exports = Register
