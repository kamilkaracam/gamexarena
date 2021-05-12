'use strict'

class StorePlatformUsername {
  get rules() {
    return {
      'items.*.platform_id': 'required|integer',
      'items.*.username': 'required|string',
    }
  }
}

module.exports = StorePlatformUsername
