'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker) => {
  return {
    email: faker.email(),
    password: faker.password(6),
    username: faker.username(),
    first_name: faker.first(),
    last_name: faker.last(),
    birth_date: faker.birthday()
  }
})

Factory.blueprint('App/Models/TransactionDescription', (faker) => {
  return {
    text: faker.sentence()
  }
})
