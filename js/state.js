// @flow

const {Entities, Properties} = require('./entities/registry');
const {initBoard} = require('./board');

const initState = () => {
  return {
    game: null,
    screen: 'LOBBY',
  };
}

const initGame = (players, width, height) => {
  const game = {
    players,
    turn: 0,
    turnNum: 0,

    viewWidth: 25,
    viewHeight: 25,
    viewPos: {x: 0, y: 0},

    prevTickTime: new Date().getTime(),

    nextID: 1,
    entities: {},
    board: initBoard(width, height, true /* is hexagonal */),
  };

  for (const property in Properties) {
    game[Properties[property]] = {};
  }

  for (const entityType in Entities) {
    game[entityType] = {};
  }

  return game;
};

// TODO: do I even need this?
const initPlayer = (playerID, type, name) => {
  return {
    playerID, type, name,
  };
}


module.exports = {
  initState,
  initGame,
  initPlayer,
};
