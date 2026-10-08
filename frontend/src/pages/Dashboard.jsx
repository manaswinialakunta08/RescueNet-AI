import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  CloudRain,
  TrendingUp,
  AlertTriangle,
  Clock,
  Search,
  RefreshCw,
  Thermometer,
  Droplets,
  Waves,
  MapPin,
  ExternalLink,
  Compass
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import StatCard from '../components/StatCard';
import RiskBadge from '../components/RiskBadge';
import {
  mockDashboardStats,
  mockRecentPredictions,
  mockTrendData,
  mockRiskLocations
} from '../data/mockData';

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRisk, setFilterRisk] = useState('ALL');

  const filteredPredictions = mockRecentPredictions.filter((item) => {
    const matchesSearch =
      item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRisk = filterRisk === 'ALL' || item.riskLevel === filterRisk;
    return matchesSearch && matchesRisk;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
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
          <div className="flex items-center gap-2 text-xs font-mono text-[#34D399] bg-[#34D399]/10 border border-[#34D399]/30 px-3 py-1.5 rounded-xl shadow-[0_0_12px_rgba(52,211,153,0.15)]">
            <span className="w-2 h-2 rounded-full bg-[#34D399] animate-pulse" />
            <span>48 Stations Online (Mock)</span>
          </div>

          <button
            onClick={() => window.location.reload()}
            className="p-2 rounded-xl bg-[#171925] hover:bg-[#1D2030] text-[#A1A1AA] hover:text-white border border-white/[0.08] transition-colors cursor-pointer"
            title="Refresh Telemetry Feed"
          >
            <RefreshCw size={15} />
          </button>
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
          title="Precipitation (24h)"
          value={mockDashboardStats.rainfall24h}
          unit="mm"
          icon={CloudRain}
          accent="purple"
          trend="+18.4% above norm"
          isPositiveTrend={false}
          subtitle="Cumulative Basin Avg"
        />

        <StatCard
          title="River Discharge"
          value="3,410"
          unit="m³/s"
          icon={TrendingUp}
          accent="rose"
          trend="Accelerating velocity"
          isPositiveTrend={false}
          subtitle="Approaching Stage 2"
        />
      </div>

      {/* ----------------- 2. TREND CHART & TELEMETRY GAUGES ----------------- */}
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
                strokeWidth="2.5"
                points="40,130 130,116 220,98 310,72 400,56 490,50 580,62"
                style={{ filter: 'drop-shadow(0 0 8px rgba(139, 92, 246, 0.5))' }}
              />

              {/* Rainfall Curve */}
              <polyline
                fill="none"
                stroke="#F97316"
                strokeWidth="2"
                strokeDasharray="4 2"
                points="40,150 130,135 220,110 310,80 400,60 490,55 580,75"
              />

              {/* Markers with Values */}
              {[
                [40, 130, '45%'],
                [130, 116, '52%'],
                [220, 98, '61%'],
                [310, 72, '74%'],
                [400, 56, '82%'],
                [490, 50, '85%'],
                [580, 62, '79%']
              ].map(([cx, cy, val], idx) => (
                <g key={idx}>
                  <circle cx={cx} cy={cy} r="4.5" fill="#8B5CF6" stroke="#0D0F17" strokeWidth="2.5" />
                  <text
                    x={cx}
                    y={cy - 9}
                    fill="#F8FAFC"
                    fontSize="9"
                    textAnchor="middle"
                    fontFamily="monospace"
                    fontWeight="bold"
                  >
                    {val}
                  </text>
                </g>
              ))}

              {/* X Axis Timestamps */}
              {mockTrendData.map((d, idx) => {
                const x = 40 + idx * 90;
                return (
                  <text
                    key={idx}
                    x={x}
                    y="196"
                    fill="#71717A"
                    fontSize="9"
                    textAnchor="middle"
                    fontFamily="monospace"
                  >
                    {d.time}
                  </text>
                );
              })}
            </svg>
          </div>

          <div className="pt-4 flex items-center justify-between text-xs text-[#A1A1AA] font-mono">
            <span className="text-[#FB923C]">Critical Surcharge Warning: +2.1 hrs</span>
            <span className="text-[#A78BFA]">Simulated Telemetry Buffer Active</span>
          </div>
        </div>

        {/* Environmental Gauges Panel */}
        <div className="lg:col-span-4 space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
              Hydro-Climatic Gauges
            </h3>
            <p className="text-xs text-[#A1A1AA] mt-0.5">Threshold markers in active monitoring basin.</p>
          </div>

          <div className="space-y-3 flex-1">
            <div className="rounded-2xl bg-[#171925] border border-white/[0.08] p-4 flex items-start gap-3.5 hover:border-[#8B5CF6]/30 transition-all">
              <div className="p-2.5 rounded-xl bg-[#8B5CF6]/15 text-[#A78BFA] shrink-0">
                <CloudRain size={18} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#A1A1AA] font-medium">Precipitation (24h)</span>
                  <span className="text-sm font-bold text-white font-mono">174.2 mm</span>
                </div>
                <div className="text-[11px] text-[#FF4D6D] font-mono mt-0.5">+18% above flashpoint</div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#171925] border border-white/[0.08] p-4 flex items-start gap-3.5 hover:border-[#F97316]/30 transition-all">
              <div className="p-2.5 rounded-xl bg-[#F97316]/15 text-[#FB923C] shrink-0">
                <Thermometer size={18} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#A1A1AA] font-medium">Temperature</span>
                  <span className="text-sm font-bold text-white font-mono">27.8 °C</span>
                </div>
                <div className="text-[11px] text-[#71717A] font-mono mt-0.5">Inversion layer stable</div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#171925] border border-white/[0.08] p-4 flex items-start gap-3.5 hover:border-[#C084FC]/30 transition-all">
              <div className="p-2.5 rounded-xl bg-[#C084FC]/15 text-[#C084FC] shrink-0">
                <Droplets size={18} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#A1A1AA] font-medium">Humidity</span>
                  <span className="text-sm font-bold text-white font-mono">89.4 %</span>
                </div>
                <div className="text-[11px] text-[#FBBF24] font-mono mt-0.5">Near soil-vapor saturation</div>
              </div>
            </div>

            <div className="rounded-2xl bg-[#171925] border border-white/[0.08] p-4 flex items-start gap-3.5 hover:border-[#FF4D6D]/30 transition-all">
              <div className="p-2.5 rounded-xl bg-[#FF4D6D]/15 text-[#FF4D6D] shrink-0">
                <Waves size={18} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-baseline">
                  <span className="text-xs text-[#A1A1AA] font-medium">Gauge Water Level</span>
                  <span className="text-sm font-bold text-[#FF4D6D] font-mono">7.85 m</span>
                </div>
                <div className="text-[11px] text-[#FF4D6D] font-mono mt-0.5">0.65m to Danger Mark</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ----------------- 3. RECENT INFERENCES TABLE & GEOGRAPHIC PREVIEW ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Table Column */}
        <div className="lg:col-span-8 rounded-3xl bg-[#171925] border border-white/[0.08] p-6 sm:p-8 space-y-5 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-bold text-white uppercase tracking-wider font-mono flex items-center gap-2">
                <Clock size={16} className="text-[#A78BFA]" />
                Recent Model Inferences
              </h3>
              <p className="text-xs text-[#A1A1AA] mt-1">
                Historical records across major Indian monitoring stations.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A]" />
                <input
                  type="text"
                  placeholder="Search city / id..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 rounded-xl bg-[#0D0F17] border border-white/10 text-xs text-white placeholder-[#71717A] focus:outline-none focus:border-[#8B5CF6]"
                />
              </div>

              <select
                value={filterRisk}
                onChange={(e) => setFilterRisk(e.target.value)}
                className="px-2.5 py-1.5 rounded-xl bg-[#0D0F17] border border-white/10 text-xs text-white focus:outline-none focus:border-[#8B5CF6]"
              >
                <option value="ALL">All Levels</option>
                <option value="CRITICAL">Critical</option>
                <option value="HIGH">High</option>
                <option value="MODERATE">Moderate</option>
                <option value="LOW">Low</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
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
