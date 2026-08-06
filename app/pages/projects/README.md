# CH10 實戰專案

將 CH1–CH9 所學整合為三個可互動的迷你應用，示範真實開發中的狀態管理、路由與 UI 模式。

## 子專案列表

| 目錄 | 標題 | 說明 |
|------|------|------|
| `kanban/` | 看板 | Pinia 多欄位看板、卡片 CRUD 與跨欄移動 |
| `ecommerce/` | 電商 | 商品列表、購物車、結帳表單驗證 |
| `notes/` | 筆記工具 | Markdown 編輯、localStorage 持久化、搜尋篩選 |

| 檔案 | 標題 |
|------|------|
| `index.vue` | 專案總覽 |

## 核心概念

- **狀態管理實戰**：Pinia store 與頁面、元件的協作（`stores/kanban.ts`、`stores/cart.ts`）
- **Composition API 整合**：computed、watch、composables 在完整流程中的運用
- **持久化**：VueUse `useLocalStorage`、Pinia persist plugin
- **路由與版面**：`definePageMeta` 切換 layout（如看板使用 `fullscreen`）

## 建議學習順序

完成 CH1–CH9 後再動手操作。可先從看板入手（結構最直觀），再挑戰電商或筆記工具。
