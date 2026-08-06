# Vue3 Playground — Vue 3 互動式學習平台

基於 Nuxt 4 的全端學習網站，涵蓋 Vue 3 基礎到進階，包含互動範例。每個章節提供可即時操作的程式碼演示，並搭配實戰專案整合所學概念。

## 技術棧

| 技術 | 版本 / 說明 |
|------|-------------|
| [Nuxt](https://nuxt.com/) | 4.x — 全端框架與路由 |
| [Vue](https://vuejs.org/) | 3.5 — 核心 UI 框架 |
| [Pinia](https://pinia.vuejs.org/) | 4.x — 狀態管理 |
| [Tailwind CSS](https://tailwindcss.com/) | 4.x — 樣式系統 |
| [VueUse](https://vueuse.org/) | 組合式工具函式庫 |
| TypeScript | strict mode — 嚴格型別檢查 |

## 專案結構

```
vue3-playground/
├── app/                    # Nuxt 4 應用程式原始碼
│   ├── assets/css/         # 全域樣式（Tailwind layers、共用 class）
│   ├── components/         # Vue 元件（layout、ui）
│   ├── composables/        # 可重用組合式函式
│   ├── layouts/            # 頁面版型（default、fullscreen）
│   ├── pages/              # 檔案式路由 — 各章節學習頁面
│   └── stores/             # Pinia stores
├── plugins/                # Nuxt 插件（如 Pinia 持久化）
├── public/                 # 靜態資源，原樣提供給瀏覽器
├── server/                 # Nitro 後端
│   ├── api/                # REST API 路由（檔名即路由）
│   └── utils/              # 伺服器端共用工具
├── shared/                 # 前後端共用程式碼（型別、常數）
├── nuxt.config.ts          # Nuxt 設定
├── tailwind.config.ts      # Tailwind 自訂主題
└── eslint.config.mjs       # ESLint 規則
```

各子目錄內附有 README 說明，可進一步參閱。

## 快速開始

```bash
pnpm install
pnpm dev
```

開發伺服器預設於 [http://localhost:3000](http://localhost:3000) 啟動。

## 可用指令

| 指令 | 說明 |
|------|------|
| `pnpm dev` | 啟動開發伺服器（含 HMR） |
| `pnpm build` | 建置正式版 |
| `pnpm lint` | 執行 ESLint 檢查 |
| `pnpm lint:fix` | 自動修正 ESLint 問題 |
| `pnpm format` | 檢查 Prettier 格式 |
| `pnpm typecheck` | 執行 `vue-tsc` 型別檢查 |

## 章節總覽

全站共 **10 章**，由淺入深：

| 章節 | 主題 | 內容摘要 |
|------|------|----------|
| CH1 | 基礎 Basics | 模板語法、響應式、Computed/Watch、條件與迴圈、事件與表單綁定 |
| CH2 | 元件 Components | Props/Emits、Slots、Provide/Inject、動態與非同步元件、元件 v-model |
| CH3 | 生命週期 Lifecycle | Lifecycle Hooks、nextTick、錯誤處理 |
| CH4 | 進階 Advanced | Composables、自訂指令、Render Function、Teleport、Suspense、Transition |
| CH5 | 面試題 Interview | 響應式原理、Diff 演算法、Key 作用、Vue 2 vs 3、效能優化 |
| CH6 | Pinia | Store 基礎、Actions、Setup Store、Plugins 與持久化 |
| CH7 | Tailwind CSS | Utility-First、RWD、深色模式、自訂主題 |
| CH8 | 生態系 Ecosystem | VueUse、Nuxt 特色功能、表單驗證 |
| CH9 | API 串接 Data Fetching | Server Routes、Data Fetching、HTTP CRUD、資料流 |
| CH10 | 實戰 Projects | 看板、電商、筆記工具 |

章節導覽定義於 `app/composables/useChapterList.ts`，需與 `app/pages/` 路由保持同步。

## 資料儲存說明

本專案為**學習用途**，後端 API（如 Todos CRUD）使用**記憶體**儲存資料，**未連接資料庫**。伺服器重啟後資料會重置，請勿用於正式環境。
