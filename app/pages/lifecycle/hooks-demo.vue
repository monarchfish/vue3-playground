<script setup lang="ts">
import LifecycleHooksChild from './LifecycleHooksChild.vue'

interface HookLogEntry {
  id: number
  hook: string
  time: string
  phase: 'before' | 'mount' | 'update' | 'unmount'
}

const hookLogList = ref<HookLogEntry[]>([])
const logIdCounter = ref(0)
const childKey = ref(0)
const childCount = ref(0)
const isChildVisible = ref(true)

function addLog(hook: string, phase: HookLogEntry['phase']) {
  const now = new Date()
  const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}.${now.getMilliseconds().toString().padStart(3, '0')}`
  hookLogList.value.unshift({ id: logIdCounter.value++, hook, time, phase })
  if (hookLogList.value.length > 20) hookLogList.value.pop()
}

// Parent lifecycle hooks
onBeforeMount(() => addLog('onBeforeMount（父）', 'before'))
onMounted(() => addLog('onMounted（父）', 'mount'))
onBeforeUpdate(() => addLog('onBeforeUpdate（父）', 'update'))
onUpdated(() => addLog('onUpdated（父）', 'update'))
onBeforeUnmount(() => addLog('onBeforeUnmount（父）', 'unmount'))
onUnmounted(() => addLog('onUnmounted（父）', 'unmount'))

function handleClearLog() {
  hookLogList.value = []
}

function handleToggleChild() {
  isChildVisible.value = !isChildVisible.value
}

function handleRemountChild() {
  childKey.value++
}

function handleUpdateChild() {
  childCount.value++
}

const phaseColorMap: Record<HookLogEntry['phase'], string> = {
  before: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
  mount: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
  update: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300',
  unmount: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
}

const timelineStepList = [
  { hook: 'onBeforeMount', desc: 'DOM 掛載前，setup 執行完畢' },
  { hook: 'onMounted', desc: 'DOM 已掛載，可存取 DOM 元素' },
  { hook: 'onBeforeUpdate', desc: '響應式資料變更，DOM 更新前' },
  { hook: 'onUpdated', desc: 'DOM 已更新完畢' },
  { hook: 'onBeforeUnmount', desc: '元件卸載前，仍可使用實例' },
  { hook: 'onUnmounted', desc: '元件已卸載，清理副作用' },
]

const hooksCode = `// Nuxt 自動匯入生命週期鉤子，無需 import
onBeforeMount(() => {
  console.log('DOM 掛載前')
})

onMounted(() => {
  // Safe to access DOM elements
  console.log('DOM 已掛載')
})

onBeforeUpdate(() => {
  console.log('資料變更，DOM 更新前')
})

onUpdated(() => {
  console.log('DOM 已更新')
})

onBeforeUnmount(() => {
  console.log('元件即將卸載')
})

onUnmounted(() => {
  // Cleanup: remove event listeners, clear timers
  console.log('元件已卸載')
})`
</script>

<template>
  <div>
    <h1 class="mb-2">Lifecycle Hooks 演示</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      生命週期鉤子（Lifecycle
      Hooks）讓你在元件不同階段執行自訂邏輯。下方示範父元件的鉤子觸發時機，以及子元件的掛載與卸載。
    </p>

    <UiTipCard type="tip" title="常見用途">
      <code>onMounted</code>：初始化第三方函式庫、取得 DOM
      尺寸。<code>onUnmounted</code>：清除計時器、取消訂閱。<code>onUpdated</code>：注意避免在此修改響應式資料，可能導致無限迴圈。
    </UiTipCard>

    <h2 class="mt-8 mb-4">生命週期時間軸</h2>
    <div class="relative pl-6 border-l-2 border-primary-300 dark:border-primary-700 space-y-4 mb-8">
      <div v-for="(step, index) in timelineStepList" :key="step.hook" class="relative">
        <span
          class="absolute -left-[1.65rem] w-3 h-3 rounded-full bg-primary-500 ring-4 ring-white dark:ring-gray-950"
        />
        <div class="flex items-baseline gap-2">
          <code class="text-sm font-semibold text-primary-600 dark:text-primary-400">{{
            step.hook
          }}</code>
          <span class="text-xs text-gray-400">Step {{ index + 1 }}</span>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-0.5">{{ step.desc }}</p>
      </div>
    </div>

    <h2 class="mt-8 mb-4">互動演示</h2>
    <UiLivePreview title="子元件生命週期控制">
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <button class="btn-primary" @click="handleToggleChild">
            {{ isChildVisible ? '卸載子元件' : '掛載子元件' }}
          </button>
          <button class="btn-secondary" :disabled="!isChildVisible" @click="handleUpdateChild">
            更新子元件資料（count++）
          </button>
          <button class="btn-secondary" :disabled="!isChildVisible" @click="handleRemountChild">
            強制重新掛載（改 key）
          </button>
          <button class="btn-secondary" @click="handleClearLog">清除日誌</button>
        </div>

        <LifecycleHooksChild
          v-if="isChildVisible"
          :key="childKey"
          :count="childCount"
          @hook-fired="(hook: string, phase: HookLogEntry['phase']) => addLog(hook, phase)"
        />

        <div
          v-else
          class="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-500 text-center"
        >
          子元件已卸載 — 觀察 onBeforeUnmount / onUnmounted 日誌
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">觸發日誌</h2>
    <div
      class="bg-gray-900 dark:bg-gray-950 rounded-lg p-4 font-mono text-xs max-h-64 overflow-y-auto"
    >
      <div v-if="hookLogList.length === 0" class="text-gray-500">
        尚無日誌，請操作上方按鈕觸發生命週期
      </div>
      <div
        v-for="entry in hookLogList"
        :key="entry.id"
        class="flex items-center gap-3 py-1 text-gray-300"
      >
        <span class="text-gray-500 shrink-0">{{ entry.time }}</span>
        <span
          class="px-2 py-0.5 rounded text-[10px] font-medium shrink-0"
          :class="phaseColorMap[entry.phase]"
        >
          {{ entry.phase }}
        </span>
        <span>{{ entry.hook }}</span>
      </div>
    </div>

    <UiCodeBlock :code="hooksCode" language="typescript" title="Composition API 生命週期鉤子" />

    <UiChapterNav
      prev-path="/lifecycle"
      prev-title="CH3：生命週期"
      next-path="/lifecycle/next-tick"
      next-title="nextTick 應用"
    />
  </div>
</template>
