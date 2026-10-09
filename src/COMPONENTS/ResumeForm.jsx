// src/COMPONENTS/ResumeForm.jsx
import { useState } from 'react';

function ResumeForm({ onSubmit }) {
  const [file, setFile] = useState(null);
  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit() {
    if (!file || !company.trim() || !role.trim()) {
      setError('Please fill all 3 fields.');
      return;
    }

    setError('');
    setBusy(true);

    try {
      await onSubmit({ file, company: company.trim(), role: role.trim() });
      setDone(true);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="resume-form">
      <label htmlFor="resume-file">1. Upload your resume (PDF, DOCX or TXT)</label>
      <input
        id="resume-file"
        name="resumeFile"
        type="file"
        accept=".pdf,.docx,.txt"
        disabled={busy || done}
        onChange={(e) => setFile(e.target.files[0] ?? null)}
      />

      <label htmlFor="company-name">2. Company name</label>
      <input
        id="company-name"
        name="companyName"
        className="form-field"
        type="text"
        placeholder="e.g. Google"
        value={company}
        disabled={busy || done}
        onChange={(e) => setCompany(e.target.value)}
      />

      <label htmlFor="job-role">3. Job role</label>
      <input
        id="job-role"
        name="jobRole"
        className="form-field"
        type="text"
        placeholder="e.g. Full-Stack Developer"
        value={role}
        disabled={busy || done}
        onChange={(e) => setRole(e.target.value)}
      />

      {error && <p className="form-error">{error}</p>}

      <button className="send-button" onClick={handleSubmit} disabled={busy || done}>
        {busy ? 'Analysing...' : done ? 'Submitted ✓' : 'Analyse my resume'}
      </button>
    </div>
  );
}

export default ResumeForm;