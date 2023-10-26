import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
        textColor: {
          mainColor: '#232f3f'
        }
    },
  },

  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#f76c88",
        
"secondary": "#d7f276",
        
"accent": "#2a8ba3",
        
"neutral": "#24212c",
        
"base-100": "#f1f2f8",
        
"info": "#69a6f7",
        
"success": "#21a176",
        
"warning": "#e7bd18",
        
"error": "#f03869",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
}
export default config