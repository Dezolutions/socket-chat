import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import socket from '../socket'
import { Form,Button } from 'react-bootstrap'
import '../scss/chat.scss'

function Chat({users,messages,userName, roomId, onAddMessage}) {
  const [messageValue, setMessageValue] = React.useState('');
  const messagesRef = React.useRef(null);
  const onSetMessageValue = (e) => {
    setMessageValue(e.target.value)
  }
  const onEnterClick = (e) => {
    if(messageValue){
      if(e.key = 'Enter'){
        socket.emit('ROOM:NEW_MESSAGE', {
          userName,
          roomId,
          text: messageValue,
        });
        onAddMessage({ userName, text: messageValue });
        setMessageValue('');
      }

    }
    

  }
  const onSendMessage = () => {
    if(messageValue){
      socket.emit('ROOM:NEW_MESSAGE', {
        userName,
        roomId,
        text: messageValue,
      });
      onAddMessage({ userName, text: messageValue });
      setMessageValue('');

    }
    
  };

  React.useEffect(() => {
    messagesRef.current.scrollTo(0, 99999);
  }, [messages]);

  return (
    <div className="chat__wrapper">
      <div className="chat">
        <div className="chat-users">
          <p className="chat-room">Комната: <strong>{roomId}</strong> </p>
          <p className="chat-online">Онлайн({users.length})</p>
          <ul>
            {users.map((name,index) => <li key={name+index} className="online-user">{name}</li>)}
          </ul>
        </div>
        <div className="chat-messages">
          <div ref={messagesRef} className="messages-block">
            {messages.map(message => (
              <div className="message">
                <div className="message-inner">
                  <p className="message-name">{message.userName}</p>
                  <p className="message-text">{message.text}</p>
                </div>
              </div>

            ))}
          </div>
          
            <div className="form">
              <Form.Control as="textarea" onKeyPress={onEnterClick} value={messageValue} onChange={onSetMessageValue} placeholder="Введите сообщение" className="message-input" rows={3}  />
              <Button onClick={onSendMessage} type="button" className="message-btn" variant="primary">Отправить</Button>
            </div>
            
          
        </div>
        
      </div>
    </div>
  )
}

export default Chat
