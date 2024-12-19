/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#C0A7FF',
          default: '#7544F1',
        },
        secondary: {
          default: '#323756',
          light: '#EDE5FF',
          lighter: '#DBE0FF'
        },
        common: {
          grey_light: '#EAE6F8',
          warning_light: '#FFECDD',
          error_light: '#FFE5FF',
          success_light: '#D9FFF2',
          grey_dark: '#708090',
          grey:'#6B7B8A'
        },
        error: {
          default: '#F90606'
        },
        backgroundImage: {
          'primary-gradient': 'linear-gradient(180deg, rgba(117, 68, 241, 0.02) 0%, rgba(117, 68, 241, 0.2) 100%)',
          'comunity-gradient': 'rgba(117, 68, 241, 1)'
        },
      },
    },
  },
  plugins: [],
}

