<script setup lang="ts">
const todoStore = useTodoApiStore()
const newTodoTitle = ref('')

onMounted(() => {
  todoStore.fetchTodoList()
})

async function handleAddTodo() {
  if (!newTodoTitle.value.trim()) return
  await todoStore.addTodo(newTodoTitle.value.trim())
  newTodoTitle.value = ''
}

/* eslint-disable no-useless-escape */
const storeCode = `// app/stores/todo-api.ts — API Store（封裝資料流）
import type { Todo } from '~/server/utils/todos'

export const useTodoApiStore = defineStore('todo-api', () => {
  // === State ===
  const todoList = ref<Todo[]>([])
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  // === Getters（衍生狀態）===
  const completedTodoList = computed(() =>
    todoList.value.filter((todo) => todo.completed),
  )
  const pendingTodoList = computed(() =>
    todoList.value.filter((todo) => !todo.completed),
  )

  // === Actions（封裝 API 呼叫）===
  async function fetchTodoList(): Promise<void> {
    isLoading.value = true
    errorMessage.value = null
    try {
      todoList.value = await $fetch<Todo[]>('/api/todos')
    } catch (error) {
      errorMessage.value = error instanceof Error
        ? error.message : 'Failed to fetch'
    } finally {
      isLoading.value = false
    }
  }

  async function addTodo(title: string): Promise<Todo | null> {
    try {
      const newTodo = await $fetch<Todo>('/api/todos', {
        method: 'POST',
        body: { title },
      })
      todoList.value.push(newTodo) // 樂觀更新
      return newTodo
    } catch (error) {
      errorMessage.value = '...'
      return null
    }
  }

  // ... toggleTodo, removeTodo, updateTodoTitle

  return {
    todoList, isLoading, errorMessage,
    completedTodoList, pendingTodoList,
    fetchTodoList, addTodo, /* ... */
  }
})`

const pageCode = `// app/pages/api/data-flow.vue — Page 使用 Store
<script setup lang="ts">
const todoStore = useTodoApiStore() // 自動匯入

// 頁面載入時取得資料
onMounted(() => {
  todoStore.fetchTodoList()
})

// 使用者操作觸發 Store Action
async function handleAddTodo() {
  await todoStore.addTodo(newTitle.value)
}
<\/script>

<template>
  <!-- 響應式綁定 Store 狀態 -->
  <div v-if="todoStore.isLoading">Loading...</div>
  <div v-else-if="todoStore.errorMessage">{{ todoStore.errorMessage }}</div>
  <ul v-else>
    <li v-for="todo in todoStore.todoList" :key="todo.id">
      {{ todo.title }}
    </li>
  </ul>
</template>`

const flowDiagramCode = `// 完整資料流鏈路：
//
// ┌─────────────────────────────────────────────────────┐
// │  1. Page / Component                                │
// │     使用者觸發操作 (click / submit / mount)           │
// │     呼叫 store.action()                             │
// └───────────────────────┬─────────────────────────────┘
//                         │
//                         ▼
// ┌─────────────────────────────────────────────────────┐
// │  2. Pinia Store (Action)                            │
// │     管理 loading / error 狀態                        │
// │     呼叫 $fetch() 發送 HTTP 請求                     │
// │     更新 state（樂觀更新 or 等待回應更新）              │
// └───────────────────────┬─────────────────────────────┘
//                         │
//                         ▼
// ┌─────────────────────────────────────────────────────┐
// │  3. $fetch (HTTP Client)                            │
// │     發送 HTTP 請求到 /api/...                        │
// │     自動序列化 body / 反序列化 response               │
// └───────────────────────┬─────────────────────────────┘
//                         │
//                         ▼
// ┌─────────────────────────────────────────────────────┐
// │  4. Server Route (Nitro)                            │
// │     接收請求、驗證輸入                                │
// │     執行商業邏輯（CRUD / 呼叫外部 API / DB）          │
// │     回傳 JSON Response                              │
// └─────────────────────────────────────────────────────┘
//
// 回傳路徑：Server → $fetch → Store (更新 state) → Page (自動響應)`

const bestPracticeCode = `// === 最佳實踐 ===

// 1. Store Action 負責「怎麼做」，Page 只負責「做什麼」
// ❌ 不好：Page 直接呼叫 $fetch
const data = await $fetch('/api/todos') // 邏輯散落在各頁面

// ✅ 好：Page 呼叫 Store Action
await todoStore.fetchTodoList() // 邏輯集中在 Store

// 2. 樂觀更新（Optimistic Update）
async function toggleTodo(id: number) {
  const todo = todoList.value.find((t) => t.id === id)
  if (!todo) return

  // 先更新 UI（使用者立即看到變化）
  todo.completed = !todo.completed

  try {
    await $fetch(\`/api/todos/\${id}\`, {
      method: 'PUT',
      body: { completed: todo.completed },
    })
  } catch {
    // 失敗時回滾
    todo.completed = !todo.completed
    errorMessage.value = 'Update failed'
  }
}

// 3. Loading & Error 狀態集中管理
// Store 提供 isLoading, errorMessage
// Page 根據狀態顯示 UI（Loading Skeleton / Error Message）

// 4. 型別安全的資料流
// Server → shared types → Store → Page
// 所有層級共用同一份 TypeScript interface`
/* eslint-enable no-useless-escape */
</script>

<template>
  <div>
    <h1 class="mb-2">Data Flow</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      完整的 Nuxt 全端資料流：<strong>Page → Store → $fetch → Server API</strong>。
      這個模式讓邏輯集中、可測試、可重用。
    </p>

    <h2 class="mt-8 mb-4">資料流鏈路圖</h2>
    <UiCodeBlock :code="flowDiagramCode" language="text" title="API → Store → Page 完整鏈路" />

    <h2 class="mt-8 mb-4">即時示範 — Store 驅動的 CRUD</h2>
    <UiTipCard type="info" title="觀察重點">
      下方範例使用 <code>useTodoApiStore</code>。頁面只呼叫 Store Action，不直接操作
      <code>$fetch</code>。 Store 管理 loading / error，頁面只負責顯示。
    </UiTipCard>

    <UiLivePreview title="完整 Data Flow 演示">
      <div class="space-y-4">
        <!-- Status Bar -->
        <div class="flex items-center gap-3 text-sm">
          <span
            class="px-2 py-0.5 rounded text-xs font-mono"
            :class="{
              'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700': todoStore.isLoading,
              'bg-red-100 dark:bg-red-900/30 text-red-700': todoStore.errorMessage,
              'bg-green-100 dark:bg-green-900/30 text-green-700':
                !todoStore.isLoading && !todoStore.errorMessage,
            }"
          >
            {{ todoStore.isLoading ? 'Loading...' : todoStore.errorMessage ? 'Error' : 'Ready' }}
          </span>
          <span class="text-gray-400">|</span>
          <span class="text-gray-500">
            全部: {{ todoStore.todoList.length }} / 待辦: {{ todoStore.pendingTodoList.length }} /
            完成:
            {{ todoStore.completedTodoList.length }}
          </span>
        </div>

        <!-- Error -->
        <div
          v-if="todoStore.errorMessage"
          class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-sm text-red-700 dark:text-red-300"
        >
          {{ todoStore.errorMessage }}
        </div>

        <!-- Create -->
        <form class="flex gap-2" @submit.prevent="handleAddTodo">
          <input
            v-model="newTodoTitle"
            type="text"
            placeholder="store.addTodo(title)"
            class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
          <button type="submit" class="btn-primary text-sm" :disabled="!newTodoTitle.trim()">
            addTodo()
          </button>
        </form>

        <!-- List -->
        <div v-if="todoStore.isLoading" class="space-y-2">
          <div
            v-for="i in 3"
            :key="i"
            class="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"
          />
        </div>
        <div v-else class="space-y-2">
          <div
            v-for="todo in todoStore.todoList"
            :key="todo.id"
            class="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg group"
          >
            <button
              class="w-5 h-5 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0"
              :class="
                todo.completed
                  ? 'bg-green-500 border-green-500'
                  : 'border-gray-300 dark:border-gray-600 hover:border-primary-500'
              "
              @click="todoStore.toggleTodo(todo.id)"
            >
              <Icon v-if="todo.completed" name="heroicons:check" class="w-3 h-3 text-white" />
            </button>
            <span
              class="flex-1 text-sm"
              :class="todo.completed ? 'line-through text-gray-400' : ''"
            >
              {{ todo.title }}
            </span>
            <button
              class="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              @click="todoStore.removeTodo(todo.id)"
            >
              <Icon name="heroicons:trash" class="w-4 h-4" />
            </button>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex gap-2 pt-2">
          <button class="btn-secondary text-xs" @click="todoStore.fetchTodoList()">
            fetchTodoList()
          </button>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">Store 程式碼</h2>
    <UiCodeBlock :code="storeCode" language="typescript" title="app/stores/todo-api.ts" />

    <h2 class="mt-8 mb-4">Page 使用 Store</h2>
    <UiCodeBlock :code="pageCode" language="vue" title="頁面如何使用 Store" />

    <h2 class="mt-8 mb-4">最佳實踐</h2>
    <UiCodeBlock :code="bestPracticeCode" language="typescript" title="Data Flow 最佳實踐" />

    <UiTipCard type="tip" title="進階延伸">
      <ul class="list-disc list-inside text-sm space-y-1">
        <li>
          大型專案可將 <code>$fetch</code> 再封裝為 <code>useApiClient</code> composable，統一處理
          token、base URL、攔截器
        </li>
        <li>
          搭配 <code>useFetch</code> 的
          <code>watch</code> 選項可實現自動重新取得（如分頁、篩選條件變更）
        </li>
        <li>Server Routes 可連接真實資料庫（Prisma / Drizzle）或呼叫外部微服務</li>
        <li>使用 <code>server/middleware/</code> 統一處理認證、CORS、Rate Limiting</li>
      </ul>
    </UiTipCard>

    <UiChapterNav
      prev-path="/api/http-methods"
      prev-title="HTTP Methods"
      next-path="/projects"
      next-title="實戰專案總覽"
    />
  </div>
</template>
