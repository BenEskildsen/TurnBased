// @flow

const React = require('react');
const {
  Button, Canvas, Divider, Dropdown,
  NumberField,
  Modal, AudioWidget, InfoCard,
} = require('bens_ui_components');
const {initMouseControls} = require('../daemons/mouseControls');
const Game = require('./Game.react');
const {useEffect, useState, useMemo} = React;

function Editor(props): React.Node {
  const {state, dispatch, store} = props;

  return (
    <div>
      <Game {...props} />
      <Sidebar {...props} />
    </div>
  );
}

function Sidebar(props): React.Node {
  const {state, dispatch, store} = props;
  const {game} = state;

  const [editor, setEditor] = useState({
    version: 0, // just a way to force the effect to redo
    started: false,
    importedLevel: {},

    numPlayers: game.players.length,
    gridWidth: game.gridHeight,
    gridHeight: game.gridWidth,
    playerID: 0,
    paletteMode: 'MARQUEE',

    // entity creation mode
    deleteMode: false,
    entityType: 'MONSTER',
  });

  return (
    <div
      style={{
        position: 'absolute',
        height: '100%',
        width: 500,
        left: window.innerWidth - 500,
        top: 0,
        padding: 4,
      }}
    >
      <b>Global Parameters:</b>
      <div>
        Number of Players:
        <NumberField
          value={editor.numPlayers}
          onChange={(numPlayers) => setEditor({...editor, numPlayers})}
        />
      </div>
    </div>
  );
}

module.exports = Editor;
