'use strict';

const Tournament = exports = module.exports = {};

const Ws = use('Ws');
const kue = use('Kue');

Tournament.created = async ({tournament}) => {
  const Job = use('App/Jobs/StartTournament');

  await tournament.competitors().attach([
    // 1, 2, 3, 4,
    6, 7, 8, 9,
    // 10, 11, 12, 13,
  ]);

  let runningTime = new Date(tournament.created_at);
  runningTime.setMinutes(runningTime.getMinutes() + 1);

  // Çalışma anında bilgiler güncellenmiş olabileceği için sadece uuid gönderiliyor
  const job = kue.dispatch(Job.key, {uuid: tournament.uuid})
  // .delay(new Date(tournament.started_at));

  console.log(Job.key + ' added');
};

Tournament.matchFinished = async ({match}) => {
  console.log('========== Finished tournament match ==========');
  const {home, away} = await getOpponents(match);
  (await getChannel(Ws, 'match:' + match.uuid)).broadcastToAll('finished');

  const approvedScore = await match.scores().where('is_approved', true).first();
  if (!approvedScore) {
    return;
  }

  let loser = null;
  if (approvedScore.home > approvedScore.away) {
    loser = away;
  } else if (approvedScore.home < approvedScore.away) {
    loser = home;
  } else {
    return;
  }

  const tournament = await match.tournament().fetch();
  const lastRank = await tournament.competitors().getMin('pivot_rank');

  await tournament.competitors()
    .pivotQuery()
    .where('user_id', loser.id)
    .update({
      rank: lastRank ? lastRank - 1 : await tournament.competitors().getCount(),
    })
};

Tournament.started = async ({tournament}) => {

};

async function getOpponents(match) {
  return {
    home: await match.home().first(),
    away: await match.away().first(),
  }
}

async function getChannel(ws, connect) {
  let [channel, topic] = connect.split(':');

  const wsChannel = ws.getChannel(channel + ':*');

  return wsChannel.topic(connect);
}
