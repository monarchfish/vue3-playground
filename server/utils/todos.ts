import type { CreateTodoPayload, Todo, UpdateTodoPayload } from '~~/shared/types/todo'

/**
 * In-memory todo store for the learning playground.
 * Data resets on server restart and is not persisted across Nitro worker instances.
 */
let nextId = 4

const todoList: Todo[] = [
  {
    id: 1,
    title: '學習 Nuxt Server Routes',
    completed: true,
    createdAt: '2024-01-01T08:00:00.000Z',
    updatedAt: '2024-01-01T10:00:00.000Z',
  },
  {
    id: 2,
    title: '實作 useFetch 範例',
    completed: false,
    createdAt: '2024-01-02T09:00:00.000Z',
    updatedAt: '2024-01-02T09:00:00.000Z',
  },
  {
    id: 3,
    title: '完成 API → Store → Page 資料流',
    completed: false,
    createdAt: '2024-01-03T14:00:00.000Z',
    updatedAt: '2024-01-03T14:00:00.000Z',
  },
]

/**
 * Returns all todos. Exposes the live store array rather than a copy,
 * which keeps the demo simple but means callers must not mutate entries directly.
 */
export function getTodoList(): Todo[] {
  return todoList
}

/**
 * Looks up a single todo by numeric ID.
 */
export function getTodoById(id: number): Todo | undefined {
  return todoList.find((todo) => todo.id === id)
}

/**
 * Creates a todo with server-generated ID and timestamps.
 * New items always start as incomplete regardless of payload shape.
 */
export function createTodo(payload: CreateTodoPayload): Todo {
  const now = new Date().toISOString()
  const newTodo: Todo = {
    id: nextId++,
    title: payload.title,
    completed: false,
    createdAt: now,
    updatedAt: now,
  }
  todoList.push(newTodo)
  return newTodo
}

/**
 * Applies a partial update to an existing todo.
 * Returns null when the ID does not exist instead of throwing, so route handlers can map it to 404.
 */
export function updateTodo(id: number, payload: UpdateTodoPayload): Todo | null {
  const todo = todoList.find((item) => item.id === id)
  if (!todo) return null

  if (payload.title !== undefined) todo.title = payload.title
  if (payload.completed !== undefined) todo.completed = payload.completed
  todo.updatedAt = new Date().toISOString()
  return todo
}

/**
 * Removes a todo by ID.
 * Returns false when the ID does not exist so callers can distinguish missing resources from success.
 */
export function deleteTodo(id: number): boolean {
  const index = todoList.findIndex((item) => item.id === id)
  if (index === -1) return false
  todoList.splice(index, 1)
  return true
}
