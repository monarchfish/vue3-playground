<script setup lang="ts">
// Simulating provide/inject with reactive data
const theme = ref<'light' | 'dark'>('light')
const userName = ref('小明')

const provideCode = `// 祖先元件（Provider）
const theme = ref('light')
const userName = ref('小明')

// Provide 響應式資料
provide('theme', theme)
provide('userName', userName)

// 也可以 provide 修改方法
provide('updateTheme', (newTheme: string) => {
  theme.value = newTheme
})

// ------------------

// 後代元件（Consumer）
// 注入資料（含預設值）
const theme = inject('theme', ref('light'))
const userName = inject('userName', ref('訪客'))
const updateTheme = inject('updateTheme', () => {})

// 使用 InjectionKey 確保型別安全
import type { InjectionKey, Ref } from 'vue'

const ThemeKey: InjectionKey<Ref<string>> = Symbol('theme')
provide(ThemeKey, theme)
const injectedTheme = inject(ThemeKey) // 自動推斷型別`
</script>

<template>
  <div>
    <h1 class="mb-2">Provide / Inject</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      <code>provide</code> 和 <code>inject</code> 用於跨多層元件傳遞資料，無需逐層透過 props
      傳遞（避免「Props 鑽取」問題）。
    </p>

    <UiTipCard type="info" title="適用場景">
      當深層子元件需要存取祖先元件的資料時，使用 Provide/Inject 比層層傳遞 Props
      更為優雅。常用於主題設定、語系、認證狀態等。
    </UiTipCard>

    <h2 class="mt-8 mb-4">基本用法演示</h2>
    <UiLivePreview title="Provide/Inject 模擬">
      <div class="space-y-4">
        <!-- Provider (parent) -->
        <div class="p-4 border-2 border-primary-300 dark:border-primary-700 rounded-lg">
          <p class="text-xs font-medium text-primary-600 dark:text-primary-400 mb-3">
            祖先元件（Provider）
          </p>
          <div class="space-y-2">
            <div>
              <label class="text-sm font-medium">provide('theme')：</label>
              <select
                v-model="theme"
                class="ml-2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
              >
                <option value="light">light</option>
                <option value="dark">dark</option>
              </select>
            </div>
            <div>
              <label class="text-sm font-medium">provide('userName')：</label>
              <input
                v-model="userName"
                class="ml-2 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 text-sm"
              />
            </div>
          </div>

          <!-- Middle layer -->
          <div class="mt-4 ml-4 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
            <p class="text-xs text-gray-500 mb-2">中間元件（不需要處理這些資料）</p>

            <!-- Consumer (deep child) -->
            <div class="ml-4 p-3 border-2 border-accent-300 dark:border-accent-700 rounded-lg">
              <p class="text-xs font-medium text-accent-600 dark:text-accent-400 mb-2">
                深層子元件（Consumer）
              </p>
              <p class="text-sm">
                inject('theme') = <span class="font-bold">{{ theme }}</span>
              </p>
              <p class="text-sm">
                inject('userName') = <span class="font-bold">{{ userName }}</span>
              </p>
              <div
                class="mt-2 p-2 rounded text-sm"
                :class="theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-900'"
              >
                主題預覽：{{ theme === 'dark' ? '深色模式' : '淺色模式' }}，你好 {{ userName }}！
              </div>
            </div>
          </div>
        </div>
      </div>
    </UiLivePreview>

    <UiTipCard type="warning" title="注意事項">
      <ul class="list-disc list-inside space-y-1">
        <li>
          Provide/Inject 不是響應式的「自帶」功能，需提供 ref 或 reactive 物件才能保持響應式。
        </li>
        <li>建議使用 <code>InjectionKey</code> 搭配 Symbol 確保型別安全。</li>
        <li>大型專案中若需全域狀態，建議優先考慮 Pinia。</li>
      </ul>
    </UiTipCard>

    <UiCodeBlock :code="provideCode" language="typescript" title="Provide / Inject 用法" />

    <UiChapterNav
      prev-path="/components/slots"
      prev-title="插槽 | Slots"
      next-path="/components/dynamic-async"
      next-title="動態與非同步元件"
    />
  </div>
</template>
