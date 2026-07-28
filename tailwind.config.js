/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        adami: {
          blue: '#2B6CB0',
          'blue-dark': '#1A4A8A',
          'blue-light': '#3B82C4',
          'blue-glow': '#4A9FE8',
          black: '#080C14',
          'dark': '#0D1520',
          'dark-2': '#111827',
          'dark-3': '#1A2332',
          'gray': '#8B9AB0',
          'gray-light': '#C5D0E0',
          white: '#F0F4FA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Barlow Condensed', 'Oswald', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'spin-slow': 'spin 12s linear infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'scan': 'scan 3s ease-in-out infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'marquee': 'marquee 30s linear infinite',
        'counter': 'counter 2s ease-out forwards',
        'draw-line': 'drawLine 1.5s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(43, 108, 176, 0.3)' },
          '50%': { boxShadow: '0 0 60px rgba(43, 108, 176, 0.8), 0 0 100px rgba(43, 108, 176, 0.4)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drawLine: {
          '0%': { strokeDashoffset: '1000' },
          '100%': { strokeDashoffset: '0' },
        },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(43, 108, 176, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(43, 108, 176, 0.05) 1px, transparent 1px)",
        'radial-blue': 'radial-gradient(ellipse at center, rgba(43, 108, 176, 0.15) 0%, transparent 70%)',
        'hero-gradient': 'linear-gradient(135deg, #080C14 0%, #0D1520 50%, #111827 100%)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
}
