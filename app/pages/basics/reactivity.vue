<script setup lang="ts">
// ref - primitive values
const count = ref(0)
const message = ref('Hello')

// reactive - object values
const state = reactive({
  name: 'Vue 3',
  version: 3.5,
  features: ['Composition API', 'Teleport', 'Suspense'],
})

// toRefs - destructure reactive while keeping reactivity
const { name, version } = toRefs(state)

// shallowRef - only tracks .value reassignment
const shallowState = shallowRef({ count: 0 })

function handleIncrementRef() {
  count.value++
}

function handleIncrementReactive() {
  state.version += 0.1
}

function handleShallowUpdate() {
  // This won't trigger reactivity:
  shallowState.value.count++
}

function handleShallowReplace() {
  // This will trigger reactivity:
  shallowState.value = { count: shallowState.value.count + 1 }
}

const reactivityCode = `// Nuxt 自動匯入 ref、reactive、toRefs、shallowRef
// ref：用於原始型別（Primitive）
const count = ref(0)
count.value++ // 需透過 .value 存取

// reactive：用於物件型別（Object）
const state = reactive({
  name: 'Vue 3',
  version: 3.5,
})
state.version = 3.6 // 直接存取，不需 .value

// toRefs：解構 reactive 物件並保持響應式
const { name, version } = toRefs(state)

// shallowRef：只追蹤 .value 的重新賦值
const shallow = shallowRef({ count: 0 })
shallow.value = { count: 1 } // ✅ 觸發更新
shallow.value.count++         // ❌ 不會觸發更新`
</script>

<template>
  <div>
    <h1 class="mb-2">響應式 | Reactivity</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Vue 3 的響應式系統（Reactivity System）基於 ES6 Proxy，提供了 <code>ref</code>、<code
        >reactive</code
      >
      等 API 來建立響應式資料。
    </p>

    <UiTipCard type="info" title="ref vs reactive">
      <code>ref</code> 適用於原始型別（字串、數字、布林），也可包裝物件。<code>reactive</code>
      專用於物件型別。一般建議統一使用 <code>ref</code>，保持風格一致。
    </UiTipCard>

    <h2 class="mt-8 mb-4">ref — 響應式參照</h2>
    <UiLivePreview title="ref 演示">
      <div class="space-y-3">
        <p>
          計數器：<span class="font-bold text-lg">{{ count }}</span>
        </p>
        <button class="btn-primary" @click="handleIncrementRef">count.value++</button>
        <div class="mt-2">
          <label class="text-sm font-medium">message（ref）：</label>
          <input
            v-model="message"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
          <p class="mt-1 text-sm text-gray-500">值：{{ message }}</p>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">reactive — 響應式物件</h2>
    <UiLivePreview title="reactive 演示">
      <div class="space-y-3">
        <p>名稱：{{ state.name }}，版本：{{ state.version.toFixed(1) }}</p>
        <p>特性列表：{{ state.features.join(', ') }}</p>
        <button class="btn-primary" @click="handleIncrementReactive">version + 0.1</button>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">toRefs — 解構保持響應式</h2>
    <UiLivePreview title="toRefs 演示">
      <div class="space-y-2">
        <p>透過 toRefs 解構：name = {{ name }}，version = {{ version.toFixed(1) }}</p>
        <p class="text-sm text-gray-500">修改原始 reactive 物件後，toRefs 解構的值也會同步更新。</p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">shallowRef — 淺層響應式</h2>
    <UiLivePreview title="shallowRef 演示">
      <div class="space-y-3">
        <p>shallowState.value.count = {{ shallowState.count }}</p>
        <div class="flex gap-2">
          <button class="btn-secondary" @click="handleShallowUpdate">
            修改內部屬性（不觸發更新）
          </button>
          <button class="btn-primary" @click="handleShallowReplace">
            替換整個 .value（觸發更新）
          </button>
        </div>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="reactivityCode" language="typescript" title="響應式 API 範例" />

    <UiChapterNav
      prev-path="/basics/template-syntax"
      prev-title="模板語法"
      next-path="/basics/computed-watch"
      next-title="Computed & Watch"
    />
  </div>
</template>
