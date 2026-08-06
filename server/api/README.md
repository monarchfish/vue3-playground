# API 路由

`server/api/` 下的檔案會由 Nitro 自動註冊為 HTTP 端點，路徑前綴固定為 `/api`。

## 運作方式

每個檔案匯出一個 `defineEventHandler` 作為預設處理函式。Nitro 依**檔名**決定 HTTP 方法與 URL 路徑，無需額外設定 `router` 或 `express`。

## 命名規則

| 檔名模式 | 對應路由 |
|----------|----------|
| `index.get.ts` | `GET /api/{資料夾名}` |
| `index.post.ts` | `POST /api/{資料夾名}` |
| `[param].get.ts` | `GET /api/{資料夾名}/:param` |
| `[param].put.ts` | `PUT /api/{資料夾名}/:param` |
| `[param].delete.ts` | `DELETE /api/{資料夾名}/:param` |

動態參數在 handler 內以 `getRouterParam(event, 'param')` 取得（型別為字串）。

## 子目錄

| 目錄 | 說明 |
|------|------|
| [todos/](./todos/) | Todo 清單 CRUD 範例 |

## 前端呼叫範例

```typescript
// 取得列表
const { data } = await useFetch('/api/todos')

// 新增
await $fetch('/api/todos', { method: 'POST', body: { title: '新任務' } })
```

Nuxt 會在同源請求時自動解析 `/api/*` 至對應的 Nitro handler。
