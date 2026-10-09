import React from 'react';

const ACCENT_STYLES = {
  purple: {
    iconBg: 'bg-[#F1EBFF]',
    iconColor: 'text-[#7047E8]'
  },
  violet: {
    iconBg: 'bg-[#F1EBFF]',
    iconColor: 'text-[#7047E8]'
  },
  blue: {
    iconBg: 'bg-[#3478DB]/10',
    iconColor: 'text-[#3478DB]'
  },
  red: {
    iconBg: 'bg-[#E5484D]/10',
    iconColor: 'text-[#E5484D]'
  },
  rose: {
    iconBg: 'bg-[#E5484D]/10',
    iconColor: 'text-[#E5484D]'
  },
  orange: {
    iconBg: 'bg-[#E9A23B]/10',
    iconColor: 'text-[#E9A23B]'
  },
  amber: {
    iconBg: 'bg-[#E9A23B]/10',
    iconColor: 'text-[#E9A23B]'
  },
  green: {
    iconBg: 'bg-[#22A879]/10',
    iconColor: 'text-[#22A879]'
  },
  emerald: {
    iconBg: 'bg-[#22A879]/10',
    iconColor: 'text-[#22A879]'
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
  accent = 'purple',
  badge,
  className = ''
}) {
  const styles = ACCENT_STYLES[accent] || ACCENT_STYLES.purple;

  return (
    <div
      className={`group rounded-2xl bg-white border border-[#E5E7F0] p-5 transition-all duration-200 hover:shadow-md card-shadow ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-xs font-medium text-[#686B7D]">{title}</p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17182B]">{value}</span>
            {unit && <span className="text-xs font-semibold text-[#686B7D]">{unit}</span>}
          </div>
        </div>

        {Icon && (
          <div className={`rounded-xl p-2.5 shrink-0 transition-transform group-hover:scale-105 ${styles.iconBg} ${styles.iconColor}`} aria-hidden="true">
            <Icon size={20} />
          </div>
        )}
      </div>

      {(subtitle || trend || badge) && (
        <div className="mt-3 pt-2.5 border-t border-[#E5E7F0]/60 flex items-center justify-between text-xs">
          {subtitle && <span className="text-[#686B7D] truncate text-[11px]">{subtitle}</span>}
          {trend && (
            <span
              className={`font-semibold text-[11px] ${
                isPositiveTrend === false
                  ? 'text-[#E5484D]'
                  : 'text-[#22A879]'
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
