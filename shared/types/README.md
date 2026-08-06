# Shared Types

本目錄定義**前後端共用**的 TypeScript 型別，作為 API 請求與回應的契約來源。

## 用途

當 server route 與 client store / 元件需要操作相同資料結構時，型別應定義在此，避免兩邊各自維護一份 interface 導致不一致。

## 目前型別

| 檔案 | 說明 |
|------|------|
| `todo.ts` | Todo CRUD API 的 entity 與 request payload 型別 |

## 使用方式

**Client 端**（store 或元件）：

```ts
import type { Todo, CreateTodoPayload } from '~~/shared/types/todo'
```

**Server 端**（API route 或 utils）：

```ts
import type { Todo, UpdateTodoPayload } from '~~/shared/types/todo'
```

## 新增型別

新增 API 資源時，建議在此目錄建立對應的 `.ts` 檔，並匯出：

- **Entity**：完整資料物件（對應 GET 回應）
- **CreatePayload**：POST 請求 body
- **UpdatePayload**：PUT/PATCH 請求 body（通常為 partial）

保持命名與 server route 路徑對應，方便查找與維護。
