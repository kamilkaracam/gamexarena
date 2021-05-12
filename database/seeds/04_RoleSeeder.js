'use strict'

/*
|--------------------------------------------------------------------------
| RoleSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Role = use('Role');
const User = use('App/Models/User');

class RoleSeeder {
  async run() {
    await Role.createMany([
      {name: 'Admin', slug: 'admin', description: 'manage administration privileges'},
    ]);

    const user = await User.find(1);
    const admin = await Role.findByOrFail('slug', 'admin');

    await user.roles().attach([admin.id])
  }
}

module.exports = RoleSeeder
