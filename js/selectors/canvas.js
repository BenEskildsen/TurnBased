// @flow
const {
  add, multiply, subtract, equals, floor, containsVector
} = require('bens_utils').vectors;


const getCanvasSize = () => {
  const elem = document.getElementById('background');
  const dims = {width: window.innerWidth, height: window.innerHeight};
  if (elem != null) {
    const slider = document.getElementById('sliderBar');
    const editor = document.getElementById('levelEditor');
    let sliderWidth = slider != null ? slider.getBoundingClientRect().width : 0;
    let editorWidth = editor != null ? editor.getBoundingClientRect().width : 0;
    dims.width = dims.width - sliderWidth - editorWidth;
  }
  return dims;
}

const canvasToGrid = (game: GameState, canvasPos: Vector): Vector => {
  const {width, height} = getCanvasSize();
  const scaleVec = {
    x: game.viewWidth / width,
    y: game.viewHeight / height,
  };

  const gridCoord =
    add(
      {x: game.viewPos.x, y: game.viewPos.y},
      multiply(canvasPos, scaleVec)
    );
  if (
    game.board != null &&
    game.board.isHexagonal &&
    Math.floor(gridCoord.y) % 2 == 0
  ) {
    return floor(subtract(gridCoord, {x: 0.5, y: 0}));
  }
  return floor(gridCoord);
};

module.exports = {
  getCanvasSize,
  canvasToGrid,
};
