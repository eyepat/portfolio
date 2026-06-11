import { useEffect, useRef, useState } from 'react';
import { THEMES, applyTheme } from '../ThemeSwitcher/themes';
import { PROJECTS } from '../../sections/Projects/projects.data';
import styles from './Terminal.module.css';

const SECTIONS = ['home', 'about', 'journey', 'projects', 'skills', 'contact'];

const BANNER = [
  'bahaa.sh v1.0 — the hidden terminal',
  "type 'help' to see what I can do.",
];

let nextId = 0;
const line = (kind, text, href) => ({ id: nextId++, kind, text, href });

function runCommand(raw, { close }) {
  const [cmd, ...args] = raw.trim().split(/\s+/);
  const arg = args.join(' ').toLowerCase();

  switch (cmd.toLowerCase()) {
    case 'help':
      return [
        line('out', 'available commands:'),
        line('out', '  whoami        who is this guy?'),
        line('out', '  projects      list my work'),
        line('out', '  skills        what I know'),
        line('out', '  archivon      open the Archivon case study'),
        line('out', '  cv            download my CV'),
        line('out', '  contact       how to reach me'),
        line('out', `  theme <name>  ${THEMES.map(t => t.name.toLowerCase()).join(' | ')}`),
        line('out', `  goto <section> ${SECTIONS.join(' | ')}`),
        line('out', '  clear         clear the screen'),
        line('out', '  exit          close the terminal'),
      ];

    case 'whoami':
      return [
        line('out', 'Bahaa Hamed — AI & Backend Engineer.'),
        line('out', 'B.Eng. Computer Science & Economics, KTH (2026).'),
        line('out', 'Built Archivon, a distributed RAG-based multi-agent AI system,'),
        line('out', 'as my thesis with Epinova. Looking for a role in software & AI.'),
      ];

    case 'projects':
      return PROJECTS.flatMap(p => [
        line('out', `  [${p.num}] ${p.title}`),
        p.caseStudyUrl
          ? line('link', `       → case study`, p.caseStudyUrl)
          : p.githubUrl
            ? line('link', `       → github`, p.githubUrl)
            : line('out', '       → private repo'),
      ]);

    case 'skills':
      return [
        line('out', 'AI/ML ....... RAG, pgvector, Azure OpenAI, MCP, prompt engineering'),
        line('out', 'Backend ..... C#/.NET 10, Java (Quarkus), REST, microservices'),
        line('out', 'Data ........ PostgreSQL, pgvector, MySQL, MongoDB'),
        line('out', 'Cloud ....... Azure, GitHub Actions, Docker'),
        line('out', 'Frontend .... React, TypeScript, HTML/CSS'),
      ];

    case 'archivon':
      window.open('/archivon.html', '_self');
      return [line('out', 'opening case study…')];

    case 'cv':
      window.open('/Bahaa_Hamed_CV_EN.pdf', '_blank');
      return [line('out', 'downloading CV…')];

    case 'contact':
      return [
        line('link', '  email ..... bahaahamed1970@gmail.com', 'mailto:bahaahamed1970@gmail.com'),
        line('link', '  linkedin .. /in/bahaa-hamed-9424111a9', 'https://www.linkedin.com/in/bahaa-hamed-9424111a9'),
        line('link', '  github .... @eyepat', 'https://github.com/eyepat'),
      ];

    case 'theme': {
      const i = THEMES.findIndex(t => t.name.toLowerCase() === arg);
      if (i === -1) {
        return [line('out', `usage: theme <${THEMES.map(t => t.name.toLowerCase()).join('|')}>`)];
      }
      applyTheme(i);
      localStorage.setItem('accent-theme', String(i));
      return [line('out', `theme set to ${arg}.`)];
    }

    case 'goto':
    case 'cd': {
      const target = arg.replace('#', '').replace('~/', '');
      if (!SECTIONS.includes(target)) {
        return [line('out', `no such section: ${arg || '(none)'} — try: ${SECTIONS.join(', ')}`)];
      }
      document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
      return [line('out', `navigating to #${target}…`)];
    }

    case 'ls':
      return [line('out', SECTIONS.map(s => `${s}/`).join('  '))];

    case 'sudo':
      return arg.startsWith('hire')
        ? [line('out', 'permission granted. check your inbox — or beat me to it:'),
           line('link', '  → bahaahamed1970@gmail.com', 'mailto:bahaahamed1970@gmail.com')]
        : [line('out', 'nice try. this incident will be reported (to my future employer).')];

    case 'clear':
      return 'CLEAR';

    case 'exit':
    case 'quit':
      close();
      return [];

    case '':
      return [];

    default:
      return [line('out', `command not found: ${cmd} — try 'help'`)];
  }
}

export function Terminal() {
  const [open, setOpen]   = useState(false);
  const [lines, setLines] = useState(() => BANNER.map(t => line('out', t)));
  const [value, setValue] = useState('');
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef  = useRef(null);
  const outputRef = useRef(null);

  useEffect(() => {
    const onKey = e => {
      const inField = /^(INPUT|TEXTAREA)$/.test(e.target.tagName);
      if ((e.key === '`' || e.key === '~') && !inField) {
        e.preventDefault();
        setOpen(o => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    const onToggle = () => setOpen(o => !o);
    window.addEventListener('keydown', onKey);
    window.addEventListener('terminal-toggle', onToggle);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('terminal-toggle', onToggle);
    };
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const out = outputRef.current;
    if (out) out.scrollTop = out.scrollHeight;
  }, [lines]);

  const submit = () => {
    const raw = value;
    setValue('');
    setHistIdx(-1);
    if (raw.trim()) setHistory(h => [raw, ...h].slice(0, 50));

    const result = runCommand(raw, { close: () => setOpen(false) });
    if (result === 'CLEAR') {
      setLines([]);
      return;
    }
    setLines(prev => [...prev, line('cmd', raw), ...result]);
  };

  const onInputKey = e => {
    if (e.key === 'Enter') {
      submit();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const i = Math.min(histIdx + 1, history.length - 1);
      if (history[i] != null) { setHistIdx(i); setValue(history[i]); }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = histIdx - 1;
      setHistIdx(i < 0 ? -1 : i);
      setValue(i < 0 ? '' : history[i]);
    }
  };

  return (
    <div
      className={`${styles.shell} ${open ? styles.open : ''}`}
      onClick={() => inputRef.current?.focus()}
      role="dialog"
      aria-label="Hidden terminal"
      aria-hidden={!open}
    >
      <div className={styles.titlebar}>
        <span className={styles.dotR} /><span className={styles.dotY} /><span className={styles.dotG} />
        <span className={styles.title}>guest@bahaa — ~/portfolio</span>
        <span className={styles.escHint}>ESC to close</span>
      </div>

      <div className={styles.output} ref={outputRef}>
        {lines.map(l => (
          l.kind === 'cmd' ? (
            <div key={l.id} className={styles.cmdLine}>
              <span className={styles.prompt}>guest@bahaa:~$</span> {l.text}
            </div>
          ) : l.kind === 'link' ? (
            <div key={l.id} className={styles.outLine}>
              <a href={l.href} target={l.href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" className={styles.link}>
                {l.text}
              </a>
            </div>
          ) : (
            <div key={l.id} className={styles.outLine}>{l.text}</div>
          )
        ))}
      </div>

      <div className={styles.inputRow}>
        <span className={styles.prompt}>guest@bahaa:~$</span>
        <input
          ref={inputRef}
          className={styles.input}
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={onInputKey}
          spellCheck="false"
          autoComplete="off"
          autoCapitalize="off"
          aria-label="Terminal input"
          tabIndex={open ? 0 : -1}
        />
      </div>
    </div>
  );
}
