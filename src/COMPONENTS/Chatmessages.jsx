import React from 'react'
import Chatbot from './Chatbot'

const Chatmessages = ({ chatmessages, onFormSubmit }) => {

  const chatMessagesRef = React.useRef(null)

  React.useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [chatmessages])

  return (
    <div className='chat-messages-container' ref={chatMessagesRef}>
      {chatmessages.length === 0 && (
        <div className="empty-chat">
          Say hi to start analysing your resume 👋
        </div>
      )}
      {chatmessages.map((chatmessage) => {
        return (
          <Chatbot
            message={chatmessage.message}
            type={chatmessage.type}
            onFormSubmit={onFormSubmit}
            sender={chatmessage.sender}
            key={chatmessage.id}
          />
        )
      })}
    </div>
  )
}

export default Chatmessages