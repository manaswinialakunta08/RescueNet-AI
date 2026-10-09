import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  RotateCcw,
  Copy,
  Check,
  Plus,
  MessageSquare,
  Sparkles,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { mockKnowledgeBase } from '../data/mockData';

const createId = () => Date.now();
const getCurrentTimestamp = () =>
  new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    title: 'Monsoon Preparedness Protocol',
    updatedAt: '10:02 AM',
    messages: [
      {
        id: 1,
        sender: 'assistant',
        text: 'Hello! I am the RescueNet AI Assistant. I provide real-time guidance on flood risks, evacuation procedures, and disaster safety protocols. How can I help you today?',
        time: '10:00 AM'
      },
      {
        id: 2,
        sender: 'user',
        text: 'How do I prepare for a flood?',
        time: '10:01 AM'
      },
      {
        id: 3,
        sender: 'assistant',
        text: 'To prepare effectively before floodwaters rise:\n\n• Assemble a 72-hour waterproof "Go-Bag" with drinking water (3L/person/day), dry food rations, medications, and a flashlight.\n• Seal essential documents (Aadhaar, passports, property deeds) in airtight waterproof bags.\n• Identify elevated community rally points away from low-lying culverts.\n• Turn off main electrical switches and LPG cylinder valves before water enters.',
        time: '10:01 AM'
      }
    ]
  },
  {
    id: 'conv-2',
    title: 'River Discharge Warning Rules',
    updatedAt: 'Yesterday',
    messages: [
      {
        id: 1,
        sender: 'assistant',
        text: 'RescueNet AI Hydrological Rules active. Ask about river gauge thresholds, discharge metrics, or dam release notifications.',
        time: 'Yesterday'
      }
    ]
  },
  {
    id: 'conv-3',
    title: 'Hyderabad Musi Basin Swell',
    updatedAt: '2 days ago',
    messages: [
      {
        id: 1,
        sender: 'assistant',
        text: 'Telemetry records for Musi River Basin are synchronized. Ask for local inundation analysis.',
        time: '2 days ago'
      }
    ]
  }
];

const SUGGESTED_QUESTIONS = [
  {
    title: 'How do I prepare for a flood?',
    desc: 'Essential supplies & household checklist',
    prompt: 'How do I prepare for an impending flood?'
  },
  {
    title: 'What does High Risk (82%) mean?',
    desc: 'Explanation of probability and hazard scale',
    prompt: 'What does a High Risk 82% flood prediction mean?'
  },
  {
    title: 'What are the emergency helpline numbers?',
    desc: 'NDRF, SDMA, and municipal dispatch contacts',
    prompt: 'What are the emergency helpline numbers during a flood?'
  },
  {
    title: 'How to navigate safe evacuation routes?',
    desc: 'Guidelines for floodwater depth & vehicle safety',
    prompt: 'What are the safety guidelines for evacuating through floodwaters?'
  }
];

export default function AIAssistant() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState('conv-1');
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);
  const activeConversation =
    conversations.find((c) => c.id === activeConvId) || conversations[0] || null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages, isTyping]);

  const handleStartNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newChat = {
      id: newId,
      title: 'New Chat',
      updatedAt: 'Just now',
      messages: [
        {
          id: 1,
          sender: 'assistant',
          text: 'Hello! I am the RescueNet AI Assistant. How can I assist your disaster management query today?',
          time: getCurrentTimestamp()
        }
      ]
    };
    setConversations([newChat, ...conversations]);
    setActiveConvId(newId);
    setInputQuery('');
  };

  const handleClearChat = () => {
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              messages: [
                {
                  id: 1,
                  sender: 'assistant',
                  text: 'Chat cleared. How can I assist you with flood preparedness or emergency response?',
                  time: getCurrentTimestamp()
                }
              ]
            }
          : c
      )
    );
  };

  const handleSendPrompt = (promptText) => {
    if (!promptText.trim() || isTyping || !activeConversation) return;

    const userMessage = {
      id: createId(),
      sender: 'user',
      text: promptText,
      time: getCurrentTimestamp()
    };

    const isFirstQuery = activeConversation.messages.length <= 1;
    const newTitle = isFirstQuery
      ? promptText.length > 28
        ? `${promptText.slice(0, 28)}...`
        : promptText
      : activeConversation.title;

    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConvId
          ? {
              ...c,
              title: newTitle,
              updatedAt: 'Just now',
              messages: [...c.messages, userMessage]
            }
          : c
      )
    );

    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerQ = promptText.toLowerCase();
      let responseText =
        'As an emergency decision support system: When flood risk escalates, monitor verified directives from the State Disaster Management Authority (SDMA). Move family members to designated elevated assembly locations, disconnect gas and electrical mains, and under no circumstances drive through submerged roads.';

      for (const entry of mockKnowledgeBase) {
        if (entry.keywords.some((k) => lowerQ.includes(k))) {
          responseText = entry.answer;
          break;
        }
      }

      const botMessage = {
        id: createId() + 1,
        sender: 'assistant',
        text: responseText,
        time: getCurrentTimestamp()
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId
            ? { ...c, messages: [...c.messages, botMessage] }
            : c
        )
      );

      setIsTyping(false);
    }, 700);
  };

  const handleCopyMessage = (id, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-[#F8FAFC]">
      {/* Container Card with 2-Column Chat Layout */}
      <div className="rounded-2xl bg-white border border-[#E5E7F0] shadow-sm overflow-hidden flex flex-col md:flex-row h-[780px]">
        {/* ----------------- LEFT SIDEBAR (Panel 4) ----------------- */}
        <aside className="w-full md:w-72 border-r border-[#E5E7F0] bg-[#FFFFFF] flex flex-col justify-between shrink-0">
          <div>
            {/* Sidebar Top Header */}
            <div className="p-4 border-b border-[#E5E7F0] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F1EBFF] text-[#7047E8] flex items-center justify-center font-bold">
                  <Bot size={18} />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-[#17182B]">RescueNet AI</h2>
                  <span className="text-[10px] text-[#22A879] flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#22A879] inline-block" /> Online
                  </span>
                </div>
              </div>
            </div>

            {/* New Chat Button */}
            <div className="p-4">
              <button
                type="button"
                onClick={handleStartNewChat}
                className="w-full py-2.5 px-4 rounded-xl bg-[#7047E8] hover:bg-[#5E35D1] text-white text-xs font-semibold shadow-xs flex items-center justify-center gap-2 transition-all"
              >
                <Plus size={16} />
                <span>New Chat</span>
              </button>
            </div>

            {/* Recent Conversations List */}
            <div className="px-4 pb-2">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#686B7D] mb-2">
                Recent Conversations
              </h3>
              <div className="space-y-1">
                {conversations.map((conv) => {
                  const isActive = conv.id === activeConvId;
                  return (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => setActiveConvId(conv.id)}
                      className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                        isActive
                          ? 'bg-[#F1EBFF] text-[#7047E8] font-bold border border-[#7047E8]/20'
                          : 'text-[#686B7D] hover:bg-[#F8FAFC] hover:text-[#17182B]'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <MessageSquare size={14} className={isActive ? 'text-[#7047E8]' : 'text-[#686B7D]'} />
                        <span className="truncate">{conv.title}</span>
                      </div>
                      <span className="text-[10px] text-[#686B7D] shrink-0">{conv.updatedAt}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sidebar Footer info */}
          <div className="p-4 border-t border-[#E5E7F0] bg-[#F8FAFC] text-[11px] text-[#686B7D]">
            <div className="flex items-center gap-2">
              <ShieldCheck size={14} className="text-[#7047E8]" />
              <span>NDRF & CWC Knowledge Base</span>
            </div>
          </div>
        </aside>

        {/* ----------------- RIGHT CHAT AREA (Panel 4) ----------------- */}
        <div className="flex-1 flex flex-col justify-between bg-[#F8FAFC] min-w-0">
          {/* Chat Area Top Bar */}
          <div className="p-4 border-b border-[#E5E7F0] bg-white flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#F1EBFF] text-[#7047E8] flex items-center justify-center">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#17182B]">
                  RescueNet AI Disaster Intelligence
                </h3>
                <p className="text-[11px] text-[#686B7D]">
                  Active &bull; Hydrological Knowledge Base v1.4
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleClearChat}
              className="text-xs text-[#686B7D] hover:text-[#E5484D] flex items-center gap-1.5 p-2 rounded-lg hover:bg-[#F8FAFC] transition-colors"
              title="Clear conversation"
            >
              <RotateCcw size={14} />
              <span className="hidden sm:inline">Clear Chat</span>
            </button>
          </div>

          {/* Messages & Suggestions Scrollable Area */}
          <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-6">
            {/* Welcome Card & 4 Suggested Questions (Panel 4) */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-[#F1EBFF] border border-[#7047E8]/20 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#7047E8] text-white flex items-center justify-center shrink-0">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#17182B]">
                    Welcome to RescueNet AI Assistant
                  </h4>
                  <p className="text-xs text-[#686B7D] mt-1 leading-relaxed">
                    Ask questions about real-time flood preparedness, evacuation procedures, hydrological risk levels, and emergency relief workflows.
                  </p>
                </div>
              </div>

              {/* 4 Suggested Question Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SUGGESTED_QUESTIONS.map((item, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleSendPrompt(item.prompt)}
                    className="p-3.5 rounded-xl bg-white border border-[#E5E7F0] hover:border-[#7047E8] hover:shadow-xs transition-all text-left group"
                  >
                    <div className="text-xs font-bold text-[#17182B] group-hover:text-[#7047E8] flex items-center justify-between">
                      <span>{item.title}</span>
                      <ChevronRight size={14} className="text-[#686B7D] group-hover:text-[#7047E8]" />
                    </div>
                    <p className="text-[11px] text-[#686B7D] mt-1">{item.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Conversation Messages */}
            {activeConversation?.messages.map((msg) => {
              const isAssistant = msg.sender === 'assistant';
              return (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${isAssistant ? 'items-start' : 'items-start justify-end'}`}
                >
                  {isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-[#F1EBFF] text-[#7047E8] flex items-center justify-center shrink-0 mt-1">
                      <Bot size={16} />
                    </div>
                  )}

                  <div className={`relative max-w-xl group ${isAssistant ? '' : 'text-right'}`}>
                    <div
                      className={`p-4 rounded-2xl text-xs leading-relaxed ${
                        isAssistant
                          ? 'bg-white border border-[#E5E7F0] text-[#17182B] shadow-xs'
                          : 'bg-[#7047E8] text-white shadow-xs'
                      }`}
                    >
                      <div className="whitespace-pre-line">{msg.text}</div>
                    </div>

                    <div className="flex items-center gap-2 mt-1 px-1 text-[10px] text-[#686B7D]">
                      <span>{msg.time}</span>
                      {isAssistant && (
                        <button
                          type="button"
                          onClick={() => handleCopyMessage(msg.id, msg.text)}
                          className="hover:text-[#17182B] ml-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          {copiedId === msg.id ? <Check size={11} className="text-[#22A879]" /> : <Copy size={11} />}
                          <span>{copiedId === msg.id ? 'Copied' : 'Copy'}</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {!isAssistant && (
                    <div className="w-8 h-8 rounded-xl bg-[#7047E8] text-white flex items-center justify-center shrink-0 mt-1">
                      <User size={16} />
                    </div>
                  )}
                </div>
              );
            })}

            {isTyping && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-[#F1EBFF] text-[#7047E8] flex items-center justify-center">
                  <Bot size={16} />
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#E5E7F0] shadow-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#7047E8] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#7047E8] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#7047E8] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Bottom Message Input Bar */}
          <div className="p-4 bg-white border-t border-[#E5E7F0]">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendPrompt(inputQuery);
              }}
              className="flex items-center gap-3 bg-[#F8FAFC] border border-[#E5E7F0] rounded-xl p-1.5 focus-within:border-[#7047E8] transition-colors"
            >
              <input
                type="text"
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                placeholder="Ask about flood risks, safety protocols, evacuation..."
                className="flex-1 bg-transparent px-3 py-2 text-xs font-medium text-[#17182B] outline-none"
              />
              <button
                type="submit"
                disabled={!inputQuery.trim() || isTyping}
                className="p-2.5 rounded-lg bg-[#7047E8] hover:bg-[#5E35D1] text-white disabled:opacity-40 transition-colors shadow-xs"
                title="Send Message"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
