'use strict';

const Database = use('Database');

class SoftDelete {
  register(Model, customOptions = {}) {
    const defaultOptions = {};
    const options = Object.assign(defaultOptions, customOptions);

    Model.addGlobalScope(
      query => {
        query.whereNull(`${Model.table}.deleted_at`)
      },
      'soft_deletes'
    );

    /*Model.scopeWithTrashed = function (query) {
      return query.ignoreScopes(['soft_deletes'])
    }

    Model.withTrashed = function () {
      return this.query().withTrashed()
    }

    Model.scopeOnlyTrashed = function (query) {
      return query.ignoreScopes(['soft_deletes'])
        .whereNotNull('deleted_at')
    }

    Model.onlyTrashed = function () {
      return this.query().onlyTrashed()
    }*/

    Model.queryMacro('withTrashed', (value) => {
      this.ignoreScopes(['soft_deletes']);
      return this;
    });

    Model.prototype.delete = async function ({ force = false } = {}) {
      await this.constructor.$hooks.before.exec('delete', this)

      const now = new Date()
      const query = Database.table(this.constructor.table)
        .where(this.constructor.primaryKey, this.primaryKeyValue)

      const updatePromise = force
        ? query.delete()
        : query.update({ deleted_at: now })

      const affected = await updatePromise

      if (affected > 0) {
        // this attribute will be marked as `dirty`
        this.set('deleted_at', force ? null : now)
        this.freeze()
      }

      await this.constructor.$hooks.after.exec('delete', this)

      return !!affected
    }

    Model.prototype.restore = async function (trx) {
      await this.constructor.$hooks.before.exec('restore', this)

      const affected = await Database.table(this.constructor.table)
        .transacting(trx)
        .where(this.constructor.primaryKey, this.primaryKeyValue)
        .update({deleted_at: null})

      if (affected > 0) {
        this.$frozen = false

        // this attribute will be marked as `dirty`
        this.set('deleted_at', null)
      }

      await this.constructor.$hooks.after.exec('restore', this)

      return !!affected
    }
  }
}

module.exports = SoftDelete;
