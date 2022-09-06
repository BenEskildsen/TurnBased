// @flow

const React = require('react');
const {Button, Checkbox, Dropdown, Modal} = require('bens_ui_components');
const {loadLevel} = require('../levels');
const Game = require('./Game.react');
const Editor = require('./Editor.react');
const {useState, useMemo, useEffect} = React;

type Props = {
  state: State,
  dispatch: (action: Action) => Action,
  store: Object,
  modal: Object,
};

function Main(props: Props): React.Node {
  const {state, modal} = props;
  let content = null;
  if (state.screen === 'LOBBY') {
    content = <Lobby {...props} />
  } else if (state.screen === 'GAME') {
    content = <Game {...props} />
  } else if (state.screen === 'EDITOR') {
    content = <Editor {...props} />
  }

  return (
    <React.Fragment>
      {content}
      {modal}
    </React.Fragment>
  );
}

function Lobby(props): React.Node {
  return (
    <div
      style={{
        width: 300,
        margin: 'auto',
        marginTop: 150,
      }}
    >
      <Button
        label="Play"
        style={{
          width: 300,
          height: 30,
        }}
        onClick={() => {
          props.dispatch({
            type: 'SET_MODAL',
            modal: (<PlayModal store={props.store} dispatch={props.dispatch} />),
          });
        }}
      />
      <LevelEditor dispatch={props.dispatch} />
    </div>
  );
}

function PlayModal(props): React.Node {
  const {dispatch, store} = props;
  return (
    <Modal
      title={"Buzz Buzz REVOLUTION"}
      body={"Beeeeeeeeeeeeeeeees"}
      buttons={[
        {
          label: 'Play',
          onClick: () => {
            dispatch({type: 'DISMISS_MODAL'});
            dispatch({type: 'START'});
            loadLevel(store, 'testLevel');
          },
        }
      ]}
    />
  );
}


function LevelEditor(props) {
  const {dispatch} = props;
  const [level, setLevel] = useState('testLevel');
  const [useLevel, setUseLevel] = useState(true);
  const [rerender, setRerender] = useState(0);

  const onresize = () => setRerender(rerender + 1);

  let left = 5;
  let top = window.innerHeight - 82;
  useEffect(() => {
    window.addEventListener('resize', onresize);
    left = 5;
    top = window.innerHeight - 82;
    return (() => {
      window.removeEventListener('resize', onresize);
    });
  }, [rerender]);

  return (
    <div
      style={{
        position: 'absolute',
        width: 310,
        left,
        top,
        backgroundColor: 'rgb(250, 248, 239)',
        borderRadius: 8,
        padding: 4,
        border: '1px solid black',
      }}
    >
      Select Level:
      <Dropdown
        options={['testLevel']}
        selected={level}
        onChange={setLevel}
      />
      <div>
        <Checkbox
          label="Use Selected Level"
          checked={useLevel}
          onChange={setUseLevel}
        />
      </div>
      <div>
        <Button
          label="Level Editor"
          style={{
            width: '100%',
          }}
          onClick={() => {
            dispatch({type: 'START', screen: 'EDITOR'});
            if (useLevel) {
              loadLevel(store, level);
            }
          }}
        />
      </div>
    </div>
  );
}

module.exports = Main;
