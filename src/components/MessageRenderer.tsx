import React from 'react';
import { useApp } from '../context/AppContext';

interface MessageRendererProps {
  content: string;
}

function parseMarkdown(text: string, darkMode: boolean): React.ReactNode[] {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;
  let key = 0;

  const getKey = () => `md-${key++}`;

  const parseInline = (text: string): React.ReactNode => {
    const parts: React.ReactNode[] = [];
    let remaining = text;
    let idx = 0;

    const patterns = [
      { regex: /\*\*([^*]+)\*\*/g, render: (m: string) => <strong key={getKey()} className="font-semibold">{m}</strong> },
      { regex: /\*([^*]+)\*/g, render: (m: string) => <em key={getKey()}>{m}</em> },
      { regex: /`([^`]+)`/g, render: (m: string) => (
        <code key={getKey()} className={`px-1.5 py-0.5 rounded text-xs font-mono ${darkMode ? 'bg-gray-700 text-green-400' : 'bg-gray-100 text-red-600'}`}>
          {m}
        </code>
      )},
      { regex: /\[([^\]]+)\]\(([^)]+)\)/g, render: (label: string, url: string) => (
        <a key={getKey()} href={url} target="_blank" rel="noopener noreferrer" className="text-[#14B8A6] hover:underline">
          {label}
        </a>
      )},
    ];

    let result = text;
    const segments: Array<{ start: number; end: number; node: React.ReactNode }> = [];

    patterns.forEach(pattern => {
      const re = new RegExp(pattern.regex.source, 'g');
      let match;
      while ((match = re.exec(result)) !== null) {
        const node = match[2] !== undefined
          ? (pattern.render as any)(match[1], match[2])
          : (pattern.render as any)(match[1]);
        segments.push({ start: match.index, end: match.index + match[0].length, node });
      }
    });

    segments.sort((a, b) => a.start - b.start);

    let pos = 0;
    const final: React.ReactNode[] = [];
    for (const seg of segments) {
      if (seg.start < pos) continue;
      if (seg.start > pos) final.push(result.slice(pos, seg.start));
      final.push(seg.node);
      pos = seg.end;
    }
    if (pos < result.length) final.push(result.slice(pos));

    return final.length > 0 ? <>{final}</> : text;
  };

  while (i < lines.length) {
    const line = lines[i];

    // Heading
    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={getKey()} className={`text-base font-bold mt-4 mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {parseInline(line.slice(4))}
        </h3>
      );
      i++;
      continue;
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={getKey()} className={`text-lg font-bold mt-4 mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {parseInline(line.slice(3))}
        </h2>
      );
      i++;
      continue;
    }

    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={getKey()} className={`text-xl font-bold mt-4 mb-2 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
          {parseInline(line.slice(2))}
        </h1>
      );
      i++;
      continue;
    }

    // Table
    if (line.includes('|') && lines[i + 1]?.includes('---')) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].includes('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      const headers = tableLines[0].split('|').filter(c => c.trim()).map(c => c.trim());
      const rows = tableLines.slice(2).map(row => row.split('|').filter(c => c.trim()).map(c => c.trim()));
      elements.push(
        <div key={getKey()} className="overflow-x-auto my-3">
          <table className={`min-w-full text-sm border-collapse rounded-lg overflow-hidden ${darkMode ? 'border-gray-700' : 'border-gray-200'} border`}>
            <thead>
              <tr className={darkMode ? 'bg-gray-800' : 'bg-gray-50'}>
                {headers.map((h, idx) => (
                  <th key={idx} className={`px-4 py-2.5 text-left font-semibold text-xs uppercase tracking-wide border-b ${darkMode ? 'border-gray-700 text-gray-300' : 'border-gray-200 text-gray-600'}`}>
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, ri) => (
                <tr key={ri} className={ri % 2 === 0 ? '' : darkMode ? 'bg-gray-800/30' : 'bg-gray-50/50'}>
                  {row.map((cell, ci) => (
                    <td key={ci} className={`px-4 py-2.5 border-b text-xs ${darkMode ? 'border-gray-700/50 text-gray-300' : 'border-gray-100 text-gray-700'}`}>
                      {parseInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      continue;
    }

    // Unordered list
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const listItems: string[] = [];
      while (i < lines.length && (lines[i].startsWith('- ') || lines[i].startsWith('* '))) {
        listItems.push(lines[i].slice(2));
        i++;
      }
      elements.push(
        <ul key={getKey()} className="my-2 space-y-1.5 list-none">
          {listItems.map((item, idx) => (
            <li key={idx} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6] mt-1.5 flex-shrink-0" />
              {parseInline(item)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Ordered list
    if (/^\d+\.\s/.test(line)) {
      const listItems: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        listItems.push(lines[i].replace(/^\d+\.\s/, ''));
        i++;
      }
      elements.push(
        <ol key={getKey()} className="my-2 space-y-1.5">
          {listItems.map((item, idx) => (
            <li key={idx} className={`flex items-start gap-2 text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              <span className={`font-bold text-[#0F4C81] min-w-[20px] ${darkMode ? 'text-blue-400' : ''}`}>{idx + 1}.</span>
              {parseInline(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Horizontal rule
    if (line === '---' || line === '***') {
      elements.push(<hr key={getKey()} className={`my-3 ${darkMode ? 'border-gray-700' : 'border-gray-200'}`} />);
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      elements.push(<div key={getKey()} className="h-2" />);
      i++;
      continue;
    }

    // Regular paragraph
    elements.push(
      <p key={getKey()} className={`text-sm leading-relaxed ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
        {parseInline(line)}
      </p>
    );
    i++;
  }

  return elements;
}

export default function MessageRenderer({ content }: MessageRendererProps) {
  const { darkMode } = useApp();
  return <div className="space-y-1">{parseMarkdown(content, darkMode)}</div>;
}
