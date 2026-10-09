import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  ArrowRight,
  Activity,
  Layers,
  MapPin,
  Bot,
  BrainCircuit,
  CloudRain,
  Compass,
  Cpu,
  Sliders,
  LifeBuoy,
  Waves,
  AlertTriangle,
  Flame,
  ShieldCheck,
  AlertOctagon,
  Plus,
  Minus
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import RiskBadge from '../components/RiskBadge';
import StatCard from '../components/StatCard';
import {
  mockCapabilities,
  mockWorkflowSteps,
  mockRiskLevels,
  mockWhyItems
} from '../data/mockData';

export default function Home() {
  const [zoomLevel, setZoomLevel] = useState(1);

  const capabilityIcons = {
    BrainCircuit,
    MapPin,
    Layers,
    ShieldAlert,
    Cpu,
    Bot
  };

  const workflowIcons = {
    CloudRain,
    Sliders,
    Cpu,
    Gauge: Activity,
    LifeBuoy
  };

  const riskCardIcons = {
    LOW: ShieldCheck,
    MODERATE: AlertTriangle,
    HIGH: AlertOctagon,
    CRITICAL: Flame
  };

  return (
    <div className="space-y-20 pb-20 overflow-hidden bg-[#F8FAFC]">
      {/* ---------------------------------------------------- */}
      {/* 1. HERO SECTION (Matches Panel 1 of Reference)       */}
      {/* ---------------------------------------------------- */}
      <section className="relative pt-6 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Heading, Actions & 4 Capabilities */}
            <div className="lg:col-span-6 space-y-6">
              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#F1EBFF] border border-[#7047E8]/20 text-[#7047E8] text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-[#7047E8] animate-pulse" />
                <span>AI-Powered Flood Intelligence</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold tracking-tight text-[#17182B] leading-[1.15]">
                Predict Flood Risk.{' '}
                <span className="text-[#7047E8] block mt-1">
                  Prepare for a Safer Tomorrow.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#686B7D] max-w-xl leading-relaxed">
                RescueNet-AI uses advanced machine learning and real-time environmental data to forecast flood risks, protect vulnerable communities, and accelerate emergency response.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/prediction"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#7047E8] hover:bg-[#5E35D1] text-white font-semibold text-sm shadow-md shadow-[#7047E8]/25 hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                >
                  <span>Predict Flood Risk</span>
                  <ArrowRight size={17} />
                </Link>

                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-[#17182B] border border-[#E5E7F0] font-semibold text-sm transition-all shadow-sm"
                >
                  <Activity size={17} className="text-[#7047E8]" />
                  <span>Explore Dashboard</span>
                </Link>
              </div>

              {/* 4 Capability Mini Cards (2x2 Grid) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
                <div className="p-3.5 rounded-xl bg-white border border-[#E5E7F0] shadow-sm flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F1EBFF] flex items-center justify-center text-[#7047E8] font-bold text-xs shrink-0">
                    01
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17182B]">Machine Learning Engine</h4>
                    <p className="text-[11px] text-[#686B7D] mt-0.5">Accurate flood forecasting models</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E5E7F0] shadow-sm flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F1EBFF] flex items-center justify-center text-[#7047E8] font-bold text-xs shrink-0">
                    02
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17182B]">Real-Time Monitoring</h4>
                    <p className="text-[11px] text-[#686B7D] mt-0.5">Live river & weather telemetry</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E5E7F0] shadow-sm flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F1EBFF] flex items-center justify-center text-[#7047E8] font-bold text-xs shrink-0">
                    03
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17182B]">Disaster Response Plans</h4>
                    <p className="text-[11px] text-[#686B7D] mt-0.5">Actionable emergency workflows</p>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-[#E5E7F0] shadow-sm flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F1EBFF] flex items-center justify-center text-[#7047E8] font-bold text-xs shrink-0">
                    04
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#17182B]">AI Assistant</h4>
                    <p className="text-[11px] text-[#686B7D] mt-0.5">24/7 intelligent disaster queries</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hyderabad Flood Risk Map with Heatmap & Floating Cards */}
            <div className="lg:col-span-6 relative flex items-center justify-center">
              <div className="relative w-full max-w-lg rounded-2xl bg-white border border-[#E5E7F0] shadow-md p-4 overflow-hidden">
                {/* Map Header with controls */}
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E7F0] mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[#7047E8]" />
                    <span className="font-bold text-xs text-[#17182B]">Hyderabad Flood Risk Map</span>
                    <span className="text-[10px] bg-[#ECFDF5] text-[#22A879] font-medium px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                      Live
                    </span>
                  </div>

                  {/* Zoom controls */}
                  <div className="flex items-center gap-1 bg-[#F8FAFC] border border-[#E5E7F0] rounded-lg p-0.5">
                    <button
                      onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 1.6))}
                      className="p-1 text-[#686B7D] hover:text-[#17182B] rounded hover:bg-white"
                      title="Zoom In"
                    >
                      <Plus size={13} />
                    </button>
                    <button
                      onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.8))}
                      className="p-1 text-[#686B7D] hover:text-[#17182B] rounded hover:bg-white"
                      title="Zoom Out"
                    >
                      <Minus size={13} />
                    </button>
                  </div>
                </div>

                {/* Stylized SVG Map Container */}
                <div className="relative h-80 rounded-xl bg-[#F3F4FA] border border-[#E5E7F0] overflow-hidden flex items-center justify-center">
                  <div
                    className="w-full h-full transition-transform duration-300"
                    style={{ transform: `scale(${zoomLevel})` }}
                  >
                    <svg viewBox="0 0 500 350" className="w-full h-full">
                      {/* Grid / Roads pattern */}
                      <defs>
                        <pattern id="home-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                          <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2E5F0" strokeWidth="0.8" />
                        </pattern>
                        {/* Radial heat gradients */}
                        <radialGradient id="heat-high" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#E5484D" stopOpacity="0.75" />
                          <stop offset="50%" stopColor="#E9A23B" stopOpacity="0.45" />
                          <stop offset="80%" stopColor="#FDE68A" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="heat-moderate" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#E9A23B" stopOpacity="0.6" />
                          <stop offset="60%" stopColor="#FDE68A" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
                        </radialGradient>
                        <radialGradient id="heat-low" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" stopColor="#22A879" stopOpacity="0.5" />
                          <stop offset="70%" stopColor="#A7F3D0" stopOpacity="0.2" />
                          <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0" />
                        </radialGradient>
                      </defs>

                      <rect width="100%" height="100%" fill="url(#home-grid)" />

                      {/* City road lines */}
                      <path d="M 0,80 Q 250,110 500,90" fill="none" stroke="#D8DBEB" strokeWidth="2" />
                      <path d="M 0,220 Q 200,200 500,250" fill="none" stroke="#D8DBEB" strokeWidth="2" />
                      <path d="M 120,0 Q 150,180 130,350" fill="none" stroke="#D8DBEB" strokeWidth="2" />
                      <path d="M 380,0 Q 360,180 390,350" fill="none" stroke="#D8DBEB" strokeWidth="2" />

                      {/* River path (Musi River) */}
                      <path
                        d="M 20,290 C 120,270 180,180 260,190 C 340,200 420,130 480,110"
                        fill="none"
                        stroke="#3478DB"
                        strokeWidth="7"
                        strokeOpacity="0.5"
                        strokeLinecap="round"
                      />
                      <path
                        d="M 20,290 C 120,270 180,180 260,190 C 340,200 420,130 480,110"
                        fill="none"
                        stroke="#7047E8"
                        strokeWidth="2.5"
                        strokeDasharray="6 4"
                      />

                      {/* Low Risk Zone */}
                      <circle cx="120" cy="110" r="55" fill="url(#heat-low)" />
                      <circle cx="120" cy="110" r="4" fill="#22A879" />
                      <text x="130" y="114" fontSize="10" fontWeight="600" fill="#22A879">Secunderabad</text>

                      {/* Moderate Risk Zone */}
                      <circle cx="390" cy="220" r="65" fill="url(#heat-moderate)" />
                      <circle cx="390" cy="220" r="4" fill="#E9A23B" />
                      <text x="320" y="224" fontSize="10" fontWeight="600" fill="#E9A23B">LB Nagar</text>

                      {/* High Risk Core Zone (Hussain Sagar / Musi Basin) */}
                      <circle cx="250" cy="180" r="80" fill="url(#heat-high)" />
                      <circle cx="250" cy="180" r="16" fill="#E5484D" fillOpacity="0.25" className="animate-ping" />
                      <circle cx="250" cy="180" r="6" fill="#E5484D" />
                      <text x="210" y="160" fontSize="11" fontWeight="700" fill="#E5484D">Central Basin</text>

                      {/* Marker Label */}
                      <g transform="translate(250, 180)">
                        <rect x="-45" y="10" width="90" height="20" rx="4" fill="#17182B" />
                        <text x="0" y="23" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">
                          82% Flood Risk
                        </text>
                      </g>
                    </svg>
                  </div>

                  {/* Floating Card 1: Top-Left Flood Risk */}
                  <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-[#E5E7F0] shadow-sm z-10 flex items-center gap-3">
                    <div className="relative w-10 h-10 flex items-center justify-center">
                      <svg className="w-10 h-10 -rotate-90">
                        <circle cx="20" cy="20" r="16" stroke="#F1EBFF" strokeWidth="3" fill="none" />
                        <circle
                          cx="20"
                          cy="20"
                          r="16"
                          stroke="#E5484D"
                          strokeWidth="3.5"
                          strokeDasharray="100.5"
                          strokeDashoffset="18"
                          strokeLinecap="round"
                          fill="none"
                        />
                      </svg>
                      <span className="absolute text-[11px] font-bold text-[#17182B]">82%</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E5484D]" />
                        <span className="text-xs font-bold text-[#E5484D]">High Risk</span>
                      </div>
                      <p className="text-[10px] text-[#686B7D] mt-0.5">Hydrological alert active</p>
                    </div>
                  </div>

                  {/* Floating Card 2: Bottom-Right Live Overview */}
                  <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-[#E5E7F0] shadow-sm z-10 min-w-[170px]">
                    <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#E5E7F0]">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#686B7D]">Live Overview</span>
                      <span className="w-2 h-2 rounded-full bg-[#22A879] animate-pulse" />
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between items-center text-[#686B7D]">
                        <span>Rainfall:</span>
                        <span className="font-bold text-[#17182B]">248 mm</span>
                      </div>
                      <div className="flex justify-between items-center text-[#686B7D]">
                        <span>Water Level:</span>
                        <span className="font-bold text-[#17182B]">7.4 m</span>
                      </div>
                      <div className="flex justify-between items-center text-[#686B7D]">
                        <span>Probability:</span>
                        <span className="font-bold text-[#E5484D]">82%</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map Bottom Legend */}
                <div className="flex items-center justify-between pt-3 text-[11px] text-[#686B7D]">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#22A879]" /> Low
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E9A23B]" /> Moderate
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D]" /> High
                    </span>
                  </div>
                  <span className="text-[#7047E8] font-medium flex items-center gap-1">
                    <Compass size={12} /> Hussain Sagar Catchment
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ----------------- 4 STAT CARDS IN HERO FOOTER ----------------- */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
            <StatCard
              title="Rainfall (24h)"
              value="248"
              unit="mm"
              trend="+18% from normal"
              isPositiveTrend={false}
              icon={CloudRain}
              accent="blue"
            />
            <StatCard
              title="Water Level"
              value="7.4"
              unit="m"
              trend="+1.2m above danger"
              isPositiveTrend={false}
              icon={Waves}
              accent="purple"
            />
            <StatCard
              title="Flood Risk"
              value="82"
              unit="%"
              badge="High Risk"
              icon={AlertTriangle}
              accent="red"
            />
            <StatCard
              title="Active Alerts"
              value="3"
              unit=""
              trend="Immediate action required"
              isPositiveTrend={false}
              icon={ShieldAlert}
              accent="amber"
            />
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. CORE PLATFORM CAPABILITIES SECTION                */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Platform Capabilities"
          title="Intelligent Flood Defense Infrastructure"
          subtitle="Integrated hydrological simulation, real-time river basin sensor monitoring, and automated community mitigation protocols."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {mockCapabilities.map((cap) => {
            const Icon = capabilityIcons[cap.icon] || BrainCircuit;
            return (
              <div
                key={cap.id}
                className="group p-6 rounded-2xl bg-white border border-[#E5E7F0] shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div className="w-12 h-12 rounded-xl bg-[#F1EBFF] text-[#7047E8] flex items-center justify-center mb-5 group-hover:scale-105 transition-transform">
                  <Icon size={24} />
                </div>
                <h3 className="text-lg font-bold text-[#17182B] group-hover:text-[#7047E8] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-sm text-[#686B7D] mt-2 leading-relaxed">
                  {cap.description}
                </p>
                <div className="mt-5 pt-4 border-t border-[#E5E7F0] flex items-center justify-between text-xs font-semibold text-[#7047E8]">
                  <span>Explore Module</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. END-TO-END WORKFLOW PIPELINE                     */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-white border border-[#E5E7F0] p-8 lg:p-12 shadow-sm">
          <SectionTitle
            badge="AI Inference Workflow"
            title="From Environmental Sensor to Emergency Action"
            subtitle="How telemetry signals move through preprocessing, machine learning inference, and emergency response dispatch."
            align="left"
          />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mt-10">
            {mockWorkflowSteps.map((step, idx) => {
              const Icon = workflowIcons[step.icon] || Cpu;
              return (
                <div key={step.step} className="relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-[#F1EBFF] text-[#7047E8] flex items-center justify-center font-bold text-sm">
                        <Icon size={20} />
                      </div>
                      <span className="text-xs font-mono font-bold text-[#7047E8]">
                        0{step.step}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#17182B] mb-1.5">{step.title}</h4>
                    <p className="text-xs text-[#686B7D] leading-relaxed">{step.description}</p>
                  </div>
                  {idx < mockWorkflowSteps.length - 1 && (
                    <div className="hidden md:block absolute -right-3 top-5 text-[#E5E7F0]" aria-hidden="true">
                      &rarr;
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. RISK CLASSIFICATION & DECISION MATRIX             */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Hazard Tier System"
          title="Risk Classification & Operational Protocols"
          subtitle="Standardized thresholds based on Indian meteorological baselines and river basin elevation parameters."
          align="center"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {Object.entries(mockRiskLevels).map(([key, level]) => {
            const Icon = riskCardIcons[key] || ShieldCheck;
            return (
              <div
                key={key}
                className="rounded-2xl bg-white border border-[#E5E7F0] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <RiskBadge level={key} size="md" />
                    <div
                      className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                      style={{ backgroundColor: level.bgColor, color: level.color }}
                    >
                      <Icon size={16} />
                    </div>
                  </div>
                  <div className="text-xl font-bold text-[#17182B] mb-2">{level.range}</div>
                  <p className="text-xs text-[#686B7D] leading-relaxed mb-4">
                    {level.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#E5E7F0] space-y-2 text-xs">
                  <div className="flex justify-between items-center text-[#686B7D]">
                    <span>Action Window:</span>
                    <span className="font-semibold text-[#17182B]">{level.leadTime}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#686B7D]">
                    <span>Standard Protocol:</span>
                    <span className="font-semibold text-[#17182B]">{level.action}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. WHY RESCUENET-AI RESEARCH CONTEXT                 */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {mockWhyItems.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white border border-[#E5E7F0] shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="text-3xl font-extrabold text-[#7047E8] mb-1">
                  {item.stat}
                </div>
                <div className="text-xs font-semibold text-[#686B7D] uppercase tracking-wider mb-4">
                  {item.statLabel}
                </div>
                <h3 className="text-base font-bold text-[#17182B] mb-2">{item.title}</h3>
                <p className="text-xs text-[#686B7D] leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. CALL TO ACTION                                    */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#7047E8] to-[#8B5CF6] p-8 lg:p-12 text-white shadow-lg text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-semibold mb-4 backdrop-blur-sm">
            <span>Ready for Deployment</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold max-w-2xl leading-tight">
            Start Monitoring River Basins and Safeguarding Communities Today
          </h2>
          <p className="text-sm sm:text-base text-white/80 max-w-xl mt-3 leading-relaxed">
            Run instant machine learning inferences using local hydrological vectors, or query the intelligent disaster response assistant.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              to="/prediction"
              className="px-6 py-3 rounded-xl bg-white text-[#7047E8] font-bold text-sm shadow-md hover:bg-slate-50 transition-all"
            >
              Run Flood Prediction
            </Link>
            <Link
              to="/ai-assistant"
              className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/30 font-semibold text-sm transition-all"
            >
              Consult AI Assistant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
