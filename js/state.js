// @flow

const {Entities, Properties} = require('./entities/registry');
const {initBoard} = require('./board');

const initState = () => {
  return {
    game: null,
    screen: 'LOBBY',
    sprites: {},
    modal: null,
  };
}

const initGame = (players, width, height) => {
  const game = {
    players,
    turn: 0,
    turnNum: 0,

    viewWidth: width,
    viewHeight: height,
    gridWidth: width,
    gridHeight: height,
    viewPos: {x: 0, y: 0},

    prevTickTime: new Date().getTime(),
    sprites: {},

    nextID: 1,
    entities: {},
    board: initBoard(width, height, true /* is hexagonal */),

    mouse: {
      isLeftDown: false,
      isRightDown: false,
      downPos: {x: 0, y: 0},
      prevPos: {x: 0, y: 0},
      curPos: {x: 0, y: 0},
      curPixel: {x: 0, y: 0},
      prevPixel: {x: 0, y: 0},
    },
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
