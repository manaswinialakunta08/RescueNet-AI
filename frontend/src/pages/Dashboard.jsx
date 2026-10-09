import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  CloudRain,
  Waves,
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  MapPin,
  Compass,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';
import StatCard from '../components/StatCard';
import RiskBadge from '../components/RiskBadge';
import {
  mockRecentPredictions
} from '../data/mockData';

export default function Dashboard() {
  const [selectedLocation, setSelectedLocation] = useState('Hyderabad, Telangana');
  const [timeRange, setTimeRange] = useState('7D');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 500);
  };

  // 7 Days Trend Data
  const rainfall7D = [45, 62, 88, 120, 185, 210, 248];
  const waterLevel7D = [4.2, 4.8, 5.3, 5.9, 6.4, 6.9, 7.4];
  const days7D = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F8FAFC]">
      {/* ----------------- TOP CONTROLS & HEADER (Panel 5) ----------------- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E5E7F0]">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EBFF] text-[#7047E8] text-xs font-semibold mb-1.5">
            <Activity size={13} />
            <span>Hydrological Telemetry Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17182B] tracking-tight">
            Flood Intelligence Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#686B7D] mt-0.5">
            Real-time hydrological monitoring and multi-basin predictive analytics.
          </p>
        </div>

        {/* Right Filter & Live Controls */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          {/* Location Select */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-[#E5E7F0] text-xs font-medium text-[#17182B] shadow-xs">
            <MapPin size={14} className="text-[#7047E8]" />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="bg-transparent outline-none cursor-pointer pr-2 font-semibold"
            >
              <option value="Hyderabad, Telangana">Hyderabad, Telangana</option>
              <option value="Patna, Bihar">Patna, Bihar</option>
              <option value="Mumbai, Maharashtra">Mumbai, Maharashtra</option>
              <option value="Guwahati, Assam">Guwahati, Assam</option>
            </select>
          </div>

          {/* Time Range Toggle */}
          <div className="flex p-0.5 bg-white border border-[#E5E7F0] rounded-xl text-xs font-medium shadow-xs">
            <button
              onClick={() => setTimeRange('7D')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === '7D'
                  ? 'bg-[#7047E8] text-white font-bold'
                  : 'text-[#686B7D] hover:text-[#17182B]'
              }`}
            >
              7 Days
            </button>
            <button
              onClick={() => setTimeRange('30D')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                timeRange === '30D'
                  ? 'bg-[#7047E8] text-white font-bold'
                  : 'text-[#686B7D] hover:text-[#17182B]'
              }`}
            >
              30 Days
            </button>
          </div>

          {/* Live Status Pill */}
          <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#ECFDF5] border border-[#A7F3D0] text-[#22A879] text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#22A879] animate-pulse" />
            <span>Live Monitoring</span>
          </div>

          {/* Refresh Button */}
          <button
            onClick={handleRefresh}
            className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-[#686B7D] hover:text-[#17182B] border border-[#E5E7F0] transition-colors shadow-xs"
            title="Refresh telemetry"
          >
            <RefreshCw size={15} className={isRefreshing ? 'animate-spin text-[#7047E8]' : ''} />
          </button>
        </div>
      </div>

      {/* ----------------- 4 STAT CARDS (Panel 5) ----------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      {/* ----------------- 2-COLUMN MAIN CONTENT ----------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Flood Risk Map + Trends (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Flood Risk Map (Panel 5) */}
          <div className="rounded-2xl bg-white border border-[#E5E7F0] p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7F0] mb-3">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-[#7047E8]" />
                <h3 className="font-bold text-sm text-[#17182B]">
                  Hyderabad Flood Risk Map
                </h3>
                <span className="text-[10px] bg-[#ECFDF5] text-[#22A879] font-medium px-2 py-0.5 rounded-full border border-[#A7F3D0]">
                  Station Node #4
                </span>
              </div>

              {/* Map Zoom Controls */}
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

            {/* Stylized SVG Map Display */}
            <div className="relative h-72 rounded-xl bg-[#F3F4FA] border border-[#E5E7F0] overflow-hidden flex items-center justify-center">
              <div
                className="w-full h-full transition-transform duration-300"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <svg viewBox="0 0 500 320" className="w-full h-full">
                  <defs>
                    <pattern id="dash-grid" width="28" height="28" patternUnits="userSpaceOnUse">
                      <path d="M 28 0 L 0 0 0 28" fill="none" stroke="#E2E5F0" strokeWidth="0.8" />
                    </pattern>
                    <radialGradient id="dash-heat-high" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#E5484D" stopOpacity="0.75" />
                      <stop offset="60%" stopColor="#E9A23B" stopOpacity="0.35" />
                      <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="dash-heat-mod" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#E9A23B" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="dash-heat-low" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#22A879" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#A7F3D0" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  <rect width="100%" height="100%" fill="url(#dash-grid)" />

                  {/* Road Network */}
                  <path d="M 0,70 Q 250,90 500,80" fill="none" stroke="#D8DBEB" strokeWidth="2" />
                  <path d="M 0,230 Q 250,210 500,240" fill="none" stroke="#D8DBEB" strokeWidth="2" />
                  <path d="M 130,0 Q 150,160 140,320" fill="none" stroke="#D8DBEB" strokeWidth="2" />
                  <path d="M 370,0 Q 350,160 380,320" fill="none" stroke="#D8DBEB" strokeWidth="2" />

                  {/* Musi River */}
                  <path
                    d="M 20,270 C 130,250 190,160 270,170 C 350,180 430,120 480,100"
                    fill="none"
                    stroke="#3478DB"
                    strokeWidth="8"
                    strokeOpacity="0.45"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 20,270 C 130,250 190,160 270,170 C 350,180 430,120 480,100"
                    fill="none"
                    stroke="#7047E8"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />

                  {/* Heatmap zones */}
                  <circle cx="120" cy="100" r="50" fill="url(#dash-heat-low)" />
                  <circle cx="120" cy="100" r="4" fill="#22A879" />
                  <text x="130" y="104" fontSize="10" fontWeight="600" fill="#22A879">Secunderabad</text>

                  <circle cx="390" cy="200" r="60" fill="url(#dash-heat-mod)" />
                  <circle cx="390" cy="200" r="4" fill="#E9A23B" />
                  <text x="320" y="204" fontSize="10" fontWeight="600" fill="#E9A23B">LB Nagar</text>

                  {/* High Risk Core */}
                  <circle cx="260" cy="165" r="75" fill="url(#dash-heat-high)" />
                  <circle cx="260" cy="165" r="14" fill="#E5484D" fillOpacity="0.25" className="animate-ping" />
                  <circle cx="260" cy="165" r="6" fill="#E5484D" />
                  <text x="215" y="145" fontSize="11" fontWeight="700" fill="#E5484D">Central Basin</text>

                  <g transform="translate(260, 165)">
                    <rect x="-42" y="10" width="84" height="20" rx="4" fill="#17182B" />
                    <text x="0" y="23" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FFFFFF">
                      82% Flood Risk
                    </text>
                  </g>
                </svg>
              </div>

              {/* Floating Map Legend Tag */}
              <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 border border-[#E5E7F0] shadow-xs text-[10px] space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E5484D]" />
                  <span className="font-bold text-[#17182B]">High Risk (&gt;65%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#E9A23B]" />
                  <span className="text-[#686B7D]">Moderate (35-65%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#22A879]" />
                  <span className="text-[#686B7D]">Low (&lt;35%)</span>
                </div>
              </div>
            </div>

            {/* Bottom status */}
            <div className="flex items-center justify-between pt-3 text-xs text-[#686B7D]">
              <span className="flex items-center gap-1.5 font-medium">
                <Compass size={14} className="text-[#7047E8]" />
                Sensor Grid: 17.3850° N, 78.4867° E
              </span>
              <Link to="/prediction" className="text-[#7047E8] font-bold hover:underline flex items-center gap-1">
                Run Simulation <ArrowRight size={13} />
              </Link>
            </div>
          </div>

          {/* Card 2: Rainfall Trend Area Chart (Panel 5) */}
          <div className="rounded-2xl bg-white border border-[#E5E7F0] p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7F0] mb-4">
              <div>
                <h3 className="font-bold text-sm text-[#17182B]">Rainfall Trend (24h Accumulation)</h3>
                <p className="text-xs text-[#686B7D]">Past 7-day precipitation volume curve</p>
              </div>
              <span className="text-xs font-bold text-[#3478DB] bg-[#3478DB]/10 px-2.5 py-1 rounded-lg">
                Peak: 248 mm
              </span>
            </div>

            {/* SVG Area Chart */}
            <div className="h-44 w-full">
              <svg viewBox="0 0 500 160" className="w-full h-full">
                <defs>
                  <linearGradient id="rainGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3478DB" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#3478DB" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Grid horizontal lines */}
                <line x1="40" y1="20" x2="490" y2="20" stroke="#E5E7F0" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="60" x2="490" y2="60" stroke="#E5E7F0" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="100" x2="490" y2="100" stroke="#E5E7F0" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="40" y1="140" x2="490" y2="140" stroke="#E5E7F0" strokeWidth="1" />

                {/* Y Axis labels */}
                <text x="32" y="24" fontSize="9" fill="#686B7D" textAnchor="end">250mm</text>
                <text x="32" y="64" fontSize="9" fill="#686B7D" textAnchor="end">150mm</text>
                <text x="32" y="104" fontSize="9" fill="#686B7D" textAnchor="end">50mm</text>

                {/* Path area */}
                <path
                  d="M 50,130 L 115,115 L 180,95 L 245,75 L 310,40 L 375,30 L 440,15 L 440,140 L 50,140 Z"
                  fill="url(#rainGrad)"
                />
                <path
                  d="M 50,130 L 115,115 L 180,95 L 245,75 L 310,40 L 375,30 L 440,15"
                  fill="none"
                  stroke="#3478DB"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Points */}
                {rainfall7D.map((val, i) => {
                  const cx = 50 + i * 65;
                  const cy = 140 - (val / 260) * 125;
                  return (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="3.5" fill="#3478DB" />
                      <text x={cx} y="153" fontSize="9" fill="#686B7D" textAnchor="middle">
                        {days7D[i]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Card 3: Water Level Trend Area Chart (Panel 5) */}
          <div className="rounded-2xl bg-white border border-[#E5E7F0] p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7F0] mb-4">
              <div>
                <h3 className="font-bold text-sm text-[#17182B]">Water Level Trend</h3>
                <p className="text-xs text-[#686B7D]">Musi River gauge height vs. danger mark (6.2m)</p>
              </div>
              <span className="text-xs font-bold text-[#E5484D] bg-[#FEF2F2] border border-[#FECACA] px-2.5 py-1 rounded-lg">
                Current: 7.4 m (Hazard)
              </span>
            </div>

            {/* SVG Area Chart */}
            <div className="h-44 w-full">
              <svg viewBox="0 0 500 160" className="w-full h-full">
                <defs>
                  <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#7047E8" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#7047E8" stopOpacity="0.02" />
                  </linearGradient>
                </defs>

                {/* Red Danger Mark Line */}
                <line x1="40" y1="55" x2="490" y2="55" stroke="#E5484D" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="480" y="50" fontSize="8" fontWeight="bold" fill="#E5484D" textAnchor="end">
                  Danger Level (6.2m)
                </text>

                {/* Y Axis labels */}
                <text x="32" y="24" fontSize="9" fill="#686B7D" textAnchor="end">8.0m</text>
                <text x="32" y="58" fontSize="9" fill="#E5484D" textAnchor="end" fontWeight="bold">6.2m</text>
                <text x="32" y="104" fontSize="9" fill="#686B7D" textAnchor="end">4.0m</text>
                <line x1="40" y1="140" x2="490" y2="140" stroke="#E5E7F0" strokeWidth="1" />

                {/* Path area */}
                <path
                  d="M 50,110 L 115,100 L 180,85 L 245,65 L 310,50 L 375,35 L 440,22 L 440,140 L 50,140 Z"
                  fill="url(#waterGrad)"
                />
                <path
                  d="M 50,110 L 115,100 L 180,85 L 245,65 L 310,50 L 375,35 L 440,22"
                  fill="none"
                  stroke="#7047E8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Points */}
                {waterLevel7D.map((val, i) => {
                  const cx = 50 + i * 65;
                  const cy = 140 - (val / 8.5) * 125;
                  return (
                    <g key={i}>
                      <circle cx={cx} cy={cy} r="3.5" fill={val >= 6.2 ? '#E5484D' : '#7047E8'} />
                      <text x={cx} y="153" fontSize="9" fill="#686B7D" textAnchor="middle">
                        {days7D[i]}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Right Column: Recent Predictions Table & Recent Alerts (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Component 1: Recent Predictions Table (Panel 5) */}
          <div className="rounded-2xl bg-white border border-[#E5E7F0] p-5 shadow-sm">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7F0] mb-4">
              <div>
                <h3 className="font-bold text-sm text-[#17182B]">Recent Predictions</h3>
                <p className="text-xs text-[#686B7D]">Latest ML basin inferences across India</p>
              </div>
              <Link to="/prediction" className="text-xs font-bold text-[#7047E8] hover:underline">
                New Run
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#E5E7F0] text-[10px] font-bold text-[#686B7D] uppercase tracking-wider">
                    <th className="pb-2">Location</th>
                    <th className="pb-2">Risk</th>
                    <th className="pb-2">Probability</th>
                    <th className="pb-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7F0]">
                  {mockRecentPredictions.slice(0, 5).map((pred) => (
                    <tr key={pred.id} className="hover:bg-[#F8FAFC] transition-colors">
                      <td className="py-2.5">
                        <div className="font-bold text-[#17182B]">{pred.location}</div>
                        <div className="text-[10px] text-[#686B7D]">{pred.timestamp}</div>
                      </td>
                      <td className="py-2.5">
                        <RiskBadge level={pred.riskLevel} size="sm" />
                      </td>
                      <td className="py-2.5 font-bold text-[#17182B]">
                        {pred.probability}%
                      </td>
                      <td className="py-2.5 text-right">
                        <Link
                          to="/response"
                          className="text-[11px] font-semibold text-[#7047E8] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Plan</span>
                          <ArrowRight size={11} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Component 2: Active Alerts Panel (Panel 5) */}
          <div className="rounded-2xl bg-white border border-[#E5E7F0] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#E5E7F0]">
              <div className="flex items-center gap-2">
                <ShieldAlert size={16} className="text-[#E5484D]" />
                <h3 className="font-bold text-sm text-[#17182B]">Active Flood Alerts</h3>
              </div>
              <span className="text-[10px] bg-[#FEF2F2] text-[#E5484D] font-bold px-2 py-0.5 rounded-full border border-[#FECACA]">
                3 Active
              </span>
            </div>

            {/* Alert Items */}
            <div className="space-y-3">
              {/* Alert 1 */}
              <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E5484D] flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#E5484D] animate-ping" />
                    Critical Inundation Warning
                  </span>
                  <span className="text-[10px] text-[#991B1B] font-semibold">10m ago</span>
                </div>
                <p className="text-xs text-[#17182B] font-medium">
                  Musi River Corridor &bull; Hussain Sagar Overspill
                </p>
                <p className="text-[11px] text-[#686B7D]">
                  Low-lying communities instructed to evacuate to elevated rally grounds immediately.
                </p>
              </div>

              {/* Alert 2 */}
              <div className="p-3.5 rounded-xl bg-[#FFFBEB] border border-[#FDE68A] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#E9A23B] flex items-center gap-1.5">
                    <AlertTriangle size={13} />
                    Spillway Gate Release Warning
                  </span>
                  <span className="text-[10px] text-[#92400E] font-semibold">45m ago</span>
                </div>
                <p className="text-xs text-[#17182B] font-medium">
                  Himayat Sagar & Osman Sagar Reservoirs
                </p>
                <p className="text-[11px] text-[#686B7D]">
                  4 gates raised by 2 feet. Downstream causeways closed to vehicular traffic.
                </p>
              </div>

              {/* Alert 3 */}
              <div className="p-3.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7F0] space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#7047E8] flex items-center gap-1.5">
                    <Activity size={13} />
                    Urban Storm Drain Surcharge
                  </span>
                  <span className="text-[10px] text-[#686B7D] font-semibold">2h ago</span>
                </div>
                <p className="text-xs text-[#17182B] font-medium">
                  Begumpet & Khairatabad Drainage Sinks
                </p>
                <p className="text-[11px] text-[#686B7D]">
                  Precipitation accumulation exceeding pump discharge capacity. Avoid underpasses.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/response"
                className="w-full py-2.5 rounded-xl bg-[#F1EBFF] hover:bg-[#E7DEFE] text-[#7047E8] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>View Full Emergency Response Protocols</span>
                <ArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
