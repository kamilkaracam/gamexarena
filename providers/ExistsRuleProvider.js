'use strict'

const Database = use('Database')

class ExistsRuleProvider {
  static async validator(data, field, message, args, get) {
    const value = get(data, field)
    if (!value) {
      /**
       * skip validation if value is not defined. `required` rule
       * should take care of it.
       */
      return
    }

    const [table, column] = args
    const row = await Database.table(table).where(column || 'id', value).first()

    if (!row) {
      throw message
    }
  }
}

module.exports = ExistsRuleProvider
