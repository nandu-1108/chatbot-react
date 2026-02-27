import React from 'react'
import './chatbot.css'

const Chatinput = ({ chatmessages, setChatMessages }) => {
  const [InputText, setInputText] = React.useState('');

  function saveInputText(event) {
    setInputText(event.target.value);
  }

  function getBotReply(text) {

  const message = text.toLowerCase().trim();

  if (message.includes("hello") || message.includes("hi")) {
    return "Hello Dear 👋";
  }

  if (message.includes("i need help")) {
    return "I am Here to Help You 🙌";
  }

  if (message.includes("i want to learn programming")) {
    return "That's Great! Programming is a Valuable skill 💻";
  }

  if (message.includes("i want to learn python")) {
    return "Python is a great choice! It's beginner-friendly 🐍";
  }

  if (message.includes("how can i start")) {
    return "Start with basics like variables, loops, and functions.";
  }

  if (message.includes("thank you")) {
    return "It's my Pleasure to Help You Dear 🥰";
  }

  return "Sorry 😅 I didn't understand that.";
}

  function sendMessage() {

    if (!InputText.trim()) return;

    const userMessage = {
      messege: InputText,
      sender: 'user',
      id: crypto.randomUUID()
    };

    setChatMessages(prev => [...prev, userMessage]);

    const userText = InputText;
    setInputText('');

    setTimeout(() => {

      const botMessage = {
        messege: getBotReply(userText),
        sender: 'robot',
        id: crypto.randomUUID()
      };

      setChatMessages(prev => [...prev, botMessage]);

    }, 1500);
  }

  return (
    <div className='chat-input-container'>
      <input
        type="text"
        placeholder='Ask me anything that you want to know'
        onChange={saveInputText}
        value={InputText}
        className='input-text'
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />

      <button className='send-button' onClick={sendMessage}>
        Send
      </button>
    </div>
  )
}

export default Chatinput