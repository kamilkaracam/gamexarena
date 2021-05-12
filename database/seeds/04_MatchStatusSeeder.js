'use strict'

/*
|--------------------------------------------------------------------------
| 04MatchStatusSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const MatchStatus = use('App/Models/MatchStatus')

class MatchStatusSeeder {
  async run() {
    const statuses = [
      {
        // Davet edildi
        name: 'Invited',
        slug: 'invited',
      },
      {
        // Davet reddedildi
        name: 'Rejected invitation',
        slug: 'rejected-invitation',
      },
      {
        // Davet kabul edildi,
        name: 'Accepted invitation',
        slug: 'accepted-invitation',
      },
      {
        // Ev sahibi, rakibi ekledi
        name: 'Added opponent',
        slug: 'added-opponent-by-home',
      },
      {
        // Deplasman, rakibi ekledi
        name: 'Added opponent',
        slug: 'added-opponent-by-away',
      },
      {
        // Ev sahibi skoru bildirdi
        name: 'Submitted score',
        slug: 'submitted-score-by-home',
      },
      {
        // Deplasman skoru bildirdi
        name: 'Submitted score',
        slug: 'submitted-score-by-away',
      }
    ]

    await MatchStatus.createMany(statuses)
  }
}

module.exports = MatchStatusSeeder
