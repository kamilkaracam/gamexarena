'use strict'

/*
|--------------------------------------------------------------------------
| GameRuleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const GameType = use('App/Models/GameType')
const GameRule = use('App/Models/GameRule')

class GameRuleSeeder {
  async run() {
    const gameRules = [
      // Fortnite
      {
        name: 'Match Length',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.fortnite)).id,
        options: [
          {value: 'one', text: 'Single Game', selected: true},
          {value: 'three', text: 'Best of Three'},
          {value: 'five', text: 'Best of Five'},
          {value: 'fn-two', text: 'Two Games Total Kills'},
        ]
      },
      {
        name: 'Game Type',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.fortnite)).id,
        options: [
          {value: 'duo', text: '1v1 Duo', selected: true},
          {value: 'squads', text: '2v2 Squads'},
          {value: 'solo-playground', text: '1v1 Playground'}
        ]
      },
      // Madden 19
      {
        name: 'Team Type',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.madden19)).id,
        options: [
          {value: 'nfl', text: 'NFL Teams', selected: true},
          {value: 'mut', text: 'Ultimate Team'},
          {value: 'mut-draft', text: 'MUT Draft'},
          {value: 'salary-cap', text: 'Salary Cap'},
        ]
      },
      {
        name: 'Injuries',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.madden19)).id,
        options: [
          {value: 'on', text: 'On'},
          {value: 'off', text: 'Off', selected: true},
        ]
      },
      {
        name: 'Difficulty (Game Skill)',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.madden19)).id,
        options: [
          {value: 'all-maden', text: 'All Maden', selected: true},
          {value: 'all-pro', text: 'All Pro'},
          {value: 'pro', text: 'Pro'},
          {value: 'rookie', text: 'Rookie'},
        ]
      },
      {
        name: 'Accelerated Clock',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.madden19)).id,
        options: [
          {value: 'off', text: 'Off', selected: true},
          {value: '10', text: '10 Seconds'},
          {value: '11', text: '11 Seconds'},
          {value: '12', text: '12 Seconds'},
          {value: '13', text: '13 Seconds'},
          {value: '14', text: '14 Seconds'},
          {value: '15', text: '15 Seconds'},
          {value: '16', text: '16 Seconds'},
          {value: '17', text: '17 Seconds'},
          {value: '18', text: '18 Seconds'},
          {value: '19', text: '19 Seconds'},
          {value: '20', text: '20 Seconds'},
          {value: '25', text: '25 Seconds'},
        ]
      },
      {
        name: 'Quarter Length',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.madden19)).id,
        options: [
          {value: '1', text: '1 Minute'},
          {value: '2', text: '2 Minutes'},
          {value: '3', text: '3 Minutes'},
          {value: '4', text: '4 Minutes', selected: true},
          {value: '5', text: '5 Minutes'},
          {value: '6', text: '6 Minutes'},
          {value: '7', text: '7 Minutes'},
          {value: '8', text: '8 Minutes'},
          {value: '9', text: '9 Minutes'},
          {value: '10', text: '10 Minutes'},
          {value: '11', text: '11 Minutes'},
          {value: '12', text: '12 Minutes'},
          {value: '13', text: '13 Minutes'},
          {value: '14', text: '14 Minutes'},
          {value: '15', text: '15 Minutes'},
        ]
      },
      {
        name: 'Match Length',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.madden19)).id,
        options: [
          {value: 'one', text: 'Single Game', selected: true},
          {value: 'three', text: 'Best of Three'},
          {value: 'five', text: 'Best of Five'},
        ]
      },
      // NBA 2k18
      {
        name: 'Team Type',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.nba18)).id,
        options: [
          {value: 'any', text: 'Any Teams'},
          {value: 'nba', text: 'Current NBA Teams', selected: true},
          {value: 'nba-past', text: 'Past NBA Teams'},
          {value: 'non-nba', text: 'Non-NBA Teams'},
          {value: 'all-star', text: 'All Star Teams'},
          {value: 'team-up', text: 'Team Up'},
          {value: 'my-team', text: 'MyTEAM'},
          {value: 'my-park', text: 'MyPARK'},
          {value: 'random', text: 'Random Teams'},
        ]
      },
      {
        name: 'Difficulty',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.nba18)).id,
        options: [
          {value: 'hall-of-fame', text: 'Hall Of Fame', selected: true},
          {value: 'superstar', text: 'Superstart'},
          {value: 'all-star', text: 'All Star'},
          {value: 'pro', text: 'Pro'},
          {value: 'rookie', text: 'Rookie'},
        ]
      },
      {
        name: 'Quarter Length',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.nba18)).id,
        options: [
          {value: '1', text: '1 Minute'},
          {value: '2', text: '2 Minutes'},
          {value: '3', text: '3 Minutes'},
          {value: '4', text: '4 Minutes'},
          {value: '5', text: '5 Minutes', selected: true},
          {value: '6', text: '6 Minutes'},
          {value: '7', text: '7 Minutes'},
          {value: '8', text: '8 Minutes'},
          {value: '9', text: '9 Minutes'},
          {value: '10', text: '10 Minutes'},
          {value: '11', text: '11 Minutes'},
          {value: '12', text: '12 Minutes'},
        ]
      },
      {
        name: 'Game Type',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.nba18)).id,
        options: [
          {value: '1v1', text: '1v1', selected: true}
        ]
      },
      {
        name: 'Match Length',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.nba18)).id,
        options: [
          {value: 'one', text: 'Single Game', selected: true},
          {value: 'three', text: 'Best of Three'},
          {value: 'five', text: 'Best of Five'},
        ]
      },
      // Pubg
      {
        name: 'Match Length',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.pubg)).id,
        options: [
          {value: 'one', text: 'Single Game', selected: true},
          {value: 'three', text: 'Best of Three'},
          {value: 'five', text: 'Best of Five'},
        ]
      },
      {
        name: 'Game Type',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.pubg)).id,
        options: [
          {value: 'duo', text: '1v1 Duo', selected: true},
          {value: 'squads', text: '2v2 Squads'},
        ]
      },
      {
        name: 'Game Perspective',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.pubg)).id,
        options: [
          {value: 'fpp', text: 'First Person (FPP)', selected: true},
          {value: 'tpp', text: 'Third Person (TPP)'}
        ]
      },
      {
        name: 'Game Map',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.pubg)).id,
        options: [
          {value: 'erangel-miramar', text: 'Erangel+Miramar', selected: true},
          {value: 'sanhok', text: 'Sanhok'},
          {value: 'both', text: 'Both'},
        ]
      },
      // Fifa 19
      {
        name: 'Star Level',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.fifa19)).id,
        options: [
          {value: 'any', text: 'Any Star Level', selected: true},
          {value: '4.5', text: '4 1/2 Stars and Below'},
          {value: '4', text: '4 Stars and Below'},
          {value: '3.5', text: '3 1/2 Stars and Below'},
          {value: '3', text: '3 Stars and Below'},
        ]
      },
      {
        name: 'Team Type',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.fifa19)).id,
        options: [
          {value: 'any', text: 'Any Teams', selected: true},
          {value: 'international', text: 'International Teams Only'},
          {value: 'club', text: 'Club Teams Only'},
          {value: 'fut', text: 'Ultimate Team Only'},
          {value: 'epl', text: 'EPL Only'},
          {value: 'la-liga', text: 'La Liga Only'},
          {value: 'bundesliga', text: 'Bundesliga Only'},
          {value: 'liga-mx', text: 'Liga MX Only'},
          {value: 'mls', text: 'MLS Only'},
          {value: 'women', text: 'Women\'s Teams Only'},
        ]
      },
      {
        name: 'Half Length',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.fifa19)).id,
        options: [
          {value: '4', text: '4 Minutes', selected: true},
          {value: '5', text: '5 Minutes'},
          {value: '6', text: '6 Minutes'},
          {value: '7', text: '7 Minutes'},
          {value: '8', text: '8 Minutes'},
        ]
      },
      {
        name: 'Legacy Defending',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.fifa19)).id,
        options: [
          {value: 'no', text: 'Not Allowed', selected: true},
          {value: 'yes', text: 'Allowed'},
        ]
      },
      {
        name: 'Match Length',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.fifa19)).id,
        options: [
          {value: 'one', text: 'Single Game', selected: true},
          {value: 'three', text: 'Best of Three'},
          {value: 'five', text: 'Best of Five'},
        ]
      },
      // COD Blackout
      {
        name: 'Team Size',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codBlackout)).id,
        options: [
          {value: '1v1', text: '1v1', selected: true},
          {value: '2v2', text: '2v2'},
        ]
      },
      {
        name: 'Match Length',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codBlackout)).id,
        options: [
          {value: 'one', text: 'Single Game', selected: true},
          {value: 'three', text: 'Best of Three'},
          {value: 'five', text: 'Best of Five'},
        ]
      },
      {
        name: 'Ruleset',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codBlackout)).id,
        options: [
          {value: 'most-kills', text: 'Most Kills', selected: true},
          {value: 'survival', text: 'Survival'},
        ]
      },
      // COD Competitive
      {
        name: 'Team Size',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codCompetitive)).id,
        options: [
          {value: '1v1', text: '1v1', selected: true},
          {value: '2v2', text: '2v2'},
          {value: '3v3', text: '3v3'},
          {value: '4v4', text: '4v4'},
          {value: '5v5', text: '5v5'},
        ]
      },
      {
        name: 'Match Length',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codCompetitive)).id,
        options: [
          {value: 'one', text: 'Single Game', selected: true},
          {value: 'three', text: 'Best of Three'},
          {value: 'five', text: 'Best of Five'},
        ]
      },
      {
        name: 'Ruleset',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codCompetitive)).id,
        options: [
          {value: 'pl-ruleset', text: 'PL Ruleset', selected: true},
          {value: 'cwl-ruleset', text: 'CWL Ruleset'},
        ]
      },
      {
        name: 'Game Mode',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codCompetitive)).id,
        options: [
          {value: 'search-and-destroy', text: 'Search and Destroy', selected: true},
          {value: 'control', text: 'Control'},
          {value: 'hardpoint', text: 'Hardpoint'},
          {value: 'all-modes', text: 'All Modes'},
        ]
      },
      {
        name: 'Map',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codCompetitive)).id,
        options: [
          {value: 'random', text: 'Random', selected: true},
        ]
      },
      // COD Zombies
      {
        name: 'Team Size',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codZombies)).id,
        options: [
          {value: '1v1', text: '1v1', selected: true},
          {value: '2v2', text: '2v2'},
        ]
      },
      {
        name: 'Match Length',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codZombies)).id,
        options: [
          {value: 'one', text: 'Single Game', selected: true},
          {value: 'three', text: 'Best of Three'},
          {value: 'five', text: 'Best of Five'},
        ]
      },
      {
        name: 'Ruleset',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codZombies)).id,
        options: [
          {value: 'high-score', text: 'High Score', selected: true},
        ]
      },
      {
        name: 'Game Mode',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codZombies)).id,
        options: [
          {value: 'rush', text: 'Rush', selected: true},
        ]
      },
      // COD Most Kills
      {
        name: 'Team Size',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codMostKills)).id,
        options: [
          {value: '1v1', text: '1v1', selected: true},
          {value: '2v2', text: '2v2'},
        ]
      },
      {
        name: 'Match Length',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codMostKills)).id,
        options: [
          {value: 'one', text: 'Single Game', selected: true},
          {value: 'three', text: 'Best of Three'},
          {value: 'five', text: 'Best of Five'},
        ]
      },
      {
        name: 'Game Mode',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codMostKills)).id,
        options: [
          {value: 'team-deathmatch', text: 'Team Deathmatch', selected: true},
          {value: 'domination', text: 'Domination'},
          {value: 'hard-point', text: 'Hard Point'},
          {value: 'random', text: 'Random'},
        ]
      },
      {
        name: 'Map',
        description: '',
        type: 'select',
        attributes: '{}',
        game_type_id: (await GameType.findBy('text', GameType.codCompetitive)).id,
        options: [
          {value: 'random', text: 'Random', selected: true},
        ]
      },
    ]

    let optionCount = 0

    gameRules.forEach(async (rule) => {
      let options = rule.options
      delete rule.options

      let gameRule = await GameRule.create(rule)
      await gameRule.options().createMany(options)
      optionCount += optionCount.length
    })

    console.log('Rules count' + gameRules.length)
    console.log('Option count' + optionCount)

    return true
  }
}

module.exports = GameRuleSeeder
