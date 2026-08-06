/** Local todo item for the in-memory counter demo (not backed by an API). */
export interface TodoItem {
  id: number
  text: string
  isDone: boolean
}

/**
 * Basic counter and todo store (Option Store).
 * Intentionally uses the Options API style to contrast with Setup Stores elsewhere in this folder.
 */
export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
    todoList: [] as TodoItem[],
    nextTodoId: 1,
    isLoading: false,
  }),

  getters: {
    doubleCount: (state) => state.count * 2,

    completedTodoList: (state) => state.todoList.filter((todo) => todo.isDone),

    pendingTodoList: (state) => state.todoList.filter((todo) => !todo.isDone),

    completedTodoCount(): number {
      return this.completedTodoList.length
    },

    pendingTodoCount(): number {
      return this.pendingTodoList.length
    },

    todoSummary(): string {
      const total = this.todoList.length
      const done = this.completedTodoCount
      return `${done} / ${total} 已完成`
    },
  },

  actions: {
    increment(amount = 1) {
      this.count += amount
    },

    decrement(amount = 1) {
      this.count -= amount
    },

    resetCount() {
      this.count = 0
    },

    addTodo(text: string) {
      const trimmedText = text.trim()
      if (!trimmedText) return

      this.todoList.push({
        id: this.nextTodoId++,
        text: trimmedText,
        isDone: false,
      })
    },

    toggleTodo(todoId: number) {
      const todo = this.todoList.find((item) => item.id === todoId)
      if (todo) {
        todo.isDone = !todo.isDone
      }
    },

    removeTodo(todoId: number) {
      this.todoList = this.todoList.filter((item) => item.id !== todoId)
    },

    /** Simulates an async fetch to demonstrate loading state in the Pinia basics chapter. */
    async fetchRandomCount() {
      this.isLoading = true
      try {
        await new Promise((resolve) => setTimeout(resolve, 800))
        this.count = Math.floor(Math.random() * 100)
      } finally {
        this.isLoading = false
      }
    },
  },
})
