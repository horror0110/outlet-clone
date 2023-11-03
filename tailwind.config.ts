import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        mainColor: "#232f3f",
      },
    },
  },

  daisyui: {
    themes: [
      {
        mytheme: {
        
"primary": "#e053b3",
        
"secondary": "#1864dd",
        
"accent": "#ffdf3f",
        
"neutral": "#282933",
        
"base-100": "#f4f3f6",
        
"info": "#355dde",
        
"success": "#78edd8",
        
"warning": "#eece3f",
        
"error": "#ec7b6a",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
