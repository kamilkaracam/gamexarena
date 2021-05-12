'use strict'

/*
|--------------------------------------------------------------------------
| MatchUserRoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const MatchUserRole = use('App/Models/MatchUserRole')

class MatchUserRoleSeeder {
  async run() {
    const roles = [
      {
        name: 'Creator',
        slug: 'creator',
      },
      {
        name: 'Home',
        slug: 'home',
      },
      {
        name: 'Away',
        slug: 'away',
      }
    ]

    await MatchUserRole.createMany(roles)
  }
}

module.exports = MatchUserRoleSeeder
