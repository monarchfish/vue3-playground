# CH7 Tailwind CSS

以 Utility-First 方式快速建構 UI，涵蓋響應式排版、深色模式切換與自訂設計 token。

## 頁面列表

| 檔案 | 標題 |
|------|------|
| `index.vue` | 章節總覽 |
| `utility-first.vue` | Utility-First 概念 |
| `responsive.vue` | 響應式設計（RWD） |
| `dark-mode.vue` | 深色模式 |
| `custom-theme.vue` | 自訂主題 |

## 核心概念

- **Utility-First**：原子化 class、組合取代自訂 CSS、與 `@apply` 的取捨
- **RWD**：`sm:` / `md:` / `lg:` 斷點前綴、Mobile First 設計
- **Dark Mode**：`dark:` 變體、`class` 策略 vs `media` 策略
- **自訂主題**：`tailwind.config.ts` 擴充 colors、spacing、fontFamily

專案設定見根目錄 `tailwind.config.ts`，全域樣式見 `app/assets/css/main.css`。
