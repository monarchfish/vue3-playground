# Assets

經由建置工具處理的靜態資源目錄。與根目錄 `public/` 不同，此處的檔案會經過 Vite 打包管線（hash 檔名、Tree-shaking、PostCSS 等）。

## 與 public/ 的差異

| | `app/assets/` | `public/` |
|---|---------------|-----------|
| 建置處理 | 有（import 或 `nuxt.config` 引用） | 無，原樣複製至輸出根目錄 |
| 引用方式 | `~/assets/...` 或設定檔中的路徑 | 以 `/` 開頭的絕對路徑 |
| 適用場景 | CSS、需優化的圖片、字型 | `robots.txt`、favicon 等不需處理的檔案 |

## 子目錄

| 目錄 | 用途 |
|------|------|
| [`css/`](./css/) | 全域樣式與 Tailwind 自訂類別 |

## 引用範例

全域 CSS 已在 `nuxt.config.ts` 中註冊：

```ts
css: ['~/assets/css/main.css']
```

若新增其他資源（如圖片），可在元件中 import：

```vue
<img src="~/assets/images/example.png" alt="..." />
```
