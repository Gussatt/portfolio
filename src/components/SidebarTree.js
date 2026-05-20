'use client';

import { Folder, FileText, ChevronRight, ChevronDown } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProfileImage from './ProfileImage';

const SidebarItem = ({ item, name, depth = 0, onSelect }) => {
  const [isOpen, setIsOpen] = useState(true);
  const isDirectory = item.type === 'directory';
  const displayName = item.label || name;

  return (
    <div className="select-none" style={{ paddingLeft: `${depth * 12}px` }}>
      <button
        className="flex items-start py-1.5 w-full text-left cursor-pointer hover:bg-dracula-selection text-dracula-fg transition-colors outline-none focus:bg-dracula-selection"
        onClick={() => isDirectory ? setIsOpen(!isOpen) : onSelect(item)}
      >
        {isDirectory ? (
          <>
            <motion.div
              initial={false}
              animate={{ rotate: isOpen ? 0 : -90 }}
              transition={{ duration: 0.2 }}
              className="flex items-center mt-0.5"
            >
              <ChevronRight size={18} className="flex-shrink-0 mr-1 text-dracula-purple" />
            </motion.div>
            <Folder size={18} className="flex-shrink-0 mr-2 text-dracula-purple mt-0.5" fill="currentColor" />
          </>
        ) : (
          <FileText size={18} className="flex-shrink-0 ml-4 mr-2 text-dracula-pink mt-0.5" />
        )}
        <span className={`${isDirectory ? 'font-bold' : ''} leading-tight pt-0.5`}>{displayName}</span>
      </button>
      <AnimatePresence>
        {isDirectory && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {Object.entries(item.children).map(([childName, child]) => (
              <SidebarItem key={childName} name={childName} item={child} depth={depth + 1} onSelect={onSelect} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function SidebarTree({ data, onSelect, lang }) {
  const MIN_WIDTH = 260;
  const MAX_WIDTH = 520;
  const DEFAULT_WIDTH = 340;
  const [sidebarWidth, setSidebarWidth] = useState(DEFAULT_WIDTH);
  const isResizingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(DEFAULT_WIDTH);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (!isResizingRef.current) return;
      const delta = event.clientX - startXRef.current;
      const nextWidth = Math.min(MAX_WIDTH, Math.max(MIN_WIDTH, startWidthRef.current + delta));
      setSidebarWidth(nextWidth);
    };

    const handleMouseUp = () => {
      if (!isResizingRef.current) return;
      isResizingRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const handleResizeStart = (event) => {
    isResizingRef.current = true;
    startXRef.current = event.clientX;
    startWidthRef.current = sidebarWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  };

  return (
    <nav
      className="border-r border-dracula-selection flex flex-col font-mono text-sm bg-dracula-bg overflow-hidden h-full transition-colors duration-300 relative"
      style={{ width: `${sidebarWidth}px` }}
    >
      <div className="p-8 border-b border-dracula-selection flex flex-col items-center">
        <ProfileImage 
          src="/profile_photo.png" 
          alt="Gustavo Saturnino" 
          size={96} 
        />
        <h2 className="mt-5 text-lg font-bold text-dracula-pink">Gustavo Saturnino</h2>
        <p className="text-sm text-dracula-comment text-center mt-2">
          Curious Talker
        </p>
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <SidebarItem item={data.root} name="~" onSelect={onSelect} />
      </div>
      <div
        className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize bg-transparent hover:bg-dracula-selection/60 transition-colors"
        onMouseDown={handleResizeStart}
        role="separator"
        aria-label="Resize sidebar"
      />
    </nav>
  );
}
