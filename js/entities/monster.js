// @flow

const React = require('react');
const {Button, Dropdown} = require('bens_ui_components');
const {useEffect, useState, useMemo} = React;
const {makeEntity} = require('./makeEntity');

const config = {
  hp: 10,
  maxHP: 10,
  damage: 2,
  energy: 10,
  maxEnergy: 10,
  moveEnergy: 2,
  attackEnergy: 6,
};

const make = (position, playerID) => {
  return {
    ...makeEntity('MONSTER', position, playerID),
    ...config,
  };
};

const render = (ctx, game, monster): void => {
  const {position, width, height} = monster;
  ctx.save();
  ctx.style = 'purple';
  ctx.fillRect(position.x, position.y, width, height);
  ctx.restore();
};

const editor = (props) => {
  const {game, argsCallback} = props;
  const [playerID, setPlayerID] = useState(0);
  return (
    <div>
      <Dropdown
        options={game.players.map(p => p.playerID)}
        selected={playerID}
        onChange={(nextPlayerID) => {
          argsCallback([playerID]);
        }}
      />
    </div>
  );
}

module.exports = {
  config, make, render, editor,
};
