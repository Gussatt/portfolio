import { Sun, Moon, Globe, Menu, X } from 'lucide-react';
import { useState, cloneElement } from 'react';

export default function TerminalLayout({ children, sidebar, theme, setTheme, lang, setLang }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const closeSidebar = () => setIsSidebarOpen(false);

  return (
    <div className="flex h-screen w-screen bg-dracula-bg overflow-hidden text-dracula-fg transition-colors duration-300">
      {/* Sidebar - Mobile Overlay */}
      <div className={`
        fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden
        ${isSidebarOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
      `} onClick={closeSidebar} />

      {/* Sidebar Container */}
      <div className={`
        fixed inset-y-0 left-0 z-50 transform transition-transform lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {cloneElement(sidebar, { onClose: closeSidebar })}
      </div>
      
      {/* Terminal Main Area */}
      <div className="flex flex-1 flex-col overflow-hidden relative">
        {/* Header Bar */}
        <div className="flex items-center justify-between bg-dracula-selection px-4 py-2 border-b border-dracula-bg z-30">
          <div className="flex items-center space-x-3">
            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden p-1 -ml-1 text-dracula-comment hover:text-dracula-fg transition-colors"
              aria-label={isSidebarOpen ? 'Close Menu' : 'Open Menu'}
            >
              {isSidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <div className="hidden sm:flex space-x-2">
              <div className="h-3 w-3 rounded-full bg-dracula-red" />
              <div className="h-3 w-3 rounded-full bg-dracula-orange" />
              <div className="h-3 w-3 rounded-full bg-dracula-green" />
            </div>
            <div className="text-[10px] sm:text-xs font-mono text-dracula-comment truncate max-w-[150px] sm:max-w-none">
              gustavo-saturnino — -zsh
            </div>
          </div>

          <div className="flex items-center space-x-3 text-dracula-comment">
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
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 font-mono text-dracula-fg relative">
          {children}
        </main>
      </div>
    </div>
  );
}
