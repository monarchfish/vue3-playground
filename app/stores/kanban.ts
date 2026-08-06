export interface KanbanCard {
  id: string
  title: string
  description: string
  /** Explicit sort index; re-normalized after every move to keep drag-and-drop order stable. */
  order: number
}

export interface KanbanColumn {
  id: string
  title: string
  cardList: KanbanCard[]
}

const DEFAULT_COLUMN_LIST: KanbanColumn[] = [
  {
    id: 'todo',
    title: '待辦',
    cardList: [
      { id: '1', title: '設計首頁版型', description: '完成 wireframe 與視覺稿', order: 0 },
      { id: '2', title: '撰寫 API 文件', description: 'RESTful API 規格說明', order: 1 },
    ],
  },
  {
    id: 'in-progress',
    title: '進行中',
    cardList: [
      { id: '3', title: '實作 Pinia Store', description: '建立 kanban 與 cart store', order: 0 },
    ],
  },
  {
    id: 'done',
    title: '已完成',
    cardList: [
      { id: '4', title: '專案初始化', description: 'Nuxt 3 + Tailwind 設定完成', order: 0 },
    ],
  },
]

function createCardId(): string {
  return `card-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

/**
 * Kanban board store for the projects/kanban demo.
 * Supports same-column reorder and cross-column drag-and-drop via explicit order indices.
 */
export const useKanbanStore = defineStore('kanban', () => {
  const columnList = ref<KanbanColumn[]>(structuredClone(DEFAULT_COLUMN_LIST))

  const totalCardCount = computed(() =>
    columnList.value.reduce((sum, column) => sum + column.cardList.length, 0),
  )

  function getColumnIndex(columnId: string): number {
    return columnList.value.findIndex((column) => column.id === columnId)
  }

  function sortCardList(cardList: KanbanCard[]): KanbanCard[] {
    return [...cardList].sort((a, b) => a.order - b.order)
  }

  function addCard(columnId: string, title: string, description = ''): void {
    const column = columnList.value.find((item) => item.id === columnId)
    if (!column) return

    const nextOrder = column.cardList.length
    column.cardList.push({
      id: createCardId(),
      title: title.trim(),
      description: description.trim(),
      order: nextOrder,
    })
  }

  function deleteCard(columnId: string, cardId: string): void {
    const column = columnList.value.find((item) => item.id === columnId)
    if (!column) return

    column.cardList = normalizeOrder(column.cardList.filter((card) => card.id !== cardId))
  }

  /** Reassigns contiguous order values after mutations to prevent gaps that break drag indices. */
  function normalizeOrder(cardList: KanbanCard[]): KanbanCard[] {
    const sortedList = sortCardList(cardList)
    sortedList.forEach((card, index) => {
      card.order = index
    })
    return sortedList
  }

  function moveCardToColumn(cardId: string, fromColumnId: string, toColumnId: string): void {
    if (fromColumnId === toColumnId) return

    const fromColumn = columnList.value.find((column) => column.id === fromColumnId)
    const toColumn = columnList.value.find((column) => column.id === toColumnId)
    if (!fromColumn || !toColumn) return

    const cardIndex = fromColumn.cardList.findIndex((card) => card.id === cardId)
    if (cardIndex === -1) return

    const [movedCard] = fromColumn.cardList.splice(cardIndex, 1)
    if (!movedCard) return

    toColumn.cardList.push(movedCard)

    fromColumn.cardList = normalizeOrder(fromColumn.cardList)
    toColumn.cardList = normalizeOrder(toColumn.cardList)
  }

  function moveCardToAdjacentColumn(
    columnId: string,
    cardId: string,
    direction: 'left' | 'right',
  ): void {
    const columnIndex = getColumnIndex(columnId)
    if (columnIndex === -1) return

    const targetIndex = direction === 'left' ? columnIndex - 1 : columnIndex + 1
    const targetColumn = columnList.value[targetIndex]
    if (!targetColumn) return

    moveCardToColumn(cardId, columnId, targetColumn.id)
  }

  /**
   * Reorder a card within the same column (supports drag-and-drop).
   */
  function reorderCardInColumn(columnId: string, fromIndex: number, toIndex: number): void {
    const column = columnList.value.find((item) => item.id === columnId)
    if (!column || fromIndex === toIndex) return

    const sortedList = sortCardList(column.cardList)
    const [movedCard] = sortedList.splice(fromIndex, 1)
    if (!movedCard) return

    sortedList.splice(toIndex, 0, movedCard)
    column.cardList = normalizeOrder(sortedList)
  }

  /**
   * Move a card from one column to another at a specific index (supports cross-column drag-and-drop).
   */
  function moveCardToColumnAtIndex(
    cardId: string,
    fromColumnId: string,
    toColumnId: string,
    toIndex: number,
  ): void {
    const fromColumn = columnList.value.find((column) => column.id === fromColumnId)
    const toColumn = columnList.value.find((column) => column.id === toColumnId)
    if (!fromColumn || !toColumn) return

    const cardIndex = fromColumn.cardList.findIndex((card) => card.id === cardId)
    if (cardIndex === -1) return

    const [movedCard] = fromColumn.cardList.splice(cardIndex, 1)
    if (!movedCard) return

    if (fromColumnId === toColumnId) {
      const sortedList = sortCardList(fromColumn.cardList)
      sortedList.splice(toIndex, 0, movedCard)
      fromColumn.cardList = normalizeOrder(sortedList)
      return
    }

    const targetList = sortCardList(toColumn.cardList)
    targetList.splice(toIndex, 0, movedCard)
    toColumn.cardList = normalizeOrder(targetList)
    fromColumn.cardList = normalizeOrder(fromColumn.cardList)
  }

  /** Restores the initial board; uses structuredClone to avoid sharing nested references. */
  function resetBoard(): void {
    columnList.value = structuredClone(DEFAULT_COLUMN_LIST)
  }

  return {
    columnList,
    totalCardCount,
    addCard,
    deleteCard,
    moveCardToColumn,
    moveCardToAdjacentColumn,
    reorderCardInColumn,
    moveCardToColumnAtIndex,
    resetBoard,
  }
})
