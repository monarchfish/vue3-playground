<script setup lang="ts">
import LifecycleErrorBoundary from './LifecycleErrorBoundary.vue'
import LifecycleErrorChild from './LifecycleErrorChild.vue'

const shouldThrow = ref(false)
const childKey = ref(0)
const errorLogList = ref<string[]>([])
const isBoundaryActive = ref(true)

function handleTriggerError() {
  shouldThrow.value = true
}

function handleResetError() {
  shouldThrow.value = false
  childKey.value++
}

function handleClearLog() {
  errorLogList.value = []
}

function handleErrorCaptured(error: unknown) {
  const message = error instanceof Error ? error.message : String(error)
  errorLogList.value.unshift(`[onErrorCaptured] ${message}`)
  if (errorLogList.value.length > 10) errorLogList.value.pop()
  return false // prevent propagation to parent
}

/* eslint-disable no-useless-escape */
const errorCode = `// Error Boundary parent component
<script setup lang="ts">
const errorLog = ref<string | null>(null)

onErrorCaptured((err, instance, info) => {
  errorLog.value = \`\${err.message} (during \${info})\`
  // Return false to stop propagation
  return false
})
<\/script>

<template>
  <div v-if="errorLog" class="error-banner">
    子元件發生錯誤：{{ errorLog }}
    <button @click="errorLog = null">重試</button>
  </div>
  <ChildComponent v-else />
</template>

// app.config.errorHandler — global error handler
app.config.errorHandler = (err, instance, info) => {
  console.error('Global error:', err, info)
  // Send to monitoring service
}`
/* eslint-enable no-useless-escape */
</script>

<template>
  <div>
    <h1 class="mb-2">錯誤處理 | Error Handling</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Vue 3 提供 <code>onErrorCaptured</code> 鉤子來捕捉子元件樹中的錯誤，類似 React
      的錯誤邊界（Error Boundary）。搭配全域的
      <code>app.config.errorHandler</code> 可建立完整的錯誤處理策略。
    </p>

    <UiTipCard type="danger" title="onErrorCaptured 的限制">
      無法捕捉以下錯誤：事件處理器中的錯誤、非同步回呼（如
      <code>setTimeout</code>）、伺服器端渲染（SSR）、元件自身的 setup 錯誤。這些需透過
      <code>try/catch</code> 或全域處理器處理。
    </UiTipCard>

    <h2 class="mt-8 mb-4">錯誤邊界演示</h2>
    <UiLivePreview title="onErrorCaptured 錯誤邊界">
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <button class="btn-primary" @click="handleTriggerError">觸發子元件錯誤</button>
          <button class="btn-secondary" @click="handleResetError">重置子元件</button>
          <button class="btn-secondary" @click="handleClearLog">清除日誌</button>
          <label class="flex items-center gap-2 text-sm">
            <input v-model="isBoundaryActive" type="checkbox" class="rounded" />
            啟用錯誤邊界
          </label>
        </div>

        <LifecycleErrorBoundary
          v-if="isBoundaryActive"
          @error-captured="handleErrorCaptured"
          @retry="handleResetError"
        >
          <LifecycleErrorChild :key="childKey" :should-throw="shouldThrow" />
        </LifecycleErrorBoundary>

        <LifecycleErrorChild v-else :key="childKey" :should-throw="shouldThrow" />

        <div
          class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 font-mono text-xs max-h-40 overflow-y-auto"
        >
          <div v-if="errorLogList.length === 0" class="text-gray-500">尚無錯誤日誌</div>
          <div v-for="(log, index) in errorLogList" :key="index" class="text-red-400 py-0.5">
            {{ log }}
          </div>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">錯誤處理層級</h2>
    <UiTipCard type="info" title="三層錯誤處理策略">
      <ol class="list-decimal list-inside space-y-2 text-sm">
        <li>
          <strong>元件層</strong>：<code>onErrorCaptured</code> 捕捉子元件渲染錯誤，顯示降級 UI
        </li>
        <li><strong>全域層</strong>：<code>app.config.errorHandler</code> 記錄所有未捕捉的錯誤</li>
        <li>
          <strong>非同步層</strong>：<code>try/catch</code> 或 <code>.catch()</code> 處理 Promise
          與事件處理器錯誤
        </li>
      </ol>
    </UiTipCard>

    <UiCodeBlock :code="errorCode" language="vue" title="錯誤處理範例" />

    <UiChapterNav
      prev-path="/lifecycle/next-tick"
      prev-title="nextTick 應用"
      next-path="/advanced"
      next-title="CH4：進階"
    />
  </div>
</template>
