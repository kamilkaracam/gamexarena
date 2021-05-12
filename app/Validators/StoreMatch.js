'use strict'

class StoreMatch {
  get rules() {
    return {
      platform_id: 'required|integer|exists:platforms,id',
      game_id: 'required|integer|exists:games,id',
      game_type_id: 'required|integer|exists:game_types,id',
      'options.*': 'required|integer|exists:game_rule_options,id'
    }
  }
}

module.exports = StoreMatch
