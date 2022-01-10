<template>
  <p class="text-3xl font-bold">Hello Tailwind!</p>
  <div
    class="bg-white dark:bg-gray-800 rounded-tl-xl sm:rounded-t-xl p-4 pb-6 sm:p-8 lg:p-4 lg:pb-6 xl:p-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8"
  >
    <div
      class="flex items-center space-x-3.5 sm:space-x-5 lg:space-x-3.5 xl:space-x-5"
    >
      <img
        src="/logo.png"
        alt=""
        width="160"
        height="160"
        class="flex-none w-20 h-20 rounded-lg bg-gray-100"
      />
      <div class="min-w-0 flex-auto space-y-0.5">
        <p
          class="text-lime-600 dark:text-lime-400 text-sm sm:text-base lg:text-sm xl:text-base font-semibold uppercase"
        >
          <abbr title="Episode">Ep.</abbr> 128
        </p>
        <h2
          class="text-black dark:text-white text-base sm:text-xl lg:text-base xl:text-xl font-semibold truncate"
        >
          Scaling CSS at Heroku with Utility Classes
        </h2>
        <p
          class="text-gray-500 dark:text-gray-400 text-base sm:text-lg lg:text-base xl:text-lg font-medium"
        >
          Full Stack Radio
        </p>
      </div>
    </div>
    <div class="space-y-2">
      <div class="bg-gray-200 dark:bg-black rounded-full overflow-hidden">
        <div
          class="bg-lime-500 dark:bg-lime-400 w-1/2 h-1.5"
          role="progressbar"
          aria-valuenow="1456"
          aria-valuemin="0"
          aria-valuemax="4550"
        ></div>
      </div>
      <div
        class="text-gray-500 dark:text-gray-400 flex justify-between text-sm font-medium tabular-nums"
      >
        <div>24:16</div>
        <div>75:50</div>
      </div>
    </div>
  </div>
  <div
    class="bg-gray-50 text-black dark:bg-gray-900 dark:text-white lg:rounded-b-xl py-4 px-1 sm:px-3 lg:px-1 xl:px-3 grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-5 xl:grid-cols-7 items-center"
  >
    <button type="button" class="mx-auto">
      <svg width="24" height="24" fill="none">
        <path
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
    </button>
    <button type="button" class="hidden sm:block lg:hidden xl:block mx-auto">
      <svg width="17" height="18">
        <path d="M0 0h2v18H0V0zM4 9l13-9v18L4 9z" fill="currentColor" />
      </svg>
    </button>
    <button type="button" class="mx-auto">
      <svg width="34" height="39" fill="none">
        <path
          d="M12.878 26.12c1.781 0 3.09-1.066 3.085-2.515.004-1.104-.665-1.896-1.824-2.075v-.068c.912-.235 1.505-.95 1.5-1.93.005-1.283-1.048-2.379-2.727-2.379-1.602 0-2.89.968-2.932 2.387h1.274c.03-.801.784-1.287 1.64-1.287.892 0 1.475.541 1.471 1.346.004.844-.673 1.398-1.64 1.398h-.738v1.074h.737c1.21 0 1.91.614 1.91 1.491 0 .848-.738 1.424-1.765 1.424-.946 0-1.683-.486-1.734-1.262H9.797c.055 1.424 1.317 2.395 3.08 2.395zm7.734.025c2.016 0 3.196-1.645 3.196-4.504 0-2.838-1.197-4.488-3.196-4.488-2.003 0-3.196 1.645-3.2 4.488 0 2.855 1.18 4.5 3.2 4.504zm0-1.138c-1.18 0-1.892-1.185-1.892-3.366.004-2.174.716-3.371 1.892-3.371 1.172 0 1.888 1.197 1.888 3.37 0 2.182-.712 3.367-1.888 3.367z"
          fill="currentColor"
        />
        <path
          d="M1 22c0 8.837 7.163 16 16 16s16-7.163 16-16S25.837 6 17 6"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <path d="M17 0L9 6l8 6V0z" fill="currentColor" />
      </svg>
    </button>
    <button type="button" class="mx-auto">
      <svg width="50" height="50" fill="none">
        <circle
          class="text-gray-300 dark:text-gray-500"
          cx="25"
          cy="25"
          r="24"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <path d="M18 16h4v18h-4V16zM28 16h4v18h-4z" fill="currentColor" />
      </svg>
    </button>
    <button type="button" class="mx-auto">
      <svg width="34" height="39" fill="none">
        <path
          d="M12.878 26.12c1.781 0 3.09-1.066 3.085-2.515.004-1.104-.665-1.896-1.824-2.075v-.068c.912-.235 1.505-.95 1.5-1.93.005-1.283-1.048-2.379-2.727-2.379-1.602 0-2.89.968-2.932 2.387h1.274c.03-.801.784-1.287 1.64-1.287.892 0 1.475.541 1.471 1.346.004.844-.673 1.398-1.64 1.398h-.738v1.074h.737c1.21 0 1.91.614 1.91 1.491 0 .848-.738 1.424-1.765 1.424-.946 0-1.683-.486-1.734-1.262H9.797c.055 1.424 1.317 2.395 3.08 2.395zm7.734.025c2.016 0 3.196-1.645 3.196-4.504 0-2.838-1.197-4.488-3.196-4.488-2.003 0-3.196 1.645-3.2 4.488 0 2.855 1.18 4.5 3.2 4.504zm0-1.138c-1.18 0-1.892-1.185-1.892-3.366.004-2.174.716-3.371 1.892-3.371 1.172 0 1.888 1.197 1.888 3.37 0 2.182-.712 3.367-1.888 3.367z"
          fill="currentColor"
        />
        <path
          d="M33 22c0 8.837-7.163 16-16 16S1 30.837 1 22 8.163 6 17 6"
          stroke="currentColor"
          stroke-width="1.5"
        />
        <path d="M17 0l8 6-8 6V0z" fill="currentColor" />
      </svg>
    </button>
    <button type="button" class="hidden sm:block lg:hidden xl:block mx-auto">
      <svg width="17" height="18" viewBox="0 0 17 18" fill="none">
        <path d="M17 0H15V18H17V0Z" fill="currentColor" />
        <path d="M13 9L0 0V18L13 9Z" fill="currentColor" />
      </svg>
    </button>
    <button
      type="button"
      class="mx-auto border border-gray-300 rounded-md text-sm font-medium py-0.5 px-2 text-gray-500 dark:border-gray-600 dark:text-gray-400"
    >
      1.0x
    </button>
  </div>

  <ul class="space-y-2">
    <ul
      v-for="color in ColorSet"
      :key="color"
      class="grid grid-cols-10 h-7 rounded"
    >
      <li
        v-for="key in ValueSet"
        :key="key"
        :class="[`${genClass(color, key)}`, 'w-20']"
        :style="`background-color: ${getColor(color, key)}`"
      >
        <!-- :class="[`bg-${color}-${key}`, 'w-20']" -->
        <!-- class="bg-[{{color}}]-[{{key}}] w-20" -->
        <!-- :class="['bg-' + color + '-' + key, 'w-20']" -->
        <!-- :class="[`bg-${color}-${key}`, 'w-20']" -->
        <!-- {{ `${color}-${key}` }} -->
        {{ color + '-' + key }}
      </li>
    </ul>
  </ul>
</template>

<script lang="ts" setup>
// const colors = require('tailwindcss/colors');
// import colors from 'tailwindcss/colors.js';
import colors from 'tailwindcss/colors'
console.log(`🚀 ~ colors`, colors)

// const colors = {
//     inherit: 'inherit',
//     current: 'currentColor',
//     transparent: 'transparent',
//     black: '#000',
//     white: '#fff',
//     slate: {
//         50: '#f8fafc',
//         100: '#f1f5f9',
//         200: '#e2e8f0',
//         300: '#cbd5e1',
//         400: '#94a3b8',
//         500: '#64748b',
//         600: '#475569',
//         700: '#334155',
//         800: '#1e293b',
//         900: '#0f172a'
//     },
//     gray: {
//         50: '#f9fafb',
//         100: '#f3f4f6',
//         200: '#e5e7eb',
//         300: '#d1d5db',
//         400: '#9ca3af',
//         500: '#6b7280',
//         600: '#4b5563',
//         700: '#374151',
//         800: '#1f2937',
//         900: '#111827'
//     },
//     zinc: {
//         50: '#fafafa',
//         100: '#f4f4f5',
//         200: '#e4e4e7',
//         300: '#d4d4d8',
//         400: '#a1a1aa',
//         500: '#71717a',
//         600: '#52525b',
//         700: '#3f3f46',
//         800: '#27272a',
//         900: '#18181b'
//     },
//     neutral: {
//         50: '#fafafa',
//         100: '#f5f5f5',
//         200: '#e5e5e5',
//         300: '#d4d4d4',
//         400: '#a3a3a3',
//         500: '#737373',
//         600: '#525252',
//         700: '#404040',
//         800: '#262626',
//         900: '#171717'
//     },
//     stone: {
//         50: '#fafaf9',
//         100: '#f5f5f4',
//         200: '#e7e5e4',
//         300: '#d6d3d1',
//         400: '#a8a29e',
//         500: '#78716c',
//         600: '#57534e',
//         700: '#44403c',
//         800: '#292524',
//         900: '#1c1917'
//     },
//     red: {
//         50: '#fef2f2',
//         100: '#fee2e2',
//         200: '#fecaca',
//         300: '#fca5a5',
//         400: '#f87171',
//         500: '#ef4444',
//         600: '#dc2626',
//         700: '#b91c1c',
//         800: '#991b1b',
//         900: '#7f1d1d'
//     },
//     orange: {
//         50: '#fff7ed',
//         100: '#ffedd5',
//         200: '#fed7aa',
//         300: '#fdba74',
//         400: '#fb923c',
//         500: '#f97316',
//         600: '#ea580c',
//         700: '#c2410c',
//         800: '#9a3412',
//         900: '#7c2d12'
//     },
//     amber: {
//         50: '#fffbeb',
//         100: '#fef3c7',
//         200: '#fde68a',
//         300: '#fcd34d',
//         400: '#fbbf24',
//         500: '#f59e0b',
//         600: '#d97706',
//         700: '#b45309',
//         800: '#92400e',
//         900: '#78350f'
//     },
//     yellow: {
//         50: '#fefce8',
//         100: '#fef9c3',
//         200: '#fef08a',
//         300: '#fde047',
//         400: '#facc15',
//         500: '#eab308',
//         600: '#ca8a04',
//         700: '#a16207',
//         800: '#854d0e',
//         900: '#713f12'
//     },
//     lime: {
//         50: '#f7fee7',
//         100: '#ecfccb',
//         200: '#d9f99d',
//         300: '#bef264',
//         400: '#a3e635',
//         500: '#84cc16',
//         600: '#65a30d',
//         700: '#4d7c0f',
//         800: '#3f6212',
//         900: '#365314'
//     },
//     green: {
//         50: '#f0fdf4',
//         100: '#dcfce7',
//         200: '#bbf7d0',
//         300: '#86efac',
//         400: '#4ade80',
//         500: '#22c55e',
//         600: '#16a34a',
//         700: '#15803d',
//         800: '#166534',
//         900: '#14532d'
//     },
//     emerald: {
//         50: '#ecfdf5',
//         100: '#d1fae5',
//         200: '#a7f3d0',
//         300: '#6ee7b7',
//         400: '#34d399',
//         500: '#10b981',
//         600: '#059669',
//         700: '#047857',
//         800: '#065f46',
//         900: '#064e3b'
//     },
//     teal: {
//         50: '#f0fdfa',
//         100: '#ccfbf1',
//         200: '#99f6e4',
//         300: '#5eead4',
//         400: '#2dd4bf',
//         500: '#14b8a6',
//         600: '#0d9488',
//         700: '#0f766e',
//         800: '#115e59',
//         900: '#134e4a'
//     },
//     cyan: {
//         50: '#ecfeff',
//         100: '#cffafe',
//         200: '#a5f3fc',
//         300: '#67e8f9',
//         400: '#22d3ee',
//         500: '#06b6d4',
//         600: '#0891b2',
//         700: '#0e7490',
//         800: '#155e75',
//         900: '#164e63'
//     },
//     sky: {
//         50: '#f0f9ff',
//         100: '#e0f2fe',
//         200: '#bae6fd',
//         300: '#7dd3fc',
//         400: '#38bdf8',
//         500: '#0ea5e9',
//         600: '#0284c7',
//         700: '#0369a1',
//         800: '#075985',
//         900: '#0c4a6e'
//     },
//     blue: {
//         50: '#eff6ff',
//         100: '#dbeafe',
//         200: '#bfdbfe',
//         300: '#93c5fd',
//         400: '#60a5fa',
//         500: '#3b82f6',
//         600: '#2563eb',
//         700: '#1d4ed8',
//         800: '#1e40af',
//         900: '#1e3a8a'
//     },
//     indigo: {
//         50: '#eef2ff',
//         100: '#e0e7ff',
//         200: '#c7d2fe',
//         300: '#a5b4fc',
//         400: '#818cf8',
//         500: '#6366f1',
//         600: '#4f46e5',
//         700: '#4338ca',
//         800: '#3730a3',
//         900: '#312e81'
//     },
//     violet: {
//         50: '#f5f3ff',
//         100: '#ede9fe',
//         200: '#ddd6fe',
//         300: '#c4b5fd',
//         400: '#a78bfa',
//         500: '#8b5cf6',
//         600: '#7c3aed',
//         700: '#6d28d9',
//         800: '#5b21b6',
//         900: '#4c1d95'
//     },
//     purple: {
//         50: '#faf5ff',
//         100: '#f3e8ff',
//         200: '#e9d5ff',
//         300: '#d8b4fe',
//         400: '#c084fc',
//         500: '#a855f7',
//         600: '#9333ea',
//         700: '#7e22ce',
//         800: '#6b21a8',
//         900: '#581c87'
//     },
//     fuchsia: {
//         50: '#fdf4ff',
//         100: '#fae8ff',
//         200: '#f5d0fe',
//         300: '#f0abfc',
//         400: '#e879f9',
//         500: '#d946ef',
//         600: '#c026d3',
//         700: '#a21caf',
//         800: '#86198f',
//         900: '#701a75'
//     },
//     pink: {
//         50: '#fdf2f8',
//         100: '#fce7f3',
//         200: '#fbcfe8',
//         300: '#f9a8d4',
//         400: '#f472b6',
//         500: '#ec4899',
//         600: '#db2777',
//         700: '#be185d',
//         800: '#9d174d',
//         900: '#831843'
//     },
//     rose: {
//         50: '#fff1f2',
//         100: '#ffe4e6',
//         200: '#fecdd3',
//         300: '#fda4af',
//         400: '#fb7185',
//         500: '#f43f5e',
//         600: '#e11d48',
//         700: '#be123c',
//         800: '#9f1239',
//         900: '#881337'
//     },
// };

const userThemeColor = '#f00'
const ColorSet = [
  'slate',
  'gray',
  'zinc',
  'neutral',
  'stone',
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
  // 'purred',
];

const ValueSet = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];

function genClass(color: string, key: number) {
  return `bg-${color}-${key}`
}
function getColor(color: string, key: number) {
  debugger
  // console.log(`🚀 ~ getColor ~ colors[color][key] ${color} ${key}`, colors[color][key])
  return colors[color][key]
}
</script>
