'use strict'

/*
|--------------------------------------------------------------------------
| 00TimezoneSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/
const fs = require('fs')
const Papa = use('papaparse')
const Timezone = use('App/Models/Timezone')

class TimezoneSeeder {
  async run() {
    const file = fs.readFileSync('./database/data/timezone.csv')
    const timezones = []

    await Papa.parse(file.toString(), {
      config: {
        skipEmptyLines: true,
      },
      step: (row) => {
        if (!row.data[0][0]) {
          return
        }

        timezones.push({
          country_code: row.data[0][1],
          zone: row.data[0][2],
        })
      }
    })

    await Timezone.createMany(timezones)
  }
}

module.exports = TimezoneSeeder
