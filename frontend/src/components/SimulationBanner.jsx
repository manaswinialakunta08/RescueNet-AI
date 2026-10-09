import React from 'react';
import { Info, AlertTriangle, Cpu } from 'lucide-react';

export default function SimulationBanner({
  title = 'DEMO & SIMULATION INTERFACE',
  message = 'This module runs on simulated environmental telemetry and calibrated mock predictions. Production backend API and live sensor streaming will be connected in subsequent phases.',
  variant = 'amber', // 'amber' | 'violet' | 'orange'
  compact = false,
  className = ''
}) {
  const variantStyles = {
    amber: {
      bg: 'bg-[#FBBF24]/10',
      border: 'border-[#FBBF24]/25',
      title: 'text-[#FBBF24]',
      icon: AlertTriangle,
      dot: 'bg-[#FBBF24]'
    },
    violet: {
      bg: 'bg-[#8B5CF6]/10',
      border: 'border-[#8B5CF6]/25',
      title: 'text-[#A78BFA]',
      icon: Cpu,
      dot: 'bg-[#8B5CF6]'
    },
    orange: {
      bg: 'bg-[#F97316]/10',
      border: 'border-[#F97316]/30',
      title: 'text-[#FB923C]',
      icon: Info,
      dot: 'bg-[#F97316]'
    }
  };

  const style = variantStyles[variant] || variantStyles.amber;
  const IconComponent = style.icon;

  if (compact) {
    return (
      <div
        role="status"
        aria-label="Simulation Notice"
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border backdrop-blur-sm ${style.bg} ${style.border} ${className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`} />
        <span className={`font-semibold uppercase tracking-wider text-[10px] ${style.title}`}>
          {title}
        </span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label="Simulation Notice"
      className={`rounded-2xl border p-4 backdrop-blur-md flex items-start gap-3.5 text-xs ${style.bg} ${style.border} ${className}`}
    >
      <div className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${style.title}`}>
        <IconComponent size={18} />
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`} />
          <h4 className={`font-mono font-bold uppercase tracking-wider text-[11px] ${style.title}`}>
            {title}
          </h4>
        </div>
        <p className="text-[#A1A1AA] leading-relaxed text-xs">
          {message}
        </p>
      </div>
    </div>
  );
}

