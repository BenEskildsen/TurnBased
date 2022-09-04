// @flow
const {add, subtract} = require('bens_utils');

const initBoard = (width, height, isHexagonal) => {
  const board = {
    width, height,
    isHexagonal,
    grid: []
  }
  // TODO: if hexagonal, may need to add an additional space to each even row
  for (let x = 0; x < width; x++) {
    const col = [];
    for (let y = 0; y < height; y++) {
      col.push({entityIDs: []});
    }
    board.grid.push(col);
  }
  return board;
};

const getSpace = (board, x, y) => {
  const {width, height} = board;
  if (x >= width || y >= height || x < 0 || y < 0) return {entityIDs: []};

  return board.grid[x][y];
}

const addToSpace = (board, x, y, entityID) => {
  const {width, height} = board;
  if (x >= width || y >= height || x < 0 || y < 0) return;
  board.grid[x][y]
}

const getCanvasPosition = (board, x, y) => {
  const {isHexagonal} = board;
  if (!isHexagonal) {
    return {x, y};
  }

  if (y % 2 == 0) return {x: x + 0.5, y};
  return {x, y};
}

const getBoardCopy = (board) => {
  const copy = initBoard(board.width, board.height, board.isHexagonal);
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      copy.grid[x][y].entityIDs = [...getSpace(board, x, y).entityIDs];
    }
  }
  return copy;
}


const addEntity = (board, entity, pos) => {
  for (let x = 0; x < entity.width; x++) {
    for (let y = 0; y < entity.height; y++) {
      addToSpace(board, x + pos.x, y + pos.y, entity.id);
    }
  }
}

const removeEntity = (board, entity) => {
  for (let i = 0; i < entity.width; i++) {
    for (let j = 0; j < entity.height; j++) {
      const x = i + entity.position.x;
      const y = j + entity.position.y;
      if (x > width || y > height || x < 0 || y < 0) continue;
      board.grid[x][y].entityIDs = board.grid[x][y].entityIDs
        .filter(id => id != entity.id);
    }
  }
}

const moveEntity = (board, entity, nextPos) => {
  removeEntity(board, entity);
  addEntity(board, entity, nextPos);
  entity.position = {...nextPos};
}


module.exports = {
  initBoard,
  getSpace,
  getCanvasPosition,
  moveEntity,
  removeEntity,
  addEntity,
};
