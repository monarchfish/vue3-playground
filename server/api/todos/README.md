# Todos API

示範完整 CRUD 的 REST 風格端點，資料由 `server/utils/todos.ts` 的記憶體儲存提供（重啟後資料會消失）。

## 端點一覽

| 方法 | 路徑 | 檔案 | 說明 |
|------|------|------|------|
| `GET` | `/api/todos` | `index.get.ts` | 取得全部 todo |
| `POST` | `/api/todos` | `index.post.ts` | 新增 todo（需 `title`） |
| `GET` | `/api/todos/:id` | `[id].get.ts` | 取得單筆 todo |
| `PUT` | `/api/todos/:id` | `[id].put.ts` | 部分更新（`title`、`completed` 可選） |
| `DELETE` | `/api/todos/:id` | `[id].delete.ts` | 刪除 todo |

## 請求與回應

### 建立（POST）

```json
{ "title": "新任務" }
```

成功回傳 `201`，body 為新建的 todo 物件。

### 更新（PUT）

```json
{ "title": "新標題", "completed": true }
```

欄位皆可省略，僅更新有提供的屬性。

### 錯誤狀態

| 狀態碼 | 情境 |
|--------|------|
| `400` | 無效的 ID 或缺少必填 `title` |
| `404` | 找不到對應 ID 的 todo |
| `204` | 刪除成功（無 response body） |

## 型別定義

共用型別位於 `shared/types/todo.ts`，前後端皆可引用。

## 學習重點

此範例展示 **API → Store → Page** 資料流：前端以 `useFetch` / `$fetch` 呼叫這些端點，再透過 Pinia store 管理狀態。實務上應替換為資料庫與驗證層，此處刻意簡化以便專注於 Nuxt 全端架構。
