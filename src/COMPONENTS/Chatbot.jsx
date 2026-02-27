import React from 'react'
import robotImg from '../assets/robot1..png';
import userImg from '../assets/user2.png';


const Chatbot = (props) => {
  const sender = props.sender

  // if(sender=='robot'){
  //     return(
  //        <div>

  //          <h3 style={{paddingLeft:"50"}}><VscRobot />{props.messege}</h3>
  //        </div>
  //     )
  // }

  return (
    <div className={
      sender === 'user'
        ? 'chat-message-user'
        : 'chat-message-robot'
    }>
      {sender === 'robot' && <img src={robotImg} className='chat-profile'/>}
      <div className='chatbot-text'>
        {props.messege}
      </div>


      {sender === 'user' && <img src={userImg} className='user-profile'/>}

    </div>
  )
}
export default Chatbot
