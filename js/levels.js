// @flow

const {Entities} = require('./entities/registry');

const loadLevel = (store, levelName): void => {
  const {dispatch} = store;

  // dispatch({type: 'SET_CURRENT_LEVEL_NAME', levelName});

  // level placeholder:
  dispatch({
    type: 'CREATE_ENTITY',
    entityType: 'BACKGROUND',
    args: [{x: -1, y: 0}, 20, 20, 0],
  });

  dispatch({
    type: 'CREATE_ENTITY',
    entityType: 'BEE',
    args: [{x: 5, y: 6}],
  });

  // dispatch({
  //   type: 'CREATE_ENTITY',
  //   entityType: 'BEE',
  //   args: [{x: 11.5, y: 11}],
  // });
  // dispatch({
  //   type: 'CREATE_ENTITY',
  //   entityType: 'BEE',
  //   args: [{x: 12.5, y: 11}],
  // });

  for (let y = 5; y < 12; y++) {
    for (let x = 0; x < 7; x++) {
      let holding = null;
      // if (x == 12 && y == 12) {
      //   holding = Entities.HONEY.make();
      // }
      // if (x == 14 && y == 14) {
      //   holding = Entities.HONEY.make();
      // }
      // if (x == 14.5 && y == 13) {
      //   holding = Entities.HONEY.make();
      // }
      // if (x == 15 && y == 14) {
      //   holding = Entities.HONEY.make();
      // }
      // if (x == 12 && y == 11) {
      //   holding = Entities.HONEY.make();
      // }
      // if (x == 11 && y == 11) {
      //   holding = Entities.HONEY.make();
      // }
      dispatch({
        type: 'CREATE_ENTITY',
        entityType: 'CELL',
        args: [{x, y}, holding],
      });
    }
  }


};

module.exports = {
  loadLevel,
};
