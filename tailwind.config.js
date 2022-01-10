module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}', //包含了src文件夹下所有的vue,js等等文件
  ],
  theme: {
    extend: {
      colors: {
        purred: {
          50: '#ff000011',
          100: '#ff000022',
          200: '#ff000033',
          300: '#ff000044',
          400: '#ff000055',
          500: '#ff000077',
          600: '#ff000099',
          700: '#ff0000bb',
          800: '#ff0000dd',
          900: '#ff0000ff',
        },
      },
    },
  },
  plugins: [],
  // tailwind 3.x purge 配置项改为 content
  // purge: {
  //   content: [
  //     './index.html',
  //     './src/**/*.{vue,js,ts,jsx,tsx}', //包含了src文件夹下所有的vue,js等等文件
  //   ],
  // },
};
