# Pinia Stores

本目錄存放 Vue 3 Playground 的 [Pinia](https://pinia.vuejs.org/) 狀態管理模組，供各章節與示範專案共用。

## 自動匯入

Nuxt 透過 `nuxt.config.ts` 的 `imports.dirs: ['stores']` 設定，自動匯入此目錄下的 store。元件中可直接呼叫，無需手動 import：

```vue
<script setup lang="ts">
const cartStore = useCartStore()
</script>
```

## Store 風格

大多數 store 採 **Setup Store**（Composition API）寫法，以 `defineStore('id', () => { ... })` 定義，內部使用 `ref`、`computed` 等組合式 API。

部分 store 刻意使用 **Option Store**（`state` / `getters` / `actions`）作為對照，方便學習兩種寫法的差異。

## 檔案一覽

| 檔案 | 用途 | 示範重點 |
|------|------|----------|
| `counter.ts` | 計數器 + 本地 Todo | Option Store、getters、模擬非同步 action |
| `cart.ts` | 電商購物車 | Setup Store、computed 衍生狀態、正規化 cart 資料 |
| `kanban.ts` | 看板專案 | 拖曳排序、跨欄位移動 |
| `notification.ts` | 全域通知面板 | 輕量 UI 狀態、computed 篩選 |
| `progress.ts` | 學習進度追蹤 | Option Store、`Set` 去重與 O(1) 查詢 |
| `todo-api.ts` | API 整合 Todo | `$fetch` 呼叫、`shared/types` 共用型別 |

## 使用方式

在頁面或 composable 中取得 store 實例後，直接讀取 state / getters 或呼叫 actions：

```ts
const todoApiStore = useTodoApiStore()

await todoApiStore.fetchTodoList()
todoApiStore.addTodo('新待辦事項')
```

Pinia 的 store 是 singleton，同一個 `useXxxStore()` 在整個應用中共享同一份狀態。
