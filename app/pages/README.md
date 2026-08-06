# Pages 目錄

此目錄存放 Nuxt 的**檔案式路由（File-based Routing）**頁面。`app/pages/` 下的 `.vue` 檔案會自動對應到 URL 路由，無需手動設定 router。

## 路由規則

| 檔案 / 目錄 | 對應路由 | 說明 |
|-------------|----------|------|
| `index.vue` | `/` 或 `/章節/` | 章節總覽頁 |
| `foo.vue` | `/章節/foo` | 單一頁面 |
| `子目錄/index.vue` | `/章節/子目錄` | 巢狀路由的首頁 |
| `子目錄/bar.vue` | `/章節/子目錄/bar` | 巢狀子頁面 |

- 目錄結構即路由結構，巢狀資料夾產生巢狀 URL
- 以 `[param].vue` 可建立動態路由（本專案未使用）
- 輔助元件（如 `LifecycleHooksChild.vue`）若未作為頁面檔命名，不會產生路由

## 章節一覽

| 章節 | 路徑 | 說明 |
|------|------|------|
| CH1 Vue 3 基礎語法 | `/basics` | 模板、響應式、事件與表單綁定 |
| CH2 元件系統 | `/components` | Props、Slots、Provide/Inject 等元件溝通 |
| CH3 生命週期 | `/lifecycle` | Lifecycle Hooks、nextTick、錯誤處理 |
| CH4 進階功能 | `/advanced` | Composables、指令、Teleport、Suspense 等 |
| CH5 面試題 | `/interview` | 響應式原理、Diff、效能等面試常見主題 |
| CH6 Pinia 狀態管理 | `/pinia` | Store、Actions、Setup Store、Plugins |
| CH7 Tailwind CSS | `/tailwind` | Utility-First、RWD、深色模式、自訂主題 |
| CH8 生態系 | `/ecosystem` | VueUse、Nuxt 特色、表單驗證 |
| CH9 API 串接 | `/api` | Server Routes、Data Fetching、CRUD 資料流 |
| CH10 實戰專案 | `/projects` | 看板、電商、筆記工具三個迷你應用 |

章節導覽與側邊欄資料來自 `app/composables/useChapterList.ts`，新增頁面時請同步更新。
