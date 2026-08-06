# 看板範例（Kanban）

多欄位看板應用，示範以 Pinia 管理欄位與卡片、跨欄移動、新增刪除等常見 CRUD 模式。

## 頁面列表

| 檔案 | 標題 |
|------|------|
| `index.vue` | 看板主畫面 |

本專案為單頁應用，所有功能集中於 `index.vue`，使用 `fullscreen` layout 提供全螢幕操作體驗。

## 核心概念

- **Pinia Store**：`app/stores/kanban.ts` 管理 columnList 與 cardList
- **跨欄移動**：`moveCardToAdjacentColumn` 左右欄位切換
- **排序**：依 `order` 欄位排序卡片
- **CRUD**：新增卡片、刪除卡片、選擇目標欄位

## 相關檔案

- Store：`app/stores/kanban.ts`
- 前置章節：CH6 Pinia、CH2 元件（卡片 UI 組合）
