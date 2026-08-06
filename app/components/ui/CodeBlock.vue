<script setup lang="ts">
interface Props {
  /** Raw source text; rendered as plain monospace without syntax highlighting. */
  code: string
  /** Shown in the header when `title` is empty. */
  language?: string
  title?: string
}

const props = withDefaults(defineProps<Props>(), {
  language: 'typescript',
  title: '',
})

const isCopied = ref(false)

async function handleCopy() {
  await navigator.clipboard.writeText(props.code)
  isCopied.value = true
  // Brief feedback window; avoids persistent "copied" state without extra UI.
  setTimeout(() => {
    isCopied.value = false
  }, 2000)
}
</script>

<template>
  <div class="my-4 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
    <div
      class="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
    >
      <span class="text-xs font-mono text-gray-500 dark:text-gray-400">
        {{ title || language }}
      </span>
      <button
        class="text-xs px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-600 dark:text-gray-300"
        @click="handleCopy"
      >
        {{ isCopied ? '已複製!' : '複製' }}
      </button>
    </div>
    <pre
      class="p-4 overflow-x-auto bg-gray-50 dark:bg-gray-900 text-sm"
    ><code class="font-mono">{{ code }}</code></pre>
  </div>
</template>
