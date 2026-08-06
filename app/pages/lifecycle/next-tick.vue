<script setup lang="ts">
const message = ref('Hello')
const domTextContent = ref('')
const afterUpdateText = ref('')
const messageRef = ref<HTMLElement | null>(null)

function handleUpdateMessage() {
  message.value = `Updated at ${Date.now()}`

  // Immediately read DOM — may still show old value
  domTextContent.value = messageRef.value?.textContent ?? '(null)'

  // Read DOM after Vue finishes updating
  nextTick(() => {
    afterUpdateText.value = messageRef.value?.textContent ?? '(null)'
  })
}

const nextTickCode = `// Nuxt 自動匯入 ref、nextTick
const message = ref('Hello')
const el = ref<HTMLElement | null>(null)

function updateMessage() {
  message.value = 'Updated'

  // ❌ DOM 尚未更新，可能讀到舊值
  console.log(el.value?.textContent) // 'Hello'

  // ✅ 等待 DOM 更新完成後再讀取
  nextTick(() => {
    console.log(el.value?.textContent) // 'Updated'
  })
}

// nextTick 回傳 Promise，也可使用 await
async function updateAndFocus() {
  showInput.value = true
  await nextTick()
  inputRef.value?.focus()
}`
</script>

<template>
  <div>
    <h1 class="mb-2">nextTick 應用</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      <code>nextTick()</code> 會在 Vue 完成 DOM
      更新後執行回呼函式（Callback）。當你需要在資料變更後立即操作 DOM 時，必須使用它。
    </p>

    <UiTipCard type="warning" title="為什麼需要 nextTick？">
      Vue 的 DOM 更新是非同步（Asynchronous）批次處理的。修改響應式資料後，DOM
      不會立刻更新，而是在下一個「微任務（Microtask）」中批量刷新。因此直接讀取 DOM 可能得到舊值。
    </UiTipCard>

    <h2 class="mt-8 mb-4">同步 vs nextTick 對比</h2>
    <UiLivePreview title="DOM 更新時機演示">
      <div class="space-y-4">
        <p ref="messageRef" class="text-lg font-bold">message = {{ message }}</p>
        <button class="btn-primary" @click="handleUpdateMessage">更新 message</button>

        <div class="grid sm:grid-cols-2 gap-3 text-sm">
          <div
            class="p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
          >
            <p class="font-medium text-red-700 dark:text-red-300 mb-1">同步讀取 DOM</p>
            <p class="text-gray-600 dark:text-gray-400">
              textContent = 「{{ domTextContent || '（尚未更新）' }}」
            </p>
          </div>
          <div
            class="p-3 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800"
          >
            <p class="font-medium text-green-700 dark:text-green-300 mb-1">nextTick 後讀取</p>
            <p class="text-gray-600 dark:text-gray-400">
              textContent = 「{{ afterUpdateText || '（尚未更新）' }}」
            </p>
          </div>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">常見使用場景</h2>
    <UiTipCard type="info" title="典型場景">
      <ul class="list-disc list-inside space-y-1 text-sm">
        <li>條件渲染後自動聚焦輸入框（<code>v-if</code> 顯示後 <code>input.focus()</code>）</li>
        <li>取得更新後的 DOM 尺寸或位置</li>
        <li>在第三方 DOM 函式庫初始化前，確保 DOM 已就緒</li>
        <li>整合非 Vue 的 DOM 操作邏輯</li>
      </ul>
    </UiTipCard>

    <UiCodeBlock :code="nextTickCode" language="typescript" title="nextTick 用法範例" />

    <UiChapterNav
      prev-path="/lifecycle/hooks-demo"
      prev-title="Lifecycle Hooks 演示"
      next-path="/lifecycle/error-handling"
      next-title="錯誤處理 | Error Handling"
    />
  </div>
</template>
