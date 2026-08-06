<script setup lang="ts">
const selectedColor = ref('primary')
const paddingSize = ref(4)
const borderRadius = ref('lg')
const isShadowEnabled = ref(true)

const colorClassMap: Record<string, string> = {
  primary: 'bg-primary-500 text-white',
  accent: 'bg-accent-500 text-white',
  gray: 'bg-gray-500 text-white',
  red: 'bg-red-500 text-white',
}

const radiusClassMap: Record<string, string> = {
  none: 'rounded-none',
  md: 'rounded-md',
  lg: 'rounded-lg',
  full: 'rounded-full',
}

const paddingClassMap: Record<number, string> = {
  0: 'p-0',
  1: 'p-1',
  2: 'p-2',
  3: 'p-3',
  4: 'p-4',
  5: 'p-5',
  6: 'p-6',
  8: 'p-8',
  10: 'p-10',
  12: 'p-12',
}

const previewClassList = computed(() => [
  colorClassMap[selectedColor.value],
  paddingClassMap[paddingSize.value] ?? 'p-4',
  radiusClassMap[borderRadius.value],
  isShadowEnabled.value ? 'shadow-lg' : '',
])

const generatedHtml = computed(
  () =>
    `<div class="${previewClassList.value.filter(Boolean).join(' ')}">\n  Hello Tailwind\n</div>`,
)

const utilityCode = `<!-- Utility-First：直接在 HTML 中組合工具類別 -->
<button class="
  px-4 py-2
  bg-primary-600 text-white
  rounded-lg shadow-md
  hover:bg-primary-700
  transition-colors
">
  按鈕
</button>

<!-- 對比：傳統 CSS 方式 -->
<!-- .btn { padding: 0.5rem 1rem; background: #16a34a; ... } -->`
</script>

<template>
  <div>
    <h1 class="mb-2">Utility-First 概念</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Utility-First 代表直接在 markup 中使用小型、單一用途的 CSS 類別，而非撰寫自訂 CSS
      規則。每個工具類別通常對應一個 CSS 屬性，例如 <code>p-4</code> 代表
      <code>padding: 1rem</code>。
    </p>

    <UiTipCard type="tip" title="命名規則速查">
      <code>p-4</code> = padding、<code>m-2</code> = margin、<code>text-sm</code> = 字級、<code
        >bg-primary-500</code
      >
      = 背景色、<code>flex</code> = display flex。數字通常遵循 4px 倍數的 spacing scale。
    </UiTipCard>

    <h2 class="mt-8 mb-4">即時樣式組合器</h2>
    <UiLivePreview title="Utility Class 組合演示">
      <div class="grid gap-6 md:grid-cols-2">
        <div class="space-y-4">
          <div>
            <label class="text-sm font-medium">背景色彩</label>
            <select
              v-model="selectedColor"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            >
              <option value="primary">primary</option>
              <option value="accent">accent</option>
              <option value="gray">gray</option>
              <option value="red">red</option>
            </select>
          </div>
          <div>
            <label class="text-sm font-medium">padding（p-{{ paddingSize }}）</label>
            <input v-model.number="paddingSize" type="range" min="0" max="12" class="w-full" />
          </div>
          <div>
            <label class="text-sm font-medium">圓角</label>
            <select
              v-model="borderRadius"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            >
              <option value="none">none</option>
              <option value="md">md</option>
              <option value="lg">lg</option>
              <option value="full">full</option>
            </select>
          </div>
          <label class="flex items-center gap-2 text-sm">
            <input v-model="isShadowEnabled" type="checkbox" />
            啟用 shadow-lg
          </label>
        </div>

        <div
          class="flex items-center justify-center min-h-[160px] bg-gray-100 dark:bg-gray-800 rounded-lg"
        >
          <div :class="previewClassList">Hello Tailwind</div>
        </div>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="generatedHtml" language="html" title="產生的 HTML" />

    <h2 class="mt-8 mb-4">常用工具類別對照</h2>
    <UiLivePreview title="Flexbox 排版演示">
      <div
        class="flex items-center justify-between gap-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
      >
        <div
          class="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center text-white text-sm font-bold"
        >
          A
        </div>
        <div class="flex-1">
          <p class="font-medium">flex + items-center + justify-between</p>
          <p class="text-sm text-gray-500">子元素水平分散對齊</p>
        </div>
        <button class="btn-primary text-xs">Action</button>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="utilityCode" language="html" title="Utility-First 範例" />

    <UiChapterNav
      prev-path="/tailwind"
      prev-title="Tailwind 章節總覽"
      next-path="/tailwind/responsive"
      next-title="響應式設計"
    />
  </div>
</template>
