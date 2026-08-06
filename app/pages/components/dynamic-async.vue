<script setup lang="ts">
const currentTab = ref('home')

const tabContentMap: Record<string, { title: string; content: string }> = {
  home: { title: '首頁', content: '歡迎來到首頁！這裡顯示最新消息與快速入口。' },
  profile: { title: '個人資料', content: '這是個人資料頁面，可以編輯你的基本資訊。' },
  settings: { title: '設定', content: '應用程式設定，包含通知、隱私、外觀等選項。' },
}

/* eslint-disable no-useless-escape */
const dynamicCode = `<!-- 動態元件 Dynamic Components -->
<template>
  <component :is="currentComponent" v-bind="componentProps" />
</template>

<script setup lang="ts">
import TabHome from './TabHome.vue'
import TabProfile from './TabProfile.vue'

const tabMap = { home: TabHome, profile: TabProfile }
const currentTab = ref('home')
const currentComponent = computed(() => tabMap[currentTab.value])
<\/script>

<!-- 使用 KeepAlive 快取元件狀態 -->
<KeepAlive>
  <component :is="currentComponent" />
</KeepAlive>

<!-- 非同步元件 Async Components -->
<script setup lang="ts">
const AsyncHeavyChart = defineAsyncComponent({
  loader: () => import('./HeavyChart.vue'),
  loadingComponent: LoadingSpinner,
  errorComponent: ErrorDisplay,
  delay: 200,      // 延遲顯示 loading（毫秒）
  timeout: 3000,   // 超時時間
})
<\/script>`
/* eslint-enable no-useless-escape */
</script>

<template>
  <div>
    <h1 class="mb-2">動態與非同步元件</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      <code>&lt;component :is&gt;</code> 可動態切換元件；<code>defineAsyncComponent</code>
      則讓元件延遲載入，優化初始載入效能。
    </p>

    <h2 class="mt-8 mb-4">動態元件（Dynamic Components）</h2>
    <UiTipCard type="info" title="使用場景">
      常用於 Tab 切換、步驟流程（Wizard）、或根據條件顯示不同元件的場景。
    </UiTipCard>

    <UiLivePreview title="Tab 切換演示">
      <div class="space-y-4">
        <div class="flex border-b border-gray-200 dark:border-gray-700">
          <button
            v-for="(data, key) in tabContentMap"
            :key="key"
            class="px-4 py-2 text-sm font-medium border-b-2 transition-colors -mb-px"
            :class="
              currentTab === key
                ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
            "
            @click="currentTab = key"
          >
            {{ data.title }}
          </button>
        </div>

        <div
          class="p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <h3 class="font-medium mb-2">{{ tabContentMap[currentTab]?.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            {{ tabContentMap[currentTab]?.content }}
          </p>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">KeepAlive — 快取元件狀態</h2>
    <UiTipCard type="tip" title="KeepAlive">
      使用
      <code>&lt;KeepAlive&gt;</code>
      包裹動態元件時，被切走的元件不會被銷毀，而是保留在記憶體中。再切回來時會恢復原本的狀態，不需重新初始化。
    </UiTipCard>

    <h2 class="mt-8 mb-4">非同步元件（Async Components）</h2>
    <UiTipCard type="info" title="效能優化">
      大型元件（如圖表、編輯器）可以透過 <code>defineAsyncComponent</code> 延遲載入，減少初始 bundle
      大小。Nuxt 中的 <code>lazy</code> 前綴元件即自動實現此功能。
    </UiTipCard>

    <UiLivePreview title="非同步元件模擬">
      <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
        <p class="text-sm text-gray-500 mb-2">模擬非同步載入過程：</p>
        <div class="flex items-center gap-2 text-sm">
          <div
            class="w-4 h-4 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"
          />
          <span>Loading HeavyChart component...</span>
        </div>
        <p class="text-xs text-gray-400 mt-2">
          實際使用時，defineAsyncComponent 會在元件需要渲染時才發起網路請求載入。
        </p>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="dynamicCode" language="vue" title="動態元件與非同步元件" />

    <UiChapterNav
      prev-path="/components/provide-inject"
      prev-title="Provide / Inject"
      next-path="/components/v-model-component"
      next-title="元件 v-model"
    />
  </div>
</template>
