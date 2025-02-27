/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        lightblue1: '#4A90E2',
        lightblue2: '#B5D2EE',
        lightblue3: '#0099BD',
        lightblue4: '#0098DA',
        lightblue5: '#50AFE4',
        lightblue6: '#D6E9F8',
        lightblue7: '#88C4EC',
        lightblue8: '#90AFD8',
        lightblue9: '#88CAD2',
      },
    },
  },
  plugins: [],
}