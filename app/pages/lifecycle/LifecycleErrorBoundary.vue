<script setup lang="ts">
const emit = defineEmits<{
  errorCaptured: [error: unknown]
  retry: []
}>()

const hasError = ref(false)
const errorMessage = ref('')

onErrorCaptured((err) => {
  hasError.value = true
  errorMessage.value = err instanceof Error ? err.message : String(err)
  emit('errorCaptured', err)
  return false
})

function handleRetry() {
  hasError.value = false
  errorMessage.value = ''
  emit('retry')
}
</script>

<template>
  <div class="p-4 border-2 border-dashed border-primary-300 dark:border-primary-700 rounded-lg">
    <p class="text-xs text-primary-600 dark:text-primary-400 font-medium mb-2">
      LifecycleErrorBoundary 錯誤邊界
    </p>

    <div
      v-if="hasError"
      class="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg"
    >
      <p class="text-sm font-medium text-red-700 dark:text-red-300">⚠️ 捕捉到子元件錯誤</p>
      <p class="text-xs text-red-600 dark:text-red-400 mt-1">{{ errorMessage }}</p>
      <button class="btn-secondary mt-2 text-xs" @click="handleRetry">重試（清除錯誤狀態）</button>
    </div>

    <slot v-else />
  </div>
</template>
