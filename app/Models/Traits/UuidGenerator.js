'use strict'

const Uuid = use('uuid/v4')

class UuidGenerator {
  register (Model, customOptions = {}) {
    const defaultOptions = {}
    const options = Object.assign(defaultOptions, customOptions)

    Model.addHook('beforeCreate', async function (modelInstance) {
      modelInstance.uuid = await Uuid()
    })
  }
}

module.exports = UuidGenerator
