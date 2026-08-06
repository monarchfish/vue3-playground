export default defineEventHandler((event) => {
  // Dynamic route params arrive as strings; coerce before querying the numeric ID store.
  const id = Number(getRouterParam(event, 'id'))

  if (Number.isNaN(id)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Bad Request',
      message: 'Invalid ID format',
    })
  }

  const isDeleted = deleteTodo(id)

  if (!isDeleted) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: `Todo with id ${id} not found`,
    })
  }

  // 204 No Content: H3/Nitro still expects a return value even when the body is empty.
  setResponseStatus(event, 204)
  return null
})
