import { useState } from 'react';

export default function TerminalCommandInput({ onCommand, currentPath = '~' }) {
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      onCommand(input.trim());
      setInput('');
    }
  };

  return (
    <div className="mt-4 border-t border-dracula-selection pt-4">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <span className="text-dracula-green">gustavo@portfolio</span>
        <span className="text-dracula-fg">:</span>
        <span className="text-dracula-purple">{currentPath}</span>
        <span className="text-dracula-pink">$</span>
        <input
          autoFocus
          className="bg-transparent border-none outline-none flex-1 text-dracula-fg font-mono"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </div>
  );
}
