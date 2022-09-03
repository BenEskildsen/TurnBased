// @flow

export type Vector = {x: number, y: number};

export type Board = {
  width: Number,
  height: Number,
  grid: Array<Array<Space>>,
};

export type Space = {
  entityIDs: Array<EntityID>,
};

export type EntityID = String;
export type Entity = {
  id: EntityID,
  type: String,
  playerID: PlayerID,

  // implicit properties
  width: Number,
  height: Number,
  theta: Number,

  position: Vector,
};

export type PlayerID = number;
export type Player = {
  playerID: PlayerID;
  name: String,
  type: 'HUMAN' | 'COMPUTER',
};

export type Game = {
  players: Array<Player>,
  turn: PlayerID,
  turnNum: Number,

  entities: {[EntityID]: Entity},
  board: Board,
};
