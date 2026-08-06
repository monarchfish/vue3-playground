<script setup lang="ts">
import AdvancedSuspenseChild from './AdvancedSuspenseChild.vue'

const shouldFail = ref(false)
const reloadKey = ref(0)

function handleReload() {
  shouldFail.value = false
  reloadKey.value++
}

function handleReloadWithError() {
  shouldFail.value = true
  reloadKey.value++
}

/* eslint-disable no-useless-escape */
const suspenseCode = `<!-- Parent component -->
<template>
  <Suspense>
    <!-- Default slot: async component -->
    <AsyncUserProfile :user-id="1" />

    <!-- Fallback slot: loading state -->
    <template #fallback>
      <div class="loading-spinner">Loading...</div>
    </template>
  </Suspense>
</template>

<!-- Async child with async setup -->
<script setup lang="ts">
const props = defineProps<{ userId: number }>()

// Top-level await in setup makes component async
const user = await fetch(\`/api/users/\${props.userId}\`).then(r => r.json())
<\/script>

<template>
  <div>{{ user.name }}</div>
</template>

// Or use defineAsyncComponent
const AsyncComp = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
)`
/* eslint-enable no-useless-escape */
</script>

<template>
  <div>
    <h1 class="mb-2">Suspense</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      <code>&lt;Suspense&gt;</code> 用於協調非同步相依的元件樹，在 async setup 或 async
      元件載入完成前顯示 fallback 內容（載入狀態）。
    </p>

    <UiTipCard type="warning" title="實驗性質">
      Suspense 在 Vue 3 中仍為實驗性功能（Experimental），API 可能在未來版本調整。但已在 Nuxt 3
      等框架中廣泛使用。
    </UiTipCard>

    <h2 class="mt-8 mb-4">非同步元件載入</h2>
    <UiLivePreview title="Suspense 演示">
      <div class="space-y-4">
        <div class="flex gap-2">
          <button class="btn-primary" @click="handleReload">重新載入（成功）</button>
          <button class="btn-secondary" @click="handleReloadWithError">重新載入（模擬失敗）</button>
        </div>

        <Suspense>
          <AdvancedSuspenseChild :key="reloadKey" :should-fail="shouldFail" />

          <template #fallback>
            <div
              class="p-6 border-2 border-dashed border-yellow-300 dark:border-yellow-700 rounded-lg text-center"
            >
              <div
                class="inline-block w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mb-2"
              />
              <p class="text-sm text-yellow-700 dark:text-yellow-300">
                載入中...（Suspense fallback）
              </p>
            </div>
          </template>
        </Suspense>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">運作原理</h2>
    <UiTipCard type="info" title="Suspense 如何偵測非同步？">
      當子元件的 <code>setup()</code> 回傳 Promise（使用 top-level await），或元件是
      <code>defineAsyncComponent</code> 載入的，Suspense 會等待所有非同步相依完成後才渲染 default
      slot。
    </UiTipCard>

    <UiCodeBlock :code="suspenseCode" language="vue" title="Suspense 用法範例" />

    <UiChapterNav
      prev-path="/advanced/teleport"
      prev-title="Teleport"
      next-path="/advanced/transition"
      next-title="轉場動畫 | Transition"
    />
  </div>
</template>
