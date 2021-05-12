'use strict';

const Match = use('App/Models/Match');

class ExpireMatch {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency() {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key() {
    return 'ExpireMatch-job'
  }

  // This is where the work is done.
  async handle(data) {
    console.log('ExpireMatch-job started');

    const match = Match.findByOrFail('uuid', data.match.uuid);

  }
}

module.exports = ExpireMatch;
