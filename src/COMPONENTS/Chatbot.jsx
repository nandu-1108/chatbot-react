import React from 'react'
import robotImg from '../assets/robot1..png';
import userImg from '../assets/user2.png';
import ResumeForm from './ResumeForm'

const Chatbot = (props) => {
  const sender = props.sender
  const text = props.message

  return (
    <div className={sender === 'user' ? 'chat-message-user' : 'chat-message-robot'}>
      {sender === 'robot' && <img src={robotImg} className='chat-profile' alt="robot" />}
      <div className='chatbot-text' style={{ whiteSpace: 'pre-wrap' }}>
        {text}
        {props.type === 'form' && <ResumeForm onSubmit={props.onFormSubmit} />}
      </div>
      {sender === 'user' && <img src={userImg} className='user-profile' alt="user" />}
    </div>
  )
}

export default Chatbot