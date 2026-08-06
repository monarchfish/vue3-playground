# Server 目錄

本專案為 Nuxt 全端應用，後端由 **Nitro** 驅動。`server/` 目錄下的檔案會在開發與正式環境中自動載入，無需手動註冊路由或工具函式。

## 目錄結構

| 目錄 | 用途 |
|------|------|
| `api/` | HTTP API 端點，依檔名自動對應路由 |
| `utils/` | 伺服器端共用工具，由 Nitro 自動匯入 |

## 檔案命名慣例（API）

Nitro 依檔案名稱推導 HTTP 方法與路徑：

- `index.get.ts` → `GET /api/todos`
- `index.post.ts` → `POST /api/todos`
- `[id].get.ts` → `GET /api/todos/:id`
- `[id].put.ts` → `PUT /api/todos/:id`
- `[id].delete.ts` → `DELETE /api/todos/:id`

方括號 `[id]` 代表動態路由參數。

## 範例：Todos CRUD

`todos` 範例示範完整的 CRUD 流程：API 路由 → `server/utils` 資料層 → 前端 `useFetch` / Pinia Store。資料以**記憶體**儲存，重啟伺服器後會重置，僅供學習用途。

## 進一步閱讀

- [api/README.md](./api/README.md) — API 路由總覽
- [utils/README.md](./utils/README.md) — 伺服器工具說明
