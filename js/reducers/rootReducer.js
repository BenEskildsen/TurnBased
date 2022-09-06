// @flow

const {
  initState,
  initGame,
  initPlayer,
  initBoard,
} = require('../state');
// const {gameReducer} = require('./gameReducer');
const {mouseReducer} = require('./mouseReducer');
const {addEntity} = require('../simulation/entityOperations');
const {modalReducer} = require('./modalReducer');
const {render} = require('../render');
const {Entities} = require('../entities/registry');

import type {State, Action} from '../types';

const rootReducer = (state: State, action: Action): State => {
  if (state === undefined) return initState();

  switch (action.type) {
    case 'START': {
      const nextState = {
        ...state,
        game: initGame(
          [initPlayer(0, 'HUMAN', 'You'), initPlayer(1, 'COMPUTER', 'Enemy')],
          20, 20,
        ),
        screen: action.screen ? action.screen : 'GAME',
      }
      render(nextState.game);
      return nextState;
    }
    case 'SET_SPRITE_SHEET':
      state.sprites[action.name] = action.img;
    case 'SET':
    case 'CREATE_ENTITY':
    case 'QUEUE_ACTION':
    case 'STEP_ANIMATION':
    case 'END_TURN': {
      if (!state.game) return state;
      const nextGame = gameReducer(state.game, action);
      render(nextGame);
      return {
        ...state,
        game: nextGame,
      };
    }
    case 'SET_MOUSE_POS':
    case 'SET_MOUSE_DOWN': {
      if (!state.game) return state;
      return {
        ...state,
        game: {
          ...state.game,
          mouse: mouseReducer(state.game.mouse, action),
        }
      }
    }
    case 'SET_MODAL':
    case 'DISMISS_MODAL':
      return modalReducer(state, action);

  }

  return state;
};

const gameReducer = (game, action) => {
  switch (action.type) {
    case 'END_TURN': {
      // things that happen on turn end:

      game.turnNum += 1;
      game.turn = (game.turn + 1) % game.players.length;

      // things that happen on turn start:
      return game;
    }
    case 'SET': {
      const {property, value} = action;
      return {
        ...game,
        [property]: value,
      };
    }
    case 'CREATE_ENTITY': {
      const {entityType, args} = action;
      const {make} = Entities[entityType];
      const entity = make(...args);
      addEntity(game, entity);
      return game;
    }
    case 'SET_SPRITE_SHEET': {
      const {name, img} = action;
      game.sprites[name] = img;
      return game;
    }
    case 'QUEUE_ACTION': {
      const {entityID} =  action;
      let nextGame = game;
      const entity = game.entities[entityID];

      const startCurrent = entity.actions.length == 0;
      entity.actions.push(action.action);
      if (startCurrent) {
        nextGame = doNextAction(game, entity);
      }
      return nextGame;
    }
    case 'STEP_ANIMATION': {
      let nextGame = game;
      const curTime = new Date().getTime();
      for (const entityID in nextGame.entities) {
        const entity = nextGame.entities[entityID];
        if (entity.actions.length == 0) continue;
        const curAnimation = entity.actions[0].animation;
        if (curAnimation.tick <= 0) {
          entity.actions.shift();
          if (entity.actions.length > 0) {
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
        if (entity.actions.length > 0) {
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
