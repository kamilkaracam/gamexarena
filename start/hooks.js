const {hooks} = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Validator = use('Validator')
  const ExistsRuleProvider = require('../providers/ExistsRuleProvider')
  const UniqueRuleProvider = require('../providers/UniqueRuleProvider')

  Validator.extend('exists', ExistsRuleProvider.validator)
  Validator.extend('unique', UniqueRuleProvider.validator)

  const Env = use('Env')
  const View = use('View')

  View.global('front_url', function () {
    return Env.get('APP_FRONT')
  })

})
