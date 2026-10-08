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
    <div className={`mb-10 ${isCenter ? 'text-center max-w-3xl mx-auto' : ''} ${className}`}>
      {badge && (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 text-[#A78BFA] text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-widest mb-3 ${isCenter ? 'mx-auto' : ''}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6] animate-pulse" />
          <span>{badge}</span>
        </div>
      )}

      <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white mb-3 leading-tight">
        {title}
      </h2>

      {subtitle && (
        <p className="text-sm sm:text-base text-[#A1A1AA] leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
