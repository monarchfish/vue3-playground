<script setup lang="ts">
const renderCount = ref(0)
const renderTag = ref<'div' | 'span' | 'p'>('div')
const renderMessage = ref('Hello from render function!')

const DynamicRenderComponent = defineComponent({
  props: {
    count: { type: Number, required: true },
    tag: { type: String as () => 'div' | 'span' | 'p', default: 'div' },
    message: { type: String, required: true },
  },
  setup(props) {
    return () =>
      h(
        props.tag,
        {
          class: 'p-4 border-2 border-dashed border-accent-300 dark:border-accent-700 rounded-lg',
          onClick: () => {
            renderCount.value++
          },
        },
        [
          h(
            'p',
            { class: 'text-xs text-accent-600 dark:text-accent-400 font-medium mb-1' },
            'Render Function 元件',
          ),
          h('p', { class: 'text-sm' }, props.message),
          h('p', { class: 'text-sm font-bold mt-1' }, `count: ${props.count}`),
          h('p', { class: 'text-xs text-gray-500 mt-1' }, '點擊此區域可 +1'),
        ],
      )
  },
})

const renderCode = `// Nuxt 自動匯入 h、defineComponent
// h(type, props, children)
const vnode = h('div', { class: 'container' }, [
  h('h1', 'Title'),
  h('p', 'Content'),
])

// Functional component with render function
const MyComponent = defineComponent({
  props: { message: String },
  setup(props) {
    return () => h('div', [
      h('p', props.message),
      h('button', {
        onClick: () => console.log('clicked'),
      }, 'Click'),
    ])
  },
})

// h() shorthand for components
h(MyComponent, { message: 'Hello' })

// When to use render functions:
// - Dynamic tag names (h(tag, ...))
// - Complex conditional rendering logic
// - JSX/TSX in Vue (compiles to h())`
</script>

<template>
  <div>
    <h1 class="mb-2">Render Function</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Render Function 使用
      <code>h()</code>
      函式建立虛擬節點（VNode），等同於模板編譯後的結果。適用於需要動態標籤、複雜條件渲染或 JSX/TSX
      的場景。
    </p>

    <UiTipCard type="info" title="h() 函式簽名">
      <code>h(type, props?, children?)</code> — <code>type</code> 可以是 HTML 標籤字串或元件；<code
        >props</code
      >
      包含 attributes、events、directives；<code>children</code> 可以是字串、VNode 陣列或 slot
      函式。
    </UiTipCard>

    <h2 class="mt-8 mb-4">動態標籤渲染</h2>
    <UiLivePreview title="h() Render Function 演示">
      <div class="space-y-4">
        <div class="flex flex-wrap gap-3 items-center">
          <label class="text-sm">
            動態標籤：
            <select
              v-model="renderTag"
              class="ml-2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
            >
              <option value="div">div</option>
              <option value="span">span</option>
              <option value="p">p</option>
            </select>
          </label>
          <input
            v-model="renderMessage"
            class="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            placeholder="訊息文字"
          />
        </div>

        <DynamicRenderComponent :count="renderCount" :tag="renderTag" :message="renderMessage" />
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">模板 vs Render Function</h2>
    <UiTipCard type="tip" title="選擇建議">
      大多數場景使用模板即可，可讀性更好。Render Function 適合：動態 tag（<code
        >&lt;component :is="tag"&gt;</code
      >
      可替代）、高度動態的 props/children 組合、或使用 JSX/TSX 寫法。
    </UiTipCard>

    <UiCodeBlock :code="renderCode" language="typescript" title="Render Function 範例" />

    <UiChapterNav
      prev-path="/advanced/directives"
      prev-title="自訂指令 | Directives"
      next-path="/advanced/teleport"
      next-title="Teleport"
    />
  </div>
</template>
