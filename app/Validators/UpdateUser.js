'use strict'

class UpdateUser {
  get rules() {
    return {
      state: 'min:2|max:50',
      postal_code: 'min:3|max:8|alpha_numeric',
      city: 'min:2|max:50',
      country_id: 'exists:countries',
      timezone_id: 'exists:timezones',
      gender: 'in:male,female'
    }
  }
}

module.exports = UpdateUser
