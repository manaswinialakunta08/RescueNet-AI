import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldAlert,
  RotateCcw
} from 'lucide-react';

export default function PredictionCard({ result, onReset }) {
  if (!result) return null;

  const {
    floodProbability = 82,
    riskLevel = 'HIGH',
    location = 'Hyderabad',
    rainfall = '129 mm',
    waterLevel = '5.2 m',
    temperature = '28°C',
    humidity = '70%'
  } = result;

  // Circular gauge calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (floodProbability / 100) * circumference;

  const getGaugeColor = (prob) => {
    if (prob >= 80) return '#E5484D'; // High
    if (prob >= 40) return '#E9A23B'; // Moderate
    return '#22A879'; // Low
  };

  const gaugeColor = getGaugeColor(floodProbability);

  return (
    <article
      aria-label="Flood Risk Prediction Results"
      className="rounded-2xl bg-white border border-[#E5E7F0] p-6 space-y-6 card-shadow"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#E5E7F0]">
        <h3 className="text-base font-bold text-[#17182B]">Prediction Result</h3>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#E5484D]/10 text-[#E5484D] border border-[#E5484D]/20">
          {riskLevel} Risk
        </span>
      </div>

      {/* Main Circular Radial Gauge */}
      <div className="flex flex-col items-center justify-center pt-2 pb-1">
        <div className="relative flex items-center justify-center">
          <svg className="w-36 h-36 -rotate-90 transform" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke="#F3F4FA"
              strokeWidth="10"
              fill="transparent"
            />
            <circle
              cx="60"
              cy="60"
              r={radius}
              stroke={gaugeColor}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{
                transition: 'stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />
          </svg>

          {/* Center text in circle */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-[11px] text-[#686B7D] font-medium">Risk Level</span>
            <span className="text-lg font-bold text-[#E5484D]">
              {riskLevel === 'HIGH' ? 'High' : riskLevel === 'MODERATE' ? 'Moderate' : 'Low'}
            </span>
          </div>
        </div>

        {/* Flood Probability badge */}
        <div className="mt-3 text-center">
          <span className="text-xs text-[#686B7D]">Flood Probability</span>
          <div className="text-2xl font-extrabold text-[#17182B]">{floodProbability}%</div>
        </div>
      </div>

      {/* Input Summary Section */}
      <div className="space-y-2 pt-2 border-t border-[#E5E7F0]">
        <span className="text-xs font-bold text-[#17182B] block">Input Summary</span>
        <div className="rounded-xl bg-[#F8FAFC] border border-[#E5E7F0] p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[#686B7D]">
            <span>Location</span>
            <span className="font-semibold text-[#17182B]">{location}</span>
          </div>
          <div className="flex items-center justify-between text-[#686B7D]">
            <span>Rainfall</span>
            <span className="font-semibold text-[#17182B]">{rainfall}</span>
          </div>
          <div className="flex items-center justify-between text-[#686B7D]">
            <span>Water Level</span>
            <span className="font-semibold text-[#17182B]">{waterLevel}</span>
          </div>
          <div className="flex items-center justify-between text-[#686B7D]">
            <span>Temperature</span>
            <span className="font-semibold text-[#17182B]">{temperature}</span>
          </div>
          <div className="flex items-center justify-between text-[#686B7D]">
            <span>Humidity</span>
            <span className="font-semibold text-[#17182B]">{humidity}</span>
          </div>
        </div>
      </div>

      {/* Note and Actions */}
      <div className="pt-2 text-center space-y-3">
        <p className="text-[11px] text-[#686B7D] leading-relaxed">
          Run prediction to see detailed recommendations and next steps.
        </p>

        <div className="flex items-center gap-2">
          <Link
            to="/response"
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#7047E8] hover:bg-[#5E35D1] text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-xs transition-colors"
          >
            <ShieldAlert size={14} />
            <span>View Response Plan</span>
            <ArrowRight size={13} />
          </Link>

          {onReset && (
            <button
              onClick={onReset}
              className="p-2.5 rounded-xl bg-[#F3F4FA] hover:bg-[#E5E7F0] text-[#686B7D] hover:text-[#17182B] transition-colors"
              title="Reset"
              aria-label="Reset prediction"
            >
              <RotateCcw size={15} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
