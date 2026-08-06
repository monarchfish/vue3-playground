<script setup lang="ts">
interface Props {
  count: number
}

defineProps<Props>()

const emit = defineEmits<{
  hookFired: [hook: string, phase: 'before' | 'mount' | 'update' | 'unmount']
}>()

onBeforeMount(() => emit('hookFired', 'onBeforeMount（子）', 'before'))
onMounted(() => emit('hookFired', 'onMounted（子）', 'mount'))
onBeforeUpdate(() => emit('hookFired', 'onBeforeUpdate（子）', 'update'))
onUpdated(() => emit('hookFired', 'onUpdated（子）', 'update'))
onBeforeUnmount(() => emit('hookFired', 'onBeforeUnmount（子）', 'unmount'))
onUnmounted(() => emit('hookFired', 'onUnmounted（子）', 'unmount'))
</script>

<template>
  <div class="p-4 border-2 border-dashed border-accent-300 dark:border-accent-700 rounded-lg">
    <p class="text-xs text-accent-600 dark:text-accent-400 font-medium mb-2">
      LifecycleHooksChild 子元件
    </p>
    <p class="text-sm">
      count = <span class="font-bold">{{ count }}</span>
    </p>
    <p class="text-xs text-gray-500 mt-1">修改 count 或卸載此元件以觀察生命週期鉤子</p>
  </div>
</template>
