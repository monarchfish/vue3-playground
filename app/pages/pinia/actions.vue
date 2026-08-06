<script setup lang="ts">
const counterStore = useCounterStore()

const actionLogList = ref<string[]>([])

watch(
  () => counterStore.count,
  (newCount, oldCount) => {
    actionLogList.value.unshift(`count 從 ${oldCount} 變更為 ${newCount}`)
    if (actionLogList.value.length > 5) actionLogList.value.pop()
  },
)

async function handleFetchRandomCount() {
  await counterStore.fetchRandomCount()
  actionLogList.value.unshift('fetchRandomCount() 非同步操作完成')
}

const actionsCode = `export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    isLoading: false,
  }),

  actions: {
    // 同步 action
    increment(amount = 1) {
      this.count += amount
    },

    // 非同步 action
    async fetchRandomCount() {
      this.isLoading = true
      try {
        const response = await fetch('/api/count')
        const data = await response.json()
        this.count = data.value
      } finally {
        this.isLoading = false
      }
    },

    // 呼叫其他 action
    async incrementAndLog() {
      this.increment()
      await this.logCount()
    },
  },
})

// 元件中直接 await action
const store = useCounterStore()
await store.fetchRandomCount()`
</script>

<template>
  <div>
    <h1 class="mb-2">Actions 與非同步 | Actions</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Actions 是修改 state 的唯一方式（在 Pinia 中不需要 mutations）。Actions
      可以是同步或非同步函式，並且能透過 <code>this</code> 存取整個 Store 實例。
    </p>

    <UiTipCard type="warning" title="直接修改 state？">
      雖然 Pinia 允許直接修改 <code>store.count++</code>，但建議將所有 state 變更邏輯封裝在 actions
      中，以便追蹤、測試與維護。
    </UiTipCard>

    <h2 class="mt-8 mb-4">同步 Actions</h2>
    <UiLivePreview title="同步 Action 演示">
      <div class="space-y-3">
        <p>
          count = <span class="font-bold text-lg">{{ counterStore.count }}</span>
        </p>
        <div class="flex flex-wrap gap-2">
          <button class="btn-primary" @click="counterStore.increment(1)">increment(1)</button>
          <button class="btn-primary" @click="counterStore.increment(5)">increment(5)</button>
          <button class="btn-secondary" @click="counterStore.decrement(3)">decrement(3)</button>
          <button class="btn-secondary" @click="counterStore.resetCount()">resetCount()</button>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">非同步 Actions</h2>
    <UiLivePreview title="非同步 Action 演示">
      <div class="space-y-3">
        <p>
          count = <span class="font-bold text-lg">{{ counterStore.count }}</span>
        </p>
        <button
          class="btn-primary"
          :disabled="counterStore.isLoading"
          @click="handleFetchRandomCount"
        >
          {{ counterStore.isLoading ? '載入中...' : 'fetchRandomCount() — 模擬 API' }}
        </button>
        <p class="text-sm text-gray-500">
          此 action 模擬 800ms 的 API 延遲，完成後隨機設定 count 值。
        </p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">Action 變更紀錄</h2>
    <UiLivePreview title="watch 監聽 Store 變化">
      <ul v-if="actionLogList.length" class="space-y-1 text-sm font-mono">
        <li
          v-for="(log, index) in actionLogList"
          :key="index"
          class="text-gray-600 dark:text-gray-400"
        >
          {{ log }}
        </li>
      </ul>
      <p v-else class="text-sm text-gray-400">觸發上方按鈕後，這裡會顯示 state 變更紀錄。</p>
    </UiLivePreview>

    <UiCodeBlock :code="actionsCode" language="typescript" title="Actions 範例" />

    <UiChapterNav
      prev-path="/pinia/basic-store"
      prev-title="Store 基礎"
      next-path="/pinia/composable-store"
      next-title="Setup Store"
    />
  </div>
</template>
