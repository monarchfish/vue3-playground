<script setup lang="ts">
interface TodoItem {
  id: number
  label: string
}

const todoWithKeyList = ref<TodoItem[]>([
  { id: 1, label: '任務 A' },
  { id: 2, label: '任務 B' },
  { id: 3, label: '任務 C' },
])

const todoWithoutKeyList = ref<TodoItem[]>([
  { id: 1, label: '任務 A' },
  { id: 2, label: '任務 B' },
  { id: 3, label: '任務 C' },
])

const inputWithKeyMap = ref<Record<number, string>>({ 1: '', 2: '', 3: '' })
const inputWithoutKeyMap = ref<Record<number, string>>({ 1: '', 2: '', 3: '' })

function handlePrependWithKey() {
  const newId = Date.now()
  todoWithKeyList.value.unshift({ id: newId, label: `新任務 ${newId.toString().slice(-4)}` })
  inputWithKeyMap.value[newId] = ''
}

function handlePrependWithoutKey() {
  const newId = Date.now()
  todoWithoutKeyList.value.unshift({ id: newId, label: `新任務 ${newId.toString().slice(-4)}` })
  inputWithoutKeyMap.value[newId] = ''
}

const keyCode = `<!-- ✅ Correct: use unique stable id as key -->
<li v-for="item in list" :key="item.id">
  <input v-model="item.text" />
  {{ item.label }}
</li>

<!-- ❌ Wrong: using index as key -->
<li v-for="(item, index) in list" :key="index">
  <input v-model="item.text" />
  {{ item.label }}
</li>

<!-- ❌ Wrong: no key at all -->
<li v-for="item in list">
  <input v-model="item.text" />
</li>

// Why index as key fails:
// List: [A, B, C] → prepend X → [X, A, B, C]
// With index key: key=0 was A, now X (reuses A's DOM/input state)
// With id key: A keeps key=1, X gets key=new (correct fresh mount)`
</script>

<template>
  <div>
    <h1 class="mb-2">Key 的作用</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      <code>key</code> 是 VNode 的唯一識別符，Diff 演算法透過 key 判斷節點是否可複用。錯誤的 key
      會導致 DOM 錯誤複用、輸入框狀態錯亂等問題。
    </p>

    <UiTipCard type="danger" title="面試常見陷阱">
      問：「v-for 的 key 可以用 index 嗎？」答：若列表會<strong>新增、刪除、排序</strong>，index
      作為 key 會導致錯誤複用。只有列表<strong>靜態不變</strong>時才勉強可用 index。
    </UiTipCard>

    <h2 class="mt-8 mb-4">正確使用 key（唯一 id）</h2>
    <UiLivePreview title="使用 item.id 作為 key">
      <div class="space-y-3">
        <button class="btn-primary" @click="handlePrependWithKey">在開頭插入新任務</button>
        <ul class="space-y-2">
          <li
            v-for="item in todoWithKeyList"
            :key="item.id"
            class="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <input
              v-model="inputWithKeyMap[item.id]"
              class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-900"
              :placeholder="`輸入 ${item.label}`"
            />
            <span class="text-xs text-gray-500 shrink-0">id: {{ item.id }}</span>
          </li>
        </ul>
        <p class="text-xs text-green-600 dark:text-green-400">✅ 插入後，各輸入框內容保持正確</p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">錯誤使用 key（index）</h2>
    <UiLivePreview title="使用 index 作為 key（錯誤示範）">
      <div class="space-y-3">
        <button class="btn-secondary" @click="handlePrependWithoutKey">在開頭插入新任務</button>
        <ul class="space-y-2">
          <li
            v-for="(item, index) in todoWithoutKeyList"
            :key="index"
            class="flex items-center gap-2 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <input
              v-model="inputWithoutKeyMap[item.id]"
              class="flex-1 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-900"
              :placeholder="`輸入 ${item.label}`"
            />
            <span class="text-xs text-gray-500 shrink-0">index: {{ index }}</span>
          </li>
        </ul>
        <p class="text-xs text-red-600 dark:text-red-400">
          ❌ 插入後，輸入框內容會「錯位」— DOM 被錯誤複用
        </p>
      </div>
    </UiLivePreview>

    <UiTipCard type="tip" title="Key 選擇原則" class="mt-6">
      使用資料的<strong>唯一且穩定</strong>的 id。不要用 random 值（每次 render 都變，導致全部
      unmount/remount）。不要用會隨排序改變的值。
    </UiTipCard>

    <UiCodeBlock :code="keyCode" language="vue" title="Key 正確與錯誤用法" />

    <UiChapterNav
      prev-path="/interview/diff-algorithm"
      prev-title="Diff 演算法"
      next-path="/interview/vue2-vs-vue3"
      next-title="Vue 2 vs Vue 3"
    />
  </div>
</template>
