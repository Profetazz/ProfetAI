import React, { useState } from 'react';
import { ChatMessage } from '../../types';
import { Sparkles, Send, Bot, User, Mic, ArrowRight } from 'lucide-react';

interface GeminiAssistantProps {
  messages: ChatMessage[];
  onSendMessage: (msg: ChatMessage) => void;
  onNavigate: (app: any) => void;
}

export default function GeminiAssistantApp({ messages, onSendMessage, onNavigate }: GeminiAssistantProps) {
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: input,
      timestamp: Date.now()
    };
    onSendMessage(userMsg);
    const query = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = `I analyzed your request about "${query}". I can help you build this right away in NexusOS 15!`;
      let actionCard = undefined;

      const lower = query.toLowerCase();
      if (lower.includes('crash') || lower.includes('stack') || lower.includes('zip') || lower.includes('ioexception') || lower.includes('archive') || lower.includes('exception')) {
        replyText = `I analyzed the crash report ("java.io.IOException: Archive is not a ZIP archive"). The issue occurs because the target APK file lacks valid ZIP magic bytes (PK\\x03\\x04). You can view the full diagnostic report and run 1-click repair in the Crash Inspector!`;
        actionCard = { type: 'apk' as const, title: 'Open Crash Inspector', id: 'crash-analyzer' };
      } else if (lower.includes('apk') || lower.includes('android') || lower.includes('app')) {
        replyText = `I have generated the Android APK project source code for "${query}". You can test and compile it in APK Studio!`;
        actionCard = { type: 'apk' as const, title: 'Open APK Studio', id: 'apk-studio' };
      } else if (lower.includes('web') || lower.includes('site') || lower.includes('page') || lower.includes('html')) {
        replyText = `I have built the website layout for "${query}". You can preview it live in WebForge AI!`;
        actionCard = { type: 'web' as const, title: 'Open WebForge', id: 'web-forge' };
      } else if (lower.includes('image') || lower.includes('photo') || lower.includes('draw')) {
        replyText = `I've prepared the prompt for your AI image generation in Nexus Canvas.`;
        actionCard = { type: 'image' as const, title: 'Open Image Studio', id: 'image-studio' };
      } else if (lower.includes('video') || lower.includes('film')) {
        replyText = `Ready to render your cinematic video in CineGen AI.`;
        actionCard = { type: 'video' as const, title: 'Open Video Suite', id: 'video-suite' };
      } else {
        replyText = `NexusOS 15 AI Assistant is fully operational with Gemini 3.6 Flash. What else would you like to create?`;
      }

      const geminiMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'gemini',
        text: replyText,
        timestamp: Date.now(),
        actionCard
      };
      onSendMessage(geminiMsg);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="flex flex-col h-full bg-[#12141c] text-foreground p-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 pb-3 border-b border-border">
        <div className="p-2 bg-emerald-500/20 text-emerald-400 rounded-xl">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold">Gemini AI OS Assistant</h1>
          <p className="text-xs text-muted-foreground">System Copilot • Android 15 Neural Engine</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col gap-3 pb-4 scrollbar-none">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-emerald-500/20 text-emerald-400'
            }`}>
              {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`p-3 rounded-2xl text-xs leading-relaxed ${
              msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-[#1a1f2c] border border-border text-gray-200 rounded-tl-none'
            }`}>
              <p>{msg.text}</p>
              {msg.actionCard && (
                <button
                  onClick={() => onNavigate(msg.actionCard?.id)}
                  className="mt-3 w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-black font-bold rounded-xl flex items-center justify-center gap-1.5 transition-all text-xs"
                >
                  <span>{msg.actionCard.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex gap-2 mr-auto items-center text-xs text-muted-foreground bg-[#1a1f2c] px-4 py-3 rounded-2xl border border-border">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-spin" />
            <span>Gemini is generating response...</span>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="relative mt-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask Gemini to create APK, website, image, or edit document..."
          className="w-full bg-[#1a1f2c] border border-border rounded-xl px-4 py-3 text-xs pr-20 text-foreground focus:outline-none focus:border-emerald-500"
        />
        <div className="absolute right-2 top-2 bottom-2 flex items-center gap-1">
          <button type="button" onClick={() => alert('Listening to voice prompt...')} className="p-1.5 hover:bg-white/10 rounded-lg text-muted-foreground" title="Voice Input">
            <Mic className="w-4 h-4" />
          </button>
          <button
            type="submit"
            disabled={!input.trim()}
            className="p-1.5 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-black rounded-lg transition-all"
            title="Send"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
}
