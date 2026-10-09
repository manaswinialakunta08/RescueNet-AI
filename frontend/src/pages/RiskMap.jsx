import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Compass,
  AlertTriangle,
  CloudRain,
  Waves,
  Navigation,
  Search,
  ArrowRight,
  Plus,
  Minus
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import RiskBadge from '../components/RiskBadge';
import SimulationBanner from '../components/SimulationBanner';
import { mockRiskLocations } from '../data/mockData';

export default function RiskMap() {
  const [selectedLocation, setSelectedLocation] = useState(mockRiskLocations[0]);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredLocations = mockRiskLocations.filter((loc) => {
    const matchesFilter = activeFilter === 'ALL' || loc.riskLevel === activeFilter;
    const matchesSearch =
      loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      loc.basin.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getCoordinatesPercent = (lat, lng) => {
    const minLat = 7.5;
    const maxLat = 36.5;
    const minLng = 67.5;
    const maxLng = 97.5;

    const yPercent = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    const xPercent = ((lng - minLng) / (maxLng - minLng)) * 100;

    return { top: `${yPercent.toFixed(1)}%`, left: `${xPercent.toFixed(1)}%` };
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 bg-[#F8FAFC]">
      {/* Page Title & Status Banner */}
      <div>
        <SectionTitle
          badge="Geospatial Telemetry"
          title="Geographic Flood Risk Map"
          subtitle="Spatial hazard assessment across major river catchments and metropolitan floodplains in India."
        />
        <SimulationBanner />
      </div>

      {/* Main Map + Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Map Visual Console (8 cols) */}
        <div className="lg:col-span-8 rounded-2xl bg-white border border-[#E5E7F0] p-6 shadow-sm flex flex-col justify-between min-h-[580px]">
          {/* Header Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E5E7F0] text-xs">
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-[#7047E8]" />
              <span className="font-bold text-[#17182B] text-xs">
                India Spatial Matrix (8°N - 37°N, 68°E - 97°E)
              </span>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Search Box */}
              <div className="relative">
                <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#686B7D]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search basin, city..."
                  className="pl-7 pr-3 py-1.5 rounded-xl bg-[#F8FAFC] border border-[#E5E7F0] text-[#17182B] text-xs focus:outline-none focus:border-[#7047E8] placeholder:text-[#686B7D] w-36 sm:w-44"
                />
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-1">
                {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setActiveFilter(lvl)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                      activeFilter === lvl
                        ? 'bg-[#7047E8] text-white shadow-xs'
                        : 'bg-[#F8FAFC] text-[#686B7D] hover:text-[#17182B] border border-[#E5E7F0]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-0.5 bg-[#F8FAFC] border border-[#E5E7F0] rounded-lg p-0.5">
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
          </div>

          {/* Interactive Geographic Canvas */}
          <div className="relative flex-1 my-4 min-h-[380px] bg-[#F3F4FA] rounded-xl border border-[#E5E7F0] overflow-hidden flex items-center justify-center">
            {/* Background Map Grid */}
            <div
              className="w-full h-full relative transition-transform duration-300"
              style={{ transform: `scale(${zoomLevel})` }}
            >
              <svg viewBox="0 0 600 480" className="w-full h-full">
                <defs>
                  <pattern id="risk-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#E2E5F0" strokeWidth="0.8" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#risk-grid)" />

                {/* Stylized Indian Subcontinent Outline & River Networks */}
                <path
                  d="M 180,60 L 260,40 L 340,70 L 400,120 L 480,140 L 440,210 L 360,220 L 320,320 L 270,420 L 220,330 L 170,250 L 140,160 Z"
                  fill="#FFFFFF"
                  stroke="#D8DBEB"
                  strokeWidth="2"
                  opacity="0.9"
                />

                {/* Major Rivers */}
                <path
                  d="M 220,90 Q 300,110 380,150 T 430,210"
                  fill="none"
                  stroke="#3478DB"
                  strokeWidth="3.5"
                  strokeOpacity="0.6"
                />
                <path
                  d="M 170,220 Q 230,240 320,250 T 360,260"
                  fill="none"
                  stroke="#3478DB"
                  strokeWidth="2.5"
                  strokeOpacity="0.5"
                />
                <path
                  d="M 190,290 Q 250,310 310,320"
                  fill="none"
                  stroke="#3478DB"
                  strokeWidth="2.5"
                  strokeOpacity="0.5"
                />
              </svg>

              {/* Plotted Risk Nodes */}
              {filteredLocations.map((loc) => {
                const pos = getCoordinatesPercent(loc.lat, loc.lng);
                const isSelected = selectedLocation?.id === loc.id;
                const isHigh = loc.riskLevel === 'CRITICAL' || loc.riskLevel === 'HIGH';
                const isMod = loc.riskLevel === 'MODERATE';

                const dotColor = isHigh ? '#E5484D' : isMod ? '#E9A23B' : '#22A879';

                return (
                  <div
                    key={loc.id}
                    onClick={() => setSelectedLocation(loc)}
                    style={{ top: pos.top, left: pos.left }}
                    className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                  >
                    {/* Ping ring for high/critical */}
                    {isHigh && (
                      <span
                        className="absolute -inset-2 rounded-full opacity-40 animate-ping"
                        style={{ backgroundColor: dotColor }}
                      />
                    )}

                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center transition-transform ${
                        isSelected ? 'scale-125 ring-4 ring-[#7047E8]/30' : 'group-hover:scale-110'
                      }`}
                      style={{ backgroundColor: dotColor }}
                    >
                      <span className="w-2 h-2 rounded-full bg-white" />
                    </div>

                    {/* Node Hover Tooltip */}
                    <div className="absolute left-1/2 -translate-x-1/2 bottom-8 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap bg-white border border-[#E5E7F0] p-2 rounded-xl shadow-md z-20">
                      <div className="text-xs font-bold text-[#17182B]">{loc.name}</div>
                      <div className="text-[10px] text-[#686B7D]">
                        {loc.basin} &bull; {loc.probability}% Risk
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom-Left Map Legend */}
            <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md rounded-xl p-2.5 border border-[#E5E7F0] shadow-xs text-[10px] space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D]" />
                <span className="font-bold text-[#17182B]">High / Critical (&gt;65%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E9A23B]" />
                <span className="text-[#686B7D]">Moderate (35% - 65%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#22A879]" />
                <span className="text-[#686B7D]">Low (&lt;35%)</span>
              </div>
            </div>
          </div>

          {/* Footer Coordinates Bar */}
          <div className="pt-3 border-t border-[#E5E7F0] flex flex-wrap items-center justify-between text-xs text-[#686B7D]">
            <span className="font-medium">
              Showing {filteredLocations.length} monitored river basin stations
            </span>
            <span className="text-[#7047E8] font-bold">
              Spatial Resolution: 0.1° (~11 km)
            </span>
          </div>
        </div>

        {/* Selected Station Telemetry Detail Card (4 cols) */}
        <div className="lg:col-span-4 space-y-6">
          {selectedLocation ? (
            <div className="rounded-2xl bg-white border border-[#E5E7F0] p-6 shadow-sm space-y-5">
              <div className="flex items-start justify-between pb-3 border-b border-[#E5E7F0]">
                <div>
                  <h3 className="text-base font-bold text-[#17182B]">{selectedLocation.name}</h3>
                  <p className="text-xs text-[#686B7D]">{selectedLocation.state} &bull; {selectedLocation.basin}</p>
                </div>
                <RiskBadge level={selectedLocation.riskLevel} size="md" />
              </div>

              {/* Gauge Probability Meter */}
              <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E5E7F0] flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#686B7D] block">Inundation Risk Probability</span>
                  <span className="text-3xl font-extrabold text-[#17182B]">
                    {selectedLocation.probability}%
                  </span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-[#F1EBFF] text-[#7047E8] flex items-center justify-center font-bold">
                  <Navigation size={22} />
                </div>
              </div>

              {/* Station Sensors */}
              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-[#F8FAFC]">
                  <span className="text-[#686B7D] flex items-center gap-1.5">
                    <CloudRain size={14} className="text-[#3478DB]" /> 24h Rainfall
                  </span>
                  <span className="font-bold text-[#17182B]">{selectedLocation.rainfall} mm</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-[#F8FAFC]">
                  <span className="text-[#686B7D] flex items-center gap-1.5">
                    <Waves size={14} className="text-[#7047E8]" /> River Level
                  </span>
                  <span className="font-bold text-[#17182B]">{selectedLocation.waterLevel} m</span>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded-lg bg-[#F8FAFC]">
                  <span className="text-[#686B7D] flex items-center gap-1.5">
                    <Compass size={14} className="text-[#22A879]" /> Coordinates
                  </span>
                  <span className="font-bold text-[#17182B]">{selectedLocation.lat}°N, {selectedLocation.lng}°E</span>
                </div>
              </div>

              {/* Primary Hazard Description */}
              <div className="p-3.5 rounded-xl bg-[#FEF2F2] border border-[#FECACA] text-xs space-y-1">
                <div className="font-bold text-[#E5484D] flex items-center gap-1.5">
                  <AlertTriangle size={14} /> Active Hazard Note
                </div>
                <p className="text-[#991B1B] text-[11px] leading-relaxed">
                  {selectedLocation.hazardNote ||
                    'Elevated streamflow and surface runoff exceeding seasonal safety limits. Continuous observation advised.'}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-2 pt-2">
                <Link
                  to="/prediction"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#7047E8] hover:bg-[#5E35D1] text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <span>Run Custom ML Prediction</span>
                  <ArrowRight size={14} />
                </Link>
                <Link
                  to="/response"
                  className="w-full py-2.5 px-4 rounded-xl bg-white border border-[#E5E7F0] hover:bg-slate-50 text-[#17182B] text-xs font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <span>View Emergency Response Plan</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-xs text-[#686B7D] bg-white rounded-2xl border border-[#E5E7F0]">
              Select a monitoring node on the map to inspect telemetry
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
