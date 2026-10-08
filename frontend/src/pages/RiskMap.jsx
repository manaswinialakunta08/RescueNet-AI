import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Info,
  Compass,
  AlertTriangle,
  CloudRain,
  TrendingUp,
  Waves,
  Navigation,
  ShieldAlert
} from 'lucide-react';
import SectionTitle from '../components/SectionTitle';
import RiskBadge from '../components/RiskBadge';
import { mockRiskLocations } from '../data/mockData';

export default function RiskMap() {
  const [selectedLocation, setSelectedLocation] = useState(mockRiskLocations[0]);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filteredLocations = mockRiskLocations.filter((loc) => {
    if (activeFilter === 'ALL') return true;
    return loc.riskLevel === activeFilter;
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Title & Status Banner */}
      <div>
        <SectionTitle
          badge="Geospatial Telemetry"
          title="Geographic Flood Risk Map"
          subtitle="Spatial hazard assessment across major river catchments and metropolitan floodplains in India."
        />

        {/* Demo Disclaimer */}
        <div className="rounded-2xl bg-[#F97316]/10 border border-[#F97316]/30 p-4 flex items-start gap-3 text-xs text-[#A1A1AA]">
          <Info size={18} className="text-[#FB923C] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#FB923C] font-mono uppercase text-[11px] block">
              Demo visualization — live map integration planned
            </span>
            <p className="text-[#A1A1AA] mt-0.5">
              These are mock/demo monitoring locations displayed on an interactive spatial matrix. Vector tile layers and live CWC satellite radar overlays will be connected in subsequent phases.
            </p>
          </div>
        </div>
      </div>

      {/* Main Map + Detail Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Map Visual Console */}
        <div className="lg:col-span-8 rounded-3xl bg-[#171925] backdrop-blur-xl border border-white/[0.08] p-6 flex flex-col justify-between shadow-2xl relative overflow-hidden min-h-[560px]">
          {/* Header Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08] text-xs">
            <div className="flex items-center gap-2">
              <Compass size={16} className="text-[#A78BFA]" />
              <span className="font-mono font-bold text-white uppercase text-[11px] tracking-wider">
                India Spatial Matrix (8°N - 37°N, 68°E - 97°E)
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 font-mono">
              <span className="text-[#71717A] text-[11px] mr-1">Filter:</span>
              {['ALL', 'CRITICAL', 'HIGH', 'MODERATE', 'LOW'].map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setActiveFilter(lvl)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] transition-all cursor-pointer ${
                    activeFilter === lvl
                      ? 'bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] text-white font-bold shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                      : 'bg-[#0D0F17] text-[#A1A1AA] hover:text-white border border-white/[0.08]'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Geographic Canvas */}
          <div className="relative my-4 w-full h-[420px] sm:h-[500px] bg-[#0D0F17] rounded-2xl border border-white/[0.08] overflow-hidden flex items-center justify-center p-4">
            {/* Grid Pattern */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage:
                  'radial-gradient(#8B5CF6 1px, transparent 1px), radial-gradient(#C084FC 1px, transparent 1px)',
                backgroundSize: '28px 28px',
                backgroundPosition: '0 0, 14px 14px'
              }}
            />

            {/* Topography Silhouette SVG */}
            <svg
              viewBox="0 0 500 550"
              className="w-full h-full max-w-[440px] max-h-[480px] opacity-25 stroke-[#8B5CF6] fill-[#12141F] pointer-events-none"
            >
              <path
                d="M 180,40 L 220,30 L 260,50 L 250,90 L 320,110 L 370,120 L 420,130 L 450,150 L 420,180 L 380,180 L 330,210 L 310,240 L 340,280 L 330,320 L 290,380 L 260,450 L 240,510 L 230,520 L 220,490 L 200,430 L 170,380 L 150,330 L 130,270 L 110,230 L 120,200 L 140,160 L 160,110 Z"
                strokeWidth="1.5"
                strokeDasharray="4 2"
              />
              <circle cx="250" cy="275" r="140" fill="none" stroke="#2E234D" strokeWidth="1" strokeDasharray="3 3" />
              <circle cx="250" cy="275" r="210" fill="none" stroke="#2E234D" strokeWidth="1" strokeDasharray="3 3" />
            </svg>

            {/* Glowing Interactive Markers */}
            {filteredLocations.map((loc) => {
              const pos = getCoordinatesPercent(loc.lat, loc.lng);
              const isSelected = selectedLocation?.id === loc.id;
              const isCrit = loc.riskLevel === 'CRITICAL';
              const isHigh = loc.riskLevel === 'HIGH';

              return (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  style={{ top: pos.top, left: pos.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20 focus:outline-none transition-transform duration-300 ${
                    isSelected ? 'scale-125 z-30' : 'hover:scale-115'
                  }`}
                  title={`${loc.name} (${loc.riskLevel})`}
                >
                  {(isCrit || isHigh) && (
                    <span
                      className={`absolute -inset-1.5 rounded-full animate-ping opacity-75 ${
                        isCrit ? 'bg-[#FF4D6D]' : 'bg-[#F97316]'
                      }`}
                    />
                  )}

                  <div
                    className={`relative px-2.5 py-1 rounded-lg border flex items-center gap-1.5 text-[10px] font-mono font-bold shadow-xl transition-all ${
                      isCrit
                        ? 'bg-[#FF4D6D] text-white border-white/30 shadow-[0_0_12px_rgba(255,77,109,0.5)]'
                        : isHigh
                        ? 'bg-[#F97316] text-white border-white/30 shadow-[0_0_12px_rgba(249,115,22,0.5)]'
                        : loc.riskLevel === 'MODERATE'
                        ? 'bg-[#FBBF24] text-slate-950 border-amber-200'
                        : 'bg-[#34D399] text-slate-950 border-emerald-200'
                    } ${isSelected ? 'ring-2 ring-white ring-offset-2 ring-offset-[#0D0F17]' : ''}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                    <span>{loc.name}</span>
                  </div>
                </button>
              );
            })}

            {/* HUD Coordinate Stamp */}
            <div className="absolute bottom-3 left-3 bg-[#0D0F17]/90 border border-white/[0.08] p-2.5 rounded-xl text-[10px] font-mono text-[#71717A] space-y-0.5">
              <div className="flex items-center gap-1.5 text-[#A78BFA]">
                <Navigation size={11} />
                <span>DATUM: WGS84 EPSG:4326</span>
              </div>
              <div>LAT: 08°N &ndash; 37°N | LNG: 68°E &ndash; 97°E</div>
            </div>
          </div>

          {/* Map Footer Legend */}
          <div className="pt-3 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-4 flex-wrap text-[11px]">
              <span className="text-[#A1A1AA] font-bold uppercase">Legend:</span>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#34D399]" />
                <span className="text-[#A1A1AA]">Low (0-30%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBBF24]" />
                <span className="text-[#A1A1AA]">Moderate (31-65%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F97316]" />
                <span className="text-[#A1A1AA]">High (66-85%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D] animate-pulse" />
                <span className="text-[#A1A1AA]">Critical (&gt;85%)</span>
              </div>
            </div>

            <span className="text-[11px] text-[#71717A]">
              Showing {filteredLocations.length} monitored river basins
            </span>
          </div>
        </div>

        {/* Selected Location Telemetry Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          {selectedLocation ? (
            <div className="rounded-3xl bg-[#171925] backdrop-blur-xl border border-white/[0.08] p-6 shadow-2xl space-y-6 animate-fade-in-up">
              {/* Header */}
              <div className="flex items-start justify-between gap-2 pb-4 border-b border-white/[0.08]">
                <div>
                  <span className="text-[10px] font-mono uppercase text-[#A78BFA] tracking-wider block">
                    {selectedLocation.state} &bull; {selectedLocation.id}
                  </span>
                  <h3 className="text-2xl font-extrabold text-white mt-0.5">
                    {selectedLocation.name}
                  </h3>
                  <p className="text-xs text-[#A1A1AA]">{selectedLocation.basin}</p>
                </div>
                <RiskBadge level={selectedLocation.riskLevel} size="md" pulse={selectedLocation.riskLevel === 'CRITICAL'} />
              </div>

              {/* Coordinates Pill */}
              <div className="rounded-xl bg-[#0D0F17] border border-white/[0.08] p-3 text-xs font-mono text-[#A1A1AA] flex items-center justify-between">
                <span>Geographic Datum:</span>
                <span className="text-white">
                  {selectedLocation.lat.toFixed(4)}°N, {selectedLocation.lng.toFixed(4)}°E
                </span>
              </div>

              {/* 4 Sensor Gauges */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-2xl bg-[#0D0F17] border border-white/[0.08] p-3.5 space-y-1">
                  <span className="text-[#A1A1AA] flex items-center gap-1 text-[11px]">
                    <Waves size={13} className="text-[#8B5CF6]" /> Water Stage
                  </span>
                  <p className="text-base font-bold text-white font-mono">
                    {selectedLocation.waterLevel.toFixed(2)} m
                  </p>
                  <span className="text-[10px] text-[#71717A] font-mono">Gauge Depth</span>
                </div>

                <div className="rounded-2xl bg-[#0D0F17] border border-white/[0.08] p-3.5 space-y-1">
                  <span className="text-[#A1A1AA] flex items-center gap-1 text-[11px]">
                    <CloudRain size={13} className="text-[#C084FC]" /> Rainfall
                  </span>
                  <p className="text-base font-bold text-white font-mono">
                    {selectedLocation.rainfall.toFixed(1)} mm
                  </p>
                  <span className="text-[10px] text-[#71717A] font-mono">24h Volume</span>
                </div>

                <div className="rounded-2xl bg-[#0D0F17] border border-white/[0.08] p-3.5 space-y-1">
                  <span className="text-[#A1A1AA] flex items-center gap-1 text-[11px]">
                    <TrendingUp size={13} className="text-[#FB923C]" /> Discharge
                  </span>
                  <p className="text-base font-bold text-white font-mono">
                    {selectedLocation.discharge.toLocaleString()} m³/s
                  </p>
                  <span className="text-[10px] text-[#71717A] font-mono">Velocity</span>
                </div>

                <div className="rounded-2xl bg-[#0D0F17] border border-white/[0.08] p-3.5 space-y-1">
                  <span className="text-[#A1A1AA] flex items-center gap-1 text-[11px]">
                    <Compass size={13} className="text-[#A78BFA]" /> Elevation
                  </span>
                  <p className="text-base font-bold text-white font-mono">
                    {selectedLocation.elevation} m
                  </p>
                  <span className="text-[10px] text-[#71717A] font-mono">Above MSL</span>
                </div>
              </div>

              {/* Advisory Box */}
              <div className="rounded-2xl bg-[#F97316]/10 border border-[#F97316]/30 p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-xs font-bold text-[#FB923C] font-mono uppercase">
                  <AlertTriangle size={14} />
                  <span>Regional Advisory Protocol</span>
                </div>
                <p className="text-xs text-[#F8FAFC] leading-relaxed">
                  {selectedLocation.advisory}
                </p>
              </div>

              {/* Action Button */}
              <div>
                <Link
                  to="/disaster-response"
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-[#8B5CF6] to-[#C084FC] text-white font-bold text-xs uppercase tracking-wider font-mono flex items-center justify-center gap-2 transition-all shadow-md shadow-[#8B5CF6]/25 hover:shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                >
                  <ShieldAlert size={14} />
                  <span>Emergency Protocols for {selectedLocation.name}</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="rounded-3xl bg-[#171925] border border-white/[0.08] p-6 text-center text-[#A1A1AA] text-xs">
              Select any regional station marker on the map to inspect telemetry.
            </div>
          )}

          {/* Quick List */}
          <div className="rounded-3xl bg-[#171925] border border-white/[0.08] p-5 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Monitored River Corridors
            </h4>
            <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
              {mockRiskLocations.map((loc) => (
                <button
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`w-full text-left p-2.5 rounded-xl border text-xs flex items-center justify-between transition-all cursor-pointer ${
                    selectedLocation?.id === loc.id
                      ? 'bg-[#0D0F17] border-[#8B5CF6]/60 text-white'
                      : 'bg-[#0D0F17]/50 border-white/[0.08] text-[#A1A1AA] hover:bg-[#0D0F17]'
                  }`}
                >
                  <div>
                    <span className="font-semibold text-white">{loc.name}</span>
                    <span className="text-[#71717A] ml-1.5 text-[11px]">({loc.basin})</span>
                  </div>
                  <RiskBadge level={loc.riskLevel} size="sm" showIcon={false} />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
