'use strict'

/*
|--------------------------------------------------------------------------
| PlatformSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Platform = use('App/Models/Platform')

class PlatformSeeder {
  async run () {
    const platforms = [
      {name: 'Xbox One', slug: 'xbox-one'},
      {name: 'Playstation 4', slug: 'playstation-4'},
      {name: 'PC', slug: 'pc'},
    ]

    await Platform.createMany(platforms)
  }
}

module.exports = PlatformSeeder
