<script setup lang="ts">
import type { Todo } from '~~/shared/types/todo'

const todoList = ref<Todo[]>([])
const newTitle = ref('')
const editingId = ref<number | null>(null)
const editTitle = ref('')
const requestLog = ref<string[]>([])
const isLoading = ref(false)

function addLog(method: string, url: string, status: number) {
  const timestamp = new Date().toLocaleTimeString('zh-TW')
  requestLog.value.unshift(`[${timestamp}] ${method} ${url} → ${status}`)
  if (requestLog.value.length > 10) requestLog.value.pop()
}

async function handleFetchAll() {
  isLoading.value = true
  try {
    todoList.value = await $fetch<Todo[]>('/api/todos')
    addLog('GET', '/api/todos', 200)
  } catch {
    addLog('GET', '/api/todos', 500)
  } finally {
    isLoading.value = false
  }
}

async function handleCreate() {
  if (!newTitle.value.trim()) return

  try {
    const created = await $fetch<Todo>('/api/todos', {
      method: 'POST',
      body: { title: newTitle.value.trim() },
    })
    todoList.value.push(created)
    addLog('POST', '/api/todos', 201)
    newTitle.value = ''
  } catch {
    addLog('POST', '/api/todos', 400)
  }
}

async function handleToggle(todo: Todo) {
  try {
    const updated = await $fetch<Todo>(`/api/todos/${todo.id}`, {
      method: 'PUT',
      body: { completed: !todo.completed },
    })
    const index = todoList.value.findIndex((item) => item.id === todo.id)
    if (index !== -1) todoList.value[index] = updated
    addLog('PUT', `/api/todos/${todo.id}`, 200)
  } catch {
    addLog('PUT', `/api/todos/${todo.id}`, 500)
  }
}

function handleStartEdit(todo: Todo) {
  editingId.value = todo.id
  editTitle.value = todo.title
}

async function handleSaveEdit(id: number) {
  if (!editTitle.value.trim()) return

  try {
    const updated = await $fetch<Todo>(`/api/todos/${id}`, {
      method: 'PUT',
      body: { title: editTitle.value.trim() },
    })
    const index = todoList.value.findIndex((item) => item.id === id)
    if (index !== -1) todoList.value[index] = updated
    addLog('PUT', `/api/todos/${id}`, 200)
    editingId.value = null
  } catch {
    addLog('PUT', `/api/todos/${id}`, 500)
  }
}

async function handleDelete(id: number) {
  try {
    await $fetch(`/api/todos/${id}`, { method: 'DELETE' })
    todoList.value = todoList.value.filter((item) => item.id !== id)
    addLog('DELETE', `/api/todos/${id}`, 204)
  } catch {
    addLog('DELETE', `/api/todos/${id}`, 404)
  }
}

onMounted(() => {
  handleFetchAll()
})

const getCode = `// GET — 取得資料列表
const todoList = await $fetch<Todo[]>('/api/todos')

// GET — 帶 Query Parameters
const result = await $fetch('/api/todos', {
  query: { page: 1, limit: 10, status: 'pending' },
})
// → GET /api/todos?page=1&limit=10&status=pending`

const postCode = `// POST — 建立資源
const newTodo = await $fetch<Todo>('/api/todos', {
  method: 'POST',
  body: { title: '新任務' },
  // body 會自動序列化為 JSON
  // Content-Type 自動設定為 application/json
})

// POST — 上傳檔案（FormData）
const formData = new FormData()
formData.append('file', fileInput.files[0])

const uploaded = await $fetch('/api/upload', {
  method: 'POST',
  body: formData,
  // FormData 時不會設定 Content-Type（讓瀏覽器自動加 boundary）
})`

const putCode = `// PUT — 完整更新資源
const updated = await $fetch<Todo>(\`/api/todos/\${id}\`, {
  method: 'PUT',
  body: { title: '修改後標題', completed: true },
})

// PATCH — 部分更新（語意差異，實作相同）
const patched = await $fetch(\`/api/todos/\${id}\`, {
  method: 'PATCH',
  body: { completed: true }, // 僅更新部分欄位
})`

const deleteCode = `// DELETE — 刪除資源
await $fetch(\`/api/todos/\${id}\`, {
  method: 'DELETE',
})
// 通常回傳 204 No Content（空 body）

// DELETE — 帶確認標記
await $fetch(\`/api/todos/\${id}\`, {
  method: 'DELETE',
  query: { permanent: true },
})`

const errorHandlingCode = `// 統一錯誤處理
async function safeFetch<T>(url: string, options?: Parameters<typeof $fetch>[1]) {
  try {
    return { data: await $fetch<T>(url, options), error: null }
  } catch (err: unknown) {
    const fetchError = err as { statusCode?: number; data?: { message?: string } }
    return {
      data: null,
      error: {
        statusCode: fetchError.statusCode ?? 500,
        message: fetchError.data?.message ?? 'Unknown error',
      },
    }
  }
}

// 使用
const { data, error } = await safeFetch<Todo[]>('/api/todos')
if (error) {
  console.error(\`[\${error.statusCode}] \${error.message}\`)
}`
</script>

<template>
  <div>
    <h1 class="mb-2">HTTP Methods</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      RESTful API 使用不同 HTTP
      方法表達對資源的操作：<code>GET</code>（讀取）、<code>POST</code>（建立）、<code>PUT</code>（更新）、<code>DELETE</code>（刪除）。
      以下是完整的 CRUD 互動範例。
    </p>

    <h2 class="mt-8 mb-4">完整 CRUD 互動範例</h2>
    <UiLivePreview title="Todo CRUD — 即時 API 操作">
      <div class="space-y-4">
        <!-- Create -->
        <form class="flex gap-2" @submit.prevent="handleCreate">
          <input
            v-model="newTitle"
            type="text"
            placeholder="輸入新 Todo 標題... (POST)"
            class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
          <button type="submit" class="btn-primary text-sm" :disabled="!newTitle.trim()">
            POST 新增
          </button>
        </form>

        <!-- List -->
        <div class="space-y-2">
          <div
            v-for="todo in todoList"
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
              title="PUT — toggle completed"
              @click="handleToggle(todo)"
            >
              <Icon v-if="todo.completed" name="heroicons:check" class="w-3 h-3 text-white" />
            </button>

            <template v-if="editingId === todo.id">
              <input
                v-model="editTitle"
                class="flex-1 px-2 py-1 border border-primary-300 dark:border-primary-600 rounded bg-white dark:bg-gray-800 text-sm"
                @keyup.enter="handleSaveEdit(todo.id)"
              />
              <button
                class="text-xs text-primary-600 hover:underline"
                @click="handleSaveEdit(todo.id)"
              >
                儲存
              </button>
              <button class="text-xs text-gray-400 hover:underline" @click="editingId = null">
                取消
              </button>
            </template>
            <template v-else>
              <span
                class="flex-1 text-sm"
                :class="todo.completed ? 'line-through text-gray-400' : ''"
              >
                {{ todo.title }}
              </span>
              <button
                class="text-xs text-gray-400 hover:text-primary-600 opacity-0 group-hover:opacity-100 transition-opacity"
                title="PUT — 修改標題"
                @click="handleStartEdit(todo)"
              >
                <Icon name="heroicons:pencil" class="w-4 h-4" />
              </button>
              <button
                class="text-xs text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                title="DELETE — 刪除"
                @click="handleDelete(todo.id)"
              >
                <Icon name="heroicons:trash" class="w-4 h-4" />
              </button>
            </template>
          </div>
        </div>

        <div
          v-if="todoList.length === 0 && !isLoading"
          class="text-center text-sm text-gray-400 py-4"
        >
          尚無資料，試試 POST 新增一筆！
        </div>

        <button class="btn-secondary text-xs" @click="handleFetchAll">GET 重新取得全部</button>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">Request Log</h2>
    <UiLivePreview title="API 請求紀錄">
      <div class="space-y-1 font-mono text-xs max-h-48 overflow-y-auto">
        <p v-if="requestLog.length === 0" class="text-gray-400">
          尚無請求紀錄，操作上方的 CRUD 功能試試。
        </p>
        <p
          v-for="(log, index) in requestLog"
          :key="index"
          class="py-1 px-2 rounded"
          :class="{
            'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300':
              log.includes('200') || log.includes('201'),
            'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300': log.includes('204'),
            'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300':
              log.includes('400') || log.includes('404') || log.includes('500'),
          }"
        >
          {{ log }}
        </p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">GET — 取得資料</h2>
    <UiCodeBlock :code="getCode" language="typescript" title="GET 請求" />

    <h2 class="mt-8 mb-4">POST — 建立資源</h2>
    <UiCodeBlock :code="postCode" language="typescript" title="POST 請求" />

    <h2 class="mt-8 mb-4">PUT / PATCH — 更新資源</h2>
    <UiCodeBlock :code="putCode" language="typescript" title="PUT / PATCH 請求" />

    <h2 class="mt-8 mb-4">DELETE — 刪除資源</h2>
    <UiCodeBlock :code="deleteCode" language="typescript" title="DELETE 請求" />

    <h2 class="mt-8 mb-4">錯誤處理模式</h2>
    <UiCodeBlock :code="errorHandlingCode" language="typescript" title="統一錯誤處理封裝" />

    <UiChapterNav
      prev-path="/api/data-fetching"
      prev-title="Data Fetching"
      next-path="/api/data-flow"
      next-title="Data Flow"
    />
  </div>
</template>
