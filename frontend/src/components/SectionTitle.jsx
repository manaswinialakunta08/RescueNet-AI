import React from 'react';

export default function SectionTitle({
  title,
  subtitle,
  badge,
  align = 'left',
  className = ''
}) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-8 ${isCenter ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F1EBFF] border border-[#7047E8]/20 text-[#7047E8] text-[10px] sm:text-xs font-semibold uppercase tracking-wider mb-2.5 ${isCenter ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#7047E8]" />
          <span>{badge}</span>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#17182B] mb-2 leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className={`text-sm text-[#686B7D] leading-relaxed max-w-2xl ${isCenter ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
