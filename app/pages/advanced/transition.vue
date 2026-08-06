<script setup lang="ts">
const isVisible = ref(true)
const todoList = ref([
  { id: 1, text: '學習 Vue 3' },
  { id: 2, text: '建立 Composable' },
  { id: 3, text: '掌握 Transition' },
])
const nextId = ref(4)

function handleToggleVisibility() {
  isVisible.value = !isVisible.value
}

function handleAddTodo() {
  todoList.value.unshift({ id: nextId.value++, text: `新任務 #${nextId.value - 1}` })
}

function handleRemoveTodo(id: number) {
  todoList.value = todoList.value.filter((item) => item.id !== id)
}

function handleShuffleList() {
  todoList.value = [...todoList.value].sort(() => Math.random() - 0.5)
}

const transitionCode = `<!-- Single element transition -->
<Transition name="fade">
  <p v-if="show">Hello</p>
</Transition>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>

<!-- List transition with TransitionGroup -->
<TransitionGroup name="list" tag="ul">
  <li v-for="item in items" :key="item.id">
    {{ item.text }}
  </li>
</TransitionGroup>

<style>
.list-enter-active, .list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from, .list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: transform 0.3s ease;
}
</style>

<!-- Built-in transitions -->
<Transition name="fade" mode="out-in">
  <component :is="currentTab" />
</Transition>`
</script>

<template>
  <div>
    <h1 class="mb-2">轉場動畫 | Transition</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Vue 的 <code>&lt;Transition&gt;</code> 與 <code>&lt;TransitionGroup&gt;</code> 元件讓進入/離開
      DOM 的元素擁有平滑的 CSS 動畫效果，無需手動管理 class。
    </p>

    <UiTipCard type="tip" title="Transition 命名 class">
      Vue 自動套用
      <code>-enter-from</code
      >、<code>-enter-active</code>、<code>-enter-to</code>、<code>-leave-from</code>、<code>-leave-active</code>、<code
        >-leave-to</code
      >
      六個 class。配合 CSS transition 即可實現動畫。
    </UiTipCard>

    <h2 class="mt-8 mb-4">Transition — 單一元素</h2>
    <UiLivePreview title="Fade 淡入淡出">
      <div class="space-y-3">
        <button class="btn-primary" @click="handleToggleVisibility">
          {{ isVisible ? '隱藏' : '顯示' }}
        </button>
        <Transition name="fade">
          <div
            v-if="isVisible"
            class="p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg"
          >
            <p class="text-sm">這個區塊有 fade 淡入淡出動畫</p>
          </div>
        </Transition>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">TransitionGroup — 列表動畫</h2>
    <UiLivePreview title="列表進入/離開/移動動畫">
      <div class="space-y-3">
        <div class="flex gap-2">
          <button class="btn-primary" @click="handleAddTodo">新增項目</button>
          <button class="btn-secondary" @click="handleShuffleList">隨機排序</button>
        </div>
        <TransitionGroup name="list" tag="ul" class="space-y-2">
          <li
            v-for="item in todoList"
            :key="item.id"
            class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <span class="text-sm">{{ item.text }}</span>
            <button
              class="text-xs text-red-500 hover:text-red-700"
              @click="handleRemoveTodo(item.id)"
            >
              移除
            </button>
          </li>
        </TransitionGroup>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="transitionCode" language="vue" title="Transition 用法範例" />

    <UiChapterNav
      prev-path="/advanced/suspense"
      prev-title="Suspense"
      next-path="/interview"
      next-title="CH5：面試題"
    />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.3s ease;
}

.list-leave-active {
  position: absolute;
  width: calc(100% - 2rem);
}
</style>
