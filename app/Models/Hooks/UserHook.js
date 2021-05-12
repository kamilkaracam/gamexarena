'use strict'

/** @type {import('@adonisjs/framework/src/Hash')} */
const Hash = use('Hash')
const Uuid = use('uuid/v4')

const UserHook = exports = module.exports = {}

/**
 * Generate uuid
 * @param user
 * @returns {Promise<void>}
 */
UserHook.generateUuid = async (user) => {
  user.uuid = await Uuid()
}

/**
 * Hash password
 * @param user
 * @returns {Promise<void>}
 */
UserHook.hashPassword = async (user) => {
  if (user.dirty.password) {
    user.password = await Hash.make(user.password)
  }
}
