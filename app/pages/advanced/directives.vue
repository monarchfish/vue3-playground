<script setup lang="ts">
const isDropdownOpen = ref(false)
const tooltipText = ref('這是 Tooltip 提示文字')
const focusInputRef = ref<HTMLInputElement | null>(null)

// v-focus directive
const vFocus = {
  mounted(el: HTMLElement) {
    el.focus()
  },
}

// v-click-outside directive
const clickOutsideHandlerMap = new WeakMap<HTMLElement, (event: MouseEvent) => void>()

const vClickOutside = {
  mounted(el: HTMLElement, binding: { value: () => void }) {
    const handler = (event: MouseEvent) => {
      if (!el.contains(event.target as Node)) {
        binding.value()
      }
    }
    clickOutsideHandlerMap.set(el, handler)
    document.addEventListener('click', handler)
  },
  unmounted(el: HTMLElement) {
    const handler = clickOutsideHandlerMap.get(el)
    if (handler) {
      document.removeEventListener('click', handler)
      clickOutsideHandlerMap.delete(el)
    }
  },
}

// v-tooltip directive
const vTooltip = {
  mounted(el: HTMLElement, binding: { value: string }) {
    el.title = binding.value
    el.classList.add('cursor-help', 'border-b', 'border-dotted', 'border-gray-400')
  },
  updated(el: HTMLElement, binding: { value: string }) {
    el.title = binding.value
  },
}

function handleCloseDropdown() {
  isDropdownOpen.value = false
}

const directiveCode = `// v-focus: auto focus on mount
const vFocus = {
  mounted(el: HTMLElement) {
    el.focus()
  },
}

// v-click-outside: detect clicks outside element
const vClickOutside = {
  mounted(el, binding) {
    el._handler = (e) => {
      if (!el.contains(e.target)) binding.value()
    }
    document.addEventListener('click', el._handler)
  },
  unmounted(el) {
    document.removeEventListener('click', el._handler)
  },
}

// v-tooltip: simple native tooltip
const vTooltip = {
  mounted(el, binding) {
    el.title = binding.value
  },
  updated(el, binding) {
    el.title = binding.value
  },
}

// Usage in template
<input v-focus />
<div v-click-outside="closeMenu">...</div>
<span v-tooltip="'提示文字'">Hover me</span>

// Global registration
app.directive('focus', vFocus)`
</script>

<template>
  <div>
    <h1 class="mb-2">自訂指令 | Directives</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      自訂指令（Custom Directives）用於直接操作 DOM 元素。Vue 3 提供
      <code>mounted</code>、<code>updated</code>、<code>unmounted</code> 等生命週期，對應 Vue 2 的
      <code>bind</code>、<code>inserted</code>、<code>unbind</code>。
    </p>

    <UiTipCard type="warning" title="何時使用指令？">
      當你需要<strong>低階 DOM 操作</strong
      >且邏輯可重用時，指令是最佳選擇。若邏輯涉及響應式狀態管理，優先考慮 Composable 或元件。
    </UiTipCard>

    <h2 class="mt-8 mb-4">v-focus — 自動聚焦</h2>
    <UiLivePreview title="v-focus 演示">
      <div class="space-y-2">
        <p class="text-sm text-gray-500">此輸入框在掛載時自動聚焦（v-focus）</p>
        <input
          ref="focusInputRef"
          v-focus
          type="text"
          placeholder="自動聚焦的輸入框"
          class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
        />
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">v-click-outside — 點擊外部關閉</h2>
    <UiLivePreview title="v-click-outside 演示">
      <div class="relative inline-block">
        <button class="btn-primary" @click.stop="isDropdownOpen = !isDropdownOpen">
          {{ isDropdownOpen ? '關閉選單' : '開啟選單' }}
        </button>
        <div
          v-if="isDropdownOpen"
          v-click-outside="handleCloseDropdown"
          class="absolute top-full left-0 mt-2 w-48 p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
        >
          <p class="text-sm">點擊此區域外部會關閉選單</p>
          <ul class="mt-2 text-sm space-y-1">
            <li class="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
              選項 A
            </li>
            <li class="px-2 py-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded cursor-pointer">
              選項 B
            </li>
          </ul>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">v-tooltip — 提示文字</h2>
    <UiLivePreview title="v-tooltip 演示">
      <div class="space-y-3">
        <div>
          <label class="text-sm">自訂提示文字：</label>
          <input
            v-model="tooltipText"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
        </div>
        <p>
          將滑鼠移到
          <span v-tooltip="tooltipText" class="text-primary-600 dark:text-primary-400 font-medium"
            >這段文字</span
          >
          上查看 Tooltip
        </p>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="directiveCode" language="typescript" title="自訂指令範例" />

    <UiChapterNav
      prev-path="/advanced/composables"
      prev-title="組合式函式 | Composables"
      next-path="/advanced/render-function"
      next-title="Render Function"
    />
  </div>
</template>
