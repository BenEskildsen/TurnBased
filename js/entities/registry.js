// @flow

const globalConfig = require('../config');

/**
 * Entity creation checklist:
 *  - add the entity here keyed by type (in render order)
 *  - add the entities/entityType file to this directory
 *  - if the entity has any special properties, add them here
 */


const Entities = {
  DIRT: require('./dirt.js'),

  CELL: require('./cell.js'),

  BEE: require('./bee.js'),

  MONSTER: require('./monster.js'),
};

const Properties = {
  isPlayerControlled: 'IS_PLAYER_CONTROLLED',
};

module.exports = {
  Entities,
  Properties,
};

