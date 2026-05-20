import { useState, useEffect } from 'react';

export default function TerminalCommandInput({ onCommand, currentPath = '~', availableFiles = [], lang = 'en' }) {
  const [input, setInput] = useState('');
  const [suggestion, setSuggestion] = useState('');

  useEffect(() => {
    const parts = input.split(' ');
    if (parts[0] === 'cat' && parts[1] !== undefined) {
      const search = parts.slice(1).join(' ');
      if (search) {
        const found = availableFiles.find(f => f.startsWith(search));
        if (found && found !== search) {
          setSuggestion(found.slice(search.length));
        } else {
          setSuggestion('');
        }
      } else {
        setSuggestion('');
      }
    } else {
      setSuggestion('');
    }
  }, [input, availableFiles]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput('');
      setSuggestion('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowRight' && suggestion) {
      setInput(input + suggestion);
      setSuggestion('');
    }
  };

  return (
    <div className="mt-4 border-t border-dracula-selection pt-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2 relative">
        <span className="text-dracula-green">gustavo@portfolio</span>
        <span className="text-dracula-fg">:</span>
        <span className="text-dracula-purple">{currentPath}</span>
        <span className="text-dracula-pink">$</span>
        <div className="relative flex-1 flex items-center">
          <input
            autoFocus
            className="bg-transparent border-none outline-none flex-1 text-dracula-fg font-mono z-10"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck="false"
            autoComplete="off"
          />
          {suggestion && (
            <div className="absolute left-0 pointer-events-none text-dracula-comment font-mono flex">
              <span className="invisible whitespace-pre">{input}</span>
              <span>{suggestion}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
