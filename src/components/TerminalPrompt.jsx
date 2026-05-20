export default function TerminalPrompt({ path = '~' }) {
  return (
    <div className="flex items-center space-x-2 font-mono">
      <span className="text-dracula-green hidden sm:inline">gustavo@portfolio</span>
      <span className="text-dracula-green sm:hidden">user</span>
      <span className="text-dracula-fg">:</span>
      <span className="text-dracula-purple">{path}</span>
      <span className="text-dracula-pink">$</span>
      <span className="w-2 h-5 bg-dracula-fg animate-pulse" />
    </div>
  );
}
