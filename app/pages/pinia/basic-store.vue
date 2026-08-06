<script setup lang="ts">
const counterStore = useCounterStore()
const newTodoText = ref('')

function handleAddTodo() {
  counterStore.addTodo(newTodoText.value)
  newTodoText.value = ''
}

const storeCode = `// stores/counter.ts
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    todoList: [] as TodoItem[],
  }),

  getters: {
    // 接收 state 作為第一個參數
    doubleCount: (state) => state.count * 2,

    // 透過 this 存取其他 getter
    todoSummary(): string {
      const done = this.todoList.filter(t => t.isDone).length
      return \`\${done} / \${this.todoList.length} 已完成\`
    },
  },

  actions: {
    increment() {
      this.count++
    },
    addTodo(text: string) {
      this.todoList.push({ id: Date.now(), text, isDone: false })
    },
  },
})

// 在元件中使用
const store = useCounterStore()
store.increment()
console.log(store.doubleCount) // getter 像屬性一樣存取`
</script>

<template>
  <div>
    <h1 class="mb-2">Store 基礎 | Basic Store</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      <code>defineStore</code> 是建立 Store 的入口函式。Store 包含
      <strong>state</strong>（狀態）、<strong>getters</strong>（計算屬性）與
      <strong>actions</strong>（方法），三者共同管理應用程式中的共享資料。
    </p>

    <UiTipCard type="tip" title="Options Store 語法">
      這是最常見的 Store 寫法，結構類似 Vue 2 的 Options API。State 必須是回傳初始值的函式，以確保
      SSR 環境下每個請求都有獨立的 state 副本。
    </UiTipCard>

    <h2 class="mt-8 mb-4">State — 狀態</h2>
    <UiLivePreview title="Counter State 演示">
      <div class="space-y-3">
        <p>
          目前計數：<span class="font-bold text-lg text-primary-600 dark:text-primary-400">{{
            counterStore.count
          }}</span>
        </p>
        <div class="flex gap-2">
          <button class="btn-primary" @click="counterStore.increment()">+1</button>
          <button class="btn-secondary" @click="counterStore.decrement()">-1</button>
          <button class="btn-secondary" @click="counterStore.resetCount()">重設</button>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">Getters — 衍生狀態</h2>
    <UiLivePreview title="Getters 演示">
      <div class="space-y-2">
        <p>count = {{ counterStore.count }}</p>
        <p>
          doubleCount（getter）= <span class="font-bold">{{ counterStore.doubleCount }}</span>
        </p>
        <p class="text-sm text-gray-500">Getters 類似 computed，會根據 state 自動快取並更新。</p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">Todo List — 綜合演示</h2>
    <UiLivePreview title="Todo List Store 演示">
      <div class="space-y-4">
        <div class="flex gap-2">
          <input
            v-model="newTodoText"
            placeholder="輸入待辦事項..."
            class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            @keyup.enter="handleAddTodo"
          />
          <button class="btn-primary" @click="handleAddTodo">新增</button>
        </div>

        <p class="text-sm text-gray-500">
          {{ counterStore.todoSummary }}｜待完成：{{ counterStore.pendingTodoCount }}
        </p>

        <ul v-if="counterStore.todoList.length" class="space-y-2">
          <li
            v-for="todo in counterStore.todoList"
            :key="todo.id"
            class="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
          >
            <input
              type="checkbox"
              :checked="todo.isDone"
              @change="counterStore.toggleTodo(todo.id)"
            />
            <span :class="todo.isDone ? 'line-through text-gray-400' : ''">{{ todo.text }}</span>
            <button
              class="ml-auto text-xs text-red-500 hover:text-red-700"
              @click="counterStore.removeTodo(todo.id)"
            >
              刪除
            </button>
          </li>
        </ul>
        <p v-else class="text-sm text-gray-400">尚無待辦事項，試著新增一筆吧！</p>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="storeCode" language="typescript" title="defineStore 範例" />

    <UiChapterNav
      prev-path="/pinia"
      prev-title="Pinia 章節總覽"
      next-path="/pinia/actions"
      next-title="Actions 與非同步"
    />
  </div>
</template>
