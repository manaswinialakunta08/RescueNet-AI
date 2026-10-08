import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  User,
  Sparkles,
  RotateCcw,
  ShieldAlert
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import { mockChatInitialMessages, mockKnowledgeBase } from '../data/mockData';

export default function AIAssistant() {
  const [messages, setMessages] = useState(mockChatInitialMessages);
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (e) => {
    if (e) e.preventDefault();
    const query = inputQuery.trim();
    if (!query) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputQuery('');
    setIsTyping(true);

    // Simulated Smart Decision Support Response
    setTimeout(() => {
      const lowerQ = query.toLowerCase();
      let responseText =
        'As an emergency decision support system: When flood risk escalates, monitor verified directives from the State Disaster Management Authority (SDMA). Move family members to designated elevated assembly locations, disconnect gas and electrical mains, and under no circumstances drive through submerged roads.';

      for (const entry of mockKnowledgeBase) {
        if (entry.keywords.some((k) => lowerQ.includes(k))) {
          responseText = entry.answer;
          break;
        }
      }

      const botMessage = {
        id: Date.now() + 1,
        sender: 'assistant',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 600);
  };

  const handleQuickPrompt = (promptText) => {
    setInputQuery(promptText);
  };

  const handleResetChat = () => {
    setMessages(mockChatInitialMessages);
    setInputQuery('');
  };

  const quickPrompts = [
    'What should I pack in an emergency flood kit?',
    'What precautions should I take if river discharge surges?',
    'Is it safe to drive through waterlogged roads?',
    'How do I prepare for mandatory evacuation?'
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      {/* Title */}
      <div>
        <SectionTitle
          badge="Natural Language Intelligence"
          title="RescueNet AI Assistant"
          subtitle="Ask questions about flood risk, preparedness, and emergency response."
        />

        {/* Integration Status Label */}
        <div className="rounded-2xl bg-[#F97316]/10 border border-[#F97316]/30 p-3.5 flex items-center justify-between flex-wrap gap-2 text-xs">
          <div className="flex items-center gap-2 text-[#FB923C] font-mono">
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              AI Assistant — Integration planned
            </span>
          </div>
          <span className="text-[#A1A1AA] font-mono text-[11px]">
            Client-side prototype interface &bull; LLM Agent connection in Phase 4
          </span>
        </div>
      </div>

      {/* Main Chat Interface Window */}
      <div className="rounded-3xl bg-[#171925] backdrop-blur-xl border border-white/[0.08] shadow-[0_20px_50px_rgba(8,9,15,0.9)] flex flex-col h-[640px] overflow-hidden">
        {/* Chat Window Header */}
        <div className="px-6 py-4 bg-[#0D0F17] border-b border-white/[0.08] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-br from-[#8B5CF6]/20 to-[#C084FC]/10 border border-[#8B5CF6]/40 flex items-center justify-center text-[#A78BFA] shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <span className="absolute inset-0 rounded-2xl bg-[#8B5CF6]/10 animate-pulse-ring" />
              <ShieldAlert size={20} className="relative z-10" />
            </div>
            <div>
              <div className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                <span>RescueNet AI Core</span>
                <span className="text-[9px] font-mono text-[#34D399] bg-[#34D399]/10 px-2 py-0.5 rounded-full border border-[#34D399]/20">
                  Online
                </span>
              </div>
              <p className="text-[11px] text-[#A1A1AA]">
                Trained on NDMA Disaster Guidelines & Hydrological SOPs
              </p>
            </div>
          </div>

          <button
            onClick={handleResetChat}
            className="text-xs text-[#A1A1AA] hover:text-white flex items-center gap-1.5 px-3 py-1.5 rounded-xl hover:bg-[#1D2030] border border-transparent hover:border-white/10 transition-colors cursor-pointer"
            title="Reset Conversation"
          >
            <RotateCcw size={13} />
            <span className="hidden sm:inline font-mono">Reset</span>
          </button>
        </div>

        {/* Chat Message History */}
        <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#08090F]/60">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'} animate-fade-in-up`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center text-xs font-bold ${
                    isUser
                      ? 'bg-[#C084FC]/20 text-[#C084FC] border border-[#C084FC]/40'
                      : 'bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/40'
                  }`}
                >
                  {isUser ? <User size={15} /> : <ShieldAlert size={15} />}
                </div>

                {/* Bubble */}
                <div className="space-y-1">
                  <div
                    className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line ${
                      isUser
                        ? 'bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] text-white font-medium rounded-tr-none shadow-[0_0_15px_rgba(139,92,246,0.25)]'
                        : 'bg-[#171925] text-[#F8FAFC] border border-white/[0.08] rounded-tl-none shadow-lg'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <div
                    className={`text-[10px] font-mono text-[#71717A] px-1 ${
                      isUser ? 'text-right' : 'text-left'
                    }`}
                  >
                    {msg.time}
                  </div>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex gap-3 max-w-md mr-auto">
              <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/20 text-[#A78BFA] border border-[#8B5CF6]/40 flex items-center justify-center shrink-0">
                <ShieldAlert size={15} />
              </div>
              <div className="p-3.5 rounded-2xl bg-[#171925] border border-white/[0.08] rounded-tl-none flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce [animation-delay:0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#A78BFA] animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Suggestions Chips */}
        <div className="px-6 py-2.5 bg-[#0D0F17] border-t border-white/[0.08] flex items-center gap-2 overflow-x-auto text-xs">
          <span className="text-[#A1A1AA] font-mono text-[10px] uppercase shrink-0 flex items-center gap-1">
            <Sparkles size={11} className="text-[#C084FC]" />
            Prompts:
          </span>
          {quickPrompts.map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickPrompt(prompt)}
              className="whitespace-nowrap px-3 py-1 rounded-full bg-[#171925] hover:bg-[#1D2030] hover:border-[#8B5CF6]/40 text-[#A1A1AA] hover:text-white border border-white/[0.08] text-[11px] font-mono transition-all shrink-0 cursor-pointer"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form
          onSubmit={handleSend}
          className="p-4 bg-[#0D0F17] border-t border-white/[0.08] flex items-center gap-3"
        >
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="Ask RescueNet AI about flood preparedness, evacuation, or risk metrics..."
            className="flex-1 px-4 py-3 rounded-2xl bg-[#171925] border border-white/10 text-white placeholder-[#71717A] text-sm focus:outline-none focus:border-[#8B5CF6] focus:ring-1 focus:ring-[#8B5CF6]/50 transition-all"
          />

          <button
            type="submit"
            disabled={!inputQuery.trim() || isTyping}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-40 text-white font-bold text-sm tracking-wide flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>Send</span>
            <Send size={15} />
          </button>
        </form>
      </div>
    </div>
  );
}
