<script setup lang="ts">
function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubleCount = computed(() => count.value * 2)

  function increment() {
    count.value++
  }

  function decrement() {
    count.value--
  }

  function reset() {
    count.value = initialValue
  }

  return { count, doubleCount, increment, decrement, reset }
}

function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  async function execute() {
    isLoading.value = true
    error.value = null
    try {
      const response = await fetch(url)
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      data.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  return { data, error, isLoading, execute }
}

// Demo usage
const { count, doubleCount, increment, decrement, reset } = useCounter(10)
const {
  data: userData,
  error: fetchError,
  isLoading,
  execute: fetchUser,
} = useFetch<{ name: string; email: string }>('https://jsonplaceholder.typicode.com/users/1')

const composableCode = `// composables/useCounter.ts
export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const doubleCount = computed(() => count.value * 2)

  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset() { count.value = initialValue }

  return { count, doubleCount, increment, decrement, reset }
}

// composables/useFetch.ts
export function useFetch<T>(url: string) {
  const data = ref<T | null>(null)
  const error = ref<string | null>(null)
  const isLoading = ref(false)

  async function execute() {
    isLoading.value = true
    error.value = null
    try {
      const res = await fetch(url)
      data.value = await res.json()
    } catch (err) {
      error.value = (err as Error).message
    } finally {
      isLoading.value = false
    }
  }

  return { data, error, isLoading, execute }
}

// Usage in component
const { count, increment } = useCounter(0)
const { data, isLoading, execute } = useFetch<User>('/api/user')`
</script>

<template>
  <div>
    <h1 class="mb-2">組合式函式 | Composables</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Composables 是利用 Composition API 封裝<strong>有狀態邏輯</strong>的函式。命名慣例以
      <code>use</code> 開頭，可在任意元件中呼叫並共享邏輯。
    </p>

    <UiTipCard type="tip" title="Composable 設計原則">
      只封裝邏輯，不耦合 UI。回傳響應式 ref 與方法，讓元件自由決定如何渲染。每個 Composable
      呼叫都會建立獨立的狀態實例。
    </UiTipCard>

    <h2 class="mt-8 mb-4">useCounter 演示</h2>
    <UiLivePreview title="useCounter Composable">
      <div class="space-y-3">
        <p>
          count = <span class="font-bold text-lg">{{ count }}</span>
        </p>
        <p>
          doubleCount = <span class="font-bold">{{ doubleCount }}</span>
        </p>
        <div class="flex gap-2">
          <button class="btn-primary" @click="increment">+1</button>
          <button class="btn-secondary" @click="decrement">-1</button>
          <button class="btn-secondary" @click="reset">重置</button>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">useFetch 演示</h2>
    <UiLivePreview title="useFetch Composable">
      <div class="space-y-3">
        <button class="btn-primary" :disabled="isLoading" @click="fetchUser">
          {{ isLoading ? '載入中...' : '取得使用者資料' }}
        </button>

        <div
          v-if="fetchError"
          class="p-3 bg-red-50 dark:bg-red-900/20 rounded-lg text-sm text-red-600 dark:text-red-400"
        >
          錯誤：{{ fetchError }}
        </div>

        <div v-if="userData" class="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg text-sm">
          <p>name: {{ userData.name }}</p>
          <p>email: {{ userData.email }}</p>
        </div>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="composableCode" language="typescript" title="Composable 範例程式碼" />

    <UiChapterNav
      prev-path="/advanced"
      prev-title="CH4：進階"
      next-path="/advanced/directives"
      next-title="自訂指令 | Directives"
    />
  </div>
</template>
