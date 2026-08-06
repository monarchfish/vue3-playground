# Components

本目錄存放 Vue3 Playground 的可重用元件，供各頁面與 layout 引用。

## 自動匯入

Nuxt 會自動掃描 `app/components/`，無需手動 `import` 即可在 template 中使用。

## 命名與目錄結構

子資料夾名稱會成為元件名稱的前綴：

| 檔案路徑 | 完整名稱 | 簡短名稱（同樣可用） |
|----------|----------|----------------------|
| `layout/AppHeader.vue` | `<LayoutAppHeader>` | `<AppHeader>` |
| `ui/CodeBlock.vue` | `<UiCodeBlock>` | `<CodeBlock>` |

- **完整名稱**：資料夾前綴 + 檔名，可避免不同子目錄間的命名衝突。
- **簡短名稱**：Nuxt 亦支援省略前綴的直接引用（例如 `<AppHeader>`）。

## 子目錄

| 目錄 | 用途 |
|------|------|
| [`layout/`](./layout/) | 應用程式外殼（頂部導覽、側邊欄、頁尾） |
| [`ui/`](./ui/) | 教學內容用的展示型元件（程式碼區塊、提示卡、即時預覽等） |

## 使用方式

在任意 page 或 layout 的 template 中直接使用即可：

```vue
<template>
  <UiCodeBlock :code="exampleCode" language="vue" title="範例" />
  <UiTipCard type="tip" title="小提示">內容說明</UiTipCard>
</template>
```
