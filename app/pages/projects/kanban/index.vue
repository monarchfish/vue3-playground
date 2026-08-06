<script setup lang="ts">
definePageMeta({
  layout: 'fullscreen',
})

const kanbanStore = useKanbanStore()

const newCardTitle = ref('')
const newCardDescription = ref('')
const selectedColumnId = ref('todo')
const isAddFormOpen = ref(false)

function handleAddCard() {
  if (!newCardTitle.value.trim()) return
  kanbanStore.addCard(selectedColumnId.value, newCardTitle.value, newCardDescription.value)
  newCardTitle.value = ''
  newCardDescription.value = ''
  isAddFormOpen.value = false
}

function handleDeleteCard(columnId: string, cardId: string) {
  kanbanStore.deleteCard(columnId, cardId)
}

function handleMoveLeft(columnId: string, cardId: string) {
  kanbanStore.moveCardToAdjacentColumn(columnId, cardId, 'left')
}

function handleMoveRight(columnId: string, cardId: string) {
  kanbanStore.moveCardToAdjacentColumn(columnId, cardId, 'right')
}

function getSortedCardList(columnId: string) {
  const column = kanbanStore.columnList.find((item) => item.id === columnId)
  if (!column) return []

  return [...column.cardList].sort((leftCard, rightCard) => leftCard.order - rightCard.order)
}
</script>

<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-950 flex flex-col">
    <!-- Header -->
    <header
      class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4"
    >
      <div class="max-w-7xl mx-auto flex items-center justify-between">
        <div class="flex items-center gap-4">
          <NuxtLink
            to="/projects"
            class="text-gray-500 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
          >
            <Icon name="heroicons:arrow-left" class="w-5 h-5" />
          </NuxtLink>
          <div>
            <h1 class="text-xl font-bold">看板 | Kanban</h1>
            <p class="text-sm text-gray-500 dark:text-gray-400">
              共 {{ kanbanStore.totalCardCount }} 張卡片 · Pinia 狀態管理示範
            </p>
          </div>
        </div>
        <div class="flex items-center gap-3">
          <button type="button" class="btn-secondary" @click="kanbanStore.resetBoard()">
            重置看板
          </button>
          <button type="button" class="btn-primary" @click="isAddFormOpen = !isAddFormOpen">
            <Icon name="heroicons:plus" class="w-4 h-4 mr-1.5" />
            新增卡片
          </button>
        </div>
      </div>
    </header>

    <!-- Add card form -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="isAddFormOpen"
        class="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-6 py-4"
      >
        <form
          class="max-w-7xl mx-auto flex flex-wrap items-end gap-4"
          @submit.prevent="handleAddCard"
        >
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium mb-1">欄位</label>
            <select
              v-model="selectedColumnId"
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            >
              <option v-for="column in kanbanStore.columnList" :key="column.id" :value="column.id">
                {{ column.title }}
              </option>
            </select>
          </div>
          <div class="flex-1 min-w-[200px]">
            <label class="block text-sm font-medium mb-1">標題</label>
            <input
              v-model="newCardTitle"
              type="text"
              placeholder="輸入卡片標題..."
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            />
          </div>
          <div class="flex-[2] min-w-[240px]">
            <label class="block text-sm font-medium mb-1">描述（選填）</label>
            <input
              v-model="newCardDescription"
              type="text"
              placeholder="輸入描述..."
              class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            />
          </div>
          <button type="submit" class="btn-primary">確認新增</button>
        </form>
      </div>
    </Transition>

    <!-- Board -->
    <main class="flex-1 overflow-x-auto p-6">
      <div class="max-w-7xl mx-auto flex gap-6 min-h-[calc(100vh-12rem)]">
        <div
          v-for="(column, columnIndex) in kanbanStore.columnList"
          :key="column.id"
          class="flex-shrink-0 w-80 flex flex-col"
        >
          <div class="flex items-center justify-between mb-4">
            <h2
              class="text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400"
            >
              {{ column.title }}
            </h2>
            <span
              class="text-xs px-2 py-0.5 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
            >
              {{ column.cardList.length }}
            </span>
          </div>

          <div class="flex-1 space-y-3">
            <div
              v-for="card in getSortedCardList(column.id)"
              :key="card.id"
              class="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 class="font-medium text-gray-900 dark:text-gray-100">
                {{ card.title }}
              </h3>
              <p
                v-if="card.description"
                class="text-sm text-gray-500 dark:text-gray-400 mt-1.5 leading-relaxed"
              >
                {{ card.description }}
              </p>

              <div
                class="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 dark:border-gray-800"
              >
                <div class="flex gap-1">
                  <button
                    type="button"
                    :disabled="columnIndex === 0"
                    class="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="移至左欄"
                    @click="handleMoveLeft(column.id, card.id)"
                  >
                    <Icon name="heroicons:arrow-left" class="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    :disabled="columnIndex === kanbanStore.columnList.length - 1"
                    class="p-1.5 rounded-lg text-gray-400 hover:text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    title="移至右欄"
                    @click="handleMoveRight(column.id, card.id)"
                  >
                    <Icon name="heroicons:arrow-right" class="w-4 h-4" />
                  </button>
                </div>
                <button
                  type="button"
                  class="p-1.5 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                  title="刪除卡片"
                  @click="handleDeleteCard(column.id, card.id)"
                >
                  <Icon name="heroicons:trash" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div
              v-if="column.cardList.length === 0"
              class="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center text-sm text-gray-400"
            >
              尚無卡片
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Footer nav -->
    <footer
      class="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-6 py-4"
    >
      <div class="max-w-7xl mx-auto">
        <UiChapterNav
          prev-path="/projects"
          prev-title="專案總覽"
          next-path="/projects"
          next-title="返回專案總覽"
        />
      </div>
    </footer>
  </div>
</template>
