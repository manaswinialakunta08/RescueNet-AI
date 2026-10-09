import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  CloudRain,
  TrendingUp,
  AlertTriangle,
  Search,
  RefreshCw,
  Thermometer,
  Droplets,
  Waves,
  MapPin,
  ExternalLink,
  Compass,
  BrainCircuit,
  LifeBuoy,
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import StatCard from '../components/StatCard';
import RiskBadge from '../components/RiskBadge';
import SimulationBanner from '../components/SimulationBanner';
import {
  mockDashboardStats,
  mockRecentPredictions,
  mockTrendData,
  mockRiskLocations,
  mockRiskDistribution
} from '../data/mockData';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('ALL');
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const filteredPredictions = mockRecentPredictions.filter((item) => {
    const matchesSearch =
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'ALL' || item.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Console Top Header & Operational Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
        <div>
          <SectionTitle
            badge="Telemetry Command Console"
            title="Operational Intelligence Dashboard"
            subtitle="Multi-station sensor ingestion, real-time basin telemetry, and predictive flood risk surveillance."
            className="mb-0"
          />
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <SimulationBanner compact title="48 STATIONS SIMULATED" variant="violet" />

          <button
            onClick={handleRefresh}
            className="p-2.5 rounded-xl bg-[#171925] hover:bg-[#1D2030] text-[#A1A1AA] hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
            title="Refresh Telemetry Feed"
            aria-label="Refresh telemetry data"
          >
            <RefreshCw size={15} className={isRefreshing ? 'animate-spin text-[#8B5CF6]' : ''} />
          </button>
        </div>
      </div>

      {/* Operator Welcome & System Status Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-[#171925] via-[#12141F] to-[#171925] border border-white/[0.08] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#8B5CF6]/15 border border-[#8B5CF6]/30 flex items-center justify-center text-[#A78BFA] shrink-0">
            <Activity size={22} />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
              <span>Welcome back, Operator &bull; Operational Flood Intelligence Overview</span>
            </h2>
            <p className="text-xs text-[#A1A1AA] mt-0.5">
              Continuous basin telemetry across 48 telemetry points. All metrics represent simulated environmental telemetry.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 font-mono text-xs text-[#A1A1AA] shrink-0">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#34D399]/10 border border-[#34D399]/20 text-[#34D399]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34D399] animate-pulse" />
            <span>Active Feed</span>
          </div>
          <span className="text-[#71717A]">Latency: 1.2s</span>
        </div>
      </div>

      {/* ----------------- 1. STATS ROW ----------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <StatCard
          title="Current Threat Level"
          value="HIGH"
          icon={AlertTriangle}
          accent="orange"
          badge={<RiskBadge level="HIGH" size="sm" pulse />}
          subtitle="Ganges & Mithi Basin Corridor"
        />

        <StatCard
          title="Flood Probability"
          value={mockDashboardStats.floodProbability}
          unit="%"
          icon={Activity}
          accent="violet"
          trend="+8% in past 6 hrs"
          isPositiveTrend={false}
          subtitle="Model Consensus"
        />

        <StatCard
          title="Monitored Stations"
          value={mockDashboardStats.activeStations}
          unit="nodes"
          icon={Compass}
          accent="purple"
          subtitle="Indian Catchment Grid"
        />

        <StatCard
          title="Model Confidence"
          value={mockDashboardStats.modelConfidence}
          unit="%"
          icon={BrainCircuit}
          accent="rose"
          subtitle="XGBoost & Random Forest"
        />
      </div>

      {/* ----------------- 2. QUICK ACTIONS & RISK DISTRIBUTION ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Risk Distribution Breakdown Card */}
        <div className="lg:col-span-6 rounded-3xl bg-[#171925] border border-white/[0.08] p-6 space-y-4 shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <ShieldAlert size={16} className="text-[#C084FC]" />
              <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                Risk Distribution (48 Stations)
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#A1A1AA]">Current Cycle</span>
          </div>

          {/* Segmented Distribution Bar */}
          <div className="space-y-2">
            <div className="h-3 w-full rounded-full overflow-hidden flex bg-[#0D0F17] p-0.5 border border-white/[0.05]">
              <div
                style={{ width: `${mockRiskDistribution.low.percent}%` }}
                className="bg-[#34D399] h-full rounded-l-full transition-all"
                title={`Low: ${mockRiskDistribution.low.count} stations`}
              />
              <div
                style={{ width: `${mockRiskDistribution.moderate.percent}%` }}
                className="bg-[#FBBF24] h-full transition-all"
                title={`Moderate: ${mockRiskDistribution.moderate.count} stations`}
              />
              <div
                style={{ width: `${mockRiskDistribution.high.percent}%` }}
                className="bg-[#F97316] h-full transition-all"
                title={`High: ${mockRiskDistribution.high.count} stations`}
              />
              <div
                style={{ width: `${mockRiskDistribution.critical.percent}%` }}
                className="bg-[#FF4D6D] h-full rounded-r-full transition-all"
                title={`Critical: ${mockRiskDistribution.critical.count} stations`}
              />
            </div>

            {/* Legend Chips with Counts */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded-xl bg-[#0D0F17] border border-white/[0.05]">
                <div className="flex items-center gap-1.5 text-[#34D399]">
                  <span className="w-2 h-2 rounded-full bg-[#34D399]" />
                  <span className="font-bold">LOW</span>
                </div>
                <div className="text-base font-extrabold text-white mt-1">
                  {mockRiskDistribution.low.count}
                </div>
                <span className="text-[10px] text-[#71717A]">{mockRiskDistribution.low.percent}%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0D0F17] border border-white/[0.05]">
                <div className="flex items-center gap-1.5 text-[#FBBF24]">
                  <span className="w-2 h-2 rounded-full bg-[#FBBF24]" />
                  <span className="font-bold">MODERATE</span>
                </div>
                <div className="text-base font-extrabold text-white mt-1">
                  {mockRiskDistribution.moderate.count}
                </div>
                <span className="text-[10px] text-[#71717A]">{mockRiskDistribution.moderate.percent}%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0D0F17] border border-white/[0.05]">
                <div className="flex items-center gap-1.5 text-[#F97316]">
                  <span className="w-2 h-2 rounded-full bg-[#F97316]" />
                  <span className="font-bold">HIGH</span>
                </div>
                <div className="text-base font-extrabold text-white mt-1">
                  {mockRiskDistribution.high.count}
                </div>
                <span className="text-[10px] text-[#71717A]">{mockRiskDistribution.high.percent}%</span>
              </div>

              <div className="p-2.5 rounded-xl bg-[#0D0F17] border border-white/[0.05]">
                <div className="flex items-center gap-1.5 text-[#FF4D6D]">
                  <span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-pulse" />
                  <span className="font-bold">CRITICAL</span>
                </div>
                <div className="text-base font-extrabold text-white mt-1">
                  {mockRiskDistribution.critical.count}
                </div>
                <span className="text-[10px] text-[#71717A]">{mockRiskDistribution.critical.percent}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Links / Operations Cards */}
        <div className="lg:col-span-6 rounded-3xl bg-[#171925] border border-white/[0.08] p-6 space-y-4 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider flex items-center gap-2">
              <Activity size={16} className="text-[#8B5CF6]" />
              Platform Quick Actions
            </h3>
            <span className="text-[11px] font-mono text-[#A1A1AA]">Direct Access</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Link
              to="/prediction"
              className="p-3.5 rounded-2xl bg-[#0D0F17] hover:bg-[#1D2030] border border-white/[0.08] hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <BrainCircuit size={16} />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                  Run Prediction
                </h4>
                <p className="text-[11px] text-[#A1A1AA] mt-1">
                  Simulate 13 environmental features.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-[#8B5CF6]">
                <span>Launch</span>
                <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/risk-map"
              className="p-3.5 rounded-2xl bg-[#0D0F17] hover:bg-[#1D2030] border border-white/[0.08] hover:border-[#8B5CF6]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-[#C084FC]/15 text-[#C084FC] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <MapPin size={16} />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#A78BFA] transition-colors">
                  Geospatial Map
                </h4>
                <p className="text-[11px] text-[#A1A1AA] mt-1">
                  Explore 8 river basins across India.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-[#C084FC]">
                <span>View Map</span>
                <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>

            <Link
              to="/disaster-response"
              className="p-3.5 rounded-2xl bg-[#0D0F17] hover:bg-[#1D2030] border border-white/[0.08] hover:border-[#F97316]/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-8 h-8 rounded-xl bg-[#F97316]/15 text-[#FB923C] flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                  <LifeBuoy size={16} />
                </div>
                <h4 className="text-xs font-bold text-white group-hover:text-[#FB923C] transition-colors">
                  Response SOPs
                </h4>
                <p className="text-[11px] text-[#A1A1AA] mt-1">
                  8-point checklist and NDRF directory.
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-mono text-[#FB923C]">
                <span>Directives</span>
                <ArrowRight size={11} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* ----------------- 3. TREND CHART & TELEMETRY GAUGES ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Trend Area with SVG Visual Chart */}
        <div className="lg:col-span-8 rounded-3xl bg-[#171925] backdrop-blur-md border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#8B5CF6]" />
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-wider font-mono">
                  24-Hour Inundation Probability & Precipitation Trend
                </h3>
              </div>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Hydro-metric sensor readings plotted across 4-hour monitoring cycles.
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-[#A78BFA]">
                <span className="w-3 h-0.5 bg-[#8B5CF6]" /> Probability (%)
              </span>
              <span className="flex items-center gap-1.5 text-[#FB923C]">
                <span className="w-3 h-0.5 bg-[#F97316]" /> Rainfall (mm)
              </span>
            </div>
          </div>

          {/* Responsive SVG Chart */}
          <div className="w-full bg-[#0D0F17] rounded-2xl p-4 border border-white/[0.08]">
            <svg
              viewBox="0 0 600 220"
              className="w-full h-48 sm:h-56 overflow-visible"
              preserveAspectRatio="none"
              aria-label="24-Hour Flood Probability and Precipitation Line Chart"
            >
              <defs>
                <linearGradient id="probGradientDash" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="40" y1="20" x2="580" y2="20" stroke="#2E234D" strokeDasharray="3 3" opacity="0.6" />
              <line x1="40" y1="70" x2="580" y2="70" stroke="#2E234D" strokeDasharray="3 3" opacity="0.6" />
              <line x1="40" y1="120" x2="580" y2="120" stroke="#2E234D" strokeDasharray="3 3" opacity="0.6" />
              <line x1="40" y1="170" x2="580" y2="170" stroke="#2E234D" strokeDasharray="3 3" opacity="0.6" />

              {/* Y Axis Labels */}
              <text x="30" y="24" fill="#71717A" fontSize="10" textAnchor="end" fontFamily="monospace">100%</text>
              <text x="30" y="74" fill="#71717A" fontSize="10" textAnchor="end" fontFamily="monospace">75%</text>
              <text x="30" y="124" fill="#71717A" fontSize="10" textAnchor="end" fontFamily="monospace">50%</text>
              <text x="30" y="174" fill="#71717A" fontSize="10" textAnchor="end" fontFamily="monospace">25%</text>

              {/* Area Under Curve */}
              <polygon
                points="40,170 40,130 130,116 220,98 310,72 400,56 490,50 580,62 580,170"
                fill="url(#probGradientDash)"
              />

              {/* Probability Curve */}
              <polyline
                fill="none"
                stroke="#8B5CF6"
                strokeWidth="3"
                points="40,130 130,116 220,98 310,72 400,56 490,50 580,62"
                style={{ filter: 'drop-shadow(0 0 6px rgba(139, 92, 246, 0.6))' }}
              />

              {/* Rainfall Bars (Secondary Visual) */}
              {[
                { x: 40, h: 25 },
                { x: 130, h: 38 },
                { x: 220, h: 58 },
                { x: 310, h: 86 },
                { x: 400, h: 104 },
                { x: 490, h: 114 },
                { x: 580, h: 96 }
              ].map((bar, i) => (
                <rect
                  key={i}
                  x={bar.x - 7}
                  y={170 - bar.h}
                  width="14"
                  height={bar.h}
                  fill="#F97316"
                  opacity="0.3"
                  rx="3"
                />
              ))}

              {/* Data Points on Probability Line */}
              {[
                { cx: 40, cy: 130, label: '45%' },
                { cx: 130, cy: 116, label: '52%' },
                { cx: 220, cy: 98, label: '61%' },
                { cx: 310, cy: 72, label: '74%' },
                { cx: 400, cy: 56, label: '82%' },
                { cx: 490, cy: 50, label: '85%' },
                { cx: 580, cy: 62, label: '79%' }
              ].map((pt, i) => (
                <g key={i}>
                  <circle cx={pt.cx} cy={pt.cy} r="4" fill="#F8FAFC" stroke="#8B5CF6" strokeWidth="2.5" />
                  <text
                    x={pt.cx}
                    y={pt.cy - 10}
                    fill="#F8FAFC"
                    fontSize="9"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {pt.label}
                  </text>
                </g>
              ))}

              {/* X Axis Time Labels */}
              {mockTrendData.map((d, i) => {
                const xCoord = 40 + i * 90;
                return (
                  <text
                    key={i}
                    x={xCoord}
                    y="195"
                    fill="#71717A"
                    fontSize="10"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {d.time.split(' ')[0]}
                  </text>
                );
              })}
            </svg>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between text-[11px] font-mono text-[#A1A1AA] pt-3 border-t border-white/[0.08]">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF4D6D] animate-ping" />
              <span>Critical threshold reached at 16:00 IST (82% probability)</span>
            </span>
            <span className="text-[#71717A]">Sampling interval: 4.0 hrs</span>
          </div>
        </div>

        {/* Environmental Indicators Column */}
        <div className="lg:col-span-4 rounded-3xl bg-[#171925] border border-white/[0.08] p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          <div className="space-y-4">
            <div className="pb-3 border-b border-white/[0.08] flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Telemetry Vectors
              </h3>
              <span className="text-[10px] font-mono text-[#34D399]">Live Status</span>
            </div>

            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-[#0D0F17] border border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA]">
                    <CloudRain size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Precipitation (24h)</span>
                    <span className="text-[10px] text-[#71717A] font-mono">Peak Monsoon Rain</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#A78BFA] text-sm">174.2 mm</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0D0F17] border border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#F97316]/15 text-[#FB923C]">
                    <TrendingUp size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Discharge Rate</span>
                    <span className="text-[10px] text-[#71717A] font-mono">Surface Runoff</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#FB923C] text-sm">3,410 m³/s</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0D0F17] border border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#FBBF24]/15 text-[#FBBF24]">
                    <Waves size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">River Water Level</span>
                    <span className="text-[10px] text-[#71717A] font-mono">Channel Stage</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-[#FBBF24] text-sm">7.85 m</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0D0F17] border border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#34D399]/15 text-[#34D399]">
                    <Thermometer size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Temperature</span>
                    <span className="text-[10px] text-[#71717A] font-mono">Ambient Temp</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-white text-sm">27.8 °C</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#0D0F17] border border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#C084FC]/15 text-[#C084FC]">
                    <Droplets size={16} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-white block">Humidity</span>
                    <span className="text-[10px] text-[#71717A] font-mono">Atmospheric Saturation</span>
                  </div>
                </div>
                <span className="font-mono font-bold text-white text-sm">89.4 %</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <Link
              to="/prediction"
              className="w-full py-3 rounded-2xl bg-[#0D0F17] hover:bg-[#1D2030] border border-white/[0.08] text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all"
            >
              <BrainCircuit size={14} className="text-[#A78BFA]" />
              <span>Simulate Custom Vector</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ----------------- 4. INFERENCE LOG & REGIONAL MATRIX ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Recent Inferences Table */}
        <div className="lg:col-span-8 rounded-3xl bg-[#171925] border border-white/[0.08] p-6 sm:p-8 space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.08]">
            <div>
              <h3 className="text-sm sm:text-base font-bold text-white font-mono uppercase tracking-wider">
                Recent Model Inferences
              </h3>
              <p className="text-xs text-[#A1A1AA]">
                Validated prediction outputs stored in simulated operational telemetry cache.
              </p>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter station..."
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono placeholder:text-[#71717A] focus:outline-none focus:border-[#8B5CF6] w-36 sm:w-48"
                />
              </div>

              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="px-3 py-1.5 rounded-xl bg-[#0D0F17] border border-white/10 text-white text-xs font-mono focus:outline-none focus:border-[#8B5CF6]"
              >
                <option value="ALL">All Tiers</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MODERATE">Moderate</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            {filteredPredictions.length === 0 ? (
              <div className="text-center py-10 space-y-2">
                <p className="text-sm font-medium text-[#F8FAFC]">No inferences found</p>
                <p className="text-xs text-[#71717A]">Try adjusting your search query or threat level filter.</p>
              </div>
            ) : (
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/[0.08] text-[#71717A] uppercase font-mono tracking-wider text-[11px]">
                    <th className="py-3 px-3">ID</th>
                    <th className="py-3 px-3">Basin / City</th>
                    <th className="py-3 px-3">Threat</th>
                    <th className="py-3 px-3">Probability</th>
                    <th className="py-3 px-3">Timestamp</th>
                    <th className="py-3 px-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.05] font-sans">
                  {filteredPredictions.map((row) => (
                    <tr key={row.id} className="hover:bg-[#0D0F17]/60 transition-colors">
                      <td className="py-3 px-3 font-mono text-[#A78BFA] font-semibold">{row.id}</td>
                      <td className="py-3 px-3">
                        <span className="font-semibold text-white block">{row.location}</span>
                        <span className="text-[10px] text-[#71717A]">{row.state}</span>
                      </td>
                      <td className="py-3 px-3">
                        <RiskBadge level={row.riskLevel} size="sm" />
                      </td>
                      <td className="py-3 px-3 font-mono font-bold text-white">
                        {row.probability}%
                      </td>
                      <td className="py-3 px-3 font-mono text-[#A1A1AA] text-[11px]">
                        {row.date}
                      </td>
                      <td className="py-3 px-3 text-right font-mono text-[10px]">
                        <span className="px-2 py-0.5 rounded bg-[#0D0F17] border border-white/[0.08] text-[#A1A1AA]">
                          {row.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Geographic Preview Column */}
        <div className="lg:col-span-4 rounded-3xl bg-[#171925] border border-white/[0.08] p-6 flex flex-col justify-between shadow-2xl">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#8B5CF6]" />
                <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
                  Spatial Matrix
                </h3>
              </div>
              <Link
                to="/risk-map"
                className="text-[11px] font-mono text-[#A78BFA] hover:underline flex items-center gap-1"
              >
                <span>Full Map</span>
                <ExternalLink size={12} />
              </Link>
            </div>

            <p className="text-xs text-[#A1A1AA] leading-relaxed">
              Active telemetry monitoring across 8 critical river corridors in India.
            </p>

            <div className="space-y-2">
              {mockRiskLocations.slice(0, 4).map((loc) => (
                <div
                  key={loc.id}
                  className="p-3 rounded-2xl bg-[#0D0F17] border border-white/[0.08] flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-white block">{loc.name}</span>
                    <span className="text-[10px] text-[#71717A]">{loc.basin}</span>
                  </div>
                  <RiskBadge level={loc.riskLevel} size="sm" showIcon={false} />
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.08]">
            <Link
              to="/risk-map"
              className="w-full py-3 rounded-2xl bg-[#0D0F17] hover:bg-[#1D2030] border border-white/[0.08] text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all"
            >
              <Compass size={14} className="text-[#A78BFA]" />
              <span>Open Geographic Intelligence</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
