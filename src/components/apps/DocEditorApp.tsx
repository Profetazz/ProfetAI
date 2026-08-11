import React, { useState } from 'react';
import { DocumentItem } from '../../types';
import { FileText, Sparkles, Save, Code, FileCode, Check, RefreshCw, Wand2 } from 'lucide-react';

interface DocEditorProps {
  docs: DocumentItem[];
  onUpdateDoc: (doc: DocumentItem) => void;
}

export default function DocEditorApp({ docs, onUpdateDoc }: DocEditorProps) {
  const [selectedDoc, setSelectedDoc] = useState<DocumentItem>(docs[0] || {
    id: 'doc-1',
    name: 'project_specifications.md',
    type: 'markdown',
    content: '# Sample Doc',
    size: '1 KB',
    updatedAt: Date.now()
  });

  const [aiPrompt, setAiPrompt] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [savedStatus, setSavedStatus] = useState(false);

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updated = { ...selectedDoc, content: e.target.value, updatedAt: Date.now() };
    setSelectedDoc(updated);
    onUpdateDoc(updated);
  };

  const handleAiEdit = () => {
    if (!aiPrompt.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const rewritten = `${selectedDoc.content}\n\n<!-- AI Modification: ${aiPrompt} -->\n- [x] Processed and optimized by Gemini OS Assistant on ${new Date().toLocaleTimeString()}`;
      const updated = { ...selectedDoc, content: rewritten, updatedAt: Date.now() };
      setSelectedDoc(updated);
      onUpdateDoc(updated);
      setIsProcessing(false);
      setAiPrompt('');
    }, 1500);
  };

  const handleSave = () => {
    setSavedStatus(true);
    setTimeout(() => setSavedStatus(false), 2000);
  };

  return (
    <div className="flex flex-col h-full bg-[#12141c] text-foreground p-4 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-lg font-bold">DocMaster AI 15</h1>
            <p className="text-xs text-muted-foreground">Modify & Refactor any Document or File</p>
          </div>
        </div>
        <button
          onClick={handleSave}
          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 text-black font-semibold rounded-xl text-xs flex items-center gap-1 shadow transition-all"
        >
          {savedStatus ? <Check className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
          {savedStatus ? 'Saved!' : 'Save File'}
        </button>
      </div>

      {/* Document Selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4 scrollbar-none">
        {docs.map((doc) => (
          <button
            key={doc.id}
            onClick={() => setSelectedDoc(doc)}
            className={`px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedDoc.id === doc.id
                ? 'bg-emerald-500 text-black font-bold shadow-lg shadow-emerald-500/20'
                : 'bg-[#1a1f2c] text-muted-foreground hover:text-white border border-border'
            }`}
          >
            {doc.type === 'markdown' ? <FileText className="w-3.5 h-3.5" /> : <FileCode className="w-3.5 h-3.5" />}
            {doc.name}
          </button>
        ))}
      </div>

      {/* AI Modification Bar */}
      <div className="bg-[#1a1f2c] p-3 rounded-2xl border border-border flex items-center gap-2 mb-4">
        <Wand2 className="w-4 h-4 text-emerald-400 shrink-0" />
        <input
          type="text"
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="Ask AI to modify document (e.g., Translate to Spanish, Format as tables, Summarize...)"
          className="flex-1 bg-transparent text-xs text-foreground focus:outline-none placeholder:text-muted-foreground"
        />
        <button
          onClick={handleAiEdit}
          disabled={isProcessing || !aiPrompt.trim()}
          className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black font-bold rounded-xl text-xs flex items-center gap-1 transition-all"
        >
          {isProcessing ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
          {isProcessing ? 'Refactoring...' : 'AI Edit'}
        </button>
      </div>

      {/* Document Editor Textarea */}
      <div className="flex-1 flex flex-col bg-[#1a1f2c] border border-border rounded-2xl overflow-hidden shadow-xl">
        <div className="bg-[#222838] px-3 py-1.5 border-b border-border flex items-center justify-between text-xs text-muted-foreground">
          <span>Editing: {selectedDoc.name}</span>
          <span>Size: {selectedDoc.size}</span>
        </div>
        <textarea
          value={selectedDoc.content}
          onChange={handleContentChange}
          className="flex-1 bg-[#10131b] p-4 font-mono text-xs text-emerald-300 focus:outline-none resize-none leading-relaxed"
          placeholder="File content..."
        />
      </div>
    </div>
  );
}
