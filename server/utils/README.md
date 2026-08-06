# Server Utils

`server/utils/` 下的函式由 Nitro **自動匯入**，在 `server/api/`、`server/middleware/` 等伺服器端程式碼中可直接呼叫，無需手動 `import`。

## 目前內容

| 檔案 | 說明 |
|------|------|
| `todos.ts` | Todo 資料的記憶體 CRUD 操作 |

## 使用方式

在 API handler 中直接呼叫匯出的函式即可：

```typescript
export default defineEventHandler(() => getTodoList())
```

Nitro 會在 build 時解析 `getTodoList` 等 utils 的引用。

## 設計說明

`todos.ts` 使用程序內記憶體陣列作為資料來源，適合本 playground 示範資料流，**不適用於正式環境**：

- 伺服器重啟後資料清空
- 多 worker / 水平擴展時各實例資料不一致
- 無交易、持久化或併發控制

正式專案應改為資料庫存取層（如 Drizzle、Prisma），並將 utils 保留為可測試的純邏輯或 repository 封裝。

## 新增工具

在此目錄新增 `.ts` 檔並 `export` 函式或常數即可；Nitro 會自動掃描並提供 auto-import。複雜模組建議加上 JSDoc 說明用途與限制。
