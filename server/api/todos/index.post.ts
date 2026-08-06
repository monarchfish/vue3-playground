export default defineEventHandler(async (event) => {
  const body = await readBody<CreateTodoPayload>(event)

  if (!body.title?.trim()) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Validation Error',
      message: 'Title is required',
    })
  }

  const todo = createTodo({ title: body.title.trim() })

  // REST convention: newly created resources respond with 201 Created.
  setResponseStatus(event, 201)
  return todo
})
