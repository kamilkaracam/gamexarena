'use strict'

const Event = use('Event');

Event.on('new::user', 'User.registered');
Event.on('user::verified','User.verified')

Event.on('forgot-password::user', 'User.forgotPassword');
Event.on('change-password::user', 'User.changePassword');

Event.on('created::match', ['Match.created']);
Event.on('join::match', ['Match.join']);
Event.on('leave::match', ['Match.leave', 'Transaction.refundAway']);
Event.on('accepted-away::match', ['Match.acceptedAway']);
Event.on('rejected-away::match', ['Match.rejectedAway', 'Transaction.refundAway']);
Event.on('submit-score::match', ['Match.submitScore']);
Event.on('finished::match', ['Match.finished', 'Transaction.earn']);
Event.on('cancel::match', ['Match.cancel', 'Transaction.refundHome']);
// Komisyon eklenecek
Event.on('draw::match',['Transaction.refundHome','Transaction.refundAway'])

Event.on('created::tournament', ['Tournament.created']);
Event.on('started::tournament', ['Tournament.started']);
Event.on('finished::tournament-match', ['Tournament.matchFinished']);
