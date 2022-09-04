// @flow

const React = require('react');
const {
  Button, Canvas, Modal, AudioWidget, InfoCard,
} = require('bens_ui_components');
const {initMouseControls} = require('../daemons/mouseControls');
const {useEffect} = React;

function Game(props): React.Node {
  const {state, dispatch, store} = props;

  useEffect(() => {
    initMouseControls(store, {
      leftDown: (state, dispatch, gridPos) => {
        // console.log("clicked", gridPos);
      }
    });
  }, []);

  return (
    <div>
      <MenuCard {...props} />
      <Canvas
        useFullScreen={true}
      />
    </div>
  );
}

function MenuCard(props): React.Node {
  const {state, dispatch} = props;
  const {game} = state;
  return (
    <InfoCard
      style={{
        position: 'absolute',
        top: 4,
        left: 4,
        zIndex: 2,
        backgroundColor: 'none',
        border: 'none',
      }}
    >
      <div>
      <Button
        label="End Turn"
        onClick={() => dispatch({type: 'END_TURN'})}
      />
      </div>
      <div>
      <Button
        label="Instructions"
        onClick={() => {
          dispatch({type: 'SET_MODAL',
            modal: <InstructionsModal dispatch={dispatch} />
          });
        }}
      />
      </div>
    </InfoCard>
  );
}

function InstructionsModal(props) {
  const {dispatch} = props;
  return (
    <Modal
      title={"Controls"}
      body={(<div>
        <div>
          Movement (hexagonally): <b>T Y F H V B</b>
        </div>
        <div>
          Pick up/Put down: <b>G</b>
        </div>
        <div>
          Lay eggs: <b>E</b>
        </div>
        <div>
          Create honeycomb blueprints: <b>C</b>
        </div>
        <div>
          Assign tasks to workers: <b>D</b>
        </div>
      </div>)}
      buttons={[
        {
          label: 'Back to Game',
          onClick: () => {
            dispatch({type: 'DISMISS_MODAL'});
          },
        }
      ]}
    />
  );
}

module.exports = Game;
