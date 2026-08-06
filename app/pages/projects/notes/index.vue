<script setup lang="ts">
interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

const noteList = useLocalStorage<Note[]>('vue3-playground-notes', [])

const searchKeyword = ref('')
const editingNoteId = ref<string | null>(null)
const isEditorOpen = ref(false)
const editorTitle = ref('')
const editorContent = ref('')
const previewMode = ref<'edit' | 'preview' | 'split'>('split')

const filteredNoteList = computed(() => {
  if (!searchKeyword.value.trim()) return noteList.value

  const keyword = searchKeyword.value.trim().toLowerCase()
  return noteList.value.filter(
    (note) =>
      note.title.toLowerCase().includes(keyword) || note.content.toLowerCase().includes(keyword),
  )
})

const { markdownBlockList } = useMarkdownPreview(editorContent)

function createNoteId(): string {
  return `note-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
}

function handleOpenCreate() {
  editingNoteId.value = null
  editorTitle.value = ''
  editorContent.value = ''
  isEditorOpen.value = true
}

function handleOpenEdit(note: Note) {
  editingNoteId.value = note.id
  editorTitle.value = note.title
  editorContent.value = note.content
  isEditorOpen.value = true
}

function handleSaveNote() {
  if (!editorTitle.value.trim()) return

  const now = new Date().toISOString()

  if (editingNoteId.value) {
    const index = noteList.value.findIndex((note) => note.id === editingNoteId.value)
    const existingNote = noteList.value[index]
    if (index !== -1 && existingNote) {
      noteList.value[index] = {
        ...existingNote,
        title: editorTitle.value.trim(),
        content: editorContent.value,
        updatedAt: now,
      }
    }
  } else {
    noteList.value.unshift({
      id: createNoteId(),
      title: editorTitle.value.trim(),
      content: editorContent.value,
      createdAt: now,
      updatedAt: now,
    })
  }

  isEditorOpen.value = false
}

function handleDeleteNote(noteId: string) {
  noteList.value = noteList.value.filter((note) => note.id !== noteId)
  if (editingNoteId.value === noteId) {
    isEditorOpen.value = false
  }
}

function formatDate(isoString: string): string {
  return new Date(isoString).toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between mb-8">
      <div>
        <h1 class="mb-2">筆記工具 | Notes</h1>
        <p class="text-gray-600 dark:text-gray-400">
          使用 VueUse <code>useStorage</code> 將筆記持久化至 localStorage，支援 Markdown
          預覽與搜尋。
        </p>
      </div>
      <button type="button" class="btn-primary" @click="handleOpenCreate">
        <Icon name="heroicons:plus" class="w-4 h-4 mr-1.5" />
        新增筆記
      </button>
    </div>

    <!-- Search -->
    <div class="section-card mb-6">
      <div class="relative">
        <Icon
          name="heroicons:magnifying-glass"
          class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400"
        />
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="搜尋筆記標題或內容..."
          class="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
        />
      </div>
      <p class="text-sm text-gray-500 mt-2">
        共 {{ noteList.length }} 則筆記
        <span v-if="searchKeyword">，符合 {{ filteredNoteList.length }} 則</span>
      </p>
    </div>

    <!-- Editor modal -->
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="isEditorOpen"
        class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
        @click.self="isEditorOpen = false"
      >
        <div
          class="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col"
        >
          <div
            class="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800"
          >
            <h2 class="text-lg font-semibold">
              {{ editingNoteId ? '編輯筆記' : '新增筆記' }}
            </h2>
            <div class="flex items-center gap-2">
              <div
                class="flex rounded-lg border border-gray-300 dark:border-gray-600 overflow-hidden text-xs"
              >
                <button
                  type="button"
                  class="px-3 py-1.5 transition-colors"
                  :class="
                    previewMode === 'edit'
                      ? 'bg-primary-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  "
                  @click="previewMode = 'edit'"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 transition-colors"
                  :class="
                    previewMode === 'split'
                      ? 'bg-primary-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  "
                  @click="previewMode = 'split'"
                >
                  分割
                </button>
                <button
                  type="button"
                  class="px-3 py-1.5 transition-colors"
                  :class="
                    previewMode === 'preview'
                      ? 'bg-primary-600 text-white'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  "
                  @click="previewMode = 'preview'"
                >
                  預覽
                </button>
              </div>
              <button
                type="button"
                class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                @click="isEditorOpen = false"
              >
                <Icon name="heroicons:x-mark" class="w-5 h-5" />
              </button>
            </div>
          </div>

          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            <input
              v-model="editorTitle"
              type="text"
              placeholder="筆記標題"
              class="w-full text-xl font-bold bg-transparent border-none outline-none placeholder:text-gray-400"
            />

            <div
              class="grid gap-4"
              :class="previewMode === 'split' ? 'md:grid-cols-2' : 'grid-cols-1'"
            >
              <textarea
                v-if="previewMode !== 'preview'"
                v-model="editorContent"
                rows="12"
                placeholder="支援 Markdown 語法：# 標題、**粗體**、*斜體*、- 列表、`code`"
                class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm font-mono resize-none"
              />
              <div
                v-if="previewMode !== 'edit'"
                class="px-4 py-3 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800/50 text-sm leading-relaxed prose-sm space-y-3"
              >
                <template v-for="(block, blockIndex) in markdownBlockList" :key="blockIndex">
                  <p v-if="block.type === 'placeholder'" class="text-gray-400">
                    <template
                      v-for="(segment, segmentIndex) in block.segmentList"
                      :key="segmentIndex"
                    >
                      {{ segment.content }}
                    </template>
                  </p>
                  <component
                    :is="`h${block.level}`"
                    v-else-if="block.type === 'heading'"
                    class="font-semibold"
                    :class="{
                      'text-2xl font-bold mt-4 mb-2': block.level === 1,
                      'text-xl font-semibold mt-4 mb-2': block.level === 2,
                      'text-lg font-semibold mt-4 mb-2': block.level === 3,
                    }"
                  >
                    <template
                      v-for="(segment, segmentIndex) in block.segmentList"
                      :key="segmentIndex"
                    >
                      <strong v-if="segment.type === 'strong'">{{ segment.content }}</strong>
                      <em v-else-if="segment.type === 'em'">{{ segment.content }}</em>
                      <code
                        v-else-if="segment.type === 'code'"
                        class="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono"
                      >
                        {{ segment.content }}
                      </code>
                      <template v-else>{{ segment.content }}</template>
                    </template>
                  </component>
                  <li v-else-if="block.type === 'list-item'" class="ml-4 list-disc">
                    <template
                      v-for="(segment, segmentIndex) in block.segmentList"
                      :key="segmentIndex"
                    >
                      <strong v-if="segment.type === 'strong'">{{ segment.content }}</strong>
                      <em v-else-if="segment.type === 'em'">{{ segment.content }}</em>
                      <code
                        v-else-if="segment.type === 'code'"
                        class="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono"
                      >
                        {{ segment.content }}
                      </code>
                      <template v-else>{{ segment.content }}</template>
                    </template>
                  </li>
                  <p v-else>
                    <template
                      v-for="(segment, segmentIndex) in block.segmentList"
                      :key="segmentIndex"
                    >
                      <strong v-if="segment.type === 'strong'">{{ segment.content }}</strong>
                      <em v-else-if="segment.type === 'em'">{{ segment.content }}</em>
                      <code
                        v-else-if="segment.type === 'code'"
                        class="px-1 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-sm font-mono"
                      >
                        {{ segment.content }}
                      </code>
                      <template v-else>{{ segment.content }}</template>
                    </template>
                  </p>
                </template>
              </div>
            </div>
          </div>

          <div
            class="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 dark:border-gray-800"
          >
            <button type="button" class="btn-secondary" @click="isEditorOpen = false">取消</button>
            <button
              type="button"
              class="btn-primary"
              :disabled="!editorTitle.trim()"
              @click="handleSaveNote"
            >
              儲存
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Note list -->
    <div v-if="filteredNoteList.length > 0" class="grid gap-4 sm:grid-cols-2">
      <div
        v-for="note in filteredNoteList"
        :key="note.id"
        class="section-card group hover:border-primary-300 dark:hover:border-primary-700 transition-colors cursor-pointer"
        @click="handleOpenEdit(note)"
      >
        <div class="flex items-start justify-between">
          <h3
            class="font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
          >
            {{ note.title }}
          </h3>
          <button
            type="button"
            class="p-1 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 opacity-0 group-hover:opacity-100 transition-all"
            title="刪除筆記"
            @click.stop="handleDeleteNote(note.id)"
          >
            <Icon name="heroicons:trash" class="w-4 h-4" />
          </button>
        </div>
        <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 line-clamp-3 whitespace-pre-wrap">
          {{ note.content || '（空白筆記）' }}
        </p>
        <p class="text-xs text-gray-400 mt-3">更新於 {{ formatDate(note.updatedAt) }}</p>
      </div>
    </div>

    <div v-else class="section-card text-center py-16">
      <Icon
        name="heroicons:document-text"
        class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600"
      />
      <h2 class="text-lg font-semibold mb-2">
        {{ searchKeyword ? '找不到符合的筆記' : '尚無筆記' }}
      </h2>
      <p class="text-gray-500 mb-6">
        {{ searchKeyword ? '試試其他關鍵字' : '點擊上方按鈕建立第一則筆記' }}
      </p>
      <button v-if="!searchKeyword" type="button" class="btn-primary" @click="handleOpenCreate">
        新增筆記
      </button>
    </div>

    <UiTipCard type="info" title="Markdown 語法提示" class="mt-8">
      支援 <code># 標題</code>、<code>**粗體**</code>、<code>*斜體*</code>、<code>- 列表</code
      >、<code>`行內程式碼`</code> 等基本語法。筆記會自動儲存至瀏覽器的 localStorage。
    </UiTipCard>

    <UiChapterNav
      prev-path="/projects/ecommerce"
      prev-title="電商 | E-Commerce"
      next-path="/projects"
      next-title="返回專案總覽"
    />
  </div>
</template>
