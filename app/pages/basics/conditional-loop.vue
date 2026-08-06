<script setup lang="ts">
// v-if / v-else-if / v-else
const showMode = ref<'a' | 'b' | 'c'>('a')

// v-show
const isVisible = ref(true)

// v-for
const fruitList = ref(['蘋果', '香蕉', '芒果', '草莓'])
const newFruit = ref('')

function handleAddFruit() {
  if (newFruit.value.trim()) {
    fruitList.value.push(newFruit.value.trim())
    newFruit.value = ''
  }
}

function handleRemoveFruit(index: number) {
  fruitList.value.splice(index, 1)
}

// v-for with object
const userProfile = reactive({
  名字: '小明',
  年齡: '25',
  職業: '前端工程師',
  城市: '台北',
})

const conditionalCode = `<!-- v-if / v-else-if / v-else -->
<div v-if="mode === 'a'">模式 A</div>
<div v-else-if="mode === 'b'">模式 B</div>
<div v-else>其他模式</div>

<!-- v-show（CSS display 切換，元素保留在 DOM） -->
<div v-show="isVisible">可見/隱藏</div>

<!-- v-for 搭配陣列 -->
<li v-for="(item, index) in list" :key="index">
  {{ item }}
</li>

<!-- v-for 搭配物件 -->
<li v-for="(value, key) in object" :key="key">
  {{ key }}: {{ value }}
</li>`
</script>

<template>
  <div>
    <h1 class="mb-2">條件與迴圈 | v-if & v-for</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Vue 提供 <code>v-if</code> / <code>v-show</code> 控制條件渲染，<code>v-for</code>
      處理列表渲染。
    </p>

    <h2 class="mt-8 mb-4">v-if / v-else-if / v-else</h2>
    <UiTipCard type="info" title="v-if vs v-show">
      <code>v-if</code> 是「真正的」條件渲染，會銷毀或重建元素。<code>v-show</code> 僅切換 CSS
      <code>display</code>，元素始終保留在 DOM 中。頻繁切換用 v-show，少切換用 v-if。
    </UiTipCard>

    <UiLivePreview title="v-if 演示">
      <div class="space-y-3">
        <div class="flex gap-2">
          <button
            v-for="mode in ['a', 'b', 'c'] as const"
            :key="mode"
            class="px-3 py-1 rounded text-sm transition-colors"
            :class="
              showMode === mode ? 'bg-primary-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
            "
            @click="showMode = mode"
          >
            模式 {{ mode.toUpperCase() }}
          </button>
        </div>
        <div class="p-4 rounded-lg bg-primary-50 dark:bg-primary-900/20">
          <p v-if="showMode === 'a'" class="text-primary-700 dark:text-primary-300">
            顯示模式 A 的內容 ✨
          </p>
          <p v-else-if="showMode === 'b'" class="text-accent-700 dark:text-accent-300">
            顯示模式 B 的內容 🚀
          </p>
          <p v-else class="text-yellow-700 dark:text-yellow-300">顯示其他模式（C）的內容 🎯</p>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">v-show</h2>
    <UiLivePreview title="v-show 演示">
      <div class="space-y-3">
        <label class="flex items-center gap-2">
          <input v-model="isVisible" type="checkbox" />
          <span class="text-sm">顯示元素</span>
        </label>
        <div
          v-show="isVisible"
          class="p-4 rounded-lg bg-accent-50 dark:bg-accent-900/20 text-accent-700 dark:text-accent-300"
        >
          這個元素使用 v-show 控制顯示（檢查 DOM 會發現元素仍存在）
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">v-for — 列表渲染</h2>
    <UiLivePreview title="v-for 陣列">
      <div class="space-y-3">
        <div class="flex gap-2">
          <input
            v-model="newFruit"
            class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            placeholder="新增水果..."
            @keyup.enter="handleAddFruit"
          />
          <button class="btn-primary" @click="handleAddFruit">新增</button>
        </div>
        <ul class="space-y-1">
          <li
            v-for="(fruit, index) in fruitList"
            :key="index"
            class="flex items-center justify-between px-3 py-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700"
          >
            <span>{{ index + 1 }}. {{ fruit }}</span>
            <button
              class="text-red-500 hover:text-red-700 text-sm"
              @click="handleRemoveFruit(index)"
            >
              刪除
            </button>
          </li>
        </ul>
      </div>
    </UiLivePreview>

    <UiLivePreview title="v-for 物件">
      <ul class="space-y-1">
        <li
          v-for="(value, key) in userProfile"
          :key="key"
          class="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-sm"
        >
          <span class="font-medium text-gray-500 dark:text-gray-400 w-20">{{ key }}：</span>
          <span>{{ value }}</span>
        </li>
      </ul>
    </UiLivePreview>

    <UiTipCard type="warning" title="避免 v-if 與 v-for 同時使用">
      當 v-if 和 v-for 放在同一個元素上時，v-if 的優先級較高（Vue 3）。建議將 v-for 移到外層
      <code>&lt;template&gt;</code> 或使用 computed 先過濾資料。
    </UiTipCard>

    <UiCodeBlock :code="conditionalCode" language="vue" title="條件與迴圈語法" />

    <UiChapterNav
      prev-path="/basics/computed-watch"
      prev-title="Computed & Watch"
      next-path="/basics/event-binding"
      next-title="事件處理"
    />
  </div>
</template>
