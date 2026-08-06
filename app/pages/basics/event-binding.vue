<script setup lang="ts">
const clickCount = ref(0)
const eventLog = ref<string[]>([])

function handleClick(event: MouseEvent) {
  clickCount.value++
  eventLog.value.unshift(`Click #${clickCount.value} at (${event.clientX}, ${event.clientY})`)
  if (eventLog.value.length > 5) eventLog.value.pop()
}

// Modifiers demo
const modifierLog = ref<string[]>([])

function logModifier(modifier: string) {
  modifierLog.value.unshift(modifier)
  if (modifierLog.value.length > 5) modifierLog.value.pop()
}

// Key modifiers
const keyLog = ref<string[]>([])

function handleKey(event: KeyboardEvent) {
  keyLog.value.unshift(`按下：${event.key}`)
  if (keyLog.value.length > 5) keyLog.value.pop()
}

// Inline handler vs Method handler
const inlineCount = ref(0)

const eventCode = `<template>
  <!-- 方法處理器（Method Handler） -->
  <button @click="handleClick">點擊</button>

  <!-- 行內處理器（Inline Handler） -->
  <button @click="count++">+1</button>

  <!-- 事件修飾符 -->
  <form @submit.prevent="handleSubmit">...</form>
  <div @click.stop="handleClick">阻止冒泡</div>
  <div @click.once="handleOnce">只觸發一次</div>
  <input @keyup.enter="handleEnter">

  <!-- 存取原始 DOM 事件 -->
  <button @click="handleClick($event)">帶事件物件</button>
</template>`
</script>

<template>
  <div>
    <h1 class="mb-2">事件處理 | Event Handling</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      使用 <code>v-on</code>（簡寫 <code>@</code>）指令來監聽 DOM 事件並執行 JavaScript 程式碼。
    </p>

    <h2 class="mt-8 mb-4">方法處理器（Method Handler）</h2>
    <UiLivePreview title="點擊事件">
      <div class="space-y-3">
        <button class="btn-primary" @click="handleClick">點擊我（已點 {{ clickCount }} 次）</button>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          <p class="font-medium mb-1">事件紀錄：</p>
          <ul class="space-y-0.5">
            <li v-for="(log, index) in eventLog" :key="index">{{ log }}</li>
          </ul>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">行內處理器（Inline Handler）</h2>
    <UiLivePreview title="行內表達式">
      <div class="flex items-center gap-3">
        <button class="btn-secondary" @click="inlineCount--">-1</button>
        <span class="font-bold text-lg w-12 text-center">{{ inlineCount }}</span>
        <button class="btn-primary" @click="inlineCount++">+1</button>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">事件修飾符（Event Modifiers）</h2>
    <UiTipCard type="info" title="常用修飾符">
      <code>.stop</code> 阻止冒泡、<code>.prevent</code> 阻止預設行為、<code>.once</code>
      只觸發一次、<code>.self</code> 只在事件從元素本身觸發時才執行。
    </UiTipCard>

    <UiLivePreview title="修飾符演示">
      <div class="space-y-3">
        <div
          class="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800"
          @click="logModifier('外層 div 被點擊（冒泡）')"
        >
          <p class="text-sm text-yellow-700 dark:text-yellow-300 mb-2">外層 div（監聽 click）</p>
          <button class="btn-secondary" @click.stop="logModifier('.stop — 阻止冒泡，外層不會觸發')">
            @click.stop
          </button>
        </div>

        <div class="text-sm text-gray-600 dark:text-gray-400">
          <p class="font-medium mb-1">修飾符紀錄：</p>
          <ul class="space-y-0.5">
            <li v-for="(log, index) in modifierLog" :key="index">{{ log }}</li>
          </ul>
          <p v-if="modifierLog.length === 0" class="text-gray-400">（尚無紀錄）</p>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">按鍵修飾符（Key Modifiers）</h2>
    <UiLivePreview title="鍵盤事件">
      <div class="space-y-3">
        <input
          class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          placeholder="在此輸入，觀察鍵盤事件..."
          @keyup="handleKey"
        />
        <div class="text-sm text-gray-600 dark:text-gray-400">
          <ul class="space-y-0.5">
            <li v-for="(log, index) in keyLog" :key="index">{{ log }}</li>
          </ul>
        </div>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="eventCode" language="vue" title="事件處理語法" />

    <UiChapterNav
      prev-path="/basics/conditional-loop"
      prev-title="條件與迴圈"
      next-path="/basics/form-binding"
      next-title="表單綁定"
    />
  </div>
</template>
