import React from 'react';
import { Info, AlertTriangle, Cpu } from 'lucide-react';

export default function SimulationBanner({
  title = 'DEMO & SIMULATION INTERFACE',
  message = 'This module runs on simulated environmental telemetry and calibrated mock predictions. Production backend API and live sensor streaming will be connected in subsequent phases.',
  variant = 'violet', // 'amber' | 'violet' | 'orange'
  compact = false,
  className = ''
}) {
  const variantStyles = {
    amber: {
      bg: 'bg-[#FEF3C7]',
      border: 'border-[#F59E0B]/30',
      title: 'text-[#B45309]',
      text: 'text-[#78350F]',
      icon: AlertTriangle,
      dot: 'bg-[#F59E0B]'
    },
    violet: {
      bg: 'bg-[#F1EBFF]',
      border: 'border-[#7047E8]/20',
      title: 'text-[#7047E8]',
      text: 'text-[#5E35D1]',
      icon: Cpu,
      dot: 'bg-[#7047E8]'
    },
    orange: {
      bg: 'bg-[#FFF7ED]',
      border: 'border-[#F97316]/30',
      title: 'text-[#C2410C]',
      text: 'text-[#9A3412]',
      icon: Info,
      dot: 'bg-[#EA580C]'
    }
  };

  const style = variantStyles[variant] || variantStyles.violet;
  const IconComponent = style.icon;

  if (compact) {
    return (
      <div
        role="status"
        aria-label="Simulation Notice"
        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${style.bg} ${style.border} ${className}`}
      >
        <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`} />
        <span className={`font-semibold tracking-wider text-[10px] ${style.title}`}>
          {title}
        </span>
      </div>
    );
  }

  return (
    <div
      role="status"
      aria-label="Simulation Notice"
      className={`rounded-2xl border p-4 flex items-start gap-3.5 text-xs shadow-xs ${style.bg} ${style.border} ${className}`}
    >
      <div className={`p-1.5 rounded-xl shrink-0 mt-0.5 ${style.title}`}>
        <IconComponent size={18} />
      </div>
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`} />
          <h4 className={`font-bold tracking-wider text-[11px] ${style.title}`}>
            {title}
          </h4>
        </div>
        <p className={`${style.text} leading-relaxed text-xs`}>
          {message}
        </p>
      </div>
    </div>
  );
}
