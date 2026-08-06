# CH6 Pinia 狀態管理

Pinia 是 Vue 3 官方推薦的狀態管理方案，取代 Vuex。本章從基礎 Store 到 Setup Store、非同步 Actions 與持久化 Plugin。

## 頁面列表

| 檔案 | 標題 |
|------|------|
| `index.vue` | 章節總覽 |
| `basic-store.vue` | Store 基礎 |
| `actions.vue` | Actions 與非同步 |
| `composable-store.vue` | Setup Store |
| `plugins.vue` | Plugins 與持久化 |

## 核心概念

- **Define Store**：`defineStore`、state / getters / actions 結構
- **在元件中使用**：`storeToRefs` 解構響應式、直接修改 vs 透過 action
- **Actions**：非同步操作、錯誤處理、與 API 串接
- **Setup Store**：Composition API 風格定義 store，更靈活的邏輯組合
- **Plugins**：`$subscribe` 監聽、localStorage 持久化（見 `plugins/pinia-persist.client.ts`）

Store 實作位於 `app/stores/`，可對照本章範例閱讀。
