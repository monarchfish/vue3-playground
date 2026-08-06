# Plugins

Nuxt plugin 在應用掛載前執行，可用來初始化第三方函式庫、註冊全域功能或擴充框架行為。

## 檔案說明

| 檔案 | 用途 |
|------|------|
| `pinia-persist.client.ts` | 將指定的 Pinia store 狀態持久化至 `localStorage` |

## Client-only 命名

副檔名 `.client.ts` 表示此 plugin **僅在瀏覽器端執行**，不會在 SSR 階段載入。持久化需存取 `localStorage`，因此必須使用 client-only。

## Pinia 持久化模式

`pinia-persist.client.ts` 透過 Pinia plugin 攔截 store 生命週期：

1. **還原**：store 初始化時，從 `localStorage` 讀取已儲存的 JSON 並 `$patch` 回 state
2. **寫入**：以 `$subscribe` 監聽 mutation，每次變更後序列化並寫入 `localStorage`

目前僅 `progress` store 啟用持久化（`completedPageSet` 以陣列形式儲存，還原時再轉回 `Set`）。若要為其他 store 加入持久化，請在 plugin 的 `PERSISTED_STORE_KEY_LIST` 中新增 store id，並實作對應的序列化／還原邏輯。
