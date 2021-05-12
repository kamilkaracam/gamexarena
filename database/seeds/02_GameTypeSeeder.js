'use strict'

/*
|--------------------------------------------------------------------------
| GameTypeSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Game = use('App/Models/Game')
const GameType = use('App/Models/GameType')

class GameTypeSeeder {
  async run() {
    const gameTypes = [
      {
        game_id: (await Game.findBy('slug', 'cod-black-ops')).id,
        text: GameType.codBlackout,
        description: 'Join a Blackout match with your opponent(s). Compete to see who can survive the longest or score the most kills!'
      },
      {
        game_id: (await Game.findBy('slug', 'cod-black-ops')).id,
        text: GameType.codCompetitive,
        description: 'Competitive COD, like the pros play. You and your team compete against the opposing team in a private match. Certain items, game modes and specialists are restricted.'
      },
      {
        game_id: (await Game.findBy('slug', 'cod-black-ops')).id,
        text: GameType.codZombies,
        description: 'You and your opponent(s) join a game of Zombies. Kill the undead. The team or player with the high score at the end of the game wins!'
      },
      {
        game_id: (await Game.findBy('slug', 'cod-black-ops')).id,
        text: GameType.codMostKills,
        description: 'Join a public game with your opponent(s) and compete to see who can score the most kills. Pick a game mode that you want to compete in!'
      },
      {
        game_id: (await Game.findBy('slug', 'fortnite')).id,
        text: GameType.fortnite,
        description: ''
      },
      {
        game_id: (await Game.findBy('slug', 'madden-19')).id,
        text: GameType.madden19,
        description: ''
      },
      {
        game_id: (await Game.findBy('slug', 'nba-2k18')).id,
        text: GameType.nba18,
        description: ''
      },
      {
        game_id: (await Game.findBy('slug', 'pubg')).id,
        text: GameType.pubg,
        description: ''
      },
      {
        game_id: (await Game.findBy('slug', 'fifa-19')).id,
        text: GameType.fifa19,
        description: ''
      },
    ]

    await GameType.createMany(gameTypes)
  }
}

module.exports = GameTypeSeeder
