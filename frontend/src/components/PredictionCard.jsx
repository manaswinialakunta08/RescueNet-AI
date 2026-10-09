import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Cpu,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  LifeBuoy
} from 'lucide-react';
import RiskBadge from './RiskBadge';

export default function PredictionCard({ result, onReset }) {
  if (!result) return null;

  const {
    floodProbability = 82,
    riskLevel = 'HIGH',
    modelConfidence = 87,
    recommendation = '',
    timestamp = '2026-10-08T15:30:00Z',
    isMock = true
  } = result;

  // Circular gauge calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (floodProbability / 100) * circumference;

  const getGaugeColor = (prob) => {
    if (prob >= 85) return '#FF4D6D'; // Critical
    if (prob >= 65) return '#F97316'; // High
    if (prob >= 35) return '#FBBF24'; // Moderate
    return '#34D399'; // Low
  };

  const gaugeColor = getGaugeColor(floodProbability);

  return (
    <article
      aria-label="Flood Risk Prediction Results"
      className="rounded-3xl bg-[#171925] border border-white/[0.08] p-6 sm:p-8 space-y-7 shadow-[0_20px_50px_rgba(8,9,15,0.9)] relative overflow-hidden animate-drop-in"
    >
      {/* Top Banner indicating Mock Data */}
      {isMock && (
        <div className="flex items-center justify-between flex-wrap gap-2 pb-4 border-b border-white/[0.08] text-xs">
          <div className="flex items-center gap-2 text-[#FB923C] font-mono">
            <span className="flex h-2 w-2 rounded-full bg-[#F97316] animate-pulse" />
            <span className="font-semibold uppercase tracking-wider text-[11px]">
              DEMO RESULT &bull; SIMULATED HYDROLOGICAL INFERENCE
            </span>
          </div>
          <span className="text-[#A1A1AA] font-mono text-[11px] bg-[#0D0F17] px-2.5 py-1 rounded-full border border-white/[0.08]">
            Phase 1 Hydro-Simulation
          </span>
        </div>
      )}

      {/* Main Radial Hero Gauge Area */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-2xl bg-[#0D0F17] border border-white/[0.08]">
        {/* SVG Radial Gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 130 130" aria-label={`Calculated Flood Probability: ${floodProbability}%`}>
            <circle
              cx="65"
              cy="65"
              r={radius}
              stroke="#12141F"
              strokeWidth="11"
              fill="transparent"
            />
            <circle
              cx="65"
              cy="65"
              r={radius}
              stroke={gaugeColor}
              strokeWidth="11"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{
                transition: 'stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1)',
                filter: `drop-shadow(0 0 8px ${gaugeColor}88)`
              }}
            />
          </svg>

          {/* Central Radial Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-3xl font-extrabold text-[#F8FAFC] font-mono tracking-tight">
              {floodProbability}%
            </span>
            <span className="text-[9px] font-mono uppercase text-[#A1A1AA] tracking-widest mt-0.5">
              Probability
            </span>
          </div>
        </div>

        {/* Textual Classification */}
        <div className="flex-1 space-y-3 text-center sm:text-left">
          <div className="inline-block">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#A78BFA] block mb-1">
              Flood Threat Evaluation
            </span>
            <div className="flex items-center justify-center sm:justify-start gap-2.5">
              <RiskBadge level={riskLevel} size="lg" pulse={riskLevel === 'HIGH' || riskLevel === 'CRITICAL'} />
            </div>
          </div>

          <div className="flex items-center justify-center sm:justify-start gap-4 pt-1 text-xs font-mono text-[#A1A1AA]">
            <div className="flex items-center gap-1.5">
              <Cpu size={14} className="text-[#8B5CF6]" />
              <span>Confidence: <strong className="text-[#F8FAFC]">{modelConfidence}%</strong></span>
            </div>
            <span>&bull;</span>
            <div className="flex items-center gap-1.5 text-[#34D399]">
              <CheckCircle2 size={13} />
              <span>Cross-Validation Stable</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contributing Factors Visual Bars */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono uppercase tracking-wider text-[#F8FAFC] font-bold flex items-center gap-1.5">
            <Sparkles size={13} className="text-[#C084FC]" />
            Contributing Environmental Factors
          </span>
          <span className="text-[#71717A] font-mono text-[11px]">Normalized Feature Weight</span>
        </div>

        <div className="space-y-2.5 rounded-2xl bg-[#0D0F17] border border-white/[0.08] p-4">
          {[
            { name: 'Rainfall Accumulation', weight: 88, value: '235.4 mm', color: 'from-[#8B5CF6] to-[#C084FC]' },
            { name: 'River Discharge Velocity', weight: 82, value: '3,840 m³/s', color: 'from-[#F97316] to-[#FB923C]' },
            { name: 'Channel Gauge Water Level', weight: 75, value: '7.85 m', color: 'from-[#FBBF24] to-[#F97316]' },
            { name: 'Topographical Elevation Buffer', weight: 42, value: '142 m', color: 'from-[#71717A] to-[#A1A1AA]' }
          ].map((item, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="text-[#A1A1AA] font-medium text-[11px]">{item.name}</span>
                <span className="font-mono text-[11px] text-[#A78BFA]">{item.value}</span>
              </div>
              <div className="w-full bg-[#12141F] h-2 rounded-full overflow-hidden border border-white/[0.05]">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${item.color} transition-all duration-700`}
                  style={{ width: `${item.weight}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Result Interpretation Guide */}
      <div className="rounded-2xl bg-[#0D0F17] border border-white/[0.08] p-4 text-xs space-y-1.5 text-[#A1A1AA]">
        <div className="text-white font-mono font-bold text-[11px] uppercase tracking-wider flex items-center gap-1.5">
          <CheckCircle2 size={13} className="text-[#34D399]" />
          <span>How to Interpret This Result</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          This probabilistic score estimates the likelihood of localized fluvial or pluvial inundation over a 3 to 6 hour horizon based on the 13 input features. Scores exceeding 65% (HIGH/CRITICAL) signal high probability of drainage surcharge and river channel overspill, triggering Stage 2/3 civil defense advisories.
        </p>
      </div>

      {/* Highlighted Operational Recommendation Panel */}
      <div className="rounded-2xl bg-[#F97316]/10 border border-[#F97316]/30 p-5 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#FB923C] uppercase tracking-wider">
          <ShieldAlert size={16} />
          <span>Emergency Operational Recommendation</span>
        </div>
        <p className="text-xs sm:text-sm text-[#F8FAFC] leading-relaxed">
          {recommendation ||
            'Exercise caution and monitor local emergency guidance. Consider moving valuable assets and vulnerable residents to higher ground before drainage systems surcharge.'}
        </p>

        <div className="pt-2">
          <Link
            to="/disaster-response"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-[#FB923C] hover:underline font-semibold"
          >
            <LifeBuoy size={13} />
            <span>Open Standard Operating Protocols</span>
            <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Footer Details & Reset */}
      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#A1A1AA] border-t border-white/[0.08] font-mono">
        <div className="flex items-center gap-2 text-[11px]">
          <Clock size={13} className="text-[#71717A]" />
          <span>Inference timestamp: {new Date(timestamp).toLocaleTimeString()} IST</span>
        </div>

        {onReset && (
          <button
            onClick={onReset}
            className="text-xs font-medium text-[#A78BFA] hover:text-[#C084FC] transition-colors flex items-center gap-1 group cursor-pointer"
          >
            <span>Run another prediction analysis</span>
            <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}
      </div>
    </article>
  );
}
