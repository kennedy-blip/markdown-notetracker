interface EditorProps {
  value: string;
  onChange: (val: string) => void;
}

// We use 'export default' here directly on the function
export default function Editor({ value, onChange }: EditorProps) {
  return (
    <textarea
      className="w-full h-full p-6 bg-gray-900 text-gray-300 font-mono text-sm outline-none resize-none focus:ring-1 focus:ring-blue-500 transition-all"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Start typing markdown..."
      spellCheck={false}
    />
  );
}