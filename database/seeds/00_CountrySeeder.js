'use strict'

/*
|--------------------------------------------------------------------------
| CountrySeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const fs = require('fs')
const Papa = use('papaparse')
const Country = use('App/Models/Country')

class CountrySeeder {
  async run() {
    const file = fs.readFileSync('./database/data/country.csv')
    const countries = []

    await Papa.parse(file.toString(), {
      step: (row) => {
        countries.push({
          code: row.data[0][0],
          name: row.data[0][1],
        })
      }
    })

    await Country.createMany(countries)
  }
}

module.exports = CountrySeeder
