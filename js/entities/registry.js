// @flow


/**
 * Entity creation checklist:
 *  - add the entity here keyed by type (in render order)
 *  - add the entities/entityType file to this directory
 *  - if the entity has any special properties, add them here
 */


const Entities = {
  BACKGROUND: require('./background.js'),
  DIRT: require('./dirt.js'),

  CELL: require('./cell.js'),

  BEE: require('./bee.js'),

  MONSTER: require('./monster.js'),
};

const Properties = {
  isPlayerControlled: 'IS_PLAYER_CONTROLLED',
  isActor: 'IS_ACTOR',
  isAgent: 'IS_AGENT',
};

module.exports = {
  Entities,
  Properties,
};

