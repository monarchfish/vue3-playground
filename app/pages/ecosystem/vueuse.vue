<script setup lang="ts">
const mousePosition = reactive(useMouse())
const storedNickname = useLocalStorage('vueuse-demo-nickname', 'Vue 學習者')
const [isPanelVisible, togglePanelVisible] = useToggle(true)

const vueuseCode = `import { useMouse, useStorage, useToggle } from '@vueuse/core'

// 追蹤滑鼠座標
const { x, y, sourceType } = useMouse()

// 響應式 localStorage
const nickname = useStorage('nickname', '預設名稱')

// 布林切換
const [isOpen, toggleOpen] = useToggle(false)

// Nuxt 專案中 @vueuse/nuxt 會自動匯入，無需 import`
</script>

<template>
  <div>
    <h1 class="mb-2">VueUse 工具集</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      <a
        href="https://vueuse.org"
        target="_blank"
        rel="noopener"
        class="text-primary-600 dark:text-primary-400 hover:underline"
        >VueUse</a
      >
      是 Vue Composition API 的函式工具集（Collection of Utilities），提供 200+ 個現成
      composable，涵蓋瀏覽器 API、感應器、狀態管理等場景。
    </p>

    <UiTipCard type="tip" title="Nuxt 自動匯入">
      安裝 <code>@vueuse/nuxt</code> 後，所有 VueUse 函式會像 Nuxt 內建 composable
      一樣自動匯入，開箱即用。
    </UiTipCard>

    <h2 class="mt-8 mb-4">useMouse — 滑鼠追蹤</h2>
    <UiLivePreview title="即時滑鼠座標">
      <div class="space-y-2 font-mono text-sm">
        <p>
          x:
          <span class="text-primary-600 dark:text-primary-400 font-bold">{{
            mousePosition.x
          }}</span>
        </p>
        <p>
          y:
          <span class="text-primary-600 dark:text-primary-400 font-bold">{{
            mousePosition.y
          }}</span>
        </p>
        <p>sourceType: {{ mousePosition.sourceType ?? '—' }}</p>
        <p class="text-gray-500 text-xs mt-2">在此區域內移動滑鼠，座標會即時更新。</p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">useStorage — 持久化狀態</h2>
    <UiLivePreview title="localStorage 雙向同步">
      <div class="space-y-3">
        <label class="text-sm font-medium">暱稱（存入 localStorage）</label>
        <input
          v-model="storedNickname"
          class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
        />
        <p class="text-sm text-gray-500">
          目前值：「{{ storedNickname }}」— 重新整理頁面後仍會保留。
        </p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">useToggle — 布林切換</h2>
    <UiLivePreview title="面板顯示切換">
      <div class="space-y-3">
        <button class="btn-primary" @click="togglePanelVisible()">
          togglePanelVisible() → {{ isPanelVisible ? '隱藏' : '顯示' }}
        </button>
        <div
          v-if="isPanelVisible"
          class="p-4 bg-accent-50 dark:bg-accent-900/20 border border-accent-200 dark:border-accent-800 rounded-lg text-sm"
        >
          這是可切換的面板內容。isPanelVisible = {{ isPanelVisible }}
        </div>
        <p v-else class="text-sm text-gray-400">面板已隱藏</p>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="vueuseCode" language="typescript" title="VueUse 常用 API" />

    <UiChapterNav
      prev-path="/ecosystem"
      prev-title="生態系章節總覽"
      next-path="/ecosystem/nuxt-features"
      next-title="Nuxt 特色功能"
    />
  </div>
</template>
