<script setup lang="ts">
const patchStepList = ref<string[]>([])
const isAnimating = ref(false)

const _oldVNodeTree = [
  { id: 'A', label: 'A', children: ['B', 'C'] },
  { id: 'B', label: 'B', children: ['D'] },
  { id: 'C', label: 'C', children: [] },
  { id: 'D', label: 'D', children: [] },
]

const _newVNodeTree = [
  { id: 'A', label: 'A', children: ['B', 'E'] },
  { id: 'B', label: 'B', children: ['D'] },
  { id: 'E', label: 'E (new)', children: [], isNew: true },
  { id: 'D', label: 'D', children: [] },
]

const _removedNodeList = [{ id: 'C', label: 'C (removed)' }]

async function handleRunDiff() {
  if (isAnimating.value) return
  isAnimating.value = true
  patchStepList.value = []

  const stepList = [
    '1. 比對根節點 A → type 相同，繼續 diff children',
    '2. 比對 children [B, C] vs [B, E]',
    '3. B → key 相同，patch props & children',
    '4. C → 在新列表找不到相同 key → unmount C',
    '5. E → 在新列表發現新節點 → mount E',
    '6. D → 位置不變，patch props',
    '7. 完成！只更新了 C→E 的變更，其餘節點複用',
  ]

  for (const step of stepList) {
    patchStepList.value.push(step)
    await new Promise((resolve) => setTimeout(resolve, 600))
  }

  isAnimating.value = false
}

const diffCode = `// Simplified Vue Diff Algorithm (double-ended comparison for arrays)

function patchChildren(oldChildren, newChildren) {
  let i = 0, oldEnd = oldChildren.length - 1
  let newEnd = newChildren.length - 1

  // 1. Sync from start
  while (i <= oldEnd && i <= newEnd) {
    if (isSameVNode(oldChildren[i], newChildren[i])) {
      patch(oldChildren[i], newChildren[i])
      i++
    } else break
  }

  // 2. Sync from end
  while (i <= oldEnd && i <= newEnd) {
    if (isSameVNode(oldChildren[oldEnd], newChildren[newEnd])) {
      patch(oldChildren[oldEnd], newChildren[newEnd])
      oldEnd--; newEnd--
    } else break
  }

  // 3. New nodes to mount
  if (i > oldEnd) {
    mountNewChildren(newChildren, i, newEnd)
  }

  // 4. Old nodes to unmount
  if (i > newEnd) {
    unmountOldChildren(oldChildren, i, oldEnd)
  }

  // 5. Unknown sequence → use key map
  if (i <= oldEnd && i <= newEnd) {
    patchKeyedChildren(oldChildren, newChildren, i, oldEnd, newEnd)
  }
}`
</script>

<template>
  <div>
    <h1 class="mb-2">Diff 演算法</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Virtual DOM（虛擬 DOM）是 JavaScript 物件描述的 DOM 樹。Diff 演算法比較新舊 VNode
      樹的差異，以最小成本更新真實 DOM。
    </p>

    <UiTipCard type="info" title="Vue 3 Diff 優化重點">
      Vue 3 在 Vue 2 的雙端比較（Double-ended Diff）基礎上，加入<strong
        >最長遞增子序列（Longest Increasing Subsequence）</strong
      >演算法，減少 DOM 移動次數。靜態節點會被 hoist，跳過 diff。
    </UiTipCard>

    <h2 class="mt-8 mb-4">Diff 流程演示</h2>
    <UiLivePreview title="VNode 樹 Diff 過程">
      <div class="space-y-4">
        <div class="grid sm:grid-cols-2 gap-4">
          <div>
            <p class="text-xs font-medium text-gray-500 mb-2">舊 VNode 樹</p>
            <div class="space-y-1 text-sm font-mono">
              <div class="p-2 bg-gray-100 dark:bg-gray-800 rounded">A</div>
              <div class="pl-4 p-2 bg-gray-100 dark:bg-gray-800 rounded">├ B → D</div>
              <div
                class="pl-4 p-2 bg-red-100 dark:bg-red-900/30 rounded text-red-700 dark:text-red-300"
              >
                └ C ✕
              </div>
            </div>
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 mb-2">新 VNode 樹</p>
            <div class="space-y-1 text-sm font-mono">
              <div class="p-2 bg-gray-100 dark:bg-gray-800 rounded">A</div>
              <div class="pl-4 p-2 bg-gray-100 dark:bg-gray-800 rounded">├ B → D</div>
              <div
                class="pl-4 p-2 bg-green-100 dark:bg-green-900/30 rounded text-green-700 dark:text-green-300"
              >
                └ E ✚
              </div>
            </div>
          </div>
        </div>

        <button class="btn-primary" :disabled="isAnimating" @click="handleRunDiff">
          {{ isAnimating ? 'Diff 進行中...' : '執行 Diff 演示' }}
        </button>

        <div
          class="bg-gray-900 rounded-lg p-3 font-mono text-xs space-y-1 max-h-48 overflow-y-auto"
        >
          <div v-if="patchStepList.length === 0" class="text-gray-500">點擊按鈕開始 Diff 演示</div>
          <div v-for="(step, i) in patchStepList" :key="i" class="text-blue-400">{{ step }}</div>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">核心概念</h2>
    <div class="grid sm:grid-cols-3 gap-4">
      <div class="section-card text-sm">
        <h3 class="font-semibold mb-2">同層比較</h3>
        <p class="text-gray-600 dark:text-gray-400">
          只比較同一層級的節點，不跨層。跨層視為 unmount + mount。
        </p>
      </div>
      <div class="section-card text-sm">
        <h3 class="font-semibold mb-2">Key 的作用</h3>
        <p class="text-gray-600 dark:text-gray-400">
          透過 key 識別節點身份，決定 patch 還是 replace，避免錯誤複用。
        </p>
      </div>
      <div class="section-card text-sm">
        <h3 class="font-semibold mb-2">Patch Flag</h3>
        <p class="text-gray-600 dark:text-gray-400">
          Vue 3 編譯時標記動態節點，diff 時只檢查有 flag 的節點，跳過靜態內容。
        </p>
      </div>
    </div>

    <UiCodeBlock :code="diffCode" language="typescript" title="Diff 演算法簡化版" />

    <UiChapterNav
      prev-path="/interview/reactivity-deep"
      prev-title="響應式原理"
      next-path="/interview/key-usage"
      next-title="Key 的作用"
    />
  </div>
</template>
