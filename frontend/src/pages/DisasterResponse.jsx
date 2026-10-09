import React, { useState } from 'react';
import {
  PhoneCall,
  CheckSquare,
  Square,
  ShieldCheck,
  AlertOctagon,
  Copy,
  Check,
  Compass,
  PackageCheck
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import RiskBadge from '../components/RiskBadge';
import SimulationBanner from '../components/SimulationBanner';
import {
  mockDisasterContacts,
  mockSafetyChecklist,
  mockEssentialSupplies
} from '../data/mockData';

export default function DisasterResponse() {
  const [checklist, setChecklist] = useState(mockSafetyChecklist);
  const [copiedPhone, setCopiedPhone] = useState(null);
  const [activeRiskTab, setActiveRiskTab] = useState('HIGH');
  const [activePhaseTab, setActivePhaseTab] = useState('BEFORE');

  const toggleChecklistItem = (id) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, defaultChecked: !item.defaultChecked } : item
      )
    );
  };

  const handleSelectAll = () => {
    setChecklist((prev) => prev.map((item) => ({ ...item, defaultChecked: true })));
  };

  const handleResetList = () => {
    setChecklist((prev) => prev.map((item) => ({ ...item, defaultChecked: false })));
  };

  const completedCount = checklist.filter((item) => item.defaultChecked).length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  const handleCopyPhone = (phone) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(phone);
    setTimeout(() => setCopiedPhone(null), 2000);
  };

  const floodPhases = {
    BEFORE: {
      title: 'Before a Flood: Mitigation & Preparation',
      subtitle: 'Proactive safeguards to execute before rising waters reach warning marks.',
      badge: 'Phase 1: Pre-Disaster Readiness',
      badgeColor: 'text-[#34D399] bg-[#34D399]/10 border-[#34D399]/25',
      points: [
        {
          title: 'Assemble 72-Hour Waterproof Go-Bag',
          desc: 'Pack 3L drinking water per person/day, non-perishable food, prescription medicines, emergency radio, and flashlights with spare batteries.'
        },
        {
          title: 'Secure Essential Household Documents',
          desc: 'Enclose passports, Aadhaar/IDs, medical cards, and property deeds in airtight dry pouches or waterproof containers.'
        },
        {
          title: 'Elevate Ground-Floor Appliances & Electronics',
          desc: 'Move refrigerators, televisions, furniture, and electrical devices to higher floors or elevated brick plinths.'
        },
        {
          title: 'Map Family Evacuation Route & Rally Points',
          desc: 'Identify at least two elevated routes to municipal assembly points. Avoid routes requiring transit across low-lying culverts.'
        }
      ]
    },
    DURING: {
      title: 'During a Flood: Safety & Immediate Action',
      subtitle: 'Critical life-safety protocols to preserve life during torrential water ingress.',
      badge: 'Phase 2: Emergency Action',
      badgeColor: 'text-[#FF4D6D] bg-[#FF4D6D]/10 border-[#FF4D6D]/25',
      points: [
        {
          title: 'Disconnect Main Breaker & LPG Valves',
          desc: 'Turn off primary electrical circuits and gas cylinder regulators before water enters to prevent electrocution or gas explosions.'
        },
        {
          title: 'Never Walk or Drive in Floodwaters ("Turn Around, Don’t Drown")',
          desc: 'Just 15 cm (6 inches) of rushing water can sweep an adult off their feet; 30 cm (1 foot) can float a motor vehicle. Murky waters hide live wires and sinkholes.'
        },
        {
          title: 'Move to Highest Elevation Immediately',
          desc: 'Relocate to the highest accessible floor or roof. Avoid closed attic spaces without roof access where rising waters can trap occupants.'
        },
        {
          title: 'Comply with Mandatory Evacuation Orders',
          desc: 'If NDRF, police, or district authorities instruct evacuation, leave immediately along designated high-ground corridors without hesitation.'
        }
      ]
    },
    AFTER: {
      title: 'After a Flood: Recovery & Safe Return',
      subtitle: 'Guarded procedures for returning to property and assessing post-flood damage.',
      badge: 'Phase 3: Post-Hazard Recovery',
      badgeColor: 'text-[#FBBF24] bg-[#FBBF24]/10 border-[#FBBF24]/25',
      points: [
        {
          title: 'Wait for Official All-Clear Confirmation',
          desc: 'Do not return to submerged wards until civil defence and SDMA confirm roads are structurally sound and floodwaters have receded.'
        },
        {
          title: 'Inspect Foundation and Structural Integrity',
          desc: 'Look for cracked foundation walls, sagging ceilings, and exposed gas lines before entering. Do not turn electricity on until inspected by an electrician.'
        },
        {
          title: 'Boil or Purify All Domestic Water',
          desc: 'Municipal tap water and wells are often contaminated with sewage and chemicals. Boil drinking water vigorously for at least 1 minute.'
        },
        {
          title: 'Document Damage Thoroughly for Relief Claims',
          desc: 'Photograph property damage, water lines, and ruined assets before starting cleanup to support official relief and insurance claims.'
        }
      ]
    }
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
          subtitle="Standard operating procedures, household readiness checklists, essential supplies, and verified agency emergency directories."
        />

        <SimulationBanner
          title="EMERGENCY PROTOCOL ADVISORY &bull; OPERATIONAL GUIDELINES"
          message="Standard operating procedures are synthesized from published disaster management frameworks. Verified agency helplines are provided below for official response coordination."
          variant="orange"
        />
      </div>

      {/* ----------------- 1. BEFORE, DURING, AND AFTER A FLOOD ----------------- */}
      <section className="space-y-6" aria-labelledby="phases-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
          <div>
            <h3 id="phases-heading" className="text-base sm:text-xl font-bold text-white font-mono flex items-center gap-2">
              <Compass size={20} className="text-[#8B5CF6]" />
              Flood Lifecycle Protocols: Before, During & After
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Structured operational recommendations across each stage of a flood hazard event.
            </p>
          </div>

          {/* Phase Tabs */}
          <div className="flex items-center gap-2 font-mono">
            {['BEFORE', 'DURING', 'AFTER'].map((phase) => (
              <button
                key={phase}
                onClick={() => setActivePhaseTab(phase)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activePhaseTab === phase
                    ? 'bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] text-white shadow-[0_0_15px_rgba(139,92,246,0.4)]'
                    : 'bg-[#171925] text-[#A1A1AA] hover:text-white border border-white/[0.08]'
                }`}
              >
                {phase === 'BEFORE' ? '1. Before Flood' : phase === 'DURING' ? '2. During Flood' : '3. After Flood'}
              </button>
            ))}
          </div>
        </div>

        {/* Active Phase Content Card */}
        {(() => {
          const currentPhase = floodPhases[activePhaseTab];
          return (
            <div className="rounded-3xl bg-[#171925] border border-white/[0.08] p-7 sm:p-8 space-y-6 shadow-2xl animate-fade-in-up">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                <div>
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full border ${currentPhase.badgeColor} font-bold inline-block mb-2`}>
                    {currentPhase.badge}
                  </span>
                  <h4 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    {currentPhase.title}
                  </h4>
                  <p className="text-xs text-[#A1A1AA] mt-1">{currentPhase.subtitle}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {currentPhase.points.map((pt, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-[#0D0F17] border border-white/[0.08] space-y-2 hover:border-[#8B5CF6]/30 transition-all"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-lg bg-[#171925] border border-white/10 text-[#A78BFA] font-mono font-bold flex items-center justify-center text-xs shrink-0">
                        {idx + 1}
                      </span>
                      <h5 className="text-sm font-bold text-white">{pt.title}</h5>
                    </div>
                    <p className="text-xs text-[#A1A1AA] leading-relaxed pl-8">{pt.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </section>

      {/* ----------------- 2. ESSENTIAL SUPPLIES CHECKLIST ----------------- */}
      <section className="space-y-4" aria-labelledby="supplies-heading">
        <div className="flex items-center gap-2 pb-2">
          <PackageCheck size={20} className="text-[#34D399]" />
          <h3 id="supplies-heading" className="text-base sm:text-xl font-bold text-white font-mono">
            Essential Disaster Supplies Kit
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mockEssentialSupplies.map((cat, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#171925] border border-white/[0.08] p-6 space-y-3 shadow-xl hover:border-[#34D399]/30 transition-all"
            >
              <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
                <ShieldCheck size={16} className="text-[#34D399]" />
                <h4 className="text-xs font-bold font-mono uppercase text-white tracking-wider">
                  {cat.category}
                </h4>
              </div>

              <ul className="space-y-2.5 text-xs text-[#A1A1AA]">
                {cat.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-start gap-2">
                    <Check size={14} className="text-[#34D399] shrink-0 mt-0.5" />
                    <span className="leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ----------------- 3. SAFETY CHECKLIST & RESPONSE TABS ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Interactive Safety Checklist */}
        <div className="lg:col-span-5 rounded-3xl bg-[#171925] backdrop-blur-md border border-white/[0.08] p-6 sm:p-7 shadow-2xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <CheckSquare size={16} className="text-[#8B5CF6]" />
                Evacuation Readiness SOP
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-0.5">8-Point Pre-Evacuation Protocol</p>
            </div>

            <div className="flex items-center gap-1 font-mono text-xs">
              <span className="font-bold text-white">{completedCount}</span>
              <span className="text-[#71717A]">/ {checklist.length} Done</span>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono">
              <span className="text-[#A1A1AA]">Preparedness Index</span>
              <span className="font-bold text-[#A78BFA]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#0D0F17] h-2.5 rounded-full overflow-hidden border border-white/[0.05]">
              <div
                className="h-full bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleChecklistItem(item.id)}
                className={`w-full text-left p-3 rounded-2xl border text-xs flex items-center gap-3 transition-all cursor-pointer ${
                  item.defaultChecked
                    ? 'bg-[#0D0F17] border-[#8B5CF6]/40 text-white'
                    : 'bg-[#0D0F17]/50 border-white/[0.05] text-[#A1A1AA] hover:bg-[#0D0F17]'
                }`}
                aria-pressed={item.defaultChecked}
              >
                <div className="shrink-0">
                  {item.defaultChecked ? (
                    <CheckSquare size={18} className="text-[#8B5CF6]" />
                  ) : (
                    <Square size={18} className="text-[#71717A]" />
                  )}
                </div>
                <span className={`flex-1 leading-snug ${item.defaultChecked ? 'line-through text-[#71717A]' : ''}`}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>

          {/* Helpers */}
          <div className="pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs font-mono">
            <button
              onClick={handleSelectAll}
              className="text-[#A78BFA] hover:text-[#C084FC] transition-colors cursor-pointer"
            >
              Select all items
            </button>
            <button
              onClick={handleResetList}
              className="text-[#71717A] hover:text-[#FF4D6D] transition-colors cursor-pointer"
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
                Threat Tier Operational Guidelines
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

      {/* ----------------- 4. VERIFIED EMERGENCY CONTACTS DIRECTORY ----------------- */}
      <section className="space-y-4" aria-labelledby="emergency-directory-heading">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 id="emergency-directory-heading" className="text-base sm:text-lg font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
              <PhoneCall size={20} className="text-[#A78BFA]" />
              Official Disaster Emergency Directory & Helplines
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Verified national and state emergency response coordinates for flood relief and disaster response.
            </p>
          </div>

          <div className="text-xs font-mono text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/25 px-3 py-1.5 rounded-xl shrink-0 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            <span>Official Helplines (India)</span>
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
                    className="p-2 rounded-xl bg-[#0D0F17] hover:bg-[#1D2030] text-[#A1A1AA] hover:text-white border border-white/[0.08] transition-colors shrink-0 cursor-pointer flex items-center gap-1 text-[11px] font-mono"
                    title="Copy Helpline Number"
                    aria-label={`Copy phone number for ${contact.name}`}
                  >
                    {isCopied ? (
                      <>
                        <Check size={14} className="text-[#34D399]" />
                        <span className="text-[#34D399]">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={14} />
                        <span>Copy</span>
                      </>
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
