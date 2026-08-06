<script setup lang="ts">
const props = defineProps<{
  shouldFail: boolean
}>()

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

await delay(1500)

if (props.shouldFail) {
  throw new Error('模擬載入失敗')
}

const data = { title: '非同步資料載入完成', timestamp: new Date().toLocaleTimeString() }
</script>

<template>
  <div class="p-4 border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg">
    <p class="text-xs text-green-600 dark:text-green-400 font-medium mb-1">
      AdvancedSuspenseChild（async setup）
    </p>
    <p class="text-sm font-medium">{{ data.title }}</p>
    <p class="text-xs text-gray-500 mt-1">載入完成時間：{{ data.timestamp }}</p>
  </div>
</template>
