// @flow

const React = require('react');
const {
  Button, Canvas, Modal, AudioWidget, InfoCard,
} = require('bens_ui_components');
const {initMouseControls} = require('../daemons/mouseControls');
const {useEffect} = React;

function Editor(props): React.Node {
  const {state, dispatch, store} = props;

  return (
    <div>
      <Game {...props} />
    </div>
  );
}

module.exports = Editor;
