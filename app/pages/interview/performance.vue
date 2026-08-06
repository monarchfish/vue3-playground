<script setup lang="ts">
const optimizationCategory = ref<'render' | 'reactivity' | 'bundle' | 'pattern'>('render')

const optimizationMap = {
  render: [
    { technique: 'v-once', desc: '標記靜態內容，只渲染一次', demo: true },
    { technique: 'v-memo', desc: '條件式跳過子樹更新（Vue 3.2+）', demo: false },
    {
      technique: 'shallowRef / shallowReactive',
      desc: '大型不可變資料結構的淺層響應式',
      demo: false,
    },
    { technique: 'KeepAlive', desc: '快取元件實例，避免重複 mount/unmount', demo: false },
  ],
  reactivity: [
    {
      technique: 'computed 快取',
      desc: '衍生資料用 computed 而非 method，避免重複計算',
      demo: true,
    },
    { technique: 'watchEffect 清理', desc: '在 onInvalidate 中清理副作用', demo: false },
    { technique: '避免不必要的 reactive', desc: '大型資料用 markRaw 或 shallowRef', demo: false },
    { technique: '拆分 ref', desc: '獨立變數用獨立 ref，避免大物件連動更新', demo: false },
  ],
  bundle: [
    { technique: 'Tree-shaking', desc: '按需引入 API，未使用的功能不打包', demo: false },
    {
      technique: 'defineAsyncComponent',
      desc: '路由層級的程式碼分割（Code Splitting）',
      demo: false,
    },
    { technique: '動態 import', desc: 'import() 延遲載入非關鍵元件', demo: false },
    { technique: 'Vite 預建置', desc: '開發時 ESM 原生載入，生產 Rollup 打包', demo: false },
  ],
  pattern: [
    { technique: '虛擬列表', desc: '長列表只渲染可視區域（vue-virtual-scroller）', demo: false },
    { technique: '防抖 / 節流', desc: '高頻事件（scroll/resize/input）限制觸發頻率', demo: true },
    { technique: 'Object.freeze', desc: '大量靜態展示資料凍結，跳過響應式代理', demo: false },
    {
      technique: 'Functional Component',
      desc: '無狀態元件用 functional 減少 overhead',
      demo: false,
    },
  ],
}

const categoryTabList = [
  { id: 'render' as const, label: '渲染優化' },
  { id: 'reactivity' as const, label: '響應式優化' },
  { id: 'bundle' as const, label: '打包優化' },
  { id: 'pattern' as const, label: '模式優化' },
]

// v-once demo
const staticContent = ref('這段文字不會因 count 改變而重新渲染')
const dynamicCount = ref(0)

// computed vs method demo
const expensiveInput = ref(0)
let methodCallCount = 0
let computedCallCount = 0

const expensiveComputed = computed(() => {
  computedCallCount++
  let sum = 0
  for (let i = 0; i < expensiveInput.value * 1000; i++) sum += i
  return sum
})

function expensiveMethod() {
  methodCallCount++
  let sum = 0
  for (let i = 0; i < expensiveInput.value * 1000; i++) sum += i
  return sum
}

// debounce demo
const rawSearchText = ref('')
const debouncedSearchText = ref('')
let debounceTimer: ReturnType<typeof setTimeout> | null = null

watch(rawSearchText, (val) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    debouncedSearchText.value = val
  }, 500)
})

const performanceCode = `<!-- v-once: render once, skip future updates -->
<div v-once>{{ staticContent }}</div>

<!-- v-memo: skip update if deps unchanged (Vue 3.2+) -->
<div v-memo="[item.id, item.selected]">
  <ExpensiveChild :item="item" />
</div>

<!-- computed: cached until deps change -->
const filtered = computed(() =>
  list.value.filter(item => item.active)
)

<!-- shallowRef: skip deep reactivity -->
const bigData = shallowRef(largeImmutableObject)

<!-- async component: code splitting -->
const HeavyChart = defineAsyncComponent(() =>
  import('./HeavyChart.vue')
)

<!-- markRaw: skip reactivity entirely -->
const chart = markRaw(new Chart(canvas, config))

<!-- KeepAlive: cache component instance -->
<KeepAlive :max="10">
  <component :is="currentTab" />
</KeepAlive>`
</script>

<template>
  <div>
    <h1 class="mb-2">效能優化</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Vue 3 本身已比 Vue 2
      更快，但大型應用仍需刻意優化。以下整理渲染、響應式、打包與模式四個面向的優化策略。
    </p>

    <UiTipCard type="warning" title="優化原則">
      <strong>先測量，再優化。</strong>使用 Vue DevTools Performance 或 Chrome Performance
      找出真正的瓶頸，避免過早優化。大多數應用不需要 v-memo 或 shallowRef。
    </UiTipCard>

    <h2 class="mt-8 mb-4">優化策略總覽</h2>
    <UiLivePreview title="效能優化分類">
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tab in categoryTabList"
            :key="tab.id"
            class="px-3 py-1.5 text-sm rounded-lg transition-colors"
            :class="
              optimizationCategory === tab.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            "
            @click="optimizationCategory = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <ul class="space-y-2">
          <li
            v-for="item in optimizationMap[optimizationCategory]"
            :key="item.technique"
            class="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-sm"
          >
            <code class="shrink-0 font-semibold text-primary-600 dark:text-primary-400">{{
              item.technique
            }}</code>
            <span class="text-gray-600 dark:text-gray-400">{{ item.desc }}</span>
          </li>
        </ul>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">v-once 演示</h2>
    <UiLivePreview title="v-once 跳過重複渲染">
      <div class="space-y-3">
        <p v-once class="text-sm p-2 bg-gray-100 dark:bg-gray-800 rounded">
          {{ staticContent }}（v-once，不會更新）
        </p>
        <p class="text-sm">
          動態 count：<span class="font-bold">{{ dynamicCount }}</span>
        </p>
        <button class="btn-primary" @click="dynamicCount++">count++（v-once 區塊不受影響）</button>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">computed 快取 vs method</h2>
    <UiLivePreview title="computed 快取演示">
      <div class="space-y-3">
        <label class="text-sm">
          輸入值：
          <input
            v-model.number="expensiveInput"
            type="number"
            min="0"
            max="100"
            class="ml-2 w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800"
          />
        </label>
        <div class="grid sm:grid-cols-2 gap-3 text-sm">
          <div class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
            <p class="font-medium text-green-700 dark:text-green-300">computed（快取）</p>
            <p>結果：{{ expensiveComputed }}</p>
            <p class="text-xs text-gray-500 mt-1">計算次數：{{ computedCallCount }}</p>
          </div>
          <div class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
            <p class="font-medium text-red-700 dark:text-red-300">method（每次呼叫）</p>
            <p>結果：{{ expensiveMethod() }}</p>
            <p class="text-xs text-gray-500 mt-1">計算次數：{{ methodCallCount }}</p>
          </div>
        </div>
        <p class="text-xs text-gray-500">
          每次 re-render 都會呼叫 method，但 computed 只在依賴變更時重新計算
        </p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">防抖（Debounce）演示</h2>
    <UiLivePreview title="搜尋防抖">
      <div class="space-y-2">
        <input
          v-model="rawSearchText"
          class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          placeholder="輸入搜尋文字（500ms 防抖）"
        />
        <p class="text-sm">即時輸入：「{{ rawSearchText }}」</p>
        <p class="text-sm">
          防抖後觸發搜尋：「<span class="font-bold">{{
            debouncedSearchText || '（等待輸入...）'
          }}</span
          >」
        </p>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="performanceCode" language="vue" title="效能優化程式碼範例" />

    <UiChapterNav
      prev-path="/interview/vue2-vs-vue3"
      prev-title="Vue 2 vs Vue 3"
      next-path="/pinia"
      next-title="CH6：Pinia"
    />
  </div>
</template>
