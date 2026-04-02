const brandPurple = '#A855F7';
const brandBlue = '#3B82F6';
const brandCyan = '#06B6D4';
const brandPink = '#EC4899';
const neonGreen = '#39FF14';
const neonCyan = '#00F0FF';

export const Colors = {
  light: {
    text: '#0F172A',
    textMuted: '#64748B',
    background: '#F8FAFC',
    surface: 'rgba(255, 255, 255, 0.7)',
    border: 'rgba(255, 255, 255, 0.8)',
    tint: '#7C3AED',
    tabIconDefault: '#94A3B8',
    tabIconSelected: '#7C3AED',
    accent: '#0EA5E9',
    success: '#10B981',
    error: '#EF4444',
    cardShadow: 'rgba(148, 163, 184, 0.25)',
  },
  dark: {
    text: '#F8FAFC',
    textMuted: '#94A3B8',
    background: '#09090B',
    surface: 'rgba(24, 24, 27, 0.4)', // Slightly more transparent for better glass effect
    border: 'rgba(255, 255, 255, 0.08)', // Finer border
    tint: '#A855F7',
    tabIconDefault: '#52525B', // Darker for better contrast
    tabIconSelected: '#A855F7',
    accent: '#00F0FF', // Neon cyan accent
    success: '#34D399',
    error: '#F87171',
    cardShadow: '#000000',
  },
  gradients: {
    primary: ['#A855F7', '#7C3AED'] as const,
    secondary: ['#3B82F6', '#2563EB'] as const,
    success: ['#34D399', '#10B981'] as const,
    pink: ['#F472B6', '#DB2777'] as const,
    water: ['#00F0FF', '#3B82F6'] as const, // More vibrant cyan to blue
    flame: ['#F87171', '#EF4444'] as const,
    mesh: ['#09090B', '#1E1B4B', '#09090B'] as const, // Deep midnight mesh
  }
};
