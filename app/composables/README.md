# Composables

Nuxt 會自動匯入此目錄下的 composable，無需手動 import 即可在元件與頁面中使用。命名遵循 Vue 慣例，以 `use` 為前綴。

## 檔案說明

| 檔案 | 用途 |
|------|------|
| `useChapterList.ts` | 提供課程章節樹狀結構、扁平化頁面列表，以及上一頁／下一頁導覽 |
| `useDarkMode.ts` | 封裝 VueUse 的深色模式切換（`isDark`、`toggleDark`） |
| `useMarkdownPreview.ts` | 將 Markdown 字串解析為區塊結構，供筆記預覽使用 |

## 使用方式

```vue
<script setup lang="ts">
const { chapterList, getAdjacentPage } = useChapterList()
const { isDark, toggleDark } = useDarkMode()
const { markdownBlockList } = useMarkdownPreview(editorContent)
</script>
```

新增 composable 時，請以 `use` 開頭命名並放在此目錄，Nuxt 會在 build 時自動註冊。
