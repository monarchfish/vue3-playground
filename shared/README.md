# Shared 共用程式碼

本目錄遵循 Nuxt 4 的 [`shared/`](https://nuxt.com/docs/guide/directory-structure/shared) 目錄慣例，放置**前後端皆可引用**的程式碼，例如型別定義、常數或共用工具函式。

## 為什麼需要 shared/

在 Nuxt 全端應用中，server routes 與 client 元件常需共用相同的資料結構。將型別與邏輯集中於 `shared/`，可避免在 `server/` 與 `app/` 之間重複定義，並確保 API 契約一致。

## 匯入方式

可透過以下路徑別名引用：

```ts
// 推薦：Nuxt 別名
import type { Todo } from '#shared/types/todo'

// 或使用專案根目錄別名
import type { Todo } from '~~/shared/types/todo'
```

## 目錄結構

```
shared/
├── types/     # 前後端共用的 TypeScript 型別
└── README.md
```

目前主要內容為 `types/` 下的 API 資料型別，詳見 [`types/README.md`](./types/README.md)。

## 注意事項

- 僅放置**不依賴瀏覽器或 Node 專屬 API** 的程式碼，以確保在 server 與 client 環境都能正常載入。
- 若邏輯僅供前端使用，請放在 `app/composables/`；若僅供後端使用，請放在 `server/utils/`。
