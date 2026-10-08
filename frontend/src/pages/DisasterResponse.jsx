import React, { useState } from 'react';
import {
  LifeBuoy,
  PhoneCall,
  CheckSquare,
  Square,
  AlertTriangle,
  Info,
  ShieldCheck,
  AlertOctagon,
  Copy,
  Check,
  Radio,
  FileText,
  Compass
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import RiskBadge from '../components/RiskBadge';
import {
  mockDisasterContacts,
  mockSafetyChecklist
} from '../data/mockData';

export default function DisasterResponse() {
  const [checklist, setChecklist] = useState(mockSafetyChecklist);
  const [copiedPhone, setCopiedPhone] = useState(null);
  const [activeRiskTab, setActiveRiskTab] = useState('HIGH');

  const toggleChecklistItem = (id) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, defaultChecked: !item.defaultChecked } : item
      )
    );
  };

  const completedCount = checklist.filter((item) => item.defaultChecked).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const handleCopyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const riskProtocolContent = {
    LOW: {
      title: 'Phase 1: Routine Baseline Protocol (0% - 30%)',
      badge: 'LOW RISK',
      color: 'text-[#34D399]',
      actionTitle: 'Preventative & Routine Household Readiness',
      items: [
        'Inspect household drainage gullies and remove accumulated debris or dry foliage.',
        'Review community elevation maps and verify family emergency muster points.',
        'Replenish first-aid consumables and verify expiry on emergency dry rations.',
        'Check that local flood SMS alerts are activated on mobile network carriers.'
      ]
    },
    MODERATE: {
      title: 'Phase 2: Active Advisory Watch Protocol (31% - 65%)',
      badge: 'MODERATE RISK',
      color: 'text-[#FBBF24]',
      actionTitle: 'Precautionary Protection & Telemetry Monitoring',
      items: [
        'Secure external livestock, machinery, and non-essential outdoor equipment.',
        'Move ground-floor electronics, carpets, and valuable documentation to first floor/upper shelves.',
        'Ensure vehicles are fully fueled and parked in elevated driveways or garages.',
        'Monitor local Central Water Commission (CWC) and district emergency broadcasts twice daily.'
      ]
    },
    HIGH: {
      title: 'Phase 3: High Threat Preparedness Protocol (66% - 85%)',
      badge: 'HIGH RISK',
      color: 'text-[#F97316]',
      actionTitle: 'Imminent Inundation Mitigation & Movement Restriction',
      items: [
        'Pack designated waterproof "Go-Bag" with essential medication, IDs, and power banks.',
        'Turn off primary electrical circuit breaker and LPG/piped gas valves before water ingress.',
        'Never attempt to drive or walk through standing or flowing water — Turn Around, Don\'t Drown.',
        'Prepare to relocate elderly family members, children, and pets to designated shelter points.'
      ]
    },
    CRITICAL: {
      title: 'Phase 4: Emergency Evacuation Protocol (86% - 100%)',
      badge: 'CRITICAL ALERT',
      color: 'text-[#FF4D6D]',
      actionTitle: 'Immediate Life-Safety Evacuation Execution',
      items: [
        'Follow mandatory evacuation orders from NDRF and District Magistrates immediately.',
        'Move along predefined elevated evacuation corridors only; avoid culverts, bridges, and underpasses.',
        'Carry whistle and LED flashlight to signal rescue boats and aerial search units.',
        'Report in at nearest official relief center to confirm survival registry for family reunification.'
      ]
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Title */}
      <div>
        <SectionTitle
          badge="Emergency Action Center"
          title="Disaster Response & Emergency Management"
          subtitle="Standard operating procedures, household readiness checklists, and emergency agency escalation matrices."
        />

        <div className="rounded-2xl bg-[#171925] border border-white/[0.08] p-4 flex items-start gap-3 text-xs text-[#A1A1AA]">
          <Info size={18} className="text-[#A78BFA] shrink-0 mt-0.5" />
          <p className="text-[#A1A1AA]">
            Emergency guidance is compiled following National Disaster Management Authority (NDMA) protocols. Helplines are formatted for rapid response simulation.
          </p>
        </div>
      </div>

      {/* ----------------- 1. EMERGENCY PREPAREDNESS PRINCIPLES ----------------- */}
      <section className="space-y-4">
        <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
          <LifeBuoy size={20} className="text-[#8B5CF6]" />
          Core Emergency Preparedness Directives
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {[
            {
              title: 'Move to Elevated Ground',
              desc: 'Relocate to higher floors or higher-elevation zones whenever warning flags are hoisted.',
              icon: Compass
            },
            {
              title: 'Follow Official Orders',
              desc: 'Adhere strictly to official evacuation bulletins broadcast by District Magistrates or NDRF.',
              icon: ShieldCheck
            },
            {
              title: 'Keep Supplies Ready',
              desc: 'Pre-pack sealed waterproof go-bags containing 72 hours of water, food, and essentials.',
              icon: FileText
            },
            {
              title: 'Avoid Flooded Roads',
              desc: 'Never walk or drive into standing or moving water; unseen sinkholes and live cables pose fatal hazards.',
              icon: AlertTriangle
            },
            {
              title: 'Monitor Official Alerts',
              desc: 'Keep mobile devices charged and tune in to battery-powered radios for official river stage bulletins.',
              icon: Radio
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-[#171925] hover:bg-[#1D2030] backdrop-blur-md border border-white/[0.08] p-5 flex flex-col justify-between hover:border-[#8B5CF6]/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="p-2.5 rounded-2xl bg-[#0D0F17] border border-white/[0.08] w-fit text-[#A78BFA] mb-3 group-hover:scale-110 transition-transform">
                    <Icon size={18} />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ----------------- 2. SAFETY CHECKLIST & RESPONSE TABS ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Safety Checklist */}
        <div className="lg:col-span-5 rounded-3xl bg-[#171925] backdrop-blur-md border border-white/[0.08] p-6 sm:p-7 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <CheckSquare size={16} className="text-[#34D399]" />
                Personal Safety Checklist
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                Interactive verification for household readiness
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-[#34D399] bg-[#34D399]/10 px-2.5 py-0.5 rounded-full border border-[#34D399]/30">
              {completedCount}/{checklist.length} Complete
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-[#A1A1AA]">
              <span>Readiness Score</span>
              <span className="text-white font-bold">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#0D0F17] h-2 rounded-full overflow-hidden border border-white/[0.08]">
              <div
                className="bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] h-full transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Checkbox Items */}
          <div className="space-y-2 pt-1">
            {checklist.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => toggleChecklistItem(item.id)}
                className={`w-full text-left p-3 rounded-2xl border text-xs flex items-start gap-3 transition-all cursor-pointer ${
                  item.defaultChecked
                    ? 'bg-[#0D0F17] border-[#34D399]/30 text-slate-200'
                    : 'bg-[#0D0F17]/50 border-white/[0.08] text-[#A1A1AA] hover:border-white/20'
                }`}
              >
                <div className="mt-0.5 shrink-0">
                  {item.defaultChecked ? (
                    <CheckSquare size={16} className="text-[#34D399]" />
                  ) : (
                    <Square size={16} className="text-[#71717A]" />
                  )}
                </div>
                <span className={item.defaultChecked ? 'line-through text-[#71717A]' : 'text-[#F8FAFC]'}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-2 text-[11px] font-mono text-[#71717A] flex justify-between">
            <span>Check items as completed in your household</span>
            <button
              onClick={() =>
                setChecklist((prev) => prev.map((i) => ({ ...i, defaultChecked: false })))
              }
              className="text-[#A1A1AA] hover:text-white underline underline-offset-2 cursor-pointer"
            >
              Reset list
            </button>
          </div>
        </div>

        {/* Response Recommendation by Risk Level Tabs */}
        <div className="lg:col-span-7 rounded-3xl bg-[#171925] backdrop-blur-md border border-white/[0.08] p-6 sm:p-7 shadow-2xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <AlertOctagon size={16} className="text-[#FB923C]" />
                Response Recommendation by Threat Tier
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                Standard operating procedures mapped to calibrated probability bands.
              </p>
            </div>
          </div>

          {/* Tier Selector Buttons */}
          <div className="grid grid-cols-4 gap-2">
            {['LOW', 'MODERATE', 'HIGH', 'CRITICAL'].map((lvl) => {
              const isActive = activeRiskTab === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setActiveRiskTab(lvl)}
                  className={`py-2 px-2 text-center rounded-xl text-xs font-mono font-bold tracking-wider transition-all cursor-pointer ${
                    isActive
                      ? lvl === 'CRITICAL'
                        ? 'bg-[#FF4D6D] text-white shadow-[0_0_15px_rgba(255,77,109,0.4)]'
                        : lvl === 'HIGH'
                        ? 'bg-[#F97316] text-white shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                        : lvl === 'MODERATE'
                        ? 'bg-[#FBBF24] text-slate-950 shadow-[0_0_15px_rgba(251,191,36,0.4)]'
                        : 'bg-[#34D399] text-slate-950 shadow-[0_0_15px_rgba(52,211,153,0.4)]'
                      : 'bg-[#0D0F17] text-[#A1A1AA] hover:text-white border border-white/[0.08]'
                  }`}
                >
                  {lvl}
                </button>
              );
            })}
          </div>

          {/* Active Tab Protocol Display */}
          {(() => {
            const current = riskProtocolContent[activeRiskTab];
            return (
              <div className="rounded-2xl bg-[#0D0F17] border border-white/[0.08] p-6 space-y-5 animate-fade-in-up">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white font-mono">{current.title}</h4>
                  <RiskBadge level={activeRiskTab} size="sm" pulse={activeRiskTab === 'CRITICAL'} />
                </div>

                <div className="text-xs text-[#FB923C] font-mono font-semibold bg-[#F97316]/10 px-3.5 py-2 rounded-xl border border-[#F97316]/25">
                  Primary Directive: {current.actionTitle}
                </div>

                <div className="space-y-3">
                  <span className="text-[11px] font-mono text-[#A1A1AA] uppercase tracking-wider block">
                    Key Standard Operating Procedures (SOPs):
                  </span>
                  {current.items.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs text-[#A1A1AA]">
                      <span className="w-5 h-5 rounded-lg bg-[#171925] border border-white/10 text-[#A78BFA] font-mono font-bold flex items-center justify-center shrink-0 text-[10px]">
                        0{idx + 1}
                      </span>
                      <p className="leading-relaxed text-[#F8FAFC]">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* ----------------- 3. EMERGENCY CONTACTS DIRECTORY ----------------- */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <PhoneCall size={20} className="text-[#A78BFA]" />
              Emergency Response Directory & Helplines
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Rapid escalation contacts for search, rescue, logistics, and medical transport.
            </p>
          </div>

          <div className="text-xs font-mono text-[#FB923C] bg-[#F97316]/10 border border-[#F97316]/25 px-3 py-1.5 rounded-xl shrink-0">
            * Mock / Example Emergency Contacts — Verification planned in integration phase
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {mockDisasterContacts.map((contact, idx) => {
            const isCopied = copiedPhone === contact.phone;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-[#171925] border border-white/[0.08] p-6 flex flex-col justify-between hover:border-[#8B5CF6]/30 transition-all duration-300 space-y-4 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2.5">
                    <span className="text-[10px] font-mono uppercase text-[#A78BFA] bg-[#8B5CF6]/10 px-2.5 py-0.5 rounded-full border border-[#8B5CF6]/20 font-bold">
                      {contact.badge}
                    </span>
                    <span className="text-[10px] text-[#71717A] font-mono">
                      {contact.availability}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-white mb-1 group-hover:text-[#A78BFA] transition-colors">{contact.name}</h4>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{contact.description}</p>
                </div>

                <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between gap-2">
                  <div className="font-mono text-xs font-bold text-white truncate">
                    {contact.phone}
                  </div>

                  <button
                    onClick={() => handleCopyPhone(contact.phone)}
                    className="p-2 rounded-xl bg-[#0D0F17] hover:bg-[#1D2030] text-[#A1A1AA] hover:text-white border border-white/[0.08] transition-colors shrink-0 cursor-pointer"
                    title="Copy Helpline Number"
                  >
                    {isCopied ? (
                      <Check size={14} className="text-[#34D399]" />
                    ) : (
                      <Copy size={14} />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
