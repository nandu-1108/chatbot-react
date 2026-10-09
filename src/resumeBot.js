// src/resumeBot.js
// Flow: student says "hi" -> bot shows a form (resume file, company, role) -> bot shows the analysis

const GREETINGS = ['hi', 'hii', 'hiii', 'hello', 'hey', 'hey hi', 'hlo', 'helo'];

function isGreeting(text) {
  return GREETINGS.includes(text.trim().toLowerCase());
}

// ---------- Skills expected for each role ----------
// Each skill has a name and the words that count as "found" in the resume.
const ROLES = {
  'Full-Stack Developer': {
    HTML: ['html'],
    CSS: ['css'],
    JavaScript: ['javascript', 'js'],
    'React / Angular / Vue': ['react', 'reactjs', 'angular', 'vue'],
    'Backend framework': ['node', 'express', 'django', 'flask', 'spring', 'php'],
    'REST APIs': ['rest', 'api', 'apis'],
    'Database': ['sql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'database'],
    'Git / GitHub': ['git', 'github'],
  },
  'Frontend Developer': {
    HTML: ['html'],
    CSS: ['css'],
    JavaScript: ['javascript', 'js'],
    'React / Angular / Vue': ['react', 'reactjs', 'angular', 'vue'],
    'Responsive design': ['responsive', 'bootstrap', 'tailwind'],
    'API calls': ['api', 'apis', 'fetch', 'axios'],
    TypeScript: ['typescript'],
    'Git / GitHub': ['git', 'github'],
  },
  'Backend Developer': {
    'Programming language': ['python', 'java', 'node', 'php', 'go', 'c#'],
    'Backend framework': ['django', 'flask', 'spring', 'express', 'fastapi', 'laravel'],
    'REST APIs': ['rest', 'api', 'apis'],
    'Database': ['sql', 'mysql', 'postgresql', 'postgres', 'mongodb', 'database'],
    Authentication: ['jwt', 'oauth', 'authentication'],
    Docker: ['docker'],
    'Git / GitHub': ['git', 'github'],
  },
  'Python Developer': {
    Python: ['python'],
    'Django / Flask / FastAPI': ['django', 'flask', 'fastapi'],
    SQL: ['sql', 'mysql', 'postgresql', 'postgres'],
    'REST APIs': ['rest', 'api', 'apis'],
    OOP: ['oop', 'object oriented', 'object-oriented'],
    Testing: ['pytest', 'unittest', 'testing'],
    'Git / GitHub': ['git', 'github'],
  },
  'Data Analyst': {
    SQL: ['sql', 'mysql', 'postgresql', 'postgres'],
    Excel: ['excel', 'spreadsheet', 'spreadsheets'],
    Python: ['python'],
    'Pandas / NumPy': ['pandas', 'numpy'],
    'Data visualization': ['tableau', 'power bi', 'powerbi', 'matplotlib', 'seaborn', 'visualization', 'visualisation'],
    Statistics: ['statistics', 'statistical'],
    'Data cleaning': ['data cleaning', 'cleaning', 'wrangling'],
    'Dashboards / reporting': ['dashboard', 'dashboards', 'reporting'],
  },
  'Data Scientist': {
    Python: ['python'],
    'Machine learning': ['machine learning', 'ml', 'scikit-learn', 'sklearn'],
    Statistics: ['statistics', 'statistical'],
    'Pandas / NumPy': ['pandas', 'numpy'],
    SQL: ['sql', 'mysql', 'postgresql', 'postgres'],
    'Deep learning': ['deep learning', 'tensorflow', 'pytorch', 'keras'],
    'Data visualization': ['tableau', 'power bi', 'matplotlib', 'seaborn', 'visualization', 'visualisation'],
  },
  'Java Developer': {
    Java: ['java'],
    'Spring / Hibernate': ['spring', 'spring boot', 'hibernate'],
    SQL: ['sql', 'mysql', 'postgresql', 'oracle'],
    OOP: ['oop', 'object oriented', 'object-oriented'],
    'REST APIs': ['rest', 'api', 'apis'],
    'Maven / Gradle': ['maven', 'gradle'],
    'Git / GitHub': ['git', 'github'],
  },
  'Software Tester': {
    'Manual testing': ['manual testing', 'test case', 'test cases'],
    'Automation tools': ['selenium', 'cypress', 'playwright', 'automation'],
    'Bug tracking': ['jira', 'bug', 'defect'],
    'API testing': ['postman', 'api testing'],
    SQL: ['sql', 'mysql'],
    'Test planning': ['test plan', 'test strategy'],
  },
};

// Words in the role the student types, mapped to one of the roles above.
// Order matters: the first match wins.
const ROLE_KEYWORDS = [
  ['Data Analyst', ['data analy', 'business analy', 'business intelligence']],
  ['Data Scientist', ['data scien', 'machine learning', 'ml engineer', 'ai engineer']],
  ['Full-Stack Developer', ['full stack', 'full-stack', 'fullstack', 'mern', 'mean stack']],
  ['Frontend Developer', ['front end', 'front-end', 'frontend', 'react', 'javascript', 'ui developer', 'web developer']],
  ['Backend Developer', ['back end', 'back-end', 'backend']],
  ['Python Developer', ['python', 'django']],
  ['Java Developer', ['java']],
  ['Software Tester', ['test', 'qa', 'quality']],
];

function findRole(roleText) {
  const lower = roleText.toLowerCase();
  for (const [name, words] of ROLE_KEYWORDS) {
    if (words.some((w) => lower.includes(w))) return name;
  }
  return null;
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// true if the whole word/phrase appears in the text ("js" will not match "json")
function hasWord(text, word) {
  return new RegExp(`(^|[^a-z0-9])${escapeRegex(word)}([^a-z0-9]|$)`).test(text);
}

function matchRole(text, roleName) {
  const skills = ROLES[roleName];
  const matched = [];
  const missing = [];

  Object.entries(skills).forEach(([name, words]) => {
    (words.some((w) => hasWord(text, w)) ? matched : missing).push(name);
  });

  const percent = Math.round((matched.length / Object.keys(skills).length) * 100);
  return { roleName, matched, missing, percent };
}

// ---------- Resume quality (structure only, NOT role fit) ----------
function resumeQuality(resume) {
  const text = resume.toLowerCase();
  const sections = ['education', 'skills', 'projects', 'experience', 'certification'];
  const foundSections = sections.filter((s) => text.includes(s));
  const missingSections = sections.filter((s) => !text.includes(s));

  const hasEmail = /[\w.+-]+@[\w-]+\.[\w.]+/.test(resume);
  const hasPhone = /\+?\d[\d\s-]{8,}/.test(resume);
  const hasNumbers = /\d+\s?(%|x|\+|users|projects|students)/i.test(resume);
  const hasLinks = /(github\.com|linkedin\.com)/i.test(resume);
  const wordCount = resume.trim().split(/\s+/).length;

  let score = 40;
  score += foundSections.length * 8;
  if (hasEmail && hasPhone) score += 5;
  if (hasNumbers) score += 7;
  if (hasLinks) score += 5;
  if (wordCount >= 150 && wordCount <= 700) score += 3;
  score = Math.min(score, 100);

  const tips = [];
  if (missingSections.length) tips.push(`Add these sections: ${missingSections.join(', ')}.`);
  if (!hasNumbers) tips.push('Add measurable results, e.g. "built an app used by 50 students".');
  if (!hasLinks) tips.push('Add your GitHub and LinkedIn links.');
  if (!hasEmail || !hasPhone) tips.push('Make sure your email and phone number are clearly visible.');
  if (wordCount < 150) tips.push('Your resume looks short. Add more detail on projects and skills.');
  if (wordCount > 700) tips.push('Your resume looks long. Aim for one page as a fresher.');

  return { score, tips };
}

// ---------- The full report ----------
function analyseResume({ resume, company, role }) {
  const text = resume.toLowerCase();
  const quality = resumeQuality(resume);

  const allMatches = Object.keys(ROLES).map((name) => matchRole(text, name));
  const best = allMatches.reduce((a, b) => (b.percent > a.percent ? b : a));

  const targetName = findRole(role);
  const lines = [`Analysis for ${role} at ${company}`, ''];
  const tips = [...quality.tips];

  if (targetName) {
    const target = matchRole(text, targetName);
    const overall = Math.round(target.percent * 0.8 + quality.score * 0.2);
    const verdict =
      overall >= 70 ? 'a good fit' : overall >= 45 ? 'a partial fit, with some work needed' : 'not a strong fit yet';

    lines.push(`Overall fit: ${overall}/100 (${verdict})`);
    lines.push(`- Role match: ${target.percent}% of the key skills for ${targetName} found in your resume`);
    lines.push(`- Resume quality: ${quality.score}/100 (structure, contact details, links, results)`);
    lines.push('');
    lines.push(`Skills found: ${target.matched.join(', ') || 'none'}`);
    lines.push(`Skills missing: ${target.missing.join(', ') || 'none'}`);

    if (best.roleName !== targetName && best.percent >= target.percent + 15) {
      lines.push('');
      lines.push(`Your resume looks closer to a ${best.roleName} role (${best.percent}% match).`);
    }

    target.missing.slice(0, 4).forEach((skill) => {
      tips.unshift(`Learn and add ${skill} (with a small project) to match ${targetName} roles.`);
    });
  } else {
    lines.push(`I don't have a skill list for "${role}" yet, so I can't measure the role match.`);
    lines.push(`Resume quality: ${quality.score}/100 (structure, contact details, links, results)`);
    lines.push('');
    lines.push(`Your resume looks closest to: ${best.roleName} (${best.percent}% match).`);
    lines.push(`Roles I can check: ${Object.keys(ROLES).join(', ')}.`);
  }

  lines.push('');
  lines.push('Improvements:');
  lines.push(`- ${tips.join('\n- ') || 'Looks solid. Keep it updated!'}`);
  lines.push('');
  lines.push(
    `Note: the company name is not part of the score yet. Company-specific advice needs real company data or an AI model.`
  );
  lines.push('');
  lines.push('Type "tips" for interview preparation, or "restart" to check another resume.');

  return lines.join('\n');
}

function interviewTips({ company, role }) {
  return (
    `Interview preparation for ${role} at ${company}:\n\n` +
    `- Revise the basics of the skills listed for ${role}\n` +
    `- Be ready to explain every project on your resume: why you built it, what was hard, what you learned\n` +
    `- Practise common questions: "Tell me about yourself", "Why ${company}?", "Why this role?"\n` +
    `- Practise coding problems on arrays, strings, and basic SQL\n` +
    `- Check ${company}'s official careers page for its hiring process\n\n` +
    `Type "restart" to check another resume.`
  );
}

// ---------- The bot ----------
export function createResumeBot() {
  let lastSubmission = null;

  // Called when the student types a message. Returns { message, showForm }
  async function getResponse(message) {
    const text = message.trim();
    const lower = text.toLowerCase();

    if (isGreeting(text) || lower === 'restart') {
      lastSubmission = null;
      return {
        message:
          'Hey hi! 👋 I can help you check whether your resume is a good fit for your target company and role, ' +
          'and how to improve it.\n\nPlease fill in these 3 details:',
        showForm: true,
      };
    }

    if (lower === 'tips' && lastSubmission) {
      return { message: interviewTips(lastSubmission), showForm: false };
    }

    return {
      message: 'Say "hi" to start. After your analysis, type "tips" for interview preparation or "restart" to check another resume.',
      showForm: false,
    };
  }

  // Called when the student submits the form. Returns the report text.
  function analyse({ resumeText, company, role }) {
    lastSubmission = { resume: resumeText, company, role };
    return analyseResume(lastSubmission);
  }

  return { getResponse, analyse };
}

// One shared bot for the whole app
export const bot = createResumeBot();