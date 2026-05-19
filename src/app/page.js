'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TerminalLayout from '@/components/TerminalLayout';
import SidebarTree from '@/components/SidebarTree';
import TerminalCommandInput from '@/components/TerminalCommandInput';
import { portfolioData } from '@/data/portfolio';

export default function Home() {
  const [lang, setLang] = useState('pt');
  const [theme, setTheme] = useState('dark');
  const [selectedItem, setSelectedItem] = useState(null);
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Apply theme class to body
    document.body.classList.toggle('theme-light', theme === 'light');
  }, [theme]);

  // When language changes, clear selected item as paths might differ or content changes
  useEffect(() => {
    setSelectedItem(null);
  }, [lang]);

  const currentData = portfolioData[lang];

  const handleCommand = (cmd) => {
    const args = cmd.split(' ');
    const command = args[0].toLowerCase();

    let output = '';

    switch (command) {
      case 'cat':
        const fileName = args[1];
        if (!fileName) {
          output = lang === 'pt' ? 'cat: falta o operando arquivo' : 'cat: missing file operand';
        } else {
          const findFile = (obj) => {
            if (obj.type === 'file' && (obj.name === fileName || obj.name === `${fileName}.md`)) {
              return obj;
            }
            if (obj.children) {
              for (const child of Object.values(obj.children)) {
                const found = findFile(child);
                if (found) return found;
              }
            }
            return null;
          };
          const file = findFile(currentData.root);
          if (file) {
            setSelectedItem(file);
            output = lang === 'pt' ? `Lendo ${file.name}...` : `Reading ${file.name}...`;
          } else {
            output = lang === 'pt' ? `cat: ${fileName}: Arquivo ou diretório inexistente` : `cat: ${fileName}: No such file or directory`;
          }
        }
        break;
      case 'clear':
        setHistory([]);
        setSelectedItem(null);
        return;
      case 'help':
        output = lang === 'pt'
          ? 'Comandos disponíveis: cat, clear, help, whoami, date, lang [pt|en], theme [light|dark]'
          : 'Available commands: cat, clear, help, whoami, date, lang [pt|en], theme [light|dark]';
        break;
      case 'whoami':
        output = lang === 'pt'
          ? 'Gustavo Saturnino - Engenheiro de software.'
          : 'Gustavo Saturnino - Software Engineer.';
        break;
      case 'date':
        output = new Date().toString();
        break;
      case 'lang':
        if (args[1] === 'en' || args[1] === 'pt') {
          setLang(args[1]);
          output = args[1] === 'en' ? 'Language switched to English.' : 'Idioma alterado para Português.';
        } else {
          output = lang === 'pt' ? 'Uso: lang [pt|en]' : 'Usage: lang [pt|en]';
        }
        break;
      case 'theme':
        if (args[1] === 'light' || args[1] === 'dark') {
          setTheme(args[1]);
          output = lang === 'pt' ? `Tema alterado para ${args[1]}.` : `Theme switched to ${args[1]}.`;
        } else {
          output = lang === 'pt' ? 'Uso: theme [light|dark]' : 'Usage: theme [light|dark]';
        }
        break;
      default:
        output = lang === 'pt' ? `comando não encontrado: ${command}` : `command not found: ${command}`;
    }

    setHistory([...history, { cmd, output }]);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <TerminalLayout
      sidebar={<SidebarTree data={currentData} onSelect={setSelectedItem} lang={lang} />}
      theme={theme}
      setTheme={setTheme}
      lang={lang}
      setLang={setLang}
    >
      <div className="flex flex-col h-full">
        <div className="flex-1">
          {/* Render Selected Item */}
          <AnimatePresence mode="wait">
            {selectedItem && (
              <motion.div
                key={selectedItem.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-8 p-6 bg-dracula-selection bg-opacity-30 rounded-lg border border-dracula-selection"
              >
                <h1 className="text-3xl text-dracula-pink font-bold mb-4">{selectedItem.title}</h1>
                <p className="text-lg leading-relaxed mb-6">{selectedItem.content}</p>
                <div className="bg-dracula-selection p-4 rounded-lg mb-4 border-l-4 border-dracula-yellow shadow-inner">
                  <h2 className="text-dracula-yellow font-bold uppercase text-xs mb-2">
                    {lang === 'pt' ? 'Notas Técnicas' : 'Technical Notes'}
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    {selectedItem.learnings.map(l => (
                      <li key={l} className="flex items-center"><span className="text-dracula-green mr-2">➜</span> {l}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedItem.tech.map(t => (
                    <span key={t} className="bg-dracula-purple bg-opacity-20 text-dracula-purple px-2 py-1 rounded text-xs border border-dracula-purple border-opacity-30">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="space-y-3 mt-4">
            {history.map((h, i) => (
              <div key={i} className="font-mono text-sm">
                <div className="flex space-x-2">
                  <span className="text-dracula-green font-bold">gustavo@portfolio</span>
                  <span className="text-dracula-pink">$</span>
                  <span>{h.cmd}</span>
                </div>
                <div className="text-dracula-comment mt-1 ml-4 whitespace-pre-wrap">{h.output}</div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>
        </div>

        <TerminalCommandInput onCommand={handleCommand} />
      </div>
    </TerminalLayout>
  );
}
