import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Flame } from 'lucide-react';

const BADGE_CONFIG = {
  LOW: {
    bg: 'bg-[#34D399]/10',
    border: 'border-[#34D399]/30',
    text: 'text-[#34D399]',
    dot: 'bg-[#34D399]',
    glow: 'shadow-[0_0_12px_rgba(52,211,153,0.25)]',
    icon: ShieldCheck,
    label: 'LOW RISK'
  },
  MODERATE: {
    bg: 'bg-[#FBBF24]/10',
    border: 'border-[#FBBF24]/30',
    text: 'text-[#FBBF24]',
    dot: 'bg-[#FBBF24]',
    glow: 'shadow-[0_0_12px_rgba(251,191,36,0.25)]',
    icon: AlertTriangle,
    label: 'MODERATE RISK'
  },
  HIGH: {
    bg: 'bg-[#F97316]/15',
    border: 'border-[#F97316]/40',
    text: 'text-[#F97316]',
    dot: 'bg-[#F97316]',
    glow: 'shadow-[0_0_14px_rgba(249,115,22,0.3)]',
    icon: AlertOctagon,
    label: 'HIGH RISK'
  },
  CRITICAL: {
    bg: 'bg-[#FF4D6D]/15',
    border: 'border-[#FF4D6D]/40',
    text: 'text-[#FF4D6D]',
    dot: 'bg-[#FF4D6D]',
    glow: 'shadow-[0_0_16px_rgba(255,77,109,0.35)]',
    icon: Flame,
    label: 'CRITICAL ALERT'
  }
};

export default function RiskBadge({ level = 'LOW', size = 'md', showIcon = true, pulse = false }) {
  const normalizedKey = (level || 'LOW').toUpperCase();
  const config = BADGE_CONFIG[normalizedKey] || BADGE_CONFIG.LOW;
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5',
    md: 'text-xs font-semibold px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-bold px-3.5 py-1.5 gap-2'
  };

  const iconSizes = {
    sm: 11,
    md: 13,
    lg: 16
  };

  return (
    <span
      role="status"
      aria-label={`Flood Threat Level: ${config.label}`}
      className={`inline-flex items-center rounded-full border tracking-wider uppercase font-mono transition-all backdrop-blur-sm ${config.bg} ${config.border} ${config.text} ${config.glow} ${sizeClasses[size] || sizeClasses.md}`}
    >
      <span className="relative flex h-2 w-2 shrink-0">
        {pulse && (
          <span
            className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${config.dot}`}
          />
        )}
        <span className={`relative inline-flex rounded-full h-2 w-2 ${config.dot}`} />
      </span>

      {showIcon && <IconComponent size={iconSizes[size] || 13} className="shrink-0" />}
      <span>{config.label}</span>
    </span>
  );
}
