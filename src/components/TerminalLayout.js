import { Sun, Moon, Globe } from 'lucide-react';

export default function TerminalLayout({ children, sidebar, theme, setTheme, lang, setLang }) {
  return (
    <div className="flex h-screen w-screen bg-dracula-bg overflow-hidden text-dracula-fg transition-colors duration-300">
      {/* Sidebar */}
      {sidebar}
      
      {/* Terminal Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-dracula-selection px-4 py-2 border-b border-dracula-bg">
          <div className="flex space-x-2">
            <div className="h-3 w-3 rounded-full bg-dracula-red" />
            <div className="h-3 w-3 rounded-full bg-dracula-orange" />
            <div className="h-3 w-3 rounded-full bg-dracula-green" />
          </div>
          <div className="text-xs font-mono text-dracula-comment">gustavo-saturnino — -zsh</div>
          <div className="flex space-x-3 text-dracula-comment">
            <button 
              onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')} 
              className="hover:text-dracula-fg transition-colors flex items-center space-x-1"
              aria-label="Toggle Language"
            >
              <Globe size={14} />
              <span className="text-[10px] uppercase font-bold">{lang}</span>
            </button>
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="hover:text-dracula-fg transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            </button>
          </div>
        </div>
        
        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6 font-mono text-dracula-fg relative">
          {children}
        </main>
      </div>
    </div>
  );
}
