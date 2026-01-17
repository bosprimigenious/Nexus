/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'SF Pro Display', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        brand: {
          50: '#eff6ff', 100: '#dbeafe', 500: '#3b82f6', 600: '#2563eb', 700: '#1d4ed8',
        },
        slate: { 850: '#151e2e' }
      },
      boxShadow: {
        'hero': '0 20px 60px -15px rgba(0, 0, 0, 0.08), 0 0 1px rgba(0,0,0,0.05)',
        'glow': '0 0 20px rgba(37, 99, 235, 0.15)',
        'card-hover': '0 10px 30px -5px rgba(0, 0, 0, 0.06)'
      },
      animation: {
        'drift': 'drift 60s linear infinite',
        'float': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        drift: { '0%': { backgroundPosition: '0 0' }, '100%': { backgroundPosition: '40px 40px' } },
        float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } }
      }
    },
  },
  plugins: [],
}