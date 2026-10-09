import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PhoneCall,
  CheckSquare,
  Square,
  AlertOctagon,
  Copy,
  Check,
  ChevronRight,
  ArrowRight,
  LifeBuoy
} from 'lucide-react';
import {
  mockDisasterContacts,
  mockSafetyChecklist
} from '../data/mockData';

export default function DisasterResponse() {
  const [checklist, setChecklist] = useState(mockSafetyChecklist);
  const [copiedPhone, setCopiedPhone] = useState(null);
  const [activePhaseTab, setActivePhaseTab] = useState('DURING');

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

  const guidelinesByPhase = {
    BEFORE: [
      {
        title: 'Pack 72-Hour Waterproof Go-Bag',
        desc: 'Include 3 liters of drinking water per person, dry rations, flashlight, power bank, and first-aid supplies.'
      },
      {
        title: 'Seal Vital Documents',
        desc: 'Place government identification cards, property records, and insurance papers in airtight waterproof sleeves.'
      },
      {
        title: 'Elevate Valuable Electronics',
        desc: 'Move ground-floor home appliances, laptops, and electrical equipment to upper floors or high platforms.'
      },
      {
        title: 'Identify High-Ground Evacuation Routes',
        desc: 'Pinpoint 2 designated municipal shelters on elevated terrain. Avoid roads crossing low-lying culverts.'
      }
    ],
    DURING: [
      {
        title: 'Cut Off Main Circuit Breaker & LPG Valves',
        desc: 'Shut off electricity at the breaker panel and lock gas cylinder regulators before water ingresses.'
      },
      {
        title: 'Never Walk or Drive Across Floodwaters',
        desc: 'Just 15 cm of moving water can sweep an adult; 30 cm can float a car. Hidden sinkholes and live cables pose fatal risks.'
      },
      {
        title: 'Move to Highest Accessible Elevation',
        desc: 'Head to upper storeys or rooftops immediately. Avoid locked attics with no roof emergency egress.'
      },
      {
        title: 'Obey Mandatory Evacuation Orders Immediately',
        desc: 'When NDRF or district police sound sirens, depart along high-ground corridors without delay.'
      }
    ],
    AFTER: [
      {
        title: 'Wait for Official Clearance Before Returning',
        desc: 'Do not enter submerged houses until local engineers inspect structural stability and foundation integrity.'
      },
      {
        title: 'Inspect for Gas Leaks & Exposed Cables',
        desc: 'Do not strike matches or use candles. Smell for gas and look for downed cables before powering on.'
      },
      {
        title: 'Boil or Chemically Disinfect Drinking Water',
        desc: 'Assume municipal tap water and open wells are contaminated with sewage. Boil vigorously for 3 minutes.'
      },
      {
        title: 'Document Flood Damage for Relief Claims',
        desc: 'Photograph watermarks on walls and ruined possessions before disposal to submit for government insurance.'
      }
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F8FAFC]">
      {/* ----------------- BREADCRUMB ----------------- */}
      <nav className="flex items-center gap-2 text-xs text-[#686B7D]">
        <Link to="/" className="hover:text-[#7047E8] transition-colors">
          Home
        </Link>
        <ChevronRight size={13} />
        <span className="font-semibold text-[#17182B]">Response Plan</span>
      </nav>

      {/* ----------------- PAGE HEADER ----------------- */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EBFF] text-[#7047E8] text-xs font-semibold mb-2">
          <LifeBuoy size={13} />
          <span>Emergency Operational Protocol</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#17182B] tracking-tight">
          Disaster Response & Safety Guidelines
        </h1>
        <p className="text-sm sm:text-base text-[#686B7D] max-w-2xl mt-1.5">
          Immediate actionable workflows, emergency hotlines, and standard operating procedures for active flood hazards.
        </p>
      </div>

      {/* ----------------- TOP RED ALERT BANNER (Panel 3) ----------------- */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#FEF2F2] border border-[#FECACA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#E5484D] text-white flex items-center justify-center shrink-0">
            <AlertOctagon size={22} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm text-[#E5484D]">
                High Risk Alert: Immediate Action Required
              </span>
              <span className="w-2 h-2 rounded-full bg-[#E5484D] animate-ping" />
            </div>
            <p className="text-xs text-[#991B1B] mt-0.5">
              Flood probability is at 82%. Coordinate prompt evacuation of vulnerable zones and notify district authorities.
            </p>
          </div>
        </div>

        <Link
          to="/prediction"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E5484D] hover:bg-[#D4383D] text-white text-xs font-bold shrink-0 transition-colors shadow-sm"
        >
          <span>View Details</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      {/* ----------------- 2-COLUMN MAIN LAYOUT ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Immediate Actions & Emergency Contacts (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Immediate Actions */}
          <div className="rounded-2xl bg-white border border-[#E5E7F0] p-6 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7F0] mb-4">
              <div>
                <h2 className="text-base font-bold text-[#17182B]">Immediate Actions</h2>
                <p className="text-xs text-[#686B7D]">Check off tasks as completed by your response team</p>
              </div>
              <div className="text-right">
                <span className="text-xs font-bold text-[#7047E8]">{completedCount}/{checklist.length} Complete</span>
                <div className="w-24 h-1.5 bg-[#F1EBFF] rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-[#7047E8] rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="space-y-3">
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start gap-3.5 ${
                    item.defaultChecked
                      ? 'bg-[#F8FAFC] border-[#E5E7F0] opacity-80'
                      : 'bg-white border-[#E5E7F0] hover:border-[#7047E8] hover:shadow-xs'
                  }`}
                >
                  <button type="button" className="mt-0.5 text-[#7047E8] shrink-0">
                    {item.defaultChecked ? (
                      <CheckSquare size={18} className="text-[#22A879]" />
                    ) : (
                      <Square size={18} className="text-[#686B7D]" />
                    )}
                  </button>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold ${
                          item.defaultChecked ? 'line-through text-[#686B7D]' : 'text-[#17182B]'
                        }`}
                      >
                        {item.title}
                      </span>
                      {item.isCritical && (
                        <span className="text-[10px] bg-[#FEF2F2] text-[#E5484D] px-1.5 py-0.2 rounded font-semibold">
                          Priority 1
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#686B7D] mt-0.5 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Card 2: Emergency Contacts */}
          <div className="rounded-2xl bg-white border border-[#E5E7F0] p-6 shadow-sm">
            <div className="pb-4 border-b border-[#E5E7F0] mb-4">
              <h2 className="text-base font-bold text-[#17182B]">Emergency Helplines & Contacts</h2>
              <p className="text-xs text-[#686B7D]">Direct national and state disaster response dispatch lines</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {mockDisasterContacts.map((contact) => (
                <div
                  key={contact.id}
                  className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7F0] flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-bold text-[#17182B]">{contact.agency}</h4>
                    <p className="text-[11px] text-[#686B7D] mt-0.5">{contact.scope}</p>
                    <div className="mt-2 text-sm font-extrabold text-[#7047E8] tracking-wider">
                      {contact.phone}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5 shrink-0">
                    <a
                      href={`tel:${contact.phone}`}
                      className="p-2 rounded-lg bg-[#F1EBFF] text-[#7047E8] hover:bg-[#7047E8] hover:text-white transition-colors"
                      title="Call Helpline"
                    >
                      <PhoneCall size={14} />
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopyPhone(contact.phone)}
                      className="p-2 rounded-lg bg-white border border-[#E5E7F0] text-[#686B7D] hover:text-[#17182B] transition-colors"
                      title="Copy Number"
                    >
                      {copiedPhone === contact.phone ? <Check size={14} className="text-[#22A879]" /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Risk Overview & Safety Guidelines (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Card 1: Risk Overview (Circular Gauge) */}
          <div className="rounded-2xl bg-white border border-[#E5E7F0] p-6 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7F0] mb-5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#686B7D]">
                Current Risk Overview
              </h3>
              <span className="text-[10px] bg-[#FEF2F2] text-[#E5484D] font-bold px-2 py-0.5 rounded-full border border-[#FECACA]">
                High Risk (82%)
              </span>
            </div>

            <div className="flex items-center justify-center py-2">
              <div className="relative w-36 h-36 flex items-center justify-center">
                <svg className="w-36 h-36 -rotate-90">
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="#F1EBFF"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="72"
                    cy="72"
                    r="58"
                    stroke="#E5484D"
                    strokeWidth="10"
                    strokeDasharray="364.4"
                    strokeDashoffset="65.6"
                    strokeLinecap="round"
                    fill="none"
                  />
                </svg>
                <div className="absolute text-center">
                  <span className="text-3xl font-extrabold text-[#17182B]">82%</span>
                  <span className="block text-[10px] font-bold text-[#E5484D] uppercase tracking-wider mt-0.5">
                    High Risk
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7F0] space-y-2 text-xs">
              <div className="flex justify-between items-center text-[#686B7D]">
                <span>Target Basin:</span>
                <span className="font-bold text-[#17182B]">Hyderabad (Musi River)</span>
              </div>
              <div className="flex justify-between items-center text-[#686B7D]">
                <span>Sensor Water Level:</span>
                <span className="font-bold text-[#17182B]">7.4 m (+1.2m danger mark)</span>
              </div>
              <div className="flex justify-between items-center text-[#686B7D]">
                <span>Accumulated Rainfall:</span>
                <span className="font-bold text-[#17182B]">248 mm (past 24h)</span>
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-[11px] font-bold text-[#686B7D] uppercase tracking-wider mb-2">
                Primary Hazard Vulnerabilities
              </h4>
              <div className="flex flex-wrap gap-1.5">
                <span className="text-[11px] bg-[#FEF2F2] text-[#E5484D] px-2.5 py-1 rounded-lg border border-[#FECACA] font-medium">
                  Lowland Inundation
                </span>
                <span className="text-[11px] bg-[#FFFBEB] text-[#E9A23B] px-2.5 py-1 rounded-lg border border-[#FDE68A] font-medium">
                  Urban Storm Surcharge
                </span>
                <span className="text-[11px] bg-[#F1EBFF] text-[#7047E8] px-2.5 py-1 rounded-lg border border-[#7047E8]/20 font-medium">
                  Bridge Underflow Risk
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Safety Guidelines */}
          <div className="rounded-2xl bg-white border border-[#E5E7F0] p-6 shadow-sm">
            <div className="pb-3 border-b border-[#E5E7F0] mb-4">
              <h3 className="text-base font-bold text-[#17182B]">Safety Guidelines</h3>
              <p className="text-xs text-[#686B7D]">Standard Operating Procedures by disaster phase</p>
            </div>

            {/* Phase Tabs */}
            <div className="flex p-1 bg-[#F8FAFC] border border-[#E5E7F0] rounded-xl mb-4">
              {['BEFORE', 'DURING', 'AFTER'].map((phase) => (
                <button
                  key={phase}
                  type="button"
                  onClick={() => setActivePhaseTab(phase)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all ${
                    activePhaseTab === phase
                      ? 'bg-[#7047E8] text-white shadow-xs'
                      : 'text-[#686B7D] hover:text-[#17182B]'
                  }`}
                >
                  {phase === 'BEFORE' ? 'Before' : phase === 'DURING' ? 'During' : 'After'}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="space-y-3">
              {guidelinesByPhase[activePhaseTab].map((item, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7F0]">
                  <h4 className="text-xs font-bold text-[#17182B] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#7047E8]" />
                    <span>{item.title}</span>
                  </h4>
                  <p className="text-[11px] text-[#686B7D] mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
