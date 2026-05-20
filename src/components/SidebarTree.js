import { Folder, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import ProfileImage from './ProfileImage';

const SidebarItem = ({ item, name, depth = 0, onSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isDirectory = item.type === 'directory';

  return (
    <div className="select-none" style={{ paddingLeft: `${depth * 12}px` }}>
      <button
        className="flex items-center py-1 w-full text-left cursor-pointer hover:bg-dracula-selection text-dracula-fg transition-colors outline-none focus:bg-dracula-selection"
        onClick={() => isDirectory ? setIsOpen(!isOpen) : onSelect(item)}
      >
        {isDirectory ? (
          <>
            {isOpen ? <ChevronDown size={14} className="mr-1 text-dracula-purple" /> : <ChevronRight size={14} className="mr-1 text-dracula-purple" />}
            <Folder size={14} className="mr-2 text-dracula-purple" fill="currentColor" />
          </>
        ) : (
          <FileText size={14} className="ml-4 mr-2 text-dracula-pink" />
        )}
        <span className={isDirectory ? 'font-bold' : ''}>{name}</span>
      </button>
      {isDirectory && isOpen && Object.entries(item.children).map(([childName, child]) => (
        <SidebarItem key={childName} name={childName} item={child} depth={depth + 1} onSelect={onSelect} />
      ))}
    </div>
  );};

export default function SidebarTree({ data, onSelect, lang }) {
  return (
    <nav className="w-72 border-r border-dracula-selection flex flex-col font-mono text-sm bg-dracula-bg overflow-hidden h-full transition-colors duration-300">
      <div className="p-6 border-b border-dracula-selection flex flex-col items-center">
        <ProfileImage 
          src="/profile_photo.png" 
          alt="Gustavo Saturnino" 
          size={80} 
        />
        <h2 className="mt-4 font-bold text-dracula-pink">Gustavo Saturnino</h2>
        <p className="text-xs text-dracula-comment text-center mt-1">
          Curious Talker
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <SidebarItem item={data.root} name="~" onSelect={onSelect} />
      </div>
    </nav>
  );
}
