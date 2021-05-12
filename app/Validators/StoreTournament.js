'use strict'

class StoreTournament {
  get rules() {
    return {
      title: 'required|min:3',
      cover: '',
      platform_id: 'required|integer|exists:platforms,id',
      game_id: 'required|integer|exists:games,id',
      game_type_id: 'required|integer|exists:game_types,id',
      options: 'required|array',
      prizes: 'required|array',
      entry_fee: 'required',
      total_prize: 'required',
      currency_id: '',
      additional_info: '',
      is_active: 'required|boolean',
      started_at: 'required|date',
      last_registration_at: 'required|date',
    }
  }

  /*get formatter() {
    return formatters.JsonApi
  }*/
}

module.exports = StoreTournament
