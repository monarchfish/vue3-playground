import type { Todo } from '~~/shared/types/todo'

/**
 * API-backed todo store for the data-fetching chapter.
 * Updates local state only after the server responds — no optimistic updates, so UI always reflects server truth.
 */
export const useTodoApiStore = defineStore('todo-api', () => {
  const todoList = ref<Todo[]>([])
  const isLoading = ref(false)
  const errorMessage = ref<string | null>(null)

  const completedTodoList = computed(() => todoList.value.filter((todo) => todo.completed))
  const pendingTodoList = computed(() => todoList.value.filter((todo) => !todo.completed))

  async function fetchTodoList(): Promise<void> {
    isLoading.value = true
    errorMessage.value = null

    try {
      todoList.value = await $fetch<Todo[]>('/api/todos')
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Failed to fetch todos'
    } finally {
      isLoading.value = false
    }
  }

  async function addTodo(title: string): Promise<Todo | null> {
    errorMessage.value = null

    try {
      const newTodo = await $fetch<Todo>('/api/todos', {
        method: 'POST',
        body: { title },
      })
      todoList.value.push(newTodo)
      return newTodo
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Failed to add todo'
      return null
    }
  }

  async function toggleTodo(id: number): Promise<void> {
    const todo = todoList.value.find((item) => item.id === id)
    if (!todo) return

    errorMessage.value = null

    try {
      const updatedTodo = await $fetch<Todo>(`/api/todos/${id}`, {
        method: 'PUT',
        body: { completed: !todo.completed },
      })
      const index = todoList.value.findIndex((item) => item.id === id)
      if (index !== -1) todoList.value[index] = updatedTodo
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Failed to update todo'
    }
  }

  async function removeTodo(id: number): Promise<void> {
    errorMessage.value = null

    try {
      await $fetch(`/api/todos/${id}`, { method: 'DELETE' })
      todoList.value = todoList.value.filter((item) => item.id !== id)
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Failed to delete todo'
    }
  }

  async function updateTodoTitle(id: number, title: string): Promise<void> {
    errorMessage.value = null

    try {
      const updatedTodo = await $fetch<Todo>(`/api/todos/${id}`, {
        method: 'PUT',
        body: { title },
      })
      const index = todoList.value.findIndex((item) => item.id === id)
      if (index !== -1) todoList.value[index] = updatedTodo
    } catch (error) {
      errorMessage.value = error instanceof Error ? error.message : 'Failed to update todo'
    }
  }

  return {
    todoList,
    isLoading,
    errorMessage,
    completedTodoList,
    pendingTodoList,
    fetchTodoList,
    addTodo,
    toggleTodo,
    removeTodo,
    updateTodoTitle,
  }
})
