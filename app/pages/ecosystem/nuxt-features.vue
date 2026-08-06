<script setup lang="ts">
const fetchStatus = ref<'idle' | 'loading' | 'done'>('idle')
const fetchedData = ref<{ id: number; title: string } | null>(null)

async function handleSimulateFetch() {
  fetchStatus.value = 'loading'
  fetchedData.value = null

  // Simulate useFetch behavior
  await new Promise((resolve) => setTimeout(resolve, 1000))
  fetchedData.value = {
    id: 1,
    title: 'Nuxt useFetch 模擬資料',
  }
  fetchStatus.value = 'done'
}

const currentLayout = computed(() => 'default')

const nuxtCode = `// useFetch — 自動處理 SSR / 快取 / 錯誤
const { data, pending, error, refresh } = await useFetch('/api/posts')

// useAsyncData — 更底層的非同步資料取得
const { data: user } = await useAsyncData('user', () =>
  $fetch('/api/user'),
)

// middleware/auth.ts — 路由守衛
export default defineNuxtRouteMiddleware((to, from) => {
  const isLoggedIn = useCookie('token')
  if (!isLoggedIn.value && to.path !== '/login') {
    return navigateTo('/login')
  }
})

// layouts/admin.vue — 版面配置
<template>
  <div class="admin-layout">
    <AdminSidebar />
    <slot />
  </div>
</template>

// pages/admin/index.vue
definePageMeta({ layout: 'admin', middleware: 'auth' })`
</script>

<template>
  <div>
    <h1 class="mb-2">Nuxt 特色功能</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Nuxt 是基於 Vue 3 的全端框架（Full-Stack Framework），提供檔案式路由（File-based
      Routing）、自動匯入、SSR/SSG 支援，以及 <code>useFetch</code>、<code>middleware</code>、<code
        >layouts</code
      >
      等開箱即用的功能。
    </p>

    <UiTipCard type="info" title="目錄結構">
      <code>app/pages/</code> 自動產生路由、<code>app/layouts/</code> 定義版面、<code
        >app/middleware/</code
      >
      放置路由守衛、<code>server/api/</code> 建立 API 端點。
    </UiTipCard>

    <h2 class="mt-8 mb-4">useFetch — 資料取得</h2>
    <UiLivePreview title="模擬 useFetch 流程">
      <div class="space-y-3">
        <button
          class="btn-primary"
          :disabled="fetchStatus === 'loading'"
          @click="handleSimulateFetch"
        >
          {{ fetchStatus === 'loading' ? '載入中 (pending)...' : '觸發 useFetch 模擬' }}
        </button>

        <div
          v-if="fetchStatus === 'done' && fetchedData"
          class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm"
        >
          <p>data.id = {{ fetchedData.id }}</p>
          <p>data.title = "{{ fetchedData.title }}"</p>
        </div>
        <p v-else-if="fetchStatus === 'idle'" class="text-sm text-gray-400">
          點擊按鈕模擬非同步資料取得流程。
        </p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">Layouts — 版面配置</h2>
    <UiLivePreview title="目前使用的 Layout">
      <div class="space-y-2 text-sm">
        <p>
          本頁使用 <code>layouts/default.vue</code> 版面，包含側邊欄（Sidebar）與頁首（Header）。
        </p>
        <p>
          目前 layout：<span class="font-mono text-primary-600 dark:text-primary-400">{{
            currentLayout
          }}</span>
        </p>
        <p class="text-gray-500">
          透過 <code>definePageMeta({ layout: 'fullscreen' })</code> 可切換至其他版面。
        </p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">Middleware — 路由守衛</h2>
    <UiLivePreview title="Middleware 概念">
      <div class="space-y-2 text-sm">
        <p>Middleware 在頁面渲染前執行，常用於：</p>
        <ul class="list-disc list-inside text-gray-600 dark:text-gray-400 space-y-1">
          <li>驗證使用者登入狀態</li>
          <li>檢查權限（Role-based Access）</li>
          <li>重導向（Redirect）至特定頁面</li>
          <li>記錄路由變更日誌</li>
        </ul>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="nuxtCode" language="typescript" title="Nuxt 核心 API 範例" />

    <UiChapterNav
      prev-path="/ecosystem/vueuse"
      prev-title="VueUse 工具集"
      next-path="/ecosystem/form-validation"
      next-title="表單驗證"
    />
  </div>
</template>
