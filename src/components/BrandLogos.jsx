/**
 * NHI Brand Logos — SVG React Components
 * Based on brand guides: Kazunori, Kazu Café, Mendokoro, Yushoken
 */

export function NHILogo({ size = 40, className = '' }) {
  return (
    <svg viewBox="0 0 120 40" width={size * 3} height={size} className={className} aria-label="Nippon Hasha Inc.">
      <defs>
        <linearGradient id="nhi-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4a843" />
          <stop offset="100%" stopColor="#c5a059" />
        </linearGradient>
      </defs>
      {/* Mon (crest) circle */}
      <circle cx="20" cy="20" r="17" fill="none" stroke="url(#nhi-gold)" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="13" fill="none" stroke="url(#nhi-gold)" strokeWidth="0.8" />
      {/* Stylized kanji 橋 (hashi/bridge) simplified as crossing lines */}
      <line x1="14" y1="12" x2="14" y2="28" stroke="url(#nhi-gold)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="10" x2="20" y2="30" stroke="url(#nhi-gold)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="12" x2="26" y2="28" stroke="url(#nhi-gold)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="11" y1="16" x2="29" y2="16" stroke="url(#nhi-gold)" strokeWidth="1" strokeLinecap="round" />
      <line x1="11" y1="24" x2="29" y2="24" stroke="url(#nhi-gold)" strokeWidth="1" strokeLinecap="round" />
      {/* NHI text */}
      <text x="45" y="16" fontFamily="'Noto Sans JP', sans-serif" fontWeight="700" fontSize="14" fill="#d4a843" letterSpacing="3">NHI</text>
      <text x="45" y="30" fontFamily="'Inter', sans-serif" fontWeight="300" fontSize="7" fill="#d4a843" letterSpacing="1.5" opacity="0.8">NIPPON HASHA</text>
    </svg>
  );
}

export function NHIMonogram({ size = 32, className = '' }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className={className} aria-label="NHI">
      <defs>
        <linearGradient id="mono-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#d4a843" />
          <stop offset="100%" stopColor="#c5a059" />
        </linearGradient>
      </defs>
      <circle cx="20" cy="20" r="18" fill="none" stroke="url(#mono-gold)" strokeWidth="1.5" />
      <circle cx="20" cy="20" r="14" fill="none" stroke="url(#mono-gold)" strokeWidth="0.7" />
      <line x1="14" y1="13" x2="14" y2="27" stroke="url(#mono-gold)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="20" y1="11" x2="20" y2="29" stroke="url(#mono-gold)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="13" x2="26" y2="27" stroke="url(#mono-gold)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="17" x2="28" y2="17" stroke="url(#mono-gold)" strokeWidth="1" strokeLinecap="round" />
      <line x1="12" y1="23" x2="28" y2="23" stroke="url(#mono-gold)" strokeWidth="1" strokeLinecap="round" />
    </svg>
  );
}

export function BrandIcon({ brand, size = 28 }) {
  const configs = {
    kazu_cafe:  { char: '和', sub: 'カズ', bg: '#4a7c59', text: '#fff' },
    mendokoro:  { char: '麺', sub: 'メン', bg: '#8b2500', text: '#fff' },
    yushoken:   { char: '勇', sub: 'ユウ', bg: '#5c3a1e', text: '#fff' },
    kazunori:   { char: '一', sub: 'カズ', bg: '#8b0000', text: '#c5a059' },
    marudori:   { char: '丸', sub: 'マル', bg: '#3d3d3d', text: '#fff' },
    food_truck: { char: '車', sub: 'トラ', bg: '#92610a', text: '#fff' },
  };
  const c = configs[brand] || configs.kazu_cafe;

  return (
    <svg viewBox="0 0 36 36" width={size} height={size} aria-label={brand}>
      <rect width="36" height="36" rx="8" fill={c.bg} />
      <text x="18" y="24" textAnchor="middle" fontFamily="'Noto Sans JP', serif" fontWeight="700" fontSize="18" fill={c.text}>{c.char}</text>
    </svg>
  );
}

export const BRAND_COLORS = {
  kazu_cafe:  { primary: '#4a7c59', secondary: '#f5f0e8', accent: '#6b9e78', text: '#2d3a2f', label: 'Kazu Café' },
  mendokoro:  { primary: '#8b2500', secondary: '#f7f2ed', accent: '#b33a00', text: '#2d2d2d', label: 'Mendokoro' },
  yushoken:   { primary: '#5c3a1e', secondary: '#faf5ef', accent: '#c8952e', text: '#3d2a12', label: 'Yushoken' },
  kazunori:   { primary: '#8b0000', secondary: '#faf8f5', accent: '#c5a059', text: '#334155', label: 'Kazunori' },
  marudori:   { primary: '#3d3d3d', secondary: '#f5f5f5', accent: '#666666', text: '#1a1a1a', label: 'Marudori Ramenba' },
  food_truck: { primary: '#92610a', secondary: '#fdf8f0', accent: '#c8952e', text: '#3d2a12', label: 'Food Truck' },
};
