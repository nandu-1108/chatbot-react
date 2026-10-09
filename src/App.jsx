import React from 'react'
import Chatinput from './COMPONENTS/Chatinput'
import Chatmessages from './COMPONENTS/Chatmessages'
import { bot } from './resumeBot'
import { extractText } from './extractText'

const App = () => {
  const [chatmessages, setChatMessages] = React.useState([]);

  async function handleFormSubmit({ file, company, role }) {
    const resumeText = await extractText(file);
    const reply = bot.analyse({ resumeText, company, role });

    setChatMessages((prev) => [
      ...prev,
      { id: crypto.randomUUID(), sender: 'user', message: `Resume: ${file.name}\nCompany: ${company}\nRole: ${role}` },
      { id: crypto.randomUUID(), sender: 'robot', message: reply },
    ]);
  }

  return (
    <div className='app-container'>
      <div className="app-header">
        <h2>Resume Analyser</h2>
        <p>Check if your resume fits your dream company and role</p>
      </div>
      <Chatmessages chatmessages={chatmessages} onFormSubmit={handleFormSubmit} />
      <Chatinput chatmessages={chatmessages} setChatMessages={setChatMessages} />
    </div>
  )
}

export default App