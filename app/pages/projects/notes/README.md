# 筆記工具範例（Notes）

Markdown 筆記應用，支援建立、編輯、刪除、搜尋，並以 VueUse `useLocalStorage` 將資料持久化至瀏覽器。

## 頁面列表

| 檔案 | 標題 |
|------|------|
| `index.vue` | 筆記工具主畫面 |

本專案為單頁應用，包含筆記列表、編輯器、Markdown 預覽（edit / preview / split 三種模式）。

## 核心概念

- **localStorage 持久化**：VueUse `useLocalStorage` 自動同步筆記陣列
- **Markdown 預覽**：`useMarkdownPreview` composable 解析內容為區塊結構
- **搜尋篩選**：computed 依標題與內容關鍵字過濾
- **CRUD 操作**：建立、更新、刪除筆記，含時間戳記

## 相關檔案

- Composable：`app/composables/useMarkdownPreview.ts`
- 前置章節：CH8 VueUse、CH1 Computed & Watch
