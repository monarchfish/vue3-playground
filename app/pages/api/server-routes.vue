<script setup lang="ts">
const serverRouteBasicCode = `// server/api/hello.ts — 最簡單的 API 端點
export default defineEventHandler(() => {
  return { message: 'Hello from Nitro!' }
})

// 前端呼叫：GET /api/hello → { message: 'Hello from Nitro!' }`

const fileNamingCode = `// 以副檔名區分 HTTP 方法（推薦）
server/api/todos/index.get.ts    → GET    /api/todos
server/api/todos/index.post.ts   → POST   /api/todos
server/api/todos/[id].get.ts     → GET    /api/todos/:id
server/api/todos/[id].put.ts     → PUT    /api/todos/:id
server/api/todos/[id].delete.ts  → DELETE /api/todos/:id

// 或用單一檔案判斷方法
server/api/todos.ts → 所有方法共用（需手動判斷 event.method）`

const eventHandlerCode = `// server/api/todos/index.post.ts — POST 建立 Todo
export default defineEventHandler(async (event) => {
  // 讀取 Request Body
  const body = await readBody<{ title: string }>(event)

  // 驗證輸入
  if (!body.title?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      message: 'Title is required',
    })
  }

  // 回傳新建資料（自動序列化為 JSON）
  return { id: Date.now(), title: body.title, completed: false }
})

// server/api/todos/[id].get.ts — 動態路由參數
export default defineEventHandler((event) => {
  const id = Number(getRouterParam(event, 'id'))

  if (Number.isNaN(id)) {
    throw createError({ statusCode: 400, message: 'Invalid ID' })
  }

  return getTodoById(id) // 自訂工具函式
})`

const queryParamsCode = `// server/api/search.get.ts — 讀取 Query Parameters
export default defineEventHandler((event) => {
  // GET /api/search?keyword=vue&page=1
  const query = getQuery(event)
  // query = { keyword: 'vue', page: '1' }

  const keyword = query.keyword as string ?? ''
  const page = Number(query.page) || 1
  const pageSize = 10

  return { keyword, page, pageSize, resultList: [] }
})

// server/api/headers.get.ts — 讀取 Headers
export default defineEventHandler((event) => {
  const authHeader = getHeader(event, 'authorization')
  const userAgent = getHeader(event, 'user-agent')

  return { authHeader, userAgent }
})`

const serverUtilsCode = `// server/utils/todos.ts — 伺服器端共用邏輯
// Nuxt 會自動匯入 server/utils/ 中的 export

export interface Todo {
  id: number
  title: string
  completed: boolean
}

const todoList: Todo[] = []

export function getTodoList(): Todo[] {
  return todoList
}

export function createTodo(title: string): Todo {
  const newTodo = { id: Date.now(), title, completed: false }
  todoList.push(newTodo)
  return newTodo
}`

const helloResponse = ref<unknown>(null)
const isHelloLoading = ref(false)

async function handleFetchHello() {
  isHelloLoading.value = true
  try {
    helloResponse.value = await $fetch('/api/todos')
  } finally {
    isHelloLoading.value = false
  }
}
</script>

<template>
  <div>
    <h1 class="mb-2">Server Routes</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Nuxt 透過
      <a
        href="https://nitro.build"
        target="_blank"
        rel="noopener"
        class="text-primary-600 dark:text-primary-400 hover:underline"
        >Nitro</a
      >
      引擎，讓你在 <code>server/api/</code> 目錄建立 API
      端點。這些端點在伺服器端執行，可存取資料庫、呼叫第三方
      API、處理驗證邏輯——前端完全不暴露敏感資訊。
    </p>

    <UiTipCard type="tip" title="自動路由映射">
      <code>server/api/</code> 下的檔案會自動映射為 API 路由。檔案名稱 = URL 路徑，副檔名指定 HTTP
      方法。例如 <code>server/api/users.get.ts</code> 映射為 <code>GET /api/users</code>。
    </UiTipCard>

    <h2 class="mt-8 mb-4">基本 Event Handler</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      每個 Server Route 都是一個 <code>defineEventHandler</code> 函式。回傳值會自動序列化為 JSON。
    </p>
    <UiCodeBlock :code="serverRouteBasicCode" language="typescript" title="最簡單的 Server Route" />

    <UiLivePreview title="即時測試 — 呼叫 GET /api/todos" class="mt-4">
      <div class="space-y-3">
        <button class="btn-primary" :disabled="isHelloLoading" @click="handleFetchHello">
          {{ isHelloLoading ? '請求中...' : '發送 GET /api/todos' }}
        </button>
        <div
          v-if="helloResponse"
          class="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm overflow-auto"
        >
          <pre>{{ JSON.stringify(helloResponse, null, 2) }}</pre>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">檔案命名與 HTTP 方法</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      Nuxt 支援以檔案副檔名區分 HTTP 方法，讓同一個資源的不同操作分離在不同檔案，便於維護。
    </p>
    <UiCodeBlock :code="fileNamingCode" language="text" title="Server Route 檔案命名規範" />

    <h2 class="mt-8 mb-4">Event Handler 詳解</h2>
    <UiTipCard type="info" title="Event API">
      <code>event</code> 物件提供完整的 HTTP 請求資訊。常用 API：
      <code>readBody()</code
      >、<code>getRouterParam()</code>、<code>getQuery()</code>、<code>getHeader()</code>、<code>createError()</code>、<code>setResponseStatus()</code>。
    </UiTipCard>
    <UiCodeBlock :code="eventHandlerCode" language="typescript" title="Body 讀取 & 動態路由參數" />

    <h2 class="mt-8 mb-4">Query Parameters & Headers</h2>
    <UiCodeBlock :code="queryParamsCode" language="typescript" title="Query 與 Header 讀取" />

    <h2 class="mt-8 mb-4">Server Utils — 共用邏輯</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      將商業邏輯抽取到 <code>server/utils/</code>，Nitro 會自動匯入這些函式，所有 Server Route
      皆可使用。
    </p>
    <UiCodeBlock :code="serverUtilsCode" language="typescript" title="server/utils/ 共用工具" />

    <UiTipCard type="warning" title="注意事項">
      <ul class="list-disc list-inside text-sm space-y-1">
        <li>Server Routes 只在伺服器端執行，<strong>無法</strong>使用 Vue 的 ref / reactive</li>
        <li>記憶體內的資料在 HMR 或重啟後會遺失（正式環境請用資料庫）</li>
        <li>錯誤統一使用 <code>createError()</code> 拋出，Nuxt 會自動格式化回應</li>
      </ul>
    </UiTipCard>

    <UiChapterNav
      prev-path="/api"
      prev-title="API 串接總覽"
      next-path="/api/data-fetching"
      next-title="Data Fetching"
    />
  </div>
</template>
