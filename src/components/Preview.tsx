import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula, oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default function Preview({ content, isDarkMode }: { content: string; isDarkMode: boolean }) {
  return (
    <div className={`prose max-w-none p-8 transition-colors duration-300 ${isDarkMode ? 'prose-invert bg-gray-900' : 'prose-slate bg-white'}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          img: ({ src, alt }) => (
            <img 
              src={src} 
              alt={alt} 
              className="rounded-lg shadow-md max-h-[400px] object-contain mx-auto border border-gray-700" 
            />
          ),
          code({ inline, className, children, ...props }: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <SyntaxHighlighter
                style={isDarkMode ? dracula : oneLight}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={`${className} bg-gray-700 text-pink-400 px-1 rounded`} {...props}>
                {children}
              </code>
            );
          },
        }}
      >
        {content || "*No content to preview*"}
      </ReactMarkdown>
    </div>
  );
}