import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  User,
  Sparkles,
  RotateCcw,
  Copy,
  Check,
  Plus,
  Trash2,
  MoreVertical,
  Pin,
  PinOff,
  Paperclip,
  Settings,
  Share2,
  AlertTriangle,
  MessageSquare,
  Layers,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  Sliders
} from 'lucide-react';
import { mockKnowledgeBase } from '../data/mockData';

const INITIAL_CONVERSATIONS = [
  {
    id: 'conv-1',
    title: 'Monsoon Preparedness Protocol',
    pinned: true,
    category: 'Preparedness',
    updatedAt: '10:02 AM',
    messages: [
      {
        id: 1,
        sender: 'assistant',
        text: 'Hello. I am the RescueNet AI Assistant. I provide operational guidance on flood risk, preparedness protocols, and emergency response actions. How can I assist your team today?',
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
        text: 'To prepare effectively before floodwaters rise:\n\n• Identify elevated community rally points and safe evacuation corridors away from low-lying culverts.\n• Assemble a sealed waterproof "Go-Bag" with 72 hours of water, ready-to-eat rations, and first-aid supplies.\n• Protect essential identification, property deeds, and medical prescriptions in airtight dry bags.\n• Inspect household drainage traps and elevate ground-floor electronics and valuable items.',
        time: '10:01 AM'
      }
    ]
  },
  {
    id: 'conv-2',
    title: 'River Discharge Warning Rules',
    pinned: true,
    category: 'Hydrology',
    updatedAt: 'Yesterday',
    messages: [
      {
        id: 1,
        sender: 'assistant',
        text: 'RescueNet AI Hydrological Rules active. Ask about discharge thresholds, water levels, or dam releases.',
        time: 'Yesterday'
      },
      {
        id: 2,
        sender: 'user',
        text: 'What precautions should I take if river discharge surges?',
        time: 'Yesterday'
      },
      {
        id: 3,
        sender: 'assistant',
        text: 'Elevated river discharge (>3,000 m³/s) and rising water levels indicate substantial upstream runoff. Residents in riparian floodplains should observe river gauge markers and prepare for channel overspill within 2 to 6 hours.\n\n• Stay clear of riverbanks, dykes, and temporary sandbag embankments.\n• Prepare transport to move elderly family members and livestock to higher ground immediately.',
        time: 'Yesterday'
      }
    ]
  },
  {
    id: 'conv-3',
    title: 'Mithi River Basin Swell',
    pinned: false,
    category: 'Catchments',
    updatedAt: '2 days ago',
    messages: [
      {
        id: 1,
        sender: 'user',
        text: 'What does a high flood-risk level mean?',
        time: '2 days ago'
      },
      {
        id: 2,
        sender: 'assistant',
        text: 'A HIGH flood-risk level (66% - 85% probability) indicates:\n\n• Runoff volume is approaching or exceeding local stormwater drainage absorption capacity.\n• Upstream river discharge and rainfall accumulation are significantly above historical safe margins.\n• Low-lying floodplains, basements, and underpasses face imminent waterlogging within 3 to 6 hours.\n• Operational Recommendation: Stage emergency evacuation equipment and prepare to relocate vulnerable residents.',
        time: '2 days ago'
      }
    ]
  },
  {
    id: 'conv-4',
    title: 'Urban Waterlogging Mitigation',
    pinned: false,
    category: 'Urban',
    updatedAt: '3 days ago',
    messages: [
      {
        id: 1,
        sender: 'user',
        text: 'How can communities reduce flood damage?',
        time: '3 days ago'
      },
      {
        id: 2,
        sender: 'assistant',
        text: 'Communities can systematically mitigate flood devastation through:\n\n• Preserving natural wetland buffer zones and restoring urban water retention ponds.\n• Upgrading storm drainage networks and installing non-return backflow valves on coastal sluices.\n• Implementing granular sensor-based early warning networks and community flood barrier programs.\n• Enforcing strict zoning regulations preventing unauthorized construction on designated riparian floodplains.',
        time: '3 days ago'
      }
    ]
  }
];

const SUGGESTED_PROMPTS = [
  {
    title: 'How do I prepare for a flood?',
    desc: 'Key Go-Bag supplies, route planning, and household safeguards.'
  },
  {
    title: 'What does a high flood-risk level mean?',
    desc: 'Threshold definitions, lead time, and Stage 2 directives.'
  },
  {
    title: 'What should I do during heavy rainfall?',
    desc: 'Utility shutdowns, road safety, and elevation rules.'
  },
  {
    title: 'How can communities reduce flood damage?',
    desc: 'Wetland buffers, non-return valves, and drainage zoning.'
  }
];

export default function AIAssistant() {
  const [conversations, setConversations] = useState(INITIAL_CONVERSATIONS);
  const [activeConvId, setActiveConvId] = useState('conv-1');
  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [copiedMessageId, setCopiedMessageId] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [shareNotice, setShareNotice] = useState(false);
  const [activeNavTab, setActiveNavTab] = useState('chats'); // 'chats' | 'categories'

  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  const activeConversation =
    conversations.find((c) => c.id === activeConvId) || conversations[0] || null;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation?.messages, isTyping]);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveMenuId(null);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const handleStartNewChat = () => {
    const newId = `conv-${Date.now()}`;
    const newChat = {
      id: newId,
      title: 'New Chat',
      pinned: false,
      category: 'General',
      updatedAt: 'Just now',
      messages: []
    };
    setConversations((prev) => [newChat, ...prev]);
    setActiveConvId(newId);
    setInputQuery('');
    setIsMobileDrawerOpen(false);
    setTimeout(() => textareaRef.current?.focus(), 100);
  };

  const handleSelectConversation = (id) => {
    setActiveConvId(id);
    setIsMobileDrawerOpen(false);
  };

  const handleTogglePin = (id, e) => {
    e.stopPropagation();
    setConversations((prev) =>
      prev.map((conv) => (conv.id === id ? { ...conv, pinned: !conv.pinned } : conv))
    );
    setActiveMenuId(null);
  };

  const handleDeleteConversation = (id, e) => {
    e.stopPropagation();
    const remaining = conversations.filter((conv) => conv.id !== id);
    if (remaining.length === 0) {
      const fallbackId = `conv-${Date.now()}`;
      const fallbackChat = {
        id: fallbackId,
        title: 'New Chat',
        pinned: false,
        category: 'General',
        updatedAt: 'Just now',
        messages: []
      };
      setConversations([fallbackChat]);
      setActiveConvId(fallbackId);
    } else {
      setConversations(remaining);
      if (activeConvId === id) {
        setActiveConvId(remaining[0].id);
      }
    }
    setActiveMenuId(null);
  };

  const handleSend = (e) => {
    if (e) e.preventDefault();
    const query = inputQuery.trim();
    if (!query || isTyping || !activeConversation) return;

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const isFirstMessage = activeConversation.messages.length === 0;
    const newTitle = isFirstMessage
      ? query.length > 28
        ? `${query.slice(0, 28)}...`
        : query
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

    // Simulated Smart Response based on domain heuristics
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

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId
            ? {
                ...c,
                messages: [...c.messages, botMessage]
              }
            : c
        )
      );
      setIsTyping(false);
    }, 650);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleQuickPromptClick = (promptText) => {
    setInputQuery(promptText);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  const handleCopyMessage = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedMessageId(id);
    setTimeout(() => setCopiedMessageId(null), 2000);
  };

  const handleRetryLastMessage = () => {
    if (!activeConversation || isTyping) return;
    const msgs = activeConversation.messages;
    if (msgs.length === 0) return;

    let lastUserQuery = '';
    for (let i = msgs.length - 1; i >= 0; i--) {
      if (msgs[i].sender === 'user') {
        lastUserQuery = msgs[i].text;
        break;
      }
    }
    if (!lastUserQuery) return;

    setIsTyping(true);

    setTimeout(() => {
      const lowerQ = lastUserQuery.toLowerCase();
      let responseText =
        'Recalibrated Guidance: Maintain regular contact with district emergency operations rooms. Check that municipal stormwater culverts are free of blockages and heed all coastal flood advisories.';

      for (const entry of mockKnowledgeBase) {
        if (entry.keywords.some((k) => lowerQ.includes(k))) {
          responseText = entry.answer;
          break;
        }
      }

      const botMessage = {
        id: Date.now() + 2,
        sender: 'assistant',
        text: responseText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConvId
            ? {
                ...c,
                messages: [...c.messages, botMessage]
              }
            : c
        )
      );
      setIsTyping(false);
    }, 650);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareNotice(true);
    setTimeout(() => setShareNotice(false), 2500);
  };

  const pinnedConversations = conversations.filter((c) => c.pinned);
  const unpinnedConversations = conversations.filter((c) => !c.pinned);

  return (
    <div className="relative w-full h-[calc(100vh-80px)] min-h-[580px] bg-[#0D0F17] text-[#F8FAFC] flex overflow-hidden selection:bg-[#8B5CF6]/30 selection:text-white">
      {/* ------------------------------------------------------------------ */}
      {/* 1. LEFT SIDEBAR (OKAI STYLE)                                        */}
      {/* ------------------------------------------------------------------ */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 lg:static flex flex-col bg-[#11131C] border-r border-white/[0.08] transition-all duration-300 ease-in-out ${
          isSidebarOpen ? 'w-72 lg:w-80' : 'w-0 lg:w-0 -translate-x-full lg:translate-x-0'
        } ${isMobileDrawerOpen ? 'translate-x-0 !w-72' : ''}`}
        aria-label="Sidebar navigation"
      >
        <div className="flex flex-col h-full w-72 lg:w-80 overflow-hidden">
          {/* Top Brand & Collapse Control */}
          <div className="p-4 border-b border-white/[0.08] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-[#8B5CF6] to-[#C084FC] flex items-center justify-center text-white shadow-[0_0_15px_rgba(139,92,246,0.4)] shrink-0">
                <Bot size={18} />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-extrabold text-white tracking-tight font-mono">
                  RescueNet<span className="text-[#8B5CF6]">-AI</span>
                </span>
                <span className="text-[10px] font-mono text-[#A1A1AA] uppercase tracking-wider -mt-0.5">
                  OKAI Chat Core
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {/* Close Mobile Drawer */}
              <button
                onClick={() => setIsMobileDrawerOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                aria-label="Close sidebar drawer"
              >
                <X size={18} />
              </button>

              {/* Desktop Collapse Toggle */}
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="hidden lg:flex p-1.5 rounded-lg text-[#A1A1AA] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                title="Collapse sidebar"
                aria-label="Collapse sidebar"
              >
                <ChevronLeft size={18} />
              </button>
            </div>
          </div>

          {/* New Chat Button (Violet Gradient) */}
          <div className="p-4 pb-2 shrink-0">
            <button
              onClick={handleStartNewChat}
              className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#C084FC] hover:shadow-[0_0_20px_rgba(139,92,246,0.45)] text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md group"
            >
              <Plus size={16} className="group-hover:rotate-90 transition-transform duration-200" />
              <span>New Chat</span>
            </button>
          </div>

          {/* Navigation Items (Chats vs Categories) */}
          <div className="px-4 py-2 shrink-0">
            <div className="flex items-center p-1 rounded-xl bg-[#0D0F17] border border-white/[0.08] text-xs font-mono">
              <button
                onClick={() => setActiveNavTab('chats')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeNavTab === 'chats'
                    ? 'bg-[#171925] text-white font-bold shadow-sm'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                <MessageSquare size={13} />
                <span>Chats</span>
              </button>
              <button
                onClick={() => setActiveNavTab('categories')}
                className={`flex-1 py-1.5 rounded-lg text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeNavTab === 'categories'
                    ? 'bg-[#171925] text-white font-bold shadow-sm'
                    : 'text-[#A1A1AA] hover:text-white'
                }`}
              >
                <Layers size={13} />
                <span>Protocols</span>
              </button>
            </div>
          </div>

          {/* Scrollable Conversation List */}
          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-4 text-xs font-sans">
            {activeNavTab === 'chats' ? (
              <>
                {/* Pinned Section */}
                {pinnedConversations.length > 0 && (
                  <div className="space-y-1">
                    <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[#71717A] flex items-center gap-1.5">
                      <Pin size={11} className="text-[#C084FC]" />
                      <span>Pinned Conversations</span>
                    </div>

                    {pinnedConversations.map((conv) => {
                      const isActive = conv.id === activeConvId;
                      return (
                        <div
                          key={conv.id}
                          onClick={() => handleSelectConversation(conv.id)}
                          className={`relative group w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                            isActive
                              ? 'bg-[#1B1D29] text-white font-semibold border border-[#8B5CF6]/40 shadow-[0_0_12px_rgba(139,92,246,0.15)]'
                              : 'text-[#A1A1AA] hover:text-white hover:bg-[#171925] border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 truncate pr-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] shrink-0" />
                            <span className="truncate text-xs">{conv.title}</span>
                          </div>

                          {/* Action Options Button */}
                          <div className="relative shrink-0">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveMenuId(activeMenuId === conv.id ? null : conv.id);
                              }}
                              className="p-1 rounded text-[#71717A] hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-label="Options"
                            >
                              <MoreVertical size={13} />
                            </button>

                            {/* Dropdown Menu */}
                            {activeMenuId === conv.id && (
                              <div
                                onClick={(e) => e.stopPropagation()}
                                className="absolute right-0 top-7 z-50 w-36 py-1 rounded-xl bg-[#171925] border border-white/[0.08] shadow-2xl text-[11px] font-mono text-[#A1A1AA]"
                              >
                                <button
                                  onClick={(e) => handleTogglePin(conv.id, e)}
                                  className="w-full px-3 py-1.5 text-left hover:bg-white/5 hover:text-white flex items-center gap-2"
                                >
                                  <PinOff size={12} />
                                  <span>Unpin Chat</span>
                                </button>
                                <button
                                  onClick={(e) => handleDeleteConversation(conv.id, e)}
                                  className="w-full px-3 py-1.5 text-left hover:bg-white/5 hover:text-[#FF4D6D] flex items-center gap-2"
                                >
                                  <Trash2 size={12} />
                                  <span>Delete Chat</span>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Recent History Section */}
                <div className="space-y-1">
                  <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[#71717A]">
                    Recent Conversations
                  </div>

                  {unpinnedConversations.map((conv) => {
                    const isActive = conv.id === activeConvId;
                    return (
                      <div
                        key={conv.id}
                        onClick={() => handleSelectConversation(conv.id)}
                        className={`relative group w-full px-3 py-2.5 rounded-xl flex items-center justify-between text-left transition-all cursor-pointer ${
                          isActive
                            ? 'bg-[#1B1D29] text-white font-semibold border border-[#8B5CF6]/40 shadow-[0_0_12px_rgba(139,92,246,0.15)]'
                            : 'text-[#A1A1AA] hover:text-white hover:bg-[#171925] border border-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate pr-2">
                          <MessageSquare size={13} className="text-[#71717A] shrink-0" />
                          <span className="truncate text-xs">{conv.title}</span>
                        </div>

                        {/* Action Options Button */}
                        <div className="relative shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveMenuId(activeMenuId === conv.id ? null : conv.id);
                            }}
                            className="p-1 rounded text-[#71717A] hover:text-white hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Options"
                          >
                            <MoreVertical size={13} />
                          </button>

                          {/* Dropdown Menu */}
                          {activeMenuId === conv.id && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              className="absolute right-0 top-7 z-50 w-36 py-1 rounded-xl bg-[#171925] border border-white/[0.08] shadow-2xl text-[11px] font-mono text-[#A1A1AA]"
                            >
                              <button
                                onClick={(e) => handleTogglePin(conv.id, e)}
                                className="w-full px-3 py-1.5 text-left hover:bg-white/5 hover:text-white flex items-center gap-2"
                              >
                                <Pin size={12} />
                                <span>Pin Chat</span>
                              </button>
                              <button
                                onClick={(e) => handleDeleteConversation(conv.id, e)}
                                className="w-full px-3 py-1.5 text-left hover:bg-white/5 hover:text-[#FF4D6D] flex items-center gap-2"
                              >
                                <Trash2 size={12} />
                                <span>Delete Chat</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              /* Categories / Protocols View */
              <div className="space-y-2">
                <div className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-[#71717A]">
                  Disaster Directive Topics
                </div>
                {[
                  { name: 'Preparedness & Go-Bag', count: '4 SOPs', query: 'What should I pack in an emergency flood kit?' },
                  { name: 'Hydrological Risk Levels', count: '5 Guidelines', query: 'What does a high flood-risk level mean?' },
                  { name: 'Downpour Safety Rules', count: '6 Directives', query: 'What should I do during heavy rainfall?' },
                  { name: 'Community Defense', count: '4 Standards', query: 'How can communities reduce flood damage?' }
                ].map((cat, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      handleStartNewChat();
                      setInputQuery(cat.query);
                    }}
                    className="w-full p-2.5 rounded-xl bg-[#0D0F17] hover:bg-[#171925] border border-white/[0.05] hover:border-[#8B5CF6]/30 text-left transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between text-xs text-white font-medium">
                      <span>{cat.name}</span>
                      <span className="text-[10px] font-mono text-[#A78BFA]">{cat.count}</span>
                    </div>
                    <p className="text-[10px] text-[#71717A] mt-1 font-mono truncate">{cat.query}</p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bottom Profile Section */}
          <div className="p-4 border-t border-white/[0.08] bg-[#0D0F17] flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="relative w-9 h-9 rounded-full bg-gradient-to-tr from-[#8B5CF6]/30 to-[#C084FC]/20 border border-[#8B5CF6]/40 flex items-center justify-center text-[#A78BFA] shrink-0">
                <Bot size={18} />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#34D399] border-2 border-[#0D0F17]" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold text-white block truncate">
                  RescueNet AI Assistant
                </span>
                <span className="text-[10px] font-mono text-[#34D399] flex items-center gap-1">
                  <span>Demo Intelligence</span>
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowSettingsModal(true)}
              className="p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-[#171925] border border-transparent hover:border-white/10 transition-colors cursor-pointer"
              title="Agent Settings"
              aria-label="Agent settings"
            >
              <Settings size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Backdrop for Mobile Drawer */}
      {isMobileDrawerOpen && (
        <div
          onClick={() => setIsMobileDrawerOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden animate-fade-in"
          aria-hidden="true"
        />
      )}

      {/* ------------------------------------------------------------------ */}
      {/* 2. MAIN CHAT AREA (FLEXIBLE VIEWPORT FILL)                         */}
      {/* ------------------------------------------------------------------ */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative bg-[#0D0F17]" aria-label="Conversation workspace">
        {/* Subtle Atmospheric Lighting inspired by OKAI screenshot */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#8B5CF6]/[0.07] blur-[120px] pointer-events-none" aria-hidden="true" />
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#581c87]/[0.06] blur-[130px] pointer-events-none" aria-hidden="true" />
        <div className="absolute bottom-0 right-10 w-80 h-80 rounded-full bg-[#34D399]/[0.04] blur-[140px] pointer-events-none" aria-hidden="true" />

        {/* Top Header */}
        <header className="h-16 px-4 sm:px-6 border-b border-white/[0.08] bg-[#0D0F17]/90 backdrop-blur-md flex items-center justify-between shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            {/* Expand Sidebar Button (Desktop when collapsed) */}
            {!isSidebarOpen && (
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="hidden lg:flex p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-white/5 border border-white/[0.08] transition-colors cursor-pointer"
                title="Expand sidebar"
                aria-label="Expand sidebar"
              >
                <ChevronRight size={16} />
              </button>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileDrawerOpen(true)}
              className="lg:hidden p-2 rounded-xl text-[#A1A1AA] hover:text-white hover:bg-white/5 border border-white/[0.08] transition-colors cursor-pointer"
              aria-label="Open conversation sidebar"
            >
              <Menu size={18} />
            </button>

            <div>
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight flex items-center gap-2">
                <span>{activeConversation?.title || 'New Chat'}</span>
              </h2>
              <div className="flex items-center gap-2 text-[10px] font-mono text-[#A1A1AA]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
                <span>Heuristic Simulation Agent</span>
                <span>&bull;</span>
                <span className="text-[#C084FC]">NDMA Guidelines</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Share Button */}
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl bg-[#171925] hover:bg-[#1D2030] text-[#A1A1AA] hover:text-white border border-white/[0.08] text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer"
              title="Share conversation link"
            >
              {shareNotice ? (
                <>
                  <Check size={13} className="text-[#34D399]" />
                  <span className="text-[#34D399]">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 size={13} />
                  <span className="hidden sm:inline">Share</span>
                </>
              )}
            </button>
          </div>
        </header>

        {/* Life Safety Warning Strip */}
        <div className="px-4 py-2 bg-[#FF4D6D]/10 border-b border-[#FF4D6D]/20 flex items-center justify-between text-xs text-[#FF4D6D] shrink-0 font-mono">
          <div className="flex items-center gap-2 truncate">
            <AlertTriangle size={14} className="shrink-0" />
            <span className="truncate">
              <strong>Emergency Notice:</strong> In a life-threatening flood, call National Emergency 112 or SDMA 1070 immediately.
            </span>
          </div>
          <span className="hidden md:inline font-bold text-[10px] uppercase tracking-wider bg-[#FF4D6D]/20 px-2 py-0.5 rounded">
            Live Helplines Active
          </span>
        </div>

        {/* Message Thread Scroll Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 relative z-10" aria-label="Messages">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* If New Chat with 0 messages: Render OKAI Welcome State */}
            {activeConversation?.messages.length === 0 ? (
              <div className="py-8 sm:py-12 flex flex-col items-center justify-center text-center space-y-6 animate-fade-in">
                {/* Glowing AI Avatar */}
                <div className="relative w-20 h-20 rounded-3xl bg-gradient-to-br from-[#8B5CF6]/30 via-[#1B1D29] to-[#C084FC]/20 border border-[#8B5CF6]/50 flex items-center justify-center text-[#A78BFA] shadow-[0_0_35px_rgba(139,92,246,0.35)]">
                  <span className="absolute inset-0 rounded-3xl bg-[#8B5CF6]/15 animate-pulse-ring" />
                  <Bot size={38} className="relative z-10 text-white" />
                </div>

                <div className="space-y-2 max-w-lg">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    RescueNet AI Assistant
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    Trained on verified Indian hydrological protocols, NDMA directives, and standard flood mitigation operating procedures.
                  </p>
                </div>

                {/* 4 Suggested Question Cards from Reference */}
                <div className="w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4 text-left">
                  {SUGGESTED_PROMPTS.map((prompt, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickPromptClick(prompt.title)}
                      className="p-4 rounded-2xl bg-[#171925]/80 hover:bg-[#1D2030] border border-white/[0.08] hover:border-[#8B5CF6]/50 transition-all duration-200 group cursor-pointer shadow-lg hover:-translate-y-0.5"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Sparkles size={14} className="text-[#C084FC] group-hover:scale-110 transition-transform" />
                        <h4 className="text-xs font-bold text-white group-hover:text-[#A78BFA] transition-colors leading-snug">
                          {prompt.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-[#A1A1AA] leading-relaxed">
                        {prompt.desc}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Message Bubbles */
              activeConversation?.messages.map((msg) => {
                const isUser = msg.sender === 'user';
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'} animate-fade-in-up`}
                  >
                    {/* Assistant Avatar */}
                    {!isUser && (
                      <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex items-center justify-center text-white shrink-0 shadow-[0_0_12px_rgba(139,92,246,0.4)] mt-1">
                        <Bot size={16} />
                      </div>
                    )}

                    {/* Bubble Content */}
                    <div className={`space-y-1.5 max-w-[85%] sm:max-w-[78%] ${isUser ? 'items-end' : 'items-start'}`}>
                      <div
                        className={`p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed whitespace-pre-line shadow-lg ${
                          isUser
                            ? 'bg-[#382448] text-[#F8FAFC] rounded-tr-none font-medium border border-[#C084FC]/20'
                            : 'bg-[#1B1D29] text-[#F8FAFC] rounded-tl-none border border-white/[0.08]'
                        }`}
                      >
                        {msg.text}
                      </div>

                      {/* Bubble Subtext & Micro Actions */}
                      <div className={`flex items-center gap-2 text-[10px] font-mono text-[#71717A] px-1 ${isUser ? 'justify-end' : 'justify-start'}`}>
                        <span>{msg.time}</span>

                        {/* Copy & Retry actions for Assistant */}
                        {!isUser && (
                          <div className="flex items-center gap-1 ml-2">
                            <button
                              onClick={() => handleCopyMessage(msg.text, msg.id)}
                              className="p-1 rounded text-[#71717A] hover:text-white transition-colors cursor-pointer"
                              title="Copy response"
                              aria-label="Copy response"
                            >
                              {copiedMessageId === msg.id ? (
                                <Check size={12} className="text-[#34D399]" />
                              ) : (
                                <Copy size={12} />
                              )}
                            </button>

                            <button
                              onClick={handleRetryLastMessage}
                              className="p-1 rounded text-[#71717A] hover:text-white transition-colors cursor-pointer"
                              title="Retry / Regenerate response"
                              aria-label="Retry response"
                            >
                              <RotateCcw size={12} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* User Avatar */}
                    {isUser && (
                      <div className="w-8 h-8 rounded-full bg-[#382448] border border-[#C084FC]/30 flex items-center justify-center text-[#C084FC] shrink-0 mt-1">
                        <User size={15} />
                      </div>
                    )}
                  </div>
                );
              })
            )}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex gap-3 sm:gap-4 items-start" aria-live="polite">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#8B5CF6] to-[#C084FC] flex items-center justify-center text-white shrink-0 mt-1 shadow-md">
                  <Bot size={16} />
                </div>
                <div className="p-4 rounded-2xl bg-[#1B1D29] border border-white/[0.08] rounded-tl-none flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#A78BFA] animate-bounce [animation-delay:0.4s]" />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* 3. MESSAGE COMPOSER (WIDE DARK ROUNDED CARD #242630)                */}
        {/* ------------------------------------------------------------------ */}
        <div className="p-4 sm:p-6 pt-2 shrink-0 relative z-20">
          <div className="max-w-4xl mx-auto space-y-2">
            <form
              onSubmit={handleSend}
              className="rounded-3xl bg-[#242630] border border-white/[0.08] focus-within:border-[#8B5CF6]/50 focus-within:shadow-[0_0_25px_rgba(139,92,246,0.25)] transition-all p-3 sm:p-3.5 flex flex-col gap-2 shadow-2xl"
            >
              {/* Text Input Area */}
              <textarea
                ref={textareaRef}
                value={inputQuery}
                onChange={(e) => setInputQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                placeholder="Ask about flood risks, preparedness, or disaster response..."
                className="w-full bg-transparent text-white placeholder-[#71717A] text-xs sm:text-sm resize-none focus:outline-none px-2 leading-relaxed font-sans"
                aria-label="Ask RescueNet AI about flood risks"
              />

              {/* Bottom Composer Controls */}
              <div className="flex items-center justify-between pt-1 border-t border-white/[0.05]">
                {/* Left Attachment / Tools icons */}
                <div className="flex items-center gap-1 text-[#71717A]">
                  <button
                    type="button"
                    onClick={() => setInputQuery((prev) => `${prev} [Attachment: Hydrological Sensor Reading]`)}
                    className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
                    title="Simulate Telemetry Attachment"
                    aria-label="Attach data file"
                  >
                    <Paperclip size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickPromptClick('What does a high flood-risk level mean?')}
                    className="p-1.5 rounded-lg hover:text-[#C084FC] hover:bg-white/5 transition-colors cursor-pointer hidden sm:inline"
                    title="Insert Suggested Question"
                    aria-label="Suggest flood question"
                  >
                    <Sparkles size={16} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setShowSettingsModal(true)}
                    className="p-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-colors cursor-pointer hidden sm:inline"
                    title="Adjust Agent Tone"
                    aria-label="Adjust agent tone"
                  >
                    <Sliders size={16} />
                  </button>
                </div>

                {/* Send Button with Violet Gradient */}
                <button
                  type="submit"
                  disabled={!inputQuery.trim() || isTyping}
                  className="px-5 py-2.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] disabled:opacity-40 text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center gap-2 transition-all cursor-pointer shadow-md disabled:cursor-not-allowed"
                  aria-label="Send message"
                >
                  <span>Send</span>
                  <Send size={14} />
                </button>
              </div>
            </form>

            {/* Composer Footer Note */}
            <div className="flex items-center justify-between text-[10px] font-mono text-[#71717A] px-2">
              <span>Shift + Enter for new line &bull; Local Heuristics Prototype</span>
              <span className="hidden sm:inline">NDMA &bull; CWC Framework</span>
            </div>
          </div>
        </div>
      </main>

      {/* ------------------------------------------------------------------ */}
      {/* 4. SETTINGS MODAL                                                  */}
      {/* ------------------------------------------------------------------ */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="w-full max-w-md rounded-3xl bg-[#171925] border border-white/[0.08] p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <Settings size={18} className="text-[#8B5CF6]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  RescueNet AI Agent Settings
                </h3>
              </div>
              <button
                onClick={() => setShowSettingsModal(false)}
                className="p-1.5 rounded-lg text-[#71717A] hover:text-white hover:bg-white/5 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <div className="space-y-3 text-xs text-[#A1A1AA]">
              <div className="p-3 rounded-2xl bg-[#0D0F17] border border-white/[0.08] space-y-1">
                <span className="text-white font-bold block font-mono">Agent Operational Mode</span>
                <p className="text-[11px]">
                  Local Heuristic Decision Support (Rule-based hydrological response engine).
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#0D0F17] border border-white/[0.08] space-y-1">
                <span className="text-white font-bold block font-mono">Knowledge Domain</span>
                <p className="text-[11px]">
                  National Disaster Management Authority (NDMA) Standard Operating Procedures & Indian River Catchment SOPs.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#0D0F17] border border-white/[0.08] space-y-1">
                <span className="text-white font-bold block font-mono">Integration Roadmap</span>
                <p className="text-[11px]">
                  Scheduled connection to Spring Boot 3 REST APIs and Python LangChain / LLM pipeline in Phase 4.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setShowSettingsModal(false)}
                className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] text-white font-bold text-xs font-mono uppercase tracking-wider transition-all"
              >
                Save & Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
