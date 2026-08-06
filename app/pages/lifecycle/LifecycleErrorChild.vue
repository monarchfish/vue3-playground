<script setup lang="ts">
interface Props {
  shouldThrow: boolean
}

const props = defineProps<Props>()

const displayText = computed(() => {
  if (props.shouldThrow) {
    throw new Error('子元件渲染錯誤：模擬的 runtime error')
  }
  return '元件正常渲染中 ✅'
})
</script>

<template>
  <div class="p-4 border-2 border-dashed border-green-300 dark:border-green-700 rounded-lg">
    <p class="text-xs text-green-600 dark:text-green-400 font-medium mb-1">
      LifecycleErrorChild 子元件
    </p>
    <p class="text-sm">{{ displayText }}</p>
  </div>
</template>
