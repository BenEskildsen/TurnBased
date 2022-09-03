// @flow

const {
  initState,
  initGame,
  initPlayer,
  initBoard,
} = require('../state');
// const {gameReducer} = require('./gameReducer');
// const {mouseReducer} = require('./mouseReducer');
const {modalReducer} = require('./modalReducer');
const {render} = require('../render');

import type {State, Action} from '../types';

const rootReducer = (state: State, action: Action): State => {
  if (state === undefined) return initState();

  switch (action.type) {
    case 'START': {
      return {
        ...state,
        game: initGame(
          [initPlayer(0, 'HUMAN', 'You'), initPlayer(1, 'COMPUTER', 'Enemy')],
          20, 20,
        ),
        screen: 'GAME',
      }
    }
    case 'SET':
    case 'CREATE_ENTITY':
    case 'QUEUE_ACTION':
    case 'STEP_ANIMATION':
    case 'END_TURN': {
      if (!state.game) return state;
      return gameReducer(state.game, action);
    }
    case 'SET_MODAL':
    case 'DISMISS_MODAL':
      return modalReducer(state, action);

  }

};

const gameReducer = (game, action) => {
  switch (action.type) {
    case 'END_TURN': {
      // things that happen on turn end:

      game.turnNum += 1;
      game.turn = (game.turn + 1) % game.players.length;

      // things that happen on turn start:
    }
    case 'SET': {
      const {property, value} = action;
      return {
        ...game,
        [property]: value,
      };
    }
    case 'STEP_ANIMATION': {
      let nextGame = game;
      const curTime = new Date().getTime();
      for (const entityID in nextGame.entities) {
        const entity = nextGame.entities[entityID];
        if (entity.actionQueue.length == 0) continue;
        const curAnimation = entity.actionQueue[0].animation;
        if (curAnimation.tick <= 0) {
          entity.actionQueue.shift();
          if (entity.actionQueue.length > 0) {
            nextGame = doNextAction(nextGame, entity);
          }
          continue;
        }
        curAnimation.tick -= curTime - game.prevTickTime;
      }

      // handle interval
      let stopAnimating = true;
      for (const entityID in nextGame.entities) {
        const entity = nextGame.entities[entityID];
        if (entity.actionQueue.length > 0) {
          stopAnimating = false;
          break;
        }
      }
      if (stopAnimating) {
        clearInterval(nextGame.tickInterval);
        nextGame.tickInterval = null;
      }

      render(nextGame);
      game.prevTickTime = curTime;
      return nextGame;
    }
  }
  return game;
};

module.exports = {rootReducer};
