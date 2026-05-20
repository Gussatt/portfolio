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
  // Get about file for the current language
  const aboutFile = portfolioData[lang].root.children.about;
  const [selectedItem, setSelectedItem] = useState(aboutFile || null);
  const [history, setHistory] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    // Apply theme class to body
    document.body.classList.toggle('theme-light', theme === 'light');
  }, [theme]);

  // Derived state: get the item to display based on the selected name and current language
  const displayedItem = (() => {
    if (!selectedItem) return null;
    
    const findFileByName = (obj, name) => {
      if (obj.type === 'file' && obj.name === name) return obj;
      if (obj.children) {
        for (const child of Object.values(obj.children)) {
          const found = findFileByName(child, name);
          if (found) return found;
        }
      }
      return null;
    };
    
    return findFileByName(portfolioData[lang].root, selectedItem.name);
  })();

  const currentData = portfolioData[lang];

  const handleCommand = (cmd) => {
    const args = cmd.split(' ');
    const command = args[0].toLowerCase();
    let output = '';

    switch (command) {
      case 'cat': {
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
      }
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

    setHistory(prev => [...prev, { cmd, output }]);
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
            {displayedItem && (
              <motion.div
                key={displayedItem.name}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-6 sm:mb-8 p-4 sm:p-6 bg-dracula-selection/30 rounded-lg border border-dracula-selection"
              >
                <h1 className="text-2xl sm:text-3xl text-dracula-pink font-bold mb-3 sm:mb-4">{displayedItem.title}</h1>
                <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6 whitespace-pre-wrap">{displayedItem.content}</p>
                <div className="bg-dracula-selection p-4 rounded-lg mb-4 border-l-4 border-dracula-yellow shadow-inner">
                  <h2 className="text-dracula-yellow font-bold uppercase text-xs mb-2">
                    {lang === 'pt' ? 'Notas Técnicas' : 'Technical Notes'}
                  </h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-1 text-sm">
                    {displayedItem.learnings.map(l => (
                      <li key={l} className="flex items-center"><span className="text-dracula-green mr-2">➜</span> {l}</li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-wrap gap-2 items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {displayedItem.tech.map(t => (
                      <span key={t} className="bg-dracula-purple/20 text-dracula-purple px-2 py-1 rounded text-xs border border-dracula-purple/30 font-bold">
                        {t}
                      </span>
                    ))}
                  </div>
                  {displayedItem.url && (
                    <a 
                      href={displayedItem.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-xs text-dracula-cyan hover:underline flex items-center space-x-1"
                    >
                      <span>{lang === 'pt' ? 'Ver Repositório' : 'Visit Repository'}</span>
                      <span className="text-[10px]">↗</span>
                    </a>
                  )}
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

        <div className="flex-shrink-0">
          <TerminalCommandInput 
            onCommand={handleCommand} 
            availableFiles={Object.values(currentData.root.children).reduce((acc, curr) => {
              const getFiles = (obj) => {
                if (obj.type === 'file') return [obj.name];
                if (obj.children) return Object.values(obj.children).flatMap(getFiles);
                return [];
              };
              return [...acc, ...getFiles(curr)];
            }, [])}
            lang={lang}
          />
          <div className="mt-2 text-[10px] text-dracula-comment font-mono flex items-center space-x-2">
            <span className="bg-dracula-selection px-1 rounded text-dracula-yellow">TIP:</span>
            <span>{lang === 'pt' ? 'Comandos: cat [arquivo], help, whoami, date, lang [pt|en], theme [light|dark], clear' : 'Commands: cat [file], help, whoami, date, lang [pt|en], theme [light|dark], clear'}</span>
          </div>
        </div>
      </div>
    </TerminalLayout>
  );
}
