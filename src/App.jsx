import React from 'react'
import Chatinput from './COMPONENTS/Chatinput'
import Chatmessages from './COMPONENTS/Chatmessages'




  const App = () => {
     const [chatmessages, setChatMessages] = React.useState([]);
      // const [chatmessages,setChatMessages]=array;
    // const chatmessages=array[0]
    // const setChatMessages=array[1]

 

    
  return (
    <div className='app-container'>
      
      <Chatmessages chatmessages={chatmessages}/>
      <Chatinput 
      chatmessages={chatmessages}
      setChatMessages={setChatMessages}
      />
   
    </div>
  )
}

export default App