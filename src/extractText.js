// src/extractText.js
// Reads the text from an uploaded resume file (PDF, DOCX or TXT).
// Needs: npm install pdfjs-dist mammoth

import * as pdfjsLib from 'pdfjs-dist';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';
import mammoth from 'mammoth/mammoth.browser';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

async function readPdf(file) {
  const data = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data }).promise;
  let text = '';

  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item) => item.str).join(' ') + '\n';
  }
  return text;
}

async function readDocx(file) {
  const arrayBuffer = await file.arrayBuffer();
  const result = await mammoth.extractRawText({ arrayBuffer });
  return result.value;
}

export async function extractText(file) {
  const name = file.name.toLowerCase();
  let text = '';

  if (name.endsWith('.pdf')) {
    text = await readPdf(file);
  } else if (name.endsWith('.docx')) {
    text = await readDocx(file);
  } else if (name.endsWith('.txt')) {
    text = await file.text();
  } else {
    throw new Error('Please upload a PDF, DOCX or TXT file.');
  }

  if (text.trim().split(/\s+/).length < 30) {
    throw new Error(
      'I could not read enough text from this file. If it is a scanned image, please upload a text-based PDF or a DOCX.'
    );
  }

  return text;
}