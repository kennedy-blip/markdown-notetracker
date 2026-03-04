import { useState, useEffect } from 'react';
import Editor from './components/Editor';
import Preview from './components/Preview';
import Sidebar from './components/Sidebar';
import { calculateStats } from './utils/stats';
import { 
  Download, Moon, Sun, Maximize2, Minimize2, 
  Clock, Type, Hash, Sidebar as SidebarIcon 
} from 'lucide-react';

interface Note {
  id: string;
  title: string;
  content: string;
  lastModified: number;
}

export default function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const saved = localStorage.getItem('markdown-notes');
    return saved ? JSON.parse(saved) : [{ id: '1', title: 'First Note', content: '# Hello World', lastModified: Date.now() }];
  });
  
  const [activeNoteId, setActiveNoteId] = useState<string>(notes[0].id);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showSidebar, setShowSidebar] = useState(true);
  const [isFocusMode, setIsFocusMode] = useState(false);

  useEffect(() => {
    localStorage.setItem('markdown-notes', JSON.stringify(notes));
  }, [notes]);

  const activeNote = notes.find(n => n.id === activeNoteId) || notes[0];
  const stats = calculateStats(activeNote.content);

  const updateNoteContent = (newContent: string) => {
    setNotes(notes.map(n => n.id === activeNoteId ? { ...n, content: newContent, lastModified: Date.now() } : n));
  };

  const createNote = () => {
    const newNote: Note = {
      id: Date.now().toString(),
      title: 'New Note',
      content: '',
      lastModified: Date.now()
    };
    setNotes([newNote, ...notes]);
    setActiveNoteId(newNote.id);
  };

  const deleteNote = (id: string) => {
    if (notes.length === 1) return;
    const newNotes = notes.filter(n => n.id !== id);
    setNotes(newNotes);
    setActiveNoteId(newNotes[0].id);
  };

  const downloadNote = () => {
    const blob = new Blob([activeNote.content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${activeNote.title}.md`;
    a.click();
  };

  return (
    <div className={`flex h-screen transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      
      {showSidebar && !isFocusMode && (
        <Sidebar 
          notes={notes} 
          activeNoteId={activeNoteId} 
          onSelect={setActiveNoteId} 
          onCreate={createNote} 
          onDelete={deleteNote}
        />
      )}

      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="flex items-center justify-between px-6 py-3 border-b border-gray-700 bg-gray-800 text-white z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowSidebar(!showSidebar)} 
              className="p-1.5 hover:bg-gray-700 rounded text-gray-400"
              aria-label={showSidebar ? "Hide sidebar" : "Show sidebar"}
              title={showSidebar ? "Hide sidebar" : "Show sidebar"}
            >
              <SidebarIcon size={20} />
            </button>
            <input 
              className="bg-transparent border-none outline-none font-bold text-lg focus:ring-1 focus:ring-blue-500 rounded px-2 w-64"
              value={activeNote.title}
              aria-label="Note Title"
              placeholder="Enter note title..."
              onChange={(e) => setNotes(notes.map(n => n.id === activeNoteId ? {...n, title: e.target.value} : n))}
            />
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsFocusMode(!isFocusMode)} 
              className={`p-2 rounded transition-colors ${isFocusMode ? 'bg-blue-600 text-white' : 'hover:bg-gray-700 text-gray-400'}`}
              aria-label={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
              title={isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
            >
              {isFocusMode ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
            </button>
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)} 
              className="p-2 hover:bg-gray-700 rounded text-gray-400"
              aria-label="Toggle light/dark theme"
              title="Toggle light/dark theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button 
              onClick={downloadNote} 
              className="ml-2 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-4 py-1.5 rounded-lg text-sm font-medium transition-all active:scale-95 shadow-lg shadow-blue-900/20"
              aria-label="Export as Markdown"
              title="Export as Markdown"
            >
              <Download size={16} /> <span className="hidden md:inline">Export</span>
            </button>
          </div>
        </header>

        <main className="flex flex-1 overflow-hidden">
          <div className={`flex flex-col transition-all duration-500 ${isFocusMode ? 'w-full' : 'w-1/2'} border-r border-gray-700 bg-gray-900`}>
            <Editor value={activeNote.content} onChange={updateNoteContent} />
            
            <div className="flex items-center gap-6 px-4 py-2 bg-gray-800 border-t border-gray-700 text-[10px] uppercase tracking-widest font-bold text-gray-500">
              <span className="flex items-center gap-1.5"><Type size={12} /> {stats.words} Words</span>
              <span className="flex items-center gap-1.5"><Hash size={12} /> {stats.characters} Chars</span>
              <span className="flex items-center gap-1.5"><Clock size={12} /> {stats.readingTime} Min Read</span>
            </div>
          </div>

          {!isFocusMode && (
            <div className={`w-1/2 overflow-y-auto ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}>
              <Preview content={activeNote.content} isDarkMode={isDarkMode} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}