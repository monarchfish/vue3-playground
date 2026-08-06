<script setup lang="ts">
const slotCode = `<!-- 預設插槽 Default Slot -->
<template>
  <div class="card">
    <slot>預設內容（無內容傳入時顯示）</slot>
  </div>
</template>

<!-- 具名插槽 Named Slots -->
<template>
  <div class="layout">
    <header><slot name="header"></slot></header>
    <main><slot></slot></main>
    <footer><slot name="footer"></slot></footer>
  </div>
</template>

<!-- 使用具名插槽 -->
<MyLayout>
  <template #header>
    <h1>頁面標題</h1>
  </template>
  <p>主要內容</p>
  <template #footer>
    <p>頁尾資訊</p>
  </template>
</MyLayout>

<!-- 作用域插槽 Scoped Slots -->
<template>
  <ul>
    <li v-for="(item, index) in items" :key="item.id">
      <slot :item="item" :index="index">
        {{ item.name }}
      </slot>
    </li>
  </ul>
</template>

<!-- 使用作用域插槽 -->
<ItemList :items="items">
  <template #default="{ item, index }">
    <span>{{ index }}. {{ item.name }}</span>
  </template>
</ItemList>`

const itemList = ref([
  { id: 1, name: 'Vue.js', description: '漸進式框架' },
  { id: 2, name: 'React', description: '用於建構 UI 的函式庫' },
  { id: 3, name: 'Angular', description: '完整的應用框架' },
])
</script>

<template>
  <div>
    <h1 class="mb-2">插槽 | Slots</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      插槽（Slot）讓父元件可以向子元件傳遞模板內容，實現靈活的內容分發（Content Distribution）。
    </p>

    <h2 class="mt-8 mb-4">預設插槽（Default Slot）</h2>
    <UiLivePreview title="Default Slot 演示">
      <div class="space-y-3">
        <div class="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <p class="text-xs text-gray-500 mb-2">CardComponent:</p>
          <div class="bg-primary-50 dark:bg-primary-900/20 p-3 rounded">
            <slot>這裡是透過 slot 傳入的自訂內容</slot>
            <p class="text-primary-700 dark:text-primary-300">自訂卡片內容 — 可以放入任何 HTML</p>
          </div>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">具名插槽（Named Slots）</h2>
    <UiLivePreview title="Named Slots 演示">
      <div class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
        <div
          class="bg-accent-50 dark:bg-accent-900/20 p-3 border-b border-gray-200 dark:border-gray-700"
        >
          <p class="text-xs text-gray-500 mb-1">#header</p>
          <h3 class="font-bold text-accent-700 dark:text-accent-300">自訂標題區域</h3>
        </div>
        <div class="p-4">
          <p class="text-xs text-gray-500 mb-1">#default</p>
          <p>這是主要內容區塊，使用預設插槽。</p>
        </div>
        <div class="bg-gray-50 dark:bg-gray-800 p-3 border-t border-gray-200 dark:border-gray-700">
          <p class="text-xs text-gray-500 mb-1">#footer</p>
          <p class="text-sm text-gray-500">頁尾 — 版權所有 2024</p>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">作用域插槽（Scoped Slots）</h2>
    <UiTipCard type="info" title="核心概念">
      作用域插槽允許子元件將資料「回傳」給父元件的模板使用。子元件決定資料，父元件決定如何渲染。
    </UiTipCard>

    <UiLivePreview title="Scoped Slot 演示">
      <div class="space-y-2">
        <p class="text-sm font-medium mb-2">列表元件透過 scoped slot 暴露 item 資料：</p>
        <ul class="space-y-2">
          <li
            v-for="(item, index) in itemList"
            :key="item.id"
            class="flex items-center justify-between p-3 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg"
          >
            <div>
              <span class="font-medium">{{ index + 1 }}. {{ item.name }}</span>
              <span class="text-sm text-gray-500 ml-2">— {{ item.description }}</span>
            </div>
            <span
              class="text-xs px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded"
            >
              ID: {{ item.id }}
            </span>
          </li>
        </ul>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="slotCode" language="vue" title="各種 Slot 用法" />

    <UiChapterNav
      prev-path="/components/props-emits"
      prev-title="Props & Emits"
      next-path="/components/provide-inject"
      next-title="Provide / Inject"
    />
  </div>
</template>
