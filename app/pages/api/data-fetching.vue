<script setup lang="ts">
import type { Todo } from '~~/shared/types/todo'

const {
  data: todoList,
  status: fetchStatus,
  error: fetchError,
  refresh: refreshTodoList,
} = await useFetch<Todo[]>('/api/todos')

const asyncTodo = ref<Todo | null>(null)
const asyncStatus = ref<'idle' | 'pending' | 'success' | 'error'>('idle')
const asyncError = ref<string | null>(null)

async function handleFetchSingleTodo() {
  asyncStatus.value = 'pending'
  asyncError.value = null

  try {
    asyncTodo.value = await $fetch<Todo>('/api/todos/1')
    asyncStatus.value = 'success'
  } catch (error) {
    asyncError.value = error instanceof Error ? error.message : 'Unknown error'
    asyncStatus.value = 'error'
  }
}

const useFetchCode = `// useFetch — SSR 友善、自動去重複、自帶快取
const {
  data,      // Ref<T | null> — 回傳資料
  status,    // Ref<'idle' | 'pending' | 'success' | 'error'>
  error,     // Ref<Error | null>
  refresh,   // () => Promise<void> — 手動重新請求
  clear,     // () => void — 清除 data & error
} = await useFetch<Todo[]>('/api/todos')

// 帶入選項
const { data: user } = await useFetch('/api/user', {
  // 請求選項
  method: 'POST',
  body: { name: 'Vue' },
  headers: { Authorization: 'Bearer token' },
  query: { page: 1 },

  // 行為選項
  lazy: true,          // 不阻塞導航（不 await）
  server: false,       // 僅客戶端請求
  immediate: false,    // 不立即執行（需手動 execute）
  watch: [pageRef],    // 監聽變數變化後自動重新請求

  // 資料轉換
  transform: (data) => data.items,
  pick: ['id', 'name'], // 僅保留指定欄位（減少 payload）
})`

const useAsyncDataCode = `// useAsyncData — 更底層的非同步資料取得
// 適合需要自訂 key 或組合多個請求的場景
const { data, status, error, refresh } = await useAsyncData(
  'todos',  // 唯一 key（用於 SSR payload 和去重複）
  () => $fetch<Todo[]>('/api/todos'),
)

// 組合多個請求
const { data: dashboardData } = await useAsyncData(
  'dashboard',
  async () => {
    const [todoList, userInfo, stats] = await Promise.all([
      $fetch('/api/todos'),
      $fetch('/api/user'),
      $fetch('/api/stats'),
    ])
    return { todoList, userInfo, stats }
  },
)

// useLazyAsyncData — 不阻塞導航的版本
const { data: lazyData, pending } = useLazyAsyncData(
  'lazy-todos',
  () => $fetch('/api/todos'),
)`

const dollarFetchCode = `// $fetch — 底層 HTTP 請求工具（基於 ofetch）
// ✅ 適合用在事件處理器、Pinia actions、非 SSR 場景

// GET
const todoList = await $fetch<Todo[]>('/api/todos')

// POST（帶 Body）
const newTodo = await $fetch<Todo>('/api/todos', {
  method: 'POST',
  body: { title: '新任務' },
})

// PUT（帶路由參數 + Body）
const updated = await $fetch<Todo>(\`/api/todos/\${id}\`, {
  method: 'PUT',
  body: { completed: true },
})

// DELETE
await $fetch(\`/api/todos/\${id}\`, {
  method: 'DELETE',
})

// 錯誤處理
try {
  await $fetch('/api/protected')
} catch (error) {
  // FetchError 包含 statusCode、statusMessage、data
  console.error(error.statusCode) // 401
  console.error(error.data.message) // 'Unauthorized'
}`

const comparisonCode = `// ⚠️ 三者的選擇指南：
//
// useFetch / useAsyncData：
//   ✅ 用在頁面/元件的 <script setup> 頂層
//   ✅ SSR 友善（資料會傳送到客戶端，不重複請求）
//   ✅ 自動管理 loading / error 狀態
//   ✅ 支援 watch / refresh / 去重複
//   ❌ 不適合在事件處理器中呼叫
//
// $fetch：
//   ✅ 用在事件處理器（onClick、onSubmit）
//   ✅ 用在 Pinia store actions
//   ✅ 用在 server/ 目錄（server-to-server）
//   ❌ 在 <script setup> 頂層使用會導致 SSR 重複請求
//   ❌ 需手動管理 loading / error 狀態`
</script>

<template>
  <div>
    <h1 class="mb-2">Data Fetching</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Nuxt
      提供三種資料取得方式：<code>useFetch</code>、<code>useAsyncData</code>、<code>$fetch</code>。三者適用場景不同，正確選擇能避免
      SSR 重複請求與 Hydration 不一致的問題。
    </p>

    <UiTipCard type="warning" title="重要：SSR 重複請求問題">
      在 <code>&lt;script setup&gt;</code> 頂層直接使用
      <code>$fetch</code> 會導致伺服器端和客戶端<strong>各請求一次</strong>。 應使用
      <code>useFetch</code> 或 <code>useAsyncData</code>，它們會將伺服器端的回應透過 payload
      傳給客戶端。
    </UiTipCard>

    <h2 class="mt-8 mb-4">useFetch — 主要資料取得方式</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      <code>useFetch</code> 是 <code>useAsyncData</code> + <code>$fetch</code> 的語法糖。 SSR
      安全、自動去重複、自帶快取與 loading 狀態。
    </p>

    <UiLivePreview title="即時示範 — useFetch('/api/todos')">
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <span class="text-sm font-medium">Status:</span>
          <span
            class="px-2 py-0.5 rounded text-xs font-mono"
            :class="{
              'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300':
                fetchStatus === 'pending',
              'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300':
                fetchStatus === 'success',
              'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300':
                fetchStatus === 'error',
            }"
          >
            {{ fetchStatus }}
          </span>
          <button class="btn-secondary text-xs" @click="refreshTodoList()">refresh()</button>
        </div>

        <div v-if="fetchError" class="text-red-500 text-sm">Error: {{ fetchError.message }}</div>

        <div v-if="todoList" class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm">
          <p class="text-gray-500 mb-2">data ({{ todoList.length }} items):</p>
          <ul class="space-y-1 font-mono text-xs">
            <li v-for="todo in todoList" :key="todo.id" class="flex items-center gap-2">
              <span :class="todo.completed ? 'line-through text-gray-400' : ''">
                {{ todo.id }}. {{ todo.title }}
              </span>
              <span
                class="px-1.5 py-0.5 rounded text-[10px]"
                :class="
                  todo.completed
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                    : 'bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                "
              >
                {{ todo.completed ? 'done' : 'pending' }}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="useFetchCode" language="typescript" title="useFetch 完整 API" />

    <h2 class="mt-8 mb-4">useAsyncData — 進階資料組合</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      當需要自訂 cache key、組合多個請求、或自訂取得邏輯時，使用 <code>useAsyncData</code>。
    </p>
    <UiCodeBlock :code="useAsyncDataCode" language="typescript" title="useAsyncData 用法" />

    <h2 class="mt-8 mb-4">$fetch — 事件處理器 & Store</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      <code>$fetch</code> 是 Nuxt 內建的 HTTP Client（基於
      <a
        href="https://github.com/unjs/ofetch"
        target="_blank"
        rel="noopener"
        class="text-primary-600 dark:text-primary-400 hover:underline"
        >ofetch</a
      >）。適用於事件處理器和 Pinia actions。
    </p>

    <UiLivePreview title="即時示範 — $fetch('/api/todos/1')">
      <div class="space-y-3">
        <button
          class="btn-primary"
          :disabled="asyncStatus === 'pending'"
          @click="handleFetchSingleTodo"
        >
          {{ asyncStatus === 'pending' ? '請求中...' : '$fetch GET /api/todos/1' }}
        </button>

        <div v-if="asyncTodo" class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-xs">
          <pre>{{ JSON.stringify(asyncTodo, null, 2) }}</pre>
        </div>
        <div v-if="asyncError" class="text-red-500 text-sm">Error: {{ asyncError }}</div>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="dollarFetchCode" language="typescript" title="$fetch 用法" />

    <h2 class="mt-8 mb-4">三者比較與選擇指南</h2>
    <UiCodeBlock
      :code="comparisonCode"
      language="typescript"
      title="useFetch vs useAsyncData vs $fetch"
    />

    <UiTipCard type="tip" title="最佳實踐">
      <ul class="list-disc list-inside text-sm space-y-1">
        <li>頁面初始資料 → <code>useFetch</code>（SSR 友善、自動 loading）</li>
        <li>使用者操作觸發 → <code>$fetch</code>（在 onClick / Pinia action 中）</li>
        <li>多個 API 組合 → <code>useAsyncData</code> + <code>Promise.all</code></li>
        <li>需要即時更新 → 搭配 <code>refresh()</code> 或 <code>watch</code> 選項</li>
      </ul>
    </UiTipCard>

    <UiChapterNav
      prev-path="/api/server-routes"
      prev-title="Server Routes"
      next-path="/api/http-methods"
      next-title="HTTP Methods"
    />
  </div>
</template>
