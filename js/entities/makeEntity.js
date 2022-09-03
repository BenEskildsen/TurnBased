// @flow

const makeEntity = (
   type, position, playerID, width, height,
) => {
  return {
    id: -1, // NOTE: this is set by the reducer
		type,
		position,
		prevPosition: position,
    playerID: playerID != null ? playerID : 0,
		width: width != null ? width : 1,
		height: height != null ? height : 1,
		theta: 0,
    prevTheta: 0,
	};
};

module.exports = {
  makeEntity,
};
