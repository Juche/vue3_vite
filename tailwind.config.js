// const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', //包含了src文件夹下所有的vue,js等等文件
  ],
  theme: {
    // colors: { ...colors },
    // colors: {
    //   slate: colors.slate,
    //   gray: colors.gray,
    //   zinc: colors.zinc,
    //   neutral: colors.neutral,
    //   stone: colors.stone,
    //   red: colors.red,
    //   orange: colors.orange,
    //   amber: colors.amber,
    //   yellow: colors.yellow,
    //   lime: colors.lime,
    //   green: colors.green,
    //   emerald: colors.emerald,
    //   teal: colors.teal,
    //   cyan: colors.cyan,
    //   sky: colors.sky,
    //   blue: colors.blue,
    //   indigo: colors.indigo,
    //   violet: colors.violet,
    //   purple: colors.purple,
    //   fuchsia: colors.fuchsia,
    //   pink: colors.pink,
    //   rose: colors.rose,
    // },
    extend: {
      colors: {
        purred: {
          50: '#fff2f2',
          100: '#ffe2e2',
          200: '#ffcaca',
          300: '#ffa5a5',
          400: '#ff7171',
          500: '#ff4444',
          600: '#ff2626',
          700: '#ff1c1c',
          800: '#ff1b1b',
          900: '#ff1d1d',
        },
      },
    },
  },
  plugins: [],
  // purge: {
  //   content: [
  //     './index.html',
  //     './src/**/*.{vue,js,ts,jsx,tsx}', //包含了src文件夹下所有的vue,js等等文件
  //   ],
  // },
};
