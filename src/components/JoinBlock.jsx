import React from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button} from 'react-bootstrap'
import '../scss/joinblock.scss'

function JoinBlock({onLogin}) {
  const [roomId, setRoomId] = React.useState('')
  const [userName, setUserName] = React.useState('')
  const [isLoading, setIsLoading] = React.useState(false)

  const setNameValue = (e) =>{
    setUserName(e.target.value)
  }
  const setRoomValue = (e) =>{
    setRoomId(e.target.value)
  }
  const onSubmit = async () => {
    if(!userName || !roomId){
      alert('неверные данные')
    }
    else{
      const obj = {
        roomId,
        userName,
      };
      setIsLoading(true)
      await axios.post('/rooms',obj);
      onLogin(obj);

    }
    
  }
  return (
      <div className="join">
        <Form className="join-form">
          <p className="jois-title">chat on ReactJs + Express + Socket.io</p>
          <Form.Group >
            <Form.Control value={roomId} onChange={setRoomValue} className="join-input" type="text" placeholder="Room ID"/>
            <Form.Control value={userName} onChange={setNameValue} className="join-input" type="text" placeholder="User Name"/>
          </Form.Group>
          <Button disabled={isLoading} onClick={onSubmit} variant="success">
            {isLoading? 'Вход...' : 'Войти'}
          </Button>
        </Form>
      </div>
  )
}

export default JoinBlock
