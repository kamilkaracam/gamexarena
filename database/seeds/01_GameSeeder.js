'use strict'

/*
|--------------------------------------------------------------------------
| GameSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Game = use('App/Models/Game')

class GameSeeder {
  async run() {
    const games = [
      {name: 'Call of Duty', slug: 'cod-black-ops'},
      {name: 'Fortnite', slug: 'fortnite'},
      {name: 'Madden NFL 19', slug: 'madden-19'},
      {name: 'NBA 2K18', slug: 'nba-2k18'},
      {name: 'PUBG', slug: 'pubg'},
      {name: 'FIFA 19', slug: 'fifa-19'}
    ]

    await Game.createMany(games)
  }
}

module.exports = GameSeeder
