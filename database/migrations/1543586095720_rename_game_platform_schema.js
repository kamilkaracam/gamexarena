'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class RenameGamePlatformSchema extends Schema {
  up () {
    this.rename('game_platform', 'platform_game')
  }

  down () {
    this.rename('platform_game', 'game_platform')
  }
}

module.exports = RenameGamePlatformSchema
