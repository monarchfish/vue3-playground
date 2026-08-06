<script setup lang="ts">
const message = ref('Hello Vue 3!')
const rawHtml = ref('<span style="color: red;">這是紅色文字</span>')
const dynamicId = ref('my-element')
const isActive = ref(true)
const objectStyle = reactive({
  color: 'blue',
  fontSize: '16px',
})

const templateSyntaxCode = `<template>
  <!-- 文字插值（Mustache 語法） -->
  <p>{{ message }}</p>

  <!-- JavaScript 表達式 -->
  <p>{{ message.split('').reverse().join('') }}</p>

  <!-- 原始 HTML（v-html） -->
  <p v-html="rawHtml"></p>

  <!-- 屬性綁定（v-bind） -->
  <div :id="dynamicId">動態 ID</div>

  <!-- Class 綁定 -->
  <div :class="{ active: isActive }">條件 Class</div>

  <!-- Style 綁定 -->
  <div :style="objectStyle">物件 Style</div>
</template>`
</script>

<template>
  <div>
    <h1 class="mb-2">模板語法 | Template Syntax</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Vue 使用基於 HTML 的模板語法，允許你宣告式地將 DOM 綁定到底層元件的資料。
    </p>

    <UiTipCard type="info" title="核心概念">
      模板語法包含：文字插值（Interpolation）、指令（Directives）、屬性綁定（Attribute Binding）等。
    </UiTipCard>

    <h2 class="mt-8 mb-4">文字插值（Text Interpolation）</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      最基本的資料綁定形式是「Mustache」語法（雙大括號）：
    </p>

    <UiLivePreview title="即時演示">
      <div class="space-y-3">
        <div>
          <label class="text-sm font-medium">修改訊息：</label>
          <input
            v-model="message"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
        </div>
        <p class="text-lg">{{ message }}</p>
        <p class="text-sm text-gray-500">反轉：{{ message.split('').reverse().join('') }}</p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">原始 HTML（v-html）</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      雙大括號會將資料解釋為純文字。若要輸出真正的 HTML，需使用 <code>v-html</code> 指令。
    </p>

    <UiLivePreview title="v-html 演示">
      <div class="space-y-2">
        <p>純文字輸出：{{ rawHtml }}</p>
        <p>HTML 輸出：<span v-html="rawHtml" /></p>
      </div>
    </UiLivePreview>

    <UiTipCard type="warning" title="安全提醒">
      在網站上動態渲染任意 HTML 非常危險，容易導致 XSS 攻擊。只對可信的內容使用
      v-html，絕不用於使用者提供的內容。
    </UiTipCard>

    <h2 class="mt-8 mb-4">屬性綁定（Attribute Binding）</h2>
    <p class="text-gray-600 dark:text-gray-400 mb-4">
      使用 <code>v-bind</code>（簡寫 <code>:</code>）可動態綁定 HTML 屬性：
    </p>

    <UiLivePreview title="屬性綁定演示">
      <div class="space-y-3">
        <div>
          <label class="text-sm font-medium">動態 ID：</label>
          <input
            v-model="dynamicId"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
        </div>
        <div :id="dynamicId" class="p-3 bg-gray-100 dark:bg-gray-800 rounded">
          這個元素的 id 是：「{{ dynamicId }}」
        </div>

        <div class="flex gap-2 items-center">
          <label class="text-sm font-medium">啟用 active class：</label>
          <input v-model="isActive" type="checkbox" />
        </div>
        <div
          class="p-3 rounded transition-colors"
          :class="
            isActive
              ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
              : 'bg-gray-100 dark:bg-gray-800'
          "
        >
          :class="{ active: isActive }" → 目前 {{ isActive ? '啟用' : '停用' }}
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">Style 綁定</h2>
    <UiLivePreview title="動態 Style">
      <div class="space-y-3">
        <div class="flex gap-4">
          <div>
            <label class="text-sm font-medium">顏色：</label>
            <input
              v-model="objectStyle.color"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            />
          </div>
          <div>
            <label class="text-sm font-medium">字型大小：</label>
            <input
              v-model="objectStyle.fontSize"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            />
          </div>
        </div>
        <p :style="objectStyle">這段文字的樣式會動態改變</p>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="templateSyntaxCode" language="vue" title="完整範例程式碼" />

    <UiChapterNav
      prev-path="/basics"
      prev-title="章節總覽"
      next-path="/basics/reactivity"
      next-title="響應式 | Reactivity"
    />
  </div>
</template>
