<script setup lang="ts">
const progressStore = useProgressStore()
const { flatPageList } = useChapterList()

const demoPagePathList = [
  '/pinia/basic-store',
  '/pinia/actions',
  '/pinia/composable-store',
  '/pinia/plugins',
  '/tailwind/utility-first',
]

const completionRate = computed(() => progressStore.completionRate(demoPagePathList.length))

function handleClearStorage() {
  if (import.meta.client) {
    localStorage.removeItem('pinia-progress')
  }
  progressStore.resetProgress()
}

const pluginCode = `// plugins/pinia-persist.client.ts
export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use(({ store }) => {
    if (store.$id !== 'progress') return

    const storageKey = 'pinia-progress'

    // Restore on init
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      const { completedPageList } = JSON.parse(saved)
      store.$patch({
        completedPageSet: new Set(completedPageList),
      })
    }

    // Persist on every mutation
    store.$subscribe((_mutation, state) => {
      localStorage.setItem(storageKey, JSON.stringify({
        completedPageList: [...state.completedPageSet],
      }))
    })
  })
})`
</script>

<template>
  <div>
    <h1 class="mb-2">Plugins 與持久化 | Plugins</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Pinia 插件（Plugin）讓你可以擴充 Store
      的行為，例如加入持久化（Persistence）、日誌記錄（Logging）或同步至後端。本頁使用
      <code>progress</code> Store 搭配自訂插件，將學習進度儲存至 <code>localStorage</code>。
    </p>

    <UiTipCard type="tip" title="Nuxt Plugin 整合">
      在 Nuxt 中，將 Pinia 插件放在 <code>plugins/</code> 目錄並透過
      <code>$pinia.use()</code> 註冊。使用 <code>.client.ts</code> 後綴確保只在瀏覽器端執行，避免
      SSR 存取 localStorage 的問題。
    </UiTipCard>

    <h2 class="mt-8 mb-4">學習進度追蹤</h2>
    <UiLivePreview title="Progress Store + 持久化插件">
      <div class="space-y-4">
        <div class="flex items-center gap-4">
          <div class="flex-1 h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              class="h-full bg-primary-500 transition-all duration-300"
              :style="{ width: `${completionRate}%` }"
            />
          </div>
          <span class="text-sm font-medium">{{ completionRate }}%</span>
        </div>

        <p class="text-sm text-gray-500">
          已完成 {{ progressStore.completedCount }} / {{ demoPagePathList.length }} 頁
        </p>

        <ul class="space-y-2">
          <li
            v-for="pagePath in demoPagePathList"
            :key="pagePath"
            class="flex items-center gap-3 p-2 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <input
              type="checkbox"
              :checked="progressStore.isPageCompleted(pagePath)"
              @change="progressStore.togglePageCompleted(pagePath)"
            />
            <span class="text-sm font-mono">{{ pagePath }}</span>
          </li>
        </ul>

        <div class="flex gap-2">
          <button class="btn-secondary text-xs" @click="progressStore.resetProgress()">
            重設進度
          </button>
          <button class="btn-secondary text-xs" @click="handleClearStorage">
            清除 localStorage
          </button>
        </div>

        <p class="text-xs text-gray-400">
          重新整理頁面後，勾選狀態應從 localStorage 還原。全站共
          {{ flatPageList.length }} 個頁面可追蹤。
        </p>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="pluginCode" language="typescript" title="Pinia 持久化插件" />

    <UiChapterNav
      prev-path="/pinia/composable-store"
      prev-title="Setup Store"
      next-path="/tailwind"
      next-title="Tailwind CSS 章節"
    />
  </div>
</template>
