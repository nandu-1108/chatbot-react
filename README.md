# Resume Analyser Chatbot

A chatbot that helps students and freshers check how well their resume fits a job role, and what to improve. The student says **hi**, fills a short form (resume, company, role), and gets a report with a fit score, missing skills, and improvement tips.

Built with React and Vite as a learning project.

## Features

- Chat-style interface with a friendly greeting when the student says "hi"
- A form inside the chat with 3 fields: **resume upload**, **company name**, and **job role**
- Reads text from **PDF, DOCX, and TXT** resumes in the browser
- **Role match score:** compares the skills found in the resume with the key skills for the chosen role
- **Resume quality score:** checks sections, contact details, links, length, and measurable results
- Shows skills found, skills missing, and improvement tips
- Points out when the resume looks closer to a different role
- `tips` command for interview preparation, and `restart` to check another resume

## Roles supported

Full-Stack Developer, Frontend Developer, Backend Developer, Python Developer, Data Analyst, Data Scientist, Java Developer, and Software Tester.

For any other role, the bot says it cannot measure the role match and shows only the resume quality score.

## How the score works

- **Overall fit** = 80% role match + 20% resume quality
- **Role match** = the share of the role's key skills that appear in the resume
- **Resume quality** = structure and presentation, and it does not depend on the role

## Tech stack

- React 19 and Vite
- `pdfjs-dist` (read PDF files) and `mammoth` (read DOCX files)
- Bootstrap and custom CSS

## Getting started

```bash
# 1. Clone the project
git clone https://github.com/nandu-1108/chatbot-react.git
cd chatbot-react

# 2. Install dependencies
npm install

# 3. Start the app
npm run dev
```

Then open the local address shown in the terminal (usually `http://localhost:5173/chatbot-react/`).

## Project structure

```
src/
  main.jsx            App entry point
  App.jsx             Holds the chat messages and handles the form submit
  index.css           All styles
  resumeBot.js        Chat logic, role skill lists, and scoring
  extractText.js      Reads text from PDF, DOCX, and TXT files
  COMPONENTS/
    Chatinput.jsx     Message input box and Send button
    Chatmessages.jsx  List of messages
    Chatbot.jsx       A single message bubble
    ResumeForm.jsx    The 3-field form (resume, company, role)
  assets/             Robot and user profile images
```

## Limitations

- The analysis is **keyword based**, so it does not truly understand the resume
- Only 8 roles are supported
- The **company name is not used in the score** yet
- Scanned (image-only) PDFs cannot be read

## Future improvements

- AI-powered analysis for any role and company, using a Django backend
- Company-specific interview guidance
- More roles and a larger skills list
- Voice input
- Live deployment on GitHub Pages

## Author

Made by [nandu-1108](https://github.com/nandu-1108).