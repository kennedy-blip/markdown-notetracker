import { FileText, Trash2, Plus } from 'lucide-react';

interface SidebarProps {
  notes: any[];
  activeNoteId: string;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
}

export default function Sidebar({ notes, activeNoteId, onSelect, onCreate, onDelete }: SidebarProps) {
  return (
    <nav className="w-64 bg-gray-800 border-r border-gray-700 flex flex-col" aria-label="Notes Sidebar">
      <div className="p-4 border-b border-gray-700 flex justify-between items-center">
        <h2 className="text-white font-bold uppercase text-xs tracking-widest">My Notes</h2>
        <button 
          onClick={onCreate} 
          className="p-1 hover:bg-gray-700 text-blue-400 rounded transition-colors"
          title="Create new note"
          aria-label="Create new note"
        >
          <Plus size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {notes.map(note => (
          <div 
            key={note.id}
            onClick={() => onSelect(note.id)}
            role="button"
            tabIndex={0}
            aria-selected={activeNoteId === note.id}
            onKeyDown={(e) => e.key === 'Enter' && onSelect(note.id)}
            className={`group flex items-center justify-between p-3 rounded cursor-pointer transition-all outline-none focus:ring-1 focus:ring-blue-500 ${
              activeNoteId === note.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20' : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <div className="flex items-center gap-2 truncate">
              <FileText size={16} />
              <span className="truncate text-sm font-medium">{note.title || "Untitled Note"}</span>
            </div>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                if(confirm('Delete this note?')) onDelete(note.id); 
              }}
              className="opacity-0 group-hover:opacity-100 p-1 hover:text-red-400 transition-opacity"
              title="Delete note"
              aria-label={`Delete note: ${note.title}`}
            >
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>
    </nav>
  );
}