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
  ChevronRight,
  TrendingUp,
  CloudRain,
  Compass,
  Cpu,
  Sliders,
  LifeBuoy,
  Radio,
  Waves,
  AlertTriangle,
  Flame,
  ShieldCheck,
  AlertOctagon,
  BarChart3
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import RiskBadge from '../components/RiskBadge';
import SimulationBanner from '../components/SimulationBanner';
import {
  mockCapabilities,
  mockWorkflowSteps,
  mockRiskLevels,
  mockLiveTelemetry,
  mockWhyItems
} from '../data/mockData';

export default function Home() {
  const [activeRiskHover, setActiveRiskHover] = useState(null);

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
    <div className="space-y-28 pb-20 overflow-hidden">
      {/* ---------------------------------------------------- */}
      {/* 1. CINEMATIC HERO SECTION                            */}
      {/* ---------------------------------------------------- */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-grid-pattern bg-radial-glow">
        {/* Subtle background environmental ambient orbs */}
        <div className="absolute top-1/4 left-10 w-72 h-72 rounded-full bg-[#8B5CF6]/15 blur-[100px] pointer-events-none" aria-hidden="true" />
        <div className="absolute top-1/3 right-10 w-96 h-96 rounded-full bg-[#C084FC]/10 blur-[120px] pointer-events-none" aria-hidden="true" />

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Heading & Calls to Action */}
            <div className="lg:col-span-6 space-y-7 animate-drop-in">
              {/* Badge */}
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#171925]/90 border border-[#8B5CF6]/30 text-[#A78BFA] text-xs font-mono font-semibold tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
                <span>Next-Gen Climate AI & Flood Telemetry</span>
              </div>

              {/* Cinematic Heading */}
              <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-[1.08]">
                Predict{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#C084FC] drop-shadow-[0_0_30px_rgba(139,92,246,0.35)]">
                  Flood Risk.
                </span>{' '}
                <br />
                Prepare Faster. <br />
                <span className="text-[#F8FAFC]">Save Lives.</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-[#A1A1AA] max-w-xl leading-relaxed">
                RescueNet-AI combines environmental intelligence, machine learning, and disaster-response protocols to support faster, smarter flood-risk mitigation across vulnerable river basins.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  to="/prediction"
                  className="group relative overflow-hidden inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] via-[#A78BFA] to-[#C084FC] text-white font-bold text-sm tracking-wide shadow-[0_0_25px_rgba(139,92,246,0.35)] hover:shadow-[0_0_35px_rgba(192,132,252,0.5)] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Explore Flood Prediction</span>
                  <ArrowRight size={17} className="group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  to="/dashboard"
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-[#171925] hover:bg-[#1D2030] text-[#F8FAFC] border border-white/[0.08] hover:border-[#8B5CF6]/40 font-semibold text-sm tracking-wide transition-all backdrop-blur-md"
                >
                  <Activity size={17} className="text-[#A78BFA]" />
                  <span>Explore the Platform</span>
                </Link>
              </div>

              {/* Telemetry Micro Status */}
              <div className="pt-6 border-t border-white/[0.08] flex flex-wrap items-center gap-6 text-xs font-mono text-[#71717A]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
                  <span className="text-[#A1A1AA]">48 River Gauges Active</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#A78BFA] font-bold">13 Vectors</span>
                  <span className="text-[#A1A1AA]">Hydrology Feature Matrix</span>
                </div>
                <span>&bull;</span>
                <div className="flex items-center gap-2">
                  <span className="text-[#FB923C] font-bold">3-6 Hrs</span>
                  <span className="text-[#A1A1AA]">Lead-Time Target</span>
                </div>
              </div>
            </div>

            {/* Right Column: Central Hero Geospatial Visual with Floating Cards */}
            <div className="lg:col-span-6 relative flex items-center justify-center animate-fade-in-up">
              {/* Central Geographic Radar Surface Canvas */}
              <div className="relative w-full max-w-lg aspect-square rounded-3xl bg-gradient-to-b from-[#171925] to-[#0D0F17] border border-[#8B5CF6]/25 p-6 shadow-[0_0_50px_rgba(8,9,15,0.9)] overflow-hidden flex flex-col justify-between">
                {/* Background Radar Rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  {/* Concentric rings */}
                  <div className="w-[85%] h-[85%] rounded-full border border-[#8B5CF6]/10" />
                  <div className="w-[65%] h-[65%] rounded-full border border-[#8B5CF6]/15" />
                  <div className="w-[45%] h-[45%] rounded-full border border-[#C084FC]/20" />
                  <div className="w-[25%] h-[25%] rounded-full border border-[#C084FC]/25" />
                  {/* Radar sweep beam */}
                  <div
                    className="absolute w-1/2 h-1/2 top-0 right-0 origin-bottom-left animate-radar opacity-30 pointer-events-none"
                    style={{
                      background: 'conic-gradient(from 0deg, transparent 0deg, transparent 60deg, rgba(139, 92, 246, 0.4) 90deg)'
                    }}
                  />
                </div>

                {/* Top Telemetry Header of the Visual */}
                <div className="relative z-10 flex items-center justify-between pb-3 border-b border-white/[0.08] text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-ping" />
                    <span className="font-mono font-bold text-white text-[11px] uppercase tracking-wider">
                      Basin Spatial Risk Radar
                    </span>
                  </div>
                  <span className="font-mono text-[#34D399] text-[10px] bg-[#34D399]/10 border border-[#34D399]/20 px-2 py-0.5 rounded-full">
                    AI Active (Simulated)
                  </span>
                </div>

                {/* Center Geospatial Topology Silhouette */}
                <div className="relative z-10 flex-1 flex items-center justify-center my-3">
                  <svg viewBox="0 0 400 400" className="w-full h-full max-h-64 opacity-80" aria-label="Abstract topographic flood basin visualization">
                    {/* Abstract Topographic Contour Curves */}
                    <path
                      d="M 50,200 Q 120,120 200,180 T 350,150"
                      fill="none"
                      stroke="#2E234D"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <path
                      d="M 70,240 Q 150,180 230,220 T 360,210"
                      fill="none"
                      stroke="#8B5CF6"
                      strokeWidth="2"
                      strokeOpacity="0.4"
                    />
                    <path
                      d="M 100,280 Q 180,240 250,270 T 340,260"
                      fill="none"
                      stroke="#C084FC"
                      strokeWidth="2.5"
                      strokeOpacity="0.6"
                    />

                    {/* Flowing river vector */}
                    <path
                      d="M 120,40 Q 160,150 200,210 T 260,360"
                      fill="none"
                      stroke="#A78BFA"
                      strokeWidth="3.5"
                      style={{ filter: 'drop-shadow(0 0 8px rgba(167, 139, 250, 0.7))' }}
                    />

                    {/* Glowing geospatial points */}
                    <g transform="translate(200, 210)">
                      <circle r="8" fill="#FF4D6D" fillOpacity="0.25" className="animate-ping" />
                      <circle r="4" fill="#FF4D6D" />
                      <text x="10" y="4" fill="#FF4D6D" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        CRITICAL INUNDATION
                      </text>
                    </g>

                    <g transform="translate(160, 130)">
                      <circle r="6" fill="#FBBF24" fillOpacity="0.2" className="animate-ping" />
                      <circle r="3" fill="#FBBF24" />
                      <text x="8" y="4" fill="#FBBF24" fontSize="9" fontFamily="monospace">
                        MODERATE SWELL
                      </text>
                    </g>

                    <g transform="translate(245, 300)">
                      <circle r="6" fill="#34D399" fillOpacity="0.2" />
                      <circle r="3" fill="#34D399" />
                      <text x="8" y="4" fill="#34D399" fontSize="9" fontFamily="monospace">
                        NORMAL RUNOFF
                      </text>
                    </g>
                  </svg>
                </div>

                {/* Bottom Visual Telemetry Status */}
                <div className="relative z-10 pt-3 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono text-[#A1A1AA]">
                  <span className="flex items-center gap-1.5 text-[#F8FAFC]">
                    <Compass size={13} className="text-[#A78BFA]" />
                    <span>Coordinate Sector: 25.5°N, 85.1°E</span>
                  </span>
                  <span className="text-[#C084FC]">XGBoost v1.4</span>
                </div>
              </div>

              {/* ----------------- 4 FLOATING DATA CARDS ----------------- */}
              {/* Card 1: Top-Left (Rainfall) */}
              <div className="hidden sm:flex absolute -top-5 -left-6 rounded-2xl bg-[#171925]/90 backdrop-blur-xl border border-[#8B5CF6]/30 p-3.5 shadow-2xl items-center gap-3 animate-float-slow z-20">
                <div className="p-2 rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA]">
                  <CloudRain size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">Rainfall (24h)</span>
                  <span className="text-base font-extrabold text-white font-mono">248 mm</span>
                </div>
              </div>

              {/* Card 2: Top-Right (River Discharge) */}
              <div className="hidden sm:flex absolute -top-3 -right-6 rounded-2xl bg-[#171925]/90 backdrop-blur-xl border border-[#C084FC]/30 p-3.5 shadow-2xl items-center gap-3 animate-float-medium z-20">
                <div className="p-2 rounded-xl bg-[#C084FC]/15 text-[#C084FC]">
                  <TrendingUp size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">River Discharge</span>
                  <span className="text-base font-extrabold text-white font-mono">3,842 m³/s</span>
                </div>
              </div>

              {/* Card 3: Bottom-Left (Flood Probability) */}
              <div className="hidden sm:flex absolute -bottom-6 -left-6 rounded-2xl bg-[#171925]/90 backdrop-blur-xl border border-[#F97316]/35 p-3.5 shadow-2xl items-center gap-3 animate-float-fast z-20">
                <div className="p-2 rounded-xl bg-[#F97316]/15 text-[#FB923C]">
                  <Activity size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">Flood Probability</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-extrabold text-white font-mono">82%</span>
                    <span className="text-[10px] font-mono text-[#FB923C] font-bold bg-[#F97316]/10 px-1.5 py-0.5 rounded">HIGH</span>
                  </div>
                </div>
              </div>

              {/* Card 4: Bottom-Right (Water Level) */}
              <div className="hidden sm:flex absolute -bottom-5 -right-6 rounded-2xl bg-[#171925]/90 backdrop-blur-xl border border-[#FBBF24]/35 p-3.5 shadow-2xl items-center gap-3 animate-float-slow z-20">
                <div className="p-2 rounded-xl bg-[#FBBF24]/15 text-[#FBBF24]">
                  <Waves size={18} />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">Gauge Water Level</span>
                  <span className="text-base font-extrabold text-white font-mono">7.4 m</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. LIVE INTELLIGENCE PREVIEW (DASHBOARD-STYLE)       */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-b from-[#171925] to-[#0D0F17] border border-white/[0.08] p-8 sm:p-10 shadow-2xl space-y-6">
          {/* Header Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <div className="mb-2">
                <SimulationBanner compact title="SIMULATED TELEMETRY FEED" variant="violet" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Live Regional Intelligence Preview
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-0.5">
                Simulated real-time sensor ingestion and hydrological classification across active basin nodes.
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs font-mono text-[#A1A1AA]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                <span>Station: IN-PAT-04</span>
              </span>
              <RiskBadge level={mockLiveTelemetry.riskLevel} size="md" pulse />
            </div>
          </div>

          {/* 5 Big Telemetry Metric Tiles */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="p-4 rounded-2xl bg-[#0D0F17] border border-white/[0.08] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">Flood Probability</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                {mockLiveTelemetry.floodProbability}%
              </div>
              <span className="text-[10px] font-mono text-[#FF4D6D]">High Risk Tier</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D0F17] border border-white/[0.08] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">Assessed Risk</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#F97316] font-mono">
                {mockLiveTelemetry.riskLevel}
              </div>
              <span className="text-[10px] font-mono text-[#A1A1AA]">Stage 2 Directive</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D0F17] border border-white/[0.08] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">Rainfall (24h)</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#A78BFA] font-mono">
                {mockLiveTelemetry.rainfall}
              </div>
              <span className="text-[10px] font-mono text-[#71717A]">+22% vs norm</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D0F17] border border-white/[0.08] space-y-1">
              <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">Water Level</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#FBBF24] font-mono">
                {mockLiveTelemetry.waterLevel}
              </div>
              <span className="text-[10px] font-mono text-[#FF4D6D]">0.6m to Danger</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#0D0F17] border border-white/[0.08] space-y-1 col-span-2 md:col-span-1">
              <span className="text-[10px] font-mono uppercase text-[#A1A1AA] block">River Discharge</span>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#C084FC] font-mono">
                {mockLiveTelemetry.riverDischarge}
              </div>
              <span className="text-[10px] font-mono text-[#71717A]">High flow rate</span>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. WHY RESCUENET-AI                                  */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="The Climate Reality"
          title="Why RescueNet-AI Matters"
          subtitle="Floods represent India’s most frequent and devastating climate calamity. Conventional forecasting mechanisms are too sluggish for rapid cloudbursts."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockWhyItems.map((item, idx) => (
            <div
              key={idx}
              className="rounded-3xl bg-[#171925] hover:bg-[#1D2030] backdrop-blur-md border border-white/[0.08] p-7 flex flex-col justify-between hover:border-[#8B5CF6]/40 transition-all duration-300 group hover:-translate-y-1"
            >
              <div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] font-mono">
                    {item.stat}
                  </span>
                  <span className="text-[11px] font-mono text-[#A1A1AA] uppercase tracking-wider">
                    {item.statLabel}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#A78BFA] transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.08] text-[11px] font-mono text-[#A78BFA] flex items-center gap-1">
                <span>Integrated into Risk Pipeline</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. HOW IT WORKS (CONNECTED TIMELINE)                 */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Architecture Pipeline"
          title="How RescueNet-AI Works"
          subtitle="From sensor telemetry ingestion to actionable disaster response across five automated phases."
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {mockWorkflowSteps.map((step, idx) => {
            const Icon = workflowIcons[step.icon] || Cpu;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-[#171925] hover:bg-[#1D2030] backdrop-blur-md border border-white/[0.08] p-6 flex flex-col justify-between hover:border-[#8B5CF6]/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] font-mono">
                      {step.step}
                    </span>
                    <span className="text-[9px] font-mono uppercase tracking-wider text-[#A78BFA] bg-[#8B5CF6]/10 px-2 py-0.5 rounded border border-[#8B5CF6]/20">
                      {step.tag}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-[#0D0F17] border border-white/[0.08] w-fit text-[#A78BFA] mb-3 group-hover:scale-110 transition-transform">
                    <Icon size={18} />
                  </div>

                  <h4 className="text-sm font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-xs text-[#A1A1AA] leading-relaxed">{step.description}</p>
                </div>

                {idx < mockWorkflowSteps.length - 1 && (
                  <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-[#71717A]">
                    <ChevronRight size={18} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. RISK INTELLIGENCE (INTERACTIVE 4 CARDS)           */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Operational Threat Classification"
          title="Risk Intelligence Tiers"
          subtitle="Calibrated hazard tiers that transform probabilistic outputs into immediate, standardized emergency directives."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(mockRiskLevels).map(([key, config]) => {
            const Icon = riskCardIcons[key] || ShieldAlert;
            const isHovered = activeRiskHover === key;

            return (
              <div
                key={key}
                onMouseEnter={() => setActiveRiskHover(key)}
                onMouseLeave={() => setActiveRiskHover(null)}
                className={`rounded-3xl bg-[#171925] hover:bg-[#1D2030] backdrop-blur-md border p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 cursor-pointer ${
                  isHovered
                    ? key === 'CRITICAL'
                      ? 'border-[#FF4D6D]/60 shadow-[0_10px_35px_rgba(255,77,109,0.25)]'
                      : key === 'HIGH'
                      ? 'border-[#F97316]/60 shadow-[0_10px_35px_rgba(249,115,22,0.25)]'
                      : key === 'MODERATE'
                      ? 'border-[#FBBF24]/60 shadow-[0_10px_35px_rgba(251,191,36,0.25)]'
                      : 'border-[#34D399]/60 shadow-[0_10px_35px_rgba(52,211,153,0.25)]'
                    : 'border-white/[0.08]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <RiskBadge level={key} size="sm" pulse={key === 'CRITICAL'} />
                    <Icon size={20} className={config.textColor} />
                  </div>

                  <div className="text-xs font-mono font-bold text-white mb-1">{config.range}</div>
                  <div className="text-[11px] font-mono text-[#A1A1AA] mb-3">{config.leadTime}</div>

                  <p className="text-xs text-[#A1A1AA] leading-relaxed mb-4">
                    {config.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.08] text-[11px] font-mono">
                  <span className="text-[#71717A] block text-[10px] uppercase">Required Action:</span>
                  <span className={`font-semibold ${config.textColor}`}>{config.action}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 6. PLATFORM CAPABILITIES (EDITORIAL-STYLE)           */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Platform Modules"
          title="Engineered for Comprehensive Disaster Preparedness"
          subtitle="Explore the deep computational and decision-support capabilities of the platform."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCapabilities.map((cap, idx) => {
            const Icon = capabilityIcons[cap.icon] || ShieldAlert;
            return (
              <div
                key={idx}
                className="rounded-3xl bg-[#171925] hover:bg-[#1D2030] backdrop-blur-md border border-white/[0.08] p-7 flex flex-col justify-between hover:border-[#8B5CF6]/40 transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="p-3 rounded-2xl bg-[#0D0F17] border border-white/[0.08] text-[#A78BFA] group-hover:scale-110 group-hover:border-[#8B5CF6]/50 transition-all">
                      <Icon size={22} />
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#A78BFA] bg-[#8B5CF6]/10 px-2.5 py-1 rounded-full border border-[#8B5CF6]/20">
                      {cap.highlight}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#71717A] block mb-1">
                    {cap.badge}
                  </span>
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#A78BFA] transition-colors">
                    {cap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
                    {cap.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold text-[#A78BFA] group-hover:text-[#C084FC] transition-colors">
                  <span>Explore module details</span>
                  <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 7. DISASTER RESPONSE SPOTLIGHT                       */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#171925] via-[#0D0F17] to-[#171925] border border-[#F97316]/30 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F97316]/10 border border-[#F97316]/30 text-[#FB923C] text-xs font-mono uppercase tracking-wider">
                <LifeBuoy size={14} />
                <span>Operational Response Unit</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                Turn Predictive Threat Signals Into Immediate Community Action
              </h3>

              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                Emergency response isn’t just about raw forecasts — it’s about mobilizing teams, securing power mains, warning vulnerable wards, and establishing verified evacuation corridors before waters rise.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-[#0D0F17] border border-white/[0.08]">
                  <span className="text-[#A78BFA] font-bold block">8-Point Checklist</span>
                  <span className="text-[#A1A1AA] text-[11px]">Household Go-Bag SOPs</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0D0F17] border border-white/[0.08]">
                  <span className="text-[#34D399] font-bold block">NDRF Directory</span>
                  <span className="text-[#A1A1AA] text-[11px]">24/7 Operations Cell</span>
                </div>
                <div className="p-3 rounded-xl bg-[#0D0F17] border border-white/[0.08] col-span-2 sm:col-span-1">
                  <span className="text-[#FB923C] font-bold block">Tier Protocols</span>
                  <span className="text-[#A1A1AA] text-[11px]">Calibrated Evacuation</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/disaster-response"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#F97316] to-[#FF4D6D] text-white font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_25px_rgba(249,115,22,0.4)] transition-all"
                >
                  <span>Open Disaster Response Center</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm rounded-2xl bg-[#0D0F17] border border-white/[0.08] p-6 space-y-4 shadow-xl">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <span className="text-xs font-mono text-[#FB923C] font-bold">Standard Operating Procedure</span>
                  <RiskBadge level="HIGH" size="sm" />
                </div>
                <div className="space-y-2.5 text-xs text-[#A1A1AA]">
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#F97316]/20 text-[#FB923C] flex items-center justify-center text-[10px] shrink-0 font-mono">1</span>
                    <span>Disconnect main breaker and LPG line immediately.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#F97316]/20 text-[#FB923C] flex items-center justify-center text-[10px] shrink-0 font-mono">2</span>
                    <span>Move valuable identification papers to elevated dry pouch.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#F97316]/20 text-[#FB923C] flex items-center justify-center text-[10px] shrink-0 font-mono">3</span>
                    <span>Never drive through murky flooded road corridors.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 8. AI ASSISTANT SPOTLIGHT                            */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-[#171925] border border-[#8B5CF6]/30 p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#A78BFA] text-xs font-mono uppercase tracking-wider">
                <Bot size={14} />
                <span>Natural Language Decision Support</span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white leading-tight">
                RescueNet AI Assistant: 24/7 Operational Guidance
              </h3>

              <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed">
                Emergency situations create chaotic information environments. Our AI Assistant decodes complex hydrological readings and provides precise evacuation, supply, and route advice in plain language.
              </p>

              <div className="pt-2">
                <Link
                  to="/ai-assistant"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] text-white font-bold text-xs uppercase tracking-wider hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] transition-all"
                >
                  <span>Launch AI Assistant Console</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Chat Preview Widget */}
            <div className="lg:col-span-6 rounded-2xl bg-[#0D0F17] border border-white/[0.08] p-5 space-y-3 font-sans text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/[0.08] text-[#A1A1AA] font-mono text-[11px]">
                <span className="flex items-center gap-1.5 text-white">
                  <Bot size={14} className="text-[#A78BFA]" />
                  <span>RescueNet AI Core Preview</span>
                </span>
                <span className="text-[#34D399]">Simulated LLM Node</span>
              </div>

              <div className="space-y-2.5">
                <div className="ml-auto bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] text-white p-3 rounded-xl rounded-tr-none max-w-xs font-medium">
                  What should our team do if river discharge surges past 3,500 m³/s?
                </div>
                <div className="bg-[#171925] text-[#F8FAFC] p-3 rounded-xl rounded-tl-none border border-white/[0.08] max-w-sm leading-relaxed">
                  Surges exceeding 3,500 m³/s indicate rapid channel overspill within 2-4 hours. Immediately sound Stage 2 municipal sirens, open secondary sluices, and move low-lying populations to elevated assembly points.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 9. RESEARCH & TECHNOLOGY ROADMAP                     */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionTitle
          badge="Academic & Engineering Foundation"
          title="Research & Technology Architecture"
          subtitle="Formulated as a defensible academic prototype combining validated machine learning, explainable AI (SHAP), and high-throughput backend services."
        />

        <div className="rounded-3xl bg-[#171925] backdrop-blur-md border border-white/[0.08] p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-xs">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#8B5CF6] font-bold font-mono">
                <Cpu size={16} />
                <span>Machine Learning</span>
              </div>
              <p className="text-[#A1A1AA] leading-relaxed">
                Trained on 10,000 balanced observations across 13 Indian hydro-meteorological features (Rainfall, Elevation, Soil Permeability, River Velocity).
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#C084FC] font-bold font-mono">
                <BarChart3 size={16} />
                <span>Explainable AI (SHAP)</span>
              </div>
              <p className="text-[#A1A1AA] leading-relaxed">
                Feature attribution models decompose black-box predictions into transparent percentage impacts for emergency administrators.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#34D399] font-bold font-mono">
                <Activity size={16} />
                <span>Spring Boot 3 + MongoDB</span>
              </div>
              <p className="text-[#A1A1AA] leading-relaxed">
                Enterprise backend architecture handles station telemetry ingestion, user authentication, and high-velocity spatial queries.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-[#FB923C] font-bold font-mono">
                <Radio size={16} />
                <span>Sensor Ingestion (Future)</span>
              </div>
              <p className="text-[#A1A1AA] leading-relaxed">
                Integration roadmap with Central Water Commission (CWC) API feeds and satellite precipitation grids for live surveillance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 10. FINAL CALL TO ACTION                             */}
      {/* ---------------------------------------------------- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="rounded-3xl bg-gradient-to-b from-[#171925] to-[#08090F] border border-[#8B5CF6]/30 p-10 sm:p-16 space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-radial-glow opacity-50 pointer-events-none" aria-hidden="true" />

          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#A78BFA] text-xs font-mono uppercase tracking-wider">
            <span>Explore The Platform</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight max-w-2xl mx-auto leading-tight">
            Ready to Evaluate Flood Risk in Your Region?
          </h2>

          <p className="text-sm sm:text-base text-[#A1A1AA] max-w-xl mx-auto leading-relaxed">
            Test custom environmental vectors or load validated monsoon disaster benchmarks into RescueNet-AI’s inference engine today.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-3">
            <Link
              to="/prediction"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] text-white font-bold text-sm tracking-wide shadow-lg shadow-[#8B5CF6]/30 hover:shadow-[#C084FC]/50 transition-all transform hover:-translate-y-0.5"
            >
              <span>Launch Flood Risk Predictor</span>
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/risk-map"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-[#0D0F17] hover:bg-[#171925] text-[#F8FAFC] border border-white/[0.08] font-semibold text-sm transition-all"
            >
              <MapPin size={17} className="text-[#A78BFA]" />
              <span>Explore India Risk Map</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
