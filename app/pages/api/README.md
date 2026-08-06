# CH9 API 串接

Nuxt 作為全端框架，可在 `server/api/` 建立 API 端點，前端以 `useFetch`、`$fetch` 等取得資料，完成 CRUD 與資料流架構。

## 頁面列表

| 檔案 | 標題 |
|------|------|
| `index.vue` | 章節總覽 |
| `server-routes.vue` | Server Routes |
| `data-fetching.vue` | Data Fetching |
| `http-methods.vue` | HTTP Methods（CRUD） |
| `data-flow.vue` | Data Flow（資料流） |

## 核心概念

- **Server Routes**：Nitro 引擎、`server/api/` 檔案命名慣例（`index.get.ts`、`[id].put.ts`）
- **Data Fetching**：`useFetch`、`useAsyncData`、`$fetch` 的使用時機與差異
- **HTTP Methods**：GET / POST / PUT / DELETE 完整 CRUD 示範（Todos API）
- **Data Flow**：API → Pinia Store → Page 的單向資料流架構

後端實作見 `server/api/todos/`，型別定義見 `shared/types/todo.ts`。
