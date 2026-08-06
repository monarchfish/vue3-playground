# CH4 進階功能

深入 Vue 3 進階 API：可重用邏輯、自訂指令、Render Function，以及 Teleport、Suspense、Transition 等內建能力。

## 頁面列表

| 檔案 | 標題 |
|------|------|
| `index.vue` | 章節總覽 |
| `composables.vue` | 組合式函式（Composables） |
| `directives.vue` | 自訂指令（Directives） |
| `render-function.vue` | Render Function |
| `teleport.vue` | Teleport |
| `suspense.vue` | Suspense |
| `transition.vue` | 轉場動畫（Transition） |

> `AdvancedSuspenseChild.vue` 為 Suspense 示範用的子元件，不產生獨立路由。

## 核心概念

- **Composables**：抽取可重用邏輯、`useXxx` 命名慣例、與 Nuxt 自動匯入
- **Directives**：`v-xxx` 自訂指令、`mounted` / `updated` 生命週期 hook
- **Render Function**：`h()` 函式、JSX 風格的程式化渲染
- **Teleport**：將 DOM 渲染到元件樹外的指定節點（如 Modal）
- **Suspense**：非同步元件載入時的 fallback 與 `#default` 插槽
- **Transition**：進入／離開動畫、`<TransitionGroup>` 列表動畫

## 建議學習順序

Composables 優先（日常最常用），其餘依 UI 需求選讀。
