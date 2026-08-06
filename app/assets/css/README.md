# CSS

全域樣式檔案，由 Tailwind CSS 驅動。

## 檔案

| 檔案 | 用途 |
|------|------|
| `main.css` | Tailwind 三層指令（base / components / utilities）與專案自訂類別 |

## 自訂類別

`main.css` 的 `@layer components` 定義了教學頁面共用的 utility 組合：

| 類別 | 用途 |
|------|------|
| `.page-container` | 主內容區最大寬度與內距 |
| `.section-card` | 章節區塊卡片樣式 |
| `.demo-area` | 互動示範的虛線邊框區域 |
| `.btn-primary` / `.btn-secondary` | 按鈕樣式 |

## 設定關聯

- 在 `nuxt.config.ts` 的 `css` 陣列中全域載入
- Tailwind 主題延伸（如 `primary` 色票）定義於根目錄的 `tailwind.config.ts`
- 深色模式樣式使用 `dark:` 變體，切換邏輯由 `useDarkMode` composable 管理
