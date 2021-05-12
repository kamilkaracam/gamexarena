'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
const Env = use('Env')


Route.get('/', () => {
  return {greeting: 'Hello world'}
})

Route.group(() => {

  Route.get('status', () => {
    return {status: 'ok'}
  })

  Route.post('auth/login', 'AuthController.login').validator('Login')
  Route.post('auth/register', 'AuthController.register').validator('Register')
  Route.post('auth/forgot-password', 'AuthController.forgotPassword').validator('ForgotPassword')
  Route.post('auth/password-reset/:forgotKey', 'AuthController.passwordReset')
  Route.post('auth/verify-email', 'AuthController.verifyEmail')

  Route.resource('faqs', 'FaqController').only(['index', 'show','store','update'])
  Route.get('faqs/lang/:lang','FaqController.lang')

  Route.resource('pages', 'PageController').only(['index', 'show','store','update'])
  //Route.get('faqs/lang/:lang','FaqController.lang')
  Route.get('pages/slug/:slug','PageController.slug')



  Route.post('auth/admin-login', 'AuthController.login')

}).prefix('v1').middleware(['guest'])

Route.group(() => {

  Route.resource('countries', 'CountryController').only(['index', 'show'])
  Route.resource('timezones', 'TimezoneController').only(['index', 'show'])

  Route.resource('platforms', 'PlatformController').only(['index', 'show'])
  Route.resource('games', 'GameController').only(['index', 'show'])

  Route.get('social-platforms', 'PlatformController.socials')

  Route.resource('users', 'UserController').middleware(['auth']).only(['index','update'])
  Route.get('users/:id','UserController.show').as('user.show');

  Route.put('users/:uuid/banuser', 'UserController.banuser').middleware(['auth']).as('user.ban')
  Route.put('users/:uuid/unbanuser', 'UserController.unbanuser').middleware(['auth']).as('user.unbanuser')
  Route.put('users/:uuid/penalty', 'UserController.penaltyuser').middleware(['auth']).as('user.penalty')
  Route.put('users/:uuid/add_balance','UserController.add_balance').middleware(['auth']).as('user.add_balance')
  Route.put('users/:uuid/add_bonus_balance','UserController.add_bonus_balance').middleware(['auth']).as('user.add_bonus_balance')

  Route.get('users/identity/:id','UserController.identity').middleware(['auth']).as('user.identity')
  Route.get('users/:id/transactions','UserController.transactions').middleware(['auth']).as('user.transactions')
  Route.get('users/:id/detail','UserController.show_by_id').middleware(['auth']).as('user.showbyid')

  Route.resource('banners', 'BannerController').middleware(['auth']).only(['index','show','store','update','destroy']);
  Route.put('banners/:id/set-status', 'BannerController.set_status').middleware(['auth']);
  Route.get('banner/get-active-banner', 'BannerController.get_active_banner').as('banners.active_banner');

  Route.resource('settings', 'SettingController').middleware(['auth']).only(['index','updateCommission','show'])
  Route.post('settings/updateCommission', 'SettingController.updateCommission').middleware(['auth']).as('settings.updatecommission')
  Route.post('settings/updatePaypal', 'SettingController.updatePaypal').middleware(['auth']).as('settings.updatepaypal')

  
  
  Route.resource('withdraw', 'WithdrawController').middleware(['auth']).only(['index','show','store'])
  Route.post('withdraw/approve', 'WithdrawController.approve').middleware(['auth'])
  Route.post('withdraw/deny', 'WithdrawController.deny').middleware(['auth'])
  Route.get('withdraw/approve/list', 'WithdrawController.approved_list').middleware(['auth'])
  Route.get('withdraw/denied/list', 'WithdrawController.deny_list').middleware(['auth'])


  /**
   * Me
   */
  Route.get('me', 'MeController.show').middleware(['auth'])
  Route.put('me', 'MeController.update').as('me.update')
    .middleware(['auth'])
    .validator('UpdateUser')

  Route.patch('me/change-password', 'MeController.changePassword').as('me.change-password')
    .middleware(['auth'])
    .validator('ChangePassword')

    Route.post('me/change-avatar', 'MeController.changeAvatar').as('me.change-avatar')
    .middleware(['auth'])

  Route.post('me/identity', 'MeController.identity').as('me.identity').middleware(['auth'])

  Route.resource('me/platform-games', 'PlatformGameController')
    .only(['store', 'destroy'])
    .middleware(['auth'])
    .validator(new Map([
      //[['me/platform-games.store'], ['StorePlatformGame']],
    ]))

  Route.resource('me/platform-usernames', 'PlatformUsernameController')
    .only(['index', 'store'])
    .middleware(['auth'])
    .validator(new Map([
      [['me/platform-usernames.store'], ['StorePlatformUsername']],
    ]))
  Route.patch('me/platform-usernames-changename', 'PlatformUsernameController.changename').middleware(['auth'])
  
  Route.resource('me/transactions', 'TransactionController')
    .only(['index'])
    .middleware(['auth']);

  Route.resource('me/notifications', 'NotificationController')
    .only(['index', 'update'])
    .middleware(['auth'])

  /**
   * Payments
   */
  Route.resource('payments', 'PaymentController').only(['store'])
    .middleware(['auth'])


  /**
   * Matches
   */
  // Bir maça katıl
  Route.post('matches/:uuid/join', 'MatchController.join').as('matches.join')
    .middleware(['auth']);
  // Maçtan ayrıl
  Route.delete('matches/:uuid/leave', 'MatchController.leave').as('matches.leave')
    .middleware(['auth']);
  // Rakibi kabul et
  Route.patch('matches/:uuid/accept-away', 'MatchController.acceptAway').as('matches.accept-away')
    .middleware(['auth']);
  // Rakibi reddet
  Route.delete('matches/:uuid/reject-away', 'MatchController.rejectAway').as('matches.reject-away')
    .middleware(['auth']);
  // Maçı başlat
  Route.patch('matches/:uuid/start', 'MatchController.start').as('matches.start')
    .middleware(['auth']);
  // Maç sonucu bildir
  Route.resource('matches/:uuid/scores', 'MatchScoreController')
    .only(['store'])
    .middleware(['auth']);
  Route.resource('matches/:uuid/disputes', 'MatchDisputeController')
    .only(['index', 'store'])
    .middleware(['auth']);
  Route.resource('matches', 'MatchController')
    .only(['index', 'show']);
  Route.resource('matches', 'MatchController')
    .only(['store', 'update', 'destroy'])
    .middleware(['auth'])
    .validator(new Map([
      [['matches.store'], ['StoreMatch']]
    ]));
  Route.get('match/disputes','MatchController.disputes').middleware(['auth'])
  Route.get('match/:uuid/checkdispute','MatchController.checkdispute').middleware(['auth'])
  Route.post('match/dispute/approve','MatchController.dispute_approve').middleware(['auth'])

  Route.put('matches/:uuid/setwinner', 'MatchController.setwinner').as('matches.setwinner').middleware(['auth'])
  Route.put('matches/:uuid/checkscore', 'MatchController.check_user_match_score').as('matches.checkscore').middleware(['auth'])


  Route.post('match-draw','MatchController.drawRequest').middleware(['auth']).as('match.drawRequest')
  
  Route.get('leadersTable','UserController.leadersTable').middleware(['auth']).as('user.leaders')

  


  /**
   * Tournaments
   */
  Route.get('tournaments/:uuid/competitors', 'TournamentCompetitorController.index');
  Route.post('tournaments/:uuid/competitors', 'TournamentCompetitorController.store').middleware(['auth']);
  Route.delete('tournaments/:uuid/competitors', 'TournamentCompetitorController.destroy').middleware(['auth']);

  Route.resource('tournaments/:uuid/matches', 'TournamentMatchController')
    .only(['index']);

  Route.post('tournaments', 'TournamentController.store').as('tournaments.create')
    .middleware(['auth', 'is:(admin)'])
    // .validator('StoreTournament');
  Route.resource('tournaments', 'TournamentController').only(['index', 'show', 'destroy']);

/**
 * Image files
 */
Route.get('avatars/:file', 'FileController.show')
Route.get('identities/:file','FileController.identity')
Route.get('disputes/:file','FileController.disputes')
Route.get('banner/:file','FileController.banners')

  /**
   * Chats
   */
  Route.resource(':type/:id/chats', 'ChatController').only(['index', 'destroy']);

}).prefix('v1')
