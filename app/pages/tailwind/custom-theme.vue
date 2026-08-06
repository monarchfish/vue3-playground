<script setup lang="ts">
type ShadeLevel = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900

const selectedShade = ref<ShadeLevel>(500)

const primaryBgClassMap: Record<ShadeLevel, string> = {
  50: 'bg-primary-50',
  100: 'bg-primary-100',
  200: 'bg-primary-200',
  300: 'bg-primary-300',
  400: 'bg-primary-400',
  500: 'bg-primary-500',
  600: 'bg-primary-600',
  700: 'bg-primary-700',
  800: 'bg-primary-800',
  900: 'bg-primary-900',
}

const accentBgClassMap: Record<ShadeLevel, string> = {
  50: 'bg-accent-50',
  100: 'bg-accent-100',
  200: 'bg-accent-200',
  300: 'bg-accent-300',
  400: 'bg-accent-400',
  500: 'bg-accent-500',
  600: 'bg-accent-600',
  700: 'bg-accent-700',
  800: 'bg-accent-800',
  900: 'bg-accent-900',
}

const shadeOptionList: ShadeLevel[] = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

const primaryShadeList = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]
const accentShadeList = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900]

const themeCode = `// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          500: '#22c55e',
          900: '#14532d',
        },
        accent: {
          50: '#eff6ff',
          500: '#3b82f6',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      spacing: {
        '18': '4.5rem',
        '128': '32rem',
      },
    },
  },
} satisfies Config

// 使用自訂 token
// bg-primary-500、text-accent-600、font-mono`
</script>

<template>
  <div>
    <h1 class="mb-2">自訂主題 | Theme</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      透過 <code>tailwind.config.ts</code> 的 <code>theme.extend</code> 可擴充預設的設計
      token，包含色彩（Colors）、字型（Font Family）、間距（Spacing）等。本專案已定義
      <code>primary</code>（綠色）與 <code>accent</code>（藍色）兩組品牌色。
    </p>

    <UiTipCard type="tip" title="extend vs 覆寫">
      使用 <code>theme.extend</code> 會在保留 Tailwind 預設值的基礎上新增；直接寫在
      <code>theme</code> 下則會完全覆寫預設值。通常建議使用 extend。
    </UiTipCard>

    <h2 class="mt-8 mb-4">品牌色色階預覽</h2>
    <UiLivePreview title="primary & accent 色階">
      <div class="space-y-6">
        <div>
          <p class="text-sm font-medium mb-2">primary（綠）</p>
          <div class="flex rounded-lg overflow-hidden">
            <div
              v-for="shade in primaryShadeList"
              :key="shade"
              class="flex-1 h-12 flex items-end justify-center pb-1"
              :class="primaryBgClassMap[shade as ShadeLevel]"
            >
              <span
                class="text-[10px] font-mono"
                :class="shade >= 500 ? 'text-white' : 'text-gray-700'"
              >
                {{ shade }}
              </span>
            </div>
          </div>
        </div>
        <div>
          <p class="text-sm font-medium mb-2">accent（藍）</p>
          <div class="flex rounded-lg overflow-hidden">
            <div
              v-for="shade in accentShadeList"
              :key="shade"
              class="flex-1 h-12 flex items-end justify-center pb-1"
              :class="accentBgClassMap[shade as ShadeLevel]"
            >
              <span
                class="text-[10px] font-mono"
                :class="shade >= 500 ? 'text-white' : 'text-gray-700'"
              >
                {{ shade }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">自訂色應用演示</h2>
    <UiLivePreview title="動態色階選擇">
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium">選擇色階：{{ selectedShade }}</label>
          <select
            v-model="selectedShade"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          >
            <option v-for="shade in shadeOptionList" :key="shade" :value="shade">
              {{ shade }}
            </option>
          </select>
        </div>
        <div class="flex gap-3">
          <button
            class="px-4 py-2 rounded-lg text-white font-medium transition-colors"
            :class="primaryBgClassMap[selectedShade]"
          >
            primary-{{ selectedShade }}
          </button>
          <button
            class="px-4 py-2 rounded-lg text-white font-medium transition-colors"
            :class="accentBgClassMap[selectedShade]"
          >
            accent-{{ selectedShade }}
          </button>
        </div>
        <p class="text-sm font-mono text-gray-500">
          class="{{ primaryBgClassMap[selectedShade] }}"
        </p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">自訂字型</h2>
    <UiLivePreview title="font-sans & font-mono">
      <div class="space-y-3">
        <p class="font-sans text-lg">font-sans — Inter, Noto Sans TC</p>
        <p class="font-mono text-sm bg-gray-100 dark:bg-gray-800 p-3 rounded-lg">
          font-mono — const theme = { primary: '#22c55e' }
        </p>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="themeCode" language="typescript" title="tailwind.config.ts 範例" />

    <UiChapterNav
      prev-path="/tailwind/dark-mode"
      prev-title="深色模式"
      next-path="/ecosystem"
      next-title="生態系章節"
    />
  </div>
</template>
