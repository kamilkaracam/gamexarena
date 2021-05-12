'use strict'

const Match = exports = module.exports = {};

const Ws = use('Ws');
const Event = use('Event');
const kue = use('Kue');

Match.created = async ({user, match}) => {
  const notification = {
    message: 'Notifications.MatchCreated',
    href: '/matches/' + match.uuid,
  };

  (await getChannel(Ws, 'notification:' + user.uuid)).broadcast('new', notification);

  await user.notifications().create(notification);
};

Match.join = async ({match}) => {
  const {home, away} = await getOpponents(match)

  const notification = await home.notifications().create({
    message: 'Notifications.OpponentJoined',
    href: '/matches/' + match.uuid,
  });

  (await getChannel(Ws, 'notification:' + home.uuid)).broadcast('new', notification)
  //(await getChannel(Ws, 'match:' + match.uuid)).broadcastToAll('join', {away: away.uuid});
  (await getChannel(Ws, 'match:' + match.uuid)).broadcastToAll('join', match);
};

Match.leave = async ({match}) => {
  const {home} = await getOpponents(match);

  const notification = await home.notifications().create({
    message: 'Notifications.OpponentLeaved',
    href: '/matches/' + match.uuid,
  });

  (await getChannel(Ws, 'notification:' + home.uuid)).broadcast('new', notification)
  (await getChannel(Ws, 'match:' + match.uuid)).broadcastToAll('leave');
};

Match.acceptedAway = async ({match}) => {
  const {away} = await getOpponents(match);

  const notification = await away.notifications().create({
    message: 'Notifications.JoinAccepted',
    href: '/matches/' + match.uuid,
  });

  (await getChannel(Ws, 'notification:' + away.uuid)).broadcast('new', notification);
  (await getChannel(Ws, 'match:' + match.uuid)).broadcastToAll('acceptedAway',match);
};

Match.rejectedAway = async ({match, away}) => {
  const notification = await away.notifications().create({
    message: 'Notifications.JoinDenied',
    href: '/matches/' + match.uuid,
  });

  (await getChannel(Ws, 'notification:' + away.uuid)).broadcast('new', notification);

  (await getChannel(Ws, 'match:' + match.uuid)).broadcastToAll('rejectedAway');
};

Match.submitScore = async ({match, type}) => {
  const {home, away} = await getOpponents(match);
  const matchChannel = (await getChannel(Ws, 'match:' + match.uuid));

  let notif;
  const opponent = (type === 'home' ? away : home);

  const scores = (await match.scores().fetch()).toJSON();
  switch (scores.length) {
    case 1:
      notif = {
        message: 'Notifications.ScoreEntered',
        href: '/matches/' + match.uuid,
      };
    break;
    case 2:
      let homeWin = null
      let awayWin = null
      if((scores[0].home > scores[0].away) || (scores[1].home > scores[1].away)){
        homeWin = true
      }
      if((scores[0].home < scores[0].away) || (scores[1].home < scores[1].away)){
        awayWin = true
      }
      if (homeWin && awayWin === null) {
        await match.scores().update({is_approved: true});
        notif = {
          message: 'Notifications.ScoreApproved',
          href: '/matches/' + match.uuid,
        };
        match.finished_at = new Date();
        await match.save();
      }else if(awayWin && homeWin === null){
        await match.scores().update({is_approved: true});
        notif = {
          message: 'Notifications.ScoreApproved',
          href: '/matches/' + match.uuid,
        };
        match.finished_at = new Date();
        await match.save();
      }else {
        notif = {
          message: 'Notifications.MatchDispute',
          href: '/matches/' + match.uuid,
        };
        matchChannel.broadcastToAll('disputed', scores);
        
        match.finished_at = new Date();
        await match.save();
      }

      if (match.tournament_id) {
        Event.fire('finished::tournament-match', {match});
      } else {
        Event.fire('finished::match', {match});
      }

      break;
  }

  if (notif) {
    const notification = await opponent.notifications().create(notif);

    (await getChannel(Ws, 'notification:' + opponent.uuid)).broadcast('new', notification);
  }
};

Match.finished = async ({match}) => {
  (await getChannel(Ws, 'match:' + match.uuid)).broadcastToAll('finished');
};

Match.cancel = async () => {
};

async function getOpponents(match) {
  return {
    home: await match.home().first(),
    away: await match.away().first(),
  }
}

async function getChannel(Ws, connect) {
  let [channel, topic] = connect.split(':');

  const wsChannel = Ws.getChannel(channel + ':*');

  return wsChannel.topic(connect);
}
