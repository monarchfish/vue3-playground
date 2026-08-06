/** A routable page entry within a chapter section. */
export interface ChapterPage {
  path: string
  title: string
}

/** Top-level chapter group used by the sidebar and chapter navigation. */
export interface Chapter {
  title: string
  path: string
  children: ChapterPage[]
}

/**
 * Static curriculum tree for the learning playground.
 * Kept in sync manually with routes under `app/pages/`.
 */
export function useChapterList() {
  const chapterList: Chapter[] = [
    {
      title: 'CH1 基礎 | Basics',
      path: '/basics',
      children: [
        { path: '/basics', title: '章節總覽' },
        { path: '/basics/template-syntax', title: '模板語法 | Template Syntax' },
        { path: '/basics/reactivity', title: '響應式 | Reactivity' },
        { path: '/basics/computed-watch', title: 'Computed & Watch' },
        { path: '/basics/conditional-loop', title: '條件與迴圈 | v-if & v-for' },
        { path: '/basics/event-binding', title: '事件處理 | Event Handling' },
        { path: '/basics/form-binding', title: '表單綁定 | Form Binding' },
      ],
    },
    {
      title: 'CH2 元件 | Components',
      path: '/components',
      children: [
        { path: '/components', title: '章節總覽' },
        { path: '/components/props-emits', title: 'Props & Emits' },
        { path: '/components/slots', title: '插槽 | Slots' },
        { path: '/components/provide-inject', title: 'Provide / Inject' },
        { path: '/components/dynamic-async', title: '動態與非同步元件' },
        { path: '/components/v-model-component', title: '元件 v-model' },
      ],
    },
    {
      title: 'CH3 生命週期 | Lifecycle',
      path: '/lifecycle',
      children: [
        { path: '/lifecycle', title: '章節總覽' },
        { path: '/lifecycle/hooks-demo', title: 'Lifecycle Hooks 演示' },
        { path: '/lifecycle/next-tick', title: 'nextTick 應用' },
        { path: '/lifecycle/error-handling', title: '錯誤處理 | Error Handling' },
      ],
    },
    {
      title: 'CH4 進階 | Advanced',
      path: '/advanced',
      children: [
        { path: '/advanced', title: '章節總覽' },
        { path: '/advanced/composables', title: '組合式函式 | Composables' },
        { path: '/advanced/directives', title: '自訂指令 | Directives' },
        { path: '/advanced/render-function', title: 'Render Function' },
        { path: '/advanced/teleport', title: 'Teleport' },
        { path: '/advanced/suspense', title: 'Suspense' },
        { path: '/advanced/transition', title: '轉場動畫 | Transition' },
      ],
    },
    {
      title: 'CH5 面試題 | Interview',
      path: '/interview',
      children: [
        { path: '/interview', title: '章節總覽' },
        { path: '/interview/reactivity-deep', title: '響應式原理' },
        { path: '/interview/diff-algorithm', title: 'Diff 演算法' },
        { path: '/interview/key-usage', title: 'Key 的作用' },
        { path: '/interview/vue2-vs-vue3', title: 'Vue 2 vs Vue 3' },
        { path: '/interview/performance', title: '效能優化' },
      ],
    },
    {
      title: 'CH6 Pinia',
      path: '/pinia',
      children: [
        { path: '/pinia', title: '章節總覽' },
        { path: '/pinia/basic-store', title: 'Store 基礎' },
        { path: '/pinia/actions', title: 'Actions 與非同步' },
        { path: '/pinia/composable-store', title: 'Setup Store' },
        { path: '/pinia/plugins', title: 'Plugins 與持久化' },
      ],
    },
    {
      title: 'CH7 Tailwind CSS',
      path: '/tailwind',
      children: [
        { path: '/tailwind', title: '章節總覽' },
        { path: '/tailwind/utility-first', title: 'Utility-First 概念' },
        { path: '/tailwind/responsive', title: '響應式設計 | RWD' },
        { path: '/tailwind/dark-mode', title: '深色模式 | Dark Mode' },
        { path: '/tailwind/custom-theme', title: '自訂主題 | Theme' },
      ],
    },
    {
      title: 'CH8 生態系 | Ecosystem',
      path: '/ecosystem',
      children: [
        { path: '/ecosystem', title: '章節總覽' },
        { path: '/ecosystem/vueuse', title: 'VueUse 工具集' },
        { path: '/ecosystem/nuxt-features', title: 'Nuxt 特色功能' },
        { path: '/ecosystem/form-validation', title: '表單驗證 | Validation' },
      ],
    },
    {
      title: 'CH9 API 串接 | Data Fetching',
      path: '/api',
      children: [
        { path: '/api', title: '章節總覽' },
        { path: '/api/server-routes', title: 'Server Routes' },
        { path: '/api/data-fetching', title: 'Data Fetching' },
        { path: '/api/http-methods', title: 'HTTP Methods (CRUD)' },
        { path: '/api/data-flow', title: 'Data Flow（資料流）' },
      ],
    },
    {
      title: 'CH10 實戰 | Projects',
      path: '/projects',
      children: [
        { path: '/projects', title: '專案總覽' },
        { path: '/projects/kanban', title: '看板 | Kanban' },
        { path: '/projects/ecommerce', title: '電商 | E-Commerce' },
        { path: '/projects/notes', title: '筆記工具 | Notes' },
      ],
    },
  ]

  /** All pages in curriculum order — enables prev/next navigation across chapter boundaries. */
  const flatPageList = computed(() => chapterList.flatMap((chapter) => chapter.children))

  /** Resolves the previous and next page relative to `currentPath` in `flatPageList`. */
  function getAdjacentPage(currentPath: string) {
    const pageList = flatPageList.value
    const currentIndex = pageList.findIndex((page) => page.path === currentPath)

    return {
      prev: currentIndex > 0 ? pageList[currentIndex - 1] : null,
      next: currentIndex < pageList.length - 1 ? pageList[currentIndex + 1] : null,
    }
  }

  return {
    chapterList,
    flatPageList,
    getAdjacentPage,
  }
}
