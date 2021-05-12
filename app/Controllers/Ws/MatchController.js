'use strict';

const _ = use('lodash');
const Match = use('App/Models/Match');
const matches = {};
const drawRequests = {};

class MatchController {
  constructor({socket, request, auth}) {
    this.socket = socket;
    this.request = request;
    this.auth = auth;
  }

  onAddedOpponent(data) {
    _.merge(matches, {
      [data.match.uuid]: {
        'added': {[data.type]: true}
      }
    });

    this.socket.broadcast('addedOpponent', matches[data.match.uuid].added);
  }

  onJoin(data){
    _.merge(matches, {
      [data.match.uuid]: {
        'join': {[data.type]: true}
      }
    });

    this.socket.broadcast('join', matches[data.match.uuid].joined);
  }

  async onJoinedOpponent(data) {
    _.merge(matches, {
      [data.match.uuid]: {
        'joined': {[data.type]: true}
      }

    });

    // İki tarafta katılımı onaylamışsa maç başlatılır
    if (_.has(matches[data.match.uuid].joined, 'home') && _.has(matches[data.match.uuid].joined, 'away')) {
      await Match.query().where('uuid', data.match.uuid)
        .update({started_at: new Date()});

      this.socket.broadcastToAll('startedMatch', {});
      return;
    }

    this.socket.broadcast('joinedOpponent', matches[data.match.uuid].joined);
  }


  async onStore(data){
    this.socket.broadcastToAll('storeMatch',matches);
    return;
  }

  async onDrawMatchRequest(data){
    _.merge(drawRequests, {
      [data.match_id]:{
        'drawRequest':{[data.user_id]:true}
      }
    })
    this.socket.broadcast('drawMatchRequest',drawRequests[data.match_id].drawRequest)
    return
  }

  async onAcceptDraw(data){
    if(_.has(drawRequests[data.match_id].drawRequest, data.request_id)){
      this.socket.broadcast('drawMatchAccepted',drawRequests[data.match_id].drawRequest)
    }
    return
  }

}

module.exports = MatchController;
