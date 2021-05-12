'use strict'

/*
|--------------------------------------------------------------------------
| 04UserSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const User = use('App/Models/User')

class UserSeeder {
  async run() {
    await User.createMany([
      {
        email: 'onur@puxo.com.tr',
        password: '123456',
        username: 'onur',
        first_name: 'Onur',
        last_name: 'Şimşek',
        birth_date: '1985-01-15'
      },
      {
        email: 'kamil@puxo.com.tr',
        password: '123456',
        username: 'kamil',
        first_name: 'Kamil',
        last_name: 'Karaçam',
        birth_date: '1990-01-01'
      }
    ])

    await Factory.model('App/Models/User').createMany(5)
  }
}

module.exports = UserSeeder
