// @flow

const React = require('react');
const {Button, Dropdown} = require('bens_ui_components');
const {useEffect, useState, useMemo} = React;
const {makeEntity} = require('./makeEntity');

const config = {
  hp: 10,
  maxHP: 10,
};

const make = (position) => {
  return {
    ...makeEntity('DIRT', position),
    ...config,
  };
};

const render = (ctx, game, monster): void => {
  const {position, width, height} = monster;
  ctx.save();
  ctx.style = 'brown';
  ctx.fillRect(position.x, position.y, width, height);
  ctx.restore();
};

const editor = (props) => {
  const {game, argsCallback} = props;
  return (
    <div>
    </div>
  );
}

module.exports = {
  config, make, render, editor,
};
