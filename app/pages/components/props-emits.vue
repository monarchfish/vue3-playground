<script setup lang="ts">
// Props demo - child component inline
const parentMessage = ref('來自父元件的訊息')
const parentCount = ref(0)

// Emits demo
const childEventLog = ref<string[]>([])

function handleChildEvent(payload: string) {
  childEventLog.value.unshift(`收到子元件事件：${payload}`)
  if (childEventLog.value.length > 5) childEventLog.value.pop()
}

const propsCode = `// 子元件定義 Props
interface Props {
  title: string
  count?: number
  isActive?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  count: 0,
  isActive: false,
})

// 子元件定義 Emits
const emit = defineEmits<{
  update: [value: string]
  delete: [id: number]
}>()

// 觸發事件
emit('update', 'new value')

// 父元件使用
// <ChildComponent
//   :title="parentTitle"
//   :count="parentCount"
//   @update="handleUpdate"
//   @delete="handleDelete"
// />`
</script>

<template>
  <div>
    <h1 class="mb-2">Props & Emits</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      <code>Props</code> 是父元件向子元件傳遞資料的方式；<code>Emits</code>
      是子元件向父元件發送事件通知的方式。這是 Vue 中最基本的元件溝通模式。
    </p>

    <UiTipCard type="info" title="單向資料流（One-Way Data Flow）">
      Props 遵循單向資料流原則：父元件的更新會向下傳遞到子元件，但反過來不行。子元件不應直接修改
      props，而應透過 emit 事件通知父元件。
    </UiTipCard>

    <h2 class="mt-8 mb-4">Props — 屬性傳遞</h2>
    <UiLivePreview title="Props 演示">
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium">父元件資料：</label>
          <input
            v-model="parentMessage"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
        </div>
        <div class="flex items-center gap-3">
          <span class="text-sm">父元件計數：{{ parentCount }}</span>
          <button class="btn-primary" @click="parentCount++">+1</button>
        </div>

        <!-- Simulated child component display -->
        <div class="p-4 border-2 border-dashed border-accent-300 dark:border-accent-700 rounded-lg">
          <p class="text-xs text-accent-600 dark:text-accent-400 font-medium mb-2">
            子元件（接收 Props）
          </p>
          <p>接收到的 title：「{{ parentMessage }}」</p>
          <p>接收到的 count：{{ parentCount }}</p>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">Emits — 事件發送</h2>
    <UiLivePreview title="Emits 演示">
      <div class="space-y-4">
        <!-- Simulated child component -->
        <div class="p-4 border-2 border-dashed border-accent-300 dark:border-accent-700 rounded-lg">
          <p class="text-xs text-accent-600 dark:text-accent-400 font-medium mb-2">
            子元件（發送 Events）
          </p>
          <div class="flex gap-2">
            <button class="btn-primary" @click="handleChildEvent('按鈕被點擊')">觸發事件</button>
            <button class="btn-secondary" @click="handleChildEvent(`時間戳: ${Date.now()}`)">
              發送資料
            </button>
          </div>
        </div>

        <div class="text-sm text-gray-600 dark:text-gray-400">
          <p class="font-medium mb-1">父元件收到的事件：</p>
          <ul class="space-y-0.5">
            <li v-for="(log, index) in childEventLog" :key="index">{{ log }}</li>
          </ul>
          <p v-if="childEventLog.length === 0" class="text-gray-400">（等待子元件觸發事件...）</p>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">Props 驗證與預設值</h2>
    <UiTipCard type="tip" title="TypeScript 型別定義">
      在 Vue 3 + TypeScript 中，建議使用 <code>defineProps&lt;Props&gt;()</code> 搭配
      <code>withDefaults</code> 定義 props 的型別與預設值。
    </UiTipCard>

    <UiCodeBlock :code="propsCode" language="typescript" title="Props & Emits 定義方式" />

    <UiChapterNav
      prev-path="/components"
      prev-title="章節總覽"
      next-path="/components/slots"
      next-title="插槽 | Slots"
    />
  </div>
</template>
