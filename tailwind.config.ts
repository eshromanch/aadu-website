import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          deepBlue: '#0b1d3a',
          dodgerBlue: '#418dff',
        },
        neutral: {
          offWhiteBlue: '#f7fafc',
          babyBlueTint: '#bfdbfe',
          lightGray: '#e5e7eb',
          bodyText: '#333333',
        },
        fedex: {
          purple: '#4d148c',
          orange: '#ff6600',
        },
      },
      fontFamily: {
        'dm-sans': ['DM Sans', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config