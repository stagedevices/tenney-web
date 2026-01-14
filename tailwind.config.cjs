/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        midnight: '#07090f',
        mist: '#e8eef9',
        aurora: '#6de1ff',
        plasma: '#8b5cf6',
        ember: '#ffb86b'
      },
      boxShadow: {
        glow: '0 0 40px rgba(109, 225, 255, 0.2)',
        lift: '0 16px 40px rgba(15, 23, 42, 0.35)'
      },
      backgroundImage: {
        'hero-radial': 'radial-gradient(1200px circle at 10% 10%, rgba(109, 225, 255, 0.14), transparent 60%), radial-gradient(900px circle at 80% 0%, rgba(139, 92, 246, 0.18), transparent 55%), radial-gradient(900px circle at 50% 90%, rgba(255, 184, 107, 0.12), transparent 60%)',
        vignette: 'radial-gradient(circle at 50% 20%, rgba(8, 11, 20, 0) 0%, rgba(8, 11, 20, 0.45) 70%, rgba(8, 11, 20, 0.85) 100%)'
      }
    }
  },
  plugins: []
};
