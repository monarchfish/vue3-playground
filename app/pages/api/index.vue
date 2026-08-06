<script setup lang="ts">
const featureList = [
  {
    icon: 'heroicons:server-stack',
    title: 'Server Routes',
    description: '使用 Nitro 在 server/api/ 建立 API 端點，支援所有 HTTP 方法。',
    path: '/api/server-routes',
  },
  {
    icon: 'heroicons:arrow-down-tray',
    title: 'Data Fetching',
    description: 'useFetch、useAsyncData、$fetch — Nuxt 提供的三種資料取得方式。',
    path: '/api/data-fetching',
  },
  {
    icon: 'heroicons:arrow-path',
    title: 'HTTP Methods',
    description: 'GET、POST、PUT、DELETE 完整 CRUD 實作範例。',
    path: '/api/http-methods',
  },
  {
    icon: 'heroicons:arrows-right-left',
    title: 'Data Flow',
    description: '完整資料流：API → Store → Page 的架構模式。',
    path: '/api/data-flow',
  },
]
</script>

<template>
  <div>
    <h1 class="mb-2">API 串接 | Data Fetching</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Nuxt 是一個<strong>全端框架（Full-Stack Framework）</strong>。它內建
      <a
        href="https://nitro.build"
        target="_blank"
        rel="noopener"
        class="text-primary-600 dark:text-primary-400 hover:underline"
        >Nitro</a
      >
      伺服器引擎，可以直接在專案中建立 API 端點，前端再透過
      <code>useFetch</code> / <code>useAsyncData</code> / <code>$fetch</code>
      取用資料。不需要額外啟動後端服務。
    </p>

    <UiTipCard type="info" title="Nuxt 全端架構">
      <div class="space-y-2 text-sm">
        <p>Nuxt 專案的完整目錄結構：</p>
        <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
          <li><code>server/api/</code> — API 路由（後端邏輯）</li>
          <li><code>server/middleware/</code> — 伺服器中介層</li>
          <li><code>server/utils/</code> — 伺服器端工具函式</li>
          <li><code>app/pages/</code> — 前端頁面（自動路由）</li>
          <li><code>app/stores/</code> — Pinia 狀態管理</li>
          <li><code>app/composables/</code> — 組合式函式</li>
        </ul>
      </div>
    </UiTipCard>

    <h2 class="mt-8 mb-4">本章內容</h2>
    <div class="grid gap-4 sm:grid-cols-2">
      <NuxtLink
        v-for="feature in featureList"
        :key="feature.path"
        :to="feature.path"
        class="section-card group hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
      >
        <div class="flex items-start gap-3">
          <Icon
            :name="feature.icon"
            class="w-6 h-6 text-primary-500 dark:text-primary-400 flex-shrink-0 mt-0.5"
          />
          <div>
            <h3
              class="font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
            >
              {{ feature.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
              {{ feature.description }}
            </p>
          </div>
        </div>
      </NuxtLink>
    </div>

    <h2 class="mt-8 mb-4">資料流概覽</h2>
    <UiLivePreview title="Nuxt 全端資料流">
      <div class="space-y-4 font-mono text-sm">
        <div class="flex items-center gap-3 flex-wrap">
          <span
            class="px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg font-semibold"
          >
            Client (Page/Component)
          </span>
          <Icon name="heroicons:arrow-right" class="w-5 h-5 text-gray-400" />
          <span
            class="px-3 py-1.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg font-semibold"
          >
            Store (Pinia)
          </span>
          <Icon name="heroicons:arrow-right" class="w-5 h-5 text-gray-400" />
          <span
            class="px-3 py-1.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-lg font-semibold"
          >
            $fetch / useFetch
          </span>
          <Icon name="heroicons:arrow-right" class="w-5 h-5 text-gray-400" />
          <span
            class="px-3 py-1.5 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg font-semibold"
          >
            Server API (Nitro)
          </span>
        </div>
        <p class="text-gray-500 dark:text-gray-400 text-xs">
          頁面觸發 → Store action 封裝邏輯 → $fetch 發送請求 → Server Route 處理 → 回傳資料更新
          Store → 畫面自動響應
        </p>
      </div>
    </UiLivePreview>

    <UiChapterNav
      prev-path="/ecosystem/form-validation"
      prev-title="表單驗證"
      next-path="/api/server-routes"
      next-title="Server Routes"
    />
  </div>
</template>
