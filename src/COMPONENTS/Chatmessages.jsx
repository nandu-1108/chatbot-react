import React from 'react'
import Chatbot from './Chatbot'

const Chatmessages = ({chatmessages}) => {

 const chatMessagesRef = React.useRef(null)

  React.useEffect(()=>{
    if(chatMessagesRef.current){
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  },[chatmessages])

  return (
    <div className='chat-messages-container' ref={chatMessagesRef}> 
    {chatmessages.length === 0 && (
  <div className="empty-chat">
       chat with me what do you want to know!!😍
  </div>
)}
      {chatmessages.map((chatmessage)=>{
          return(
            <Chatbot 
           messege =  {chatmessage.messege}
             sender = {chatmessage.sender}
             key = {chatmessage.id}
            />
          )
        })
      }
    </div>
  )
}

export default Chatmessages
