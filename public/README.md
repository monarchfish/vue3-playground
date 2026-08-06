# Public 靜態資源目錄

此目錄下的檔案會由 Nuxt **原樣提供**給瀏覽器，不經過打包或轉譯。

## 使用方式

- 放置 favicon、robots.txt、manifest 等不需 import 的靜態檔案
- 引用路徑以網站根目錄為基準，例如 `public/robots.txt` 對應 `/robots.txt`

## 注意事項

- 僅適合**不需 hash 檔名**的公開資源；需 tree-shaking 或版本控制的資產請放在 `app/assets/`
- 此目錄內的檔案不會被 TypeScript 或 ESLint 處理
