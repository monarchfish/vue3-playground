<script setup lang="ts">
const currentBreakpoint = ref('預設 (< 640px)')

const breakpointList = [
  { prefix: '（無前綴）', minWidth: '< 640px', description: '手機直向' },
  { prefix: 'sm:', minWidth: '≥ 640px', description: '手機橫向 / 小平板' },
  { prefix: 'md:', minWidth: '≥ 768px', description: '平板' },
  { prefix: 'lg:', minWidth: '≥ 1024px', description: '筆電' },
  { prefix: 'xl:', minWidth: '≥ 1280px', description: '桌面螢幕' },
  { prefix: '2xl:', minWidth: '≥ 1536px', description: '大螢幕' },
]

function updateBreakpointLabel() {
  if (!import.meta.client) return
  const width = window.innerWidth
  if (width >= 1536) currentBreakpoint.value = '2xl (≥ 1536px)'
  else if (width >= 1280) currentBreakpoint.value = 'xl (≥ 1280px)'
  else if (width >= 1024) currentBreakpoint.value = 'lg (≥ 1024px)'
  else if (width >= 768) currentBreakpoint.value = 'md (≥ 768px)'
  else if (width >= 640) currentBreakpoint.value = 'sm (≥ 640px)'
  else currentBreakpoint.value = '預設 (< 640px)'
}

onMounted(() => {
  updateBreakpointLabel()
  window.addEventListener('resize', updateBreakpointLabel)
})

onUnmounted(() => {
  if (import.meta.client) {
    window.removeEventListener('resize', updateBreakpointLabel)
  }
})

const responsiveCode = `<!-- 預設單欄，md 以上雙欄，lg 以上三欄 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="p-4 bg-white rounded-lg">卡片 1</div>
  <div class="p-4 bg-white rounded-lg">卡片 2</div>
  <div class="p-4 bg-white rounded-lg">卡片 3</div>
</div>

<!-- 文字大小隨螢幕調整 -->
<h1 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
  響應式標題
</h1>

<!-- 條件式顯示 -->
<nav class="hidden md:flex">桌面導覽</nav>
<button class="md:hidden">漢堡選單</button>`
</script>

<template>
  <div>
    <h1 class="mb-2">響應式設計 | RWD</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Tailwind 採用 Mobile-First 策略：未加前綴的樣式適用於所有螢幕，加上斷點（Breakpoint）前綴（如
      <code>md:</code>）則在該寬度以上生效。調整瀏覽器視窗大小即可觀察下方演示的變化。
    </p>

    <UiTipCard type="info" title="Mobile-First">
      寫法從最小螢幕開始，逐步用前綴覆蓋較大螢幕的樣式。例如
      <code>text-sm md:text-base lg:text-lg</code> 表示手機用小字，平板用正常字，桌面用大字。
    </UiTipCard>

    <h2 class="mt-8 mb-4">目前斷點偵測</h2>
    <UiLivePreview title="即時 Breakpoint 顯示">
      <p class="text-lg font-semibold text-primary-600 dark:text-primary-400">
        目前視窗：{{ currentBreakpoint }}
      </p>
      <p class="text-sm text-gray-500 mt-2">拖曳瀏覽器視窗邊緣，觀察此文字與下方格線的變化。</p>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">Grid 響應式格線</h2>
    <UiLivePreview title="grid-cols-1 → md:2 → lg:3">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        <div
          v-for="index in 6"
          :key="index"
          class="p-4 bg-primary-100 dark:bg-primary-900/30 text-primary-800 dark:text-primary-300 rounded-lg text-center font-medium"
        >
          卡片 {{ index }}
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">斷點對照表</h2>
    <div class="overflow-x-auto">
      <table class="w-full text-sm border-collapse">
        <thead>
          <tr class="border-b border-gray-200 dark:border-gray-700">
            <th class="text-left py-2 pr-4">前綴</th>
            <th class="text-left py-2 pr-4">最小寬度</th>
            <th class="text-left py-2">適用裝置</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="bp in breakpointList"
            :key="bp.prefix"
            class="border-b border-gray-100 dark:border-gray-800"
          >
            <td class="py-2 pr-4 font-mono text-primary-600 dark:text-primary-400">
              {{ bp.prefix }}
            </td>
            <td class="py-2 pr-4">{{ bp.minWidth }}</td>
            <td class="py-2 text-gray-500">{{ bp.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <UiCodeBlock :code="responsiveCode" language="html" title="響應式範例" />

    <UiChapterNav
      prev-path="/tailwind/utility-first"
      prev-title="Utility-First 概念"
      next-path="/tailwind/dark-mode"
      next-title="深色模式"
    />
  </div>
</template>
