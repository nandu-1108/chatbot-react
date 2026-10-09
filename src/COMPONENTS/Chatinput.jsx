import { useState } from 'react';
import { bot } from '../resumeBot';

function ChatInput({ setChatMessages }) {
  const [inputText, setInputText] = useState('');

  async function sendMessage() {
    const text = inputText.trim();
    if (!text) return;

    setInputText('');

    // 1. show the student's message
    setChatMessages((prev) => [
      ...prev,
      { message: text, sender: 'user', id: crypto.randomUUID() },
    ]);

    // 2. get the bot's reply (an object: { message, showForm })
    const reply = await bot.getResponse(text);

    // 3. show the bot's reply, with the form if needed
    setChatMessages((prev) => [
      ...prev,
      {
        message: reply.message,
        sender: 'robot',
        type: reply.showForm ? 'form' : 'text',
        id: crypto.randomUUID(),
      },
    ]);
  }

  return (
    <div className="chat-input-container">
      <input
        id="chat-input"
        name="chatMessage"
        className="input-text"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
        autoComplete="off"
      />
      <button className="send-button" onClick={sendMessage}>
        Send
      </button>
    </div>
  );
}

export default ChatInput;