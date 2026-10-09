import React from 'react';
import { ShieldCheck, AlertTriangle, AlertOctagon, Flame } from 'lucide-react';

const BADGE_CONFIG = {
  LOW: {
    bg: 'bg-[#22A879]/10',
    border: 'border-[#22A879]/30',
    text: 'text-[#22A879]',
    dot: 'bg-[#22A879]',
    icon: ShieldCheck,
    label: 'Low Risk'
  },
  MODERATE: {
    bg: 'bg-[#E9A23B]/10',
    border: 'border-[#E9A23B]/30',
    text: 'text-[#E9A23B]',
    dot: 'bg-[#E9A23B]',
    icon: AlertTriangle,
    label: 'Moderate Risk'
  },
  HIGH: {
    bg: 'bg-[#E5484D]/10',
    border: 'border-[#E5484D]/30',
    text: 'text-[#E5484D]',
    dot: 'bg-[#E5484D]',
    icon: AlertOctagon,
    label: 'High Risk'
  },
  CRITICAL: {
    bg: 'bg-[#E5484D]/15',
    border: 'border-[#E5484D]/40',
    text: 'text-[#E5484D]',
    dot: 'bg-[#E5484D]',
    icon: Flame,
    label: 'Critical Risk'
  }
};

export default function RiskBadge({ level = 'LOW', size = 'md', showIcon = true, pulse = false }) {
  const normalizedKey = (level || 'LOW').toUpperCase();
  const config = BADGE_CONFIG[normalizedKey] || BADGE_CONFIG.LOW;
  const IconComponent = config.icon;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1.5 font-medium',
    md: 'text-xs font-semibold px-2.5 py-1 gap-1.5',
    lg: 'text-sm font-bold px-3.5 py-1.5 gap-2'
  };

  const iconSizes = {
    sm: 11,
    md: 13,
    lg: 15
  };

  return (
    <span
      role="status"
      aria-label={`Flood Threat Level: ${config.label}`}
      className={`inline-flex items-center rounded-full border tracking-wide transition-all ${config.bg} ${config.border} ${config.text} ${sizeClasses[size] || sizeClasses.md}`}
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
