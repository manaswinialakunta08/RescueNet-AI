import React from 'react';

const ACCENT_STYLES = {
  violet: {
    iconBg: 'bg-[#8B5CF6]/15 border border-[#8B5CF6]/30',
    iconColor: 'text-[#A78BFA]',
    borderHover: 'hover:border-[#8B5CF6]/40',
    glow: 'hover:shadow-[0_8px_25px_-5px_rgba(139,92,246,0.25)]'
  },
  purple: {
    iconBg: 'bg-[#C084FC]/15 border border-[#C084FC]/30',
    iconColor: 'text-[#C084FC]',
    borderHover: 'hover:border-[#C084FC]/40',
    glow: 'hover:shadow-[0_8px_25px_-5px_rgba(192,132,252,0.25)]'
  },
  orange: {
    iconBg: 'bg-[#F97316]/15 border border-[#F97316]/30',
    iconColor: 'text-[#FB923C]',
    borderHover: 'hover:border-[#F97316]/40',
    glow: 'hover:shadow-[0_8px_25px_-5px_rgba(249,115,22,0.25)]'
  },
  amber: {
    iconBg: 'bg-[#FBBF24]/15 border border-[#FBBF24]/30',
    iconColor: 'text-[#FBBF24]',
    borderHover: 'hover:border-[#FBBF24]/40',
    glow: 'hover:shadow-[0_8px_25px_-5px_rgba(251,191,36,0.25)]'
  },
  rose: {
    iconBg: 'bg-[#FF4D6D]/15 border border-[#FF4D6D]/30',
    iconColor: 'text-[#FF4D6D]',
    borderHover: 'hover:border-[#FF4D6D]/40',
    glow: 'hover:shadow-[0_8px_25px_-5px_rgba(255,77,109,0.25)]'
  },
  emerald: {
    iconBg: 'bg-[#34D399]/15 border border-[#34D399]/30',
    iconColor: 'text-[#34D399]',
    borderHover: 'hover:border-[#34D399]/40',
    glow: 'hover:shadow-[0_8px_25px_-5px_rgba(52,211,153,0.25)]'
  },
  slate: {
    iconBg: 'bg-[#1D2030] border border-white/10',
    iconColor: 'text-[#A1A1AA]',
    borderHover: 'hover:border-white/20',
    glow: 'hover:shadow-[0_8px_20px_-5px_rgba(0,0,0,0.5)]'
  },
  // Compatibility mappings
  teal: {
    iconBg: 'bg-[#8B5CF6]/15 border border-[#8B5CF6]/30',
    iconColor: 'text-[#A78BFA]',
    borderHover: 'hover:border-[#8B5CF6]/40',
    glow: 'hover:shadow-[0_8px_25px_-5px_rgba(139,92,246,0.25)]'
  },
  sky: {
    iconBg: 'bg-[#C084FC]/15 border border-[#C084FC]/30',
    iconColor: 'text-[#C084FC]',
    borderHover: 'hover:border-[#C084FC]/40',
    glow: 'hover:shadow-[0_8px_25px_-5px_rgba(192,132,252,0.25)]'
  }
};

export default function StatCard({
  title,
  value,
  unit = '',
  subtitle,
  trend,
  isPositiveTrend,
  icon: Icon,
  accent = 'violet',
  badge,
  className = ''
}) {
  const styles = ACCENT_STYLES[accent] || ACCENT_STYLES.violet;

  return (
    <div
      className={`group relative rounded-2xl bg-[#171925] hover:bg-[#1D2030] backdrop-blur-md border border-white/[0.08] p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 ${styles.borderHover} ${styles.glow} ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5">
          <p className="text-[11px] font-mono tracking-wider uppercase text-[#A1A1AA]">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#F8FAFC] font-mono">{value}</span>
            {unit && <span className="text-xs sm:text-sm font-medium text-[#71717A]">{unit}</span>}
          </div>
        </div>

        {Icon && (
          <div className={`rounded-xl p-2.5 shrink-0 transition-transform duration-300 group-hover:scale-110 ${styles.iconBg} ${styles.iconColor}`}>
            <Icon size={20} />
          </div>
        )}
      </div>

      {(subtitle || trend || badge) && (
        <div className="mt-4 pt-3 border-t border-white/[0.08] flex items-center justify-between text-xs">
          {subtitle && <span className="text-[#A1A1AA] truncate text-[11px]">{subtitle}</span>}
          {trend && (
            <span
              className={`font-mono font-medium text-[11px] ${
                isPositiveTrend === true
                  ? 'text-[#34D399]'
                  : isPositiveTrend === false
                  ? 'text-[#FF4D6D]'
                  : 'text-[#A1A1AA]'
              }`}
            >
              {trend}
            </span>
          )}
          {badge && <span className="shrink-0">{badge}</span>}
        </div>
      )}
    </div>
  );
}
