import React, { useState } from 'react';
import { AI_KNOWLEDGE_BASE } from '../utils/oceanData';
import { MessageSquare, Sparkles, X, Send, Bot, Compass, ArrowDown } from 'lucide-react';
import { oceanAudio } from '../utils/soundEngine';

export default function OceanAIAssistant({ onJumpToDepth }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Greetings Explorer. I am ABYSS AI, your deep-sea oceanographic intelligence. Ask me anything about ocean zones, submersibles, or bioluminescence!'
    }
  ]);
  const [input, setInput] = useState('');

  const toggleOpen = () => {
    oceanAudio.playSonarPing();
    setIsOpen(!isOpen);
  };

  const handleSend = (textToSend) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    // Add user message
    const userMsg = { sender: 'user', text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    oceanAudio.playBubblePop();

    // Match query against knowledge base
    const lowerQuery = query.toLowerCase();
    let bestMatch = AI_KNOWLEDGE_BASE.find((k) =>
      k.keywords.some((kw) => lowerQuery.includes(kw))
    );

    let replyText = bestMatch
      ? bestMatch.response
      : 'Intriguing question! At depths below 1,000 meters, ocean life adapts through extreme bio-chemical mechanisms, specialized pressure-resistant cell membranes, and bioluminescence.';

    let actionTrigger = null;
    if (lowerQuery.includes('deepest') || lowerQuery.includes('hadal') || lowerQuery.includes('trench')) {
      actionTrigger = 'hadal';
    } else if (lowerQuery.includes('lab') || lowerQuery.includes('bio') || lowerQuery.includes('jellyfish') || lowerQuery.includes('glow')) {
      actionTrigger = 'biolab';
    } else if (lowerQuery.includes('twilight') || lowerQuery.includes('beginner')) {
      actionTrigger = 'twilight';
    } else if (lowerQuery.includes('submarine') || lowerQuery.includes('vessel')) {
      actionTrigger = 'midnight';
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: 'bot', text: replyText, actionTrigger }
      ]);
      oceanAudio.playSonarPing();
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="glass-panel-glow w-80 sm:w-96 p-5 rounded-3xl border border-cyan-400 shadow-2xl mb-4 space-y-4 animate-fade-in font-mono text-xs text-slate-100">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-cyan-900/60 pb-3">
            <div className="flex items-center space-x-2">
              <div className="w-7 h-7 rounded-full bg-cyan-400/20 border border-cyan-400 flex items-center justify-center text-cyan-300">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="font-bold text-white font-display">ABYSS OCEAN AI</div>
                <div className="text-[9px] text-cyan-400">ONLINE • DEEP TELEMETRY INTELLIGENCE</div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages History */}
          <div className="h-64 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 rounded-br-none'
                      : 'bg-slate-900/80 border border-slate-800 text-slate-200 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>

                {/* Optional Quick Action Trigger button inside message */}
                {m.actionTrigger && (
                  <button
                    onClick={() => {
                      onJumpToDepth(m.actionTrigger);
                      setIsOpen(false);
                    }}
                    className="mt-2 px-3 py-1.5 rounded-xl bg-cyan-400 text-slate-950 font-bold text-[10px] flex items-center gap-1 hover:brightness-110 shadow-[0_0_10px_#00f3ff]"
                  >
                    <ArrowDown className="w-3 h-3" />
                    <span>JUMP TO {m.actionTrigger.toUpperCase()} SECTION</span>
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Quick Prompt Suggestions */}
          <div className="space-y-1.5 pt-1">
            <div className="text-[9px] text-slate-400 uppercase">SUGGESTED PROMPTS</div>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => handleSend('Show me the deepest ocean zone.')}
                className="px-2.5 py-1 rounded-lg glass-card border border-cyan-500/30 text-[10px] text-cyan-300 hover:bg-cyan-500/20"
              >
                Deepest Zone?
              </button>
              <button
                onClick={() => handleSend('Which submarine is best for beginners?')}
                className="px-2.5 py-1 rounded-lg glass-card border border-cyan-500/30 text-[10px] text-cyan-300 hover:bg-cyan-500/20"
              >
                Beginner Submarine?
              </button>
              <button
                onClick={() => handleSend('Why do jellyfish glow?')}
                className="px-2.5 py-1 rounded-lg glass-card border border-cyan-500/30 text-[10px] text-cyan-300 hover:bg-cyan-500/20"
              >
                Why Glow?
              </button>
            </div>
          </div>

          {/* Input Box */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center space-x-2 pt-2 border-t border-slate-800"
          >
            <input
              type="text"
              placeholder="Ask about the ocean..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
            />
            <button
              type="submit"
              className="p-2 rounded-xl bg-cyan-400 text-slate-950 font-bold hover:brightness-110"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

        </div>
      )}

      {/* Main Glowing Orb Trigger Button */}
      <button
        onClick={toggleOpen}
        className="relative group p-4 rounded-full bg-gradient-to-tr from-cyan-400 via-blue-500 to-indigo-600 text-slate-950 shadow-[0_0_30px_rgba(0,243,255,0.6)] hover:scale-110 transition-all flex items-center justify-center"
        title="Talk to the Ocean AI"
      >
        <span className="absolute inset-0 rounded-full border border-cyan-300 animate-ping opacity-75"></span>
        <Sparkles className="w-6 h-6 text-slate-950 group-hover:rotate-45 transition-transform" />
      </button>

    </div>
  );
}
