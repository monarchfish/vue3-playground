<script setup lang="ts">
const { isDark, toggleDark } = useDarkMode()

const cardThemeClass = computed(() =>
  isDark.value
    ? 'bg-gray-800 border-gray-700 text-gray-100'
    : 'bg-white border-gray-200 text-gray-900',
)

const darkModeCode = `// tailwind.config.ts
export default {
  darkMode: 'class', // 以 .dark class 控制
  // darkMode: 'media', // 或跟隨系統偏好
}

// composables/useDarkMode.ts
export function useDarkMode() {
  const isDark = useDark()       // @vueuse/core
  const toggleDark = useToggle(isDark)
  return { isDark, toggleDark }
}

<!-- HTML 中使用 dark: 前綴 -->
<div class="
  bg-white dark:bg-gray-900
  text-gray-900 dark:text-gray-100
  border-gray-200 dark:border-gray-800
">
  自動切換深淺色
</div>`
</script>

<template>
  <div>
    <h1 class="mb-2">深色模式 | Dark Mode</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      本專案在 <code>tailwind.config.ts</code> 設定 <code>darkMode: 'class'</code>，透過在
      <code>&lt;html&gt;</code> 元素加上 <code>.dark</code> class 切換深色模式。搭配 VueUse 的
      <code>useDark()</code> 可自動同步系統偏好並持久化至 localStorage。
    </p>

    <UiTipCard type="warning" title="dark: 前綴">
      所有 Tailwind 工具類別都支援 <code>dark:</code> 變體。例如
      <code>bg-white dark:bg-gray-900</code>
      會在深色模式下套用後者。記得為文字、邊框、背景都加上對應的 dark 樣式。
    </UiTipCard>

    <h2 class="mt-8 mb-4">深色模式切換</h2>
    <UiLivePreview title="Dark Mode Toggle">
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <button class="btn-primary" @click="toggleDark()">
            {{ isDark ? '☀️ 切換至淺色模式' : '🌙 切換至深色模式' }}
          </button>
          <span class="text-sm">
            目前模式：<strong>{{ isDark ? '深色 (dark)' : '淺色 (light)' }}</strong>
          </span>
        </div>

        <div class="p-6 rounded-xl border-2 transition-colors duration-300" :class="cardThemeClass">
          <h3 class="text-lg font-semibold mb-2">預覽卡片</h3>
          <p class="text-sm opacity-80">這張卡片會根據深色模式自動切換背景、邊框與文字色彩。</p>
          <div class="mt-4 flex gap-2">
            <span
              class="px-3 py-1 text-xs rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300"
            >
              Tag A
            </span>
            <span
              class="px-3 py-1 text-xs rounded-full bg-accent-100 dark:bg-accent-900/40 text-accent-700 dark:text-accent-300"
            >
              Tag B
            </span>
          </div>
        </div>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="darkModeCode" language="typescript" title="Dark Mode 設定" />

    <UiChapterNav
      prev-path="/tailwind/responsive"
      prev-title="響應式設計"
      next-path="/tailwind/custom-theme"
      next-title="自訂主題"
    />
  </div>
</template>
