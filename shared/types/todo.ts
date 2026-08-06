/**
 * Todo entity shared between server routes (`server/api/todos/`) and client stores.
 * Keeping types here ensures request/response shapes stay in sync across the boundary.
 */
export interface Todo {
  id: number
  title: string
  completed: boolean
  createdAt: string
  updatedAt: string
}

/** Body shape accepted by POST /api/todos. */
export interface CreateTodoPayload {
  title: string
}

/** Partial update payload for PUT /api/todos/:id — only provided fields are applied. */
export interface UpdateTodoPayload {
  title?: string
  completed?: boolean
}
