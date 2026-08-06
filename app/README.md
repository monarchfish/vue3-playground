# App

Nuxt 4 的 `srcDir`，包含所有前端原始碼。Nuxt 會自動掃描此目錄下的慣例資料夾並註冊對應功能。

## 目錄結構

| 目錄 | 用途 |
|------|------|
| [`pages/`](./pages/) | 檔案式路由，每個 `.vue` 對應一個 URL |
| [`layouts/`](./layouts/) | 頁面外框 layout，透過 `definePageMeta` 切換 |
| [`components/`](./components/) | 可重用 Vue 元件（自動匯入） |
| [`composables/`](./composables/) | 共用邏輯 composable（自動匯入） |
| [`stores/`](./stores/) | Pinia 狀態管理 |
| [`assets/`](./assets/) | 經建置工具處理的靜態資源 |

## 根檔案

| 檔案 | 用途 |
|------|------|
| `app.vue` | 應用程式根元件，渲染 `<NuxtLayout>` 與 `<NuxtPage>` |

## 自動匯入

Nuxt 會自動匯入 `components/`、`composables/` 以及 `nuxt.config.ts` 中 `imports.dirs` 設定的目錄（如 `stores/`），無需手動 import 即可在 script 或 template 中使用。

## 相關目錄（srcDir 外）

| 路徑 | 用途 |
|------|------|
| `server/` | Nitro 伺服器端 API 與工具函式 |
| `shared/` | 前後端共用的型別定義 |
| `plugins/` | Nuxt 插件（如 Pinia persist） |
| `public/` | 不經建置處理、直接提供的靜態檔案 |
