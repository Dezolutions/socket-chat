import React from 'react';
import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';
import axios from 'axios'
import socket from './socket'
import 'bootstrap/dist/css/bootstrap.min.css';
import reducer from './reducer'
import {Container} from 'react-bootstrap'
import './scss/app.scss'


function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: []
  });

  const onLogin = async (obj) => {
    dispatch({
      type: 'JOINED',
      payload: obj
    })
    socket.emit('ROOM:JOIN',obj)
    const { data } = await axios.get(`/rooms/${obj.roomId}`);
    dispatch({
      type: 'SET_DATA',
      payload: data,
    });
  }

  const onSetUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    })

  }
  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };
  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', onSetUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);

  },[])

  
  console.log(state)
  return (
    <Container>
      <div className="app">
        {!state.joined? <JoinBlock className="join" onLogin={onLogin}/> : <Chat {...state} onAddMessage={addMessage} /> }
      </div>
    </Container>
  );
}

export default App;
