# UI 元件

教學頁面共用的展示型元件，用於呈現程式碼、互動演示與補充說明。

## 元件一覽

| 元件 | 說明 |
|------|------|
| `CodeBlock` | 程式碼區塊，含複製按鈕 |
| `LivePreview` | 互動演示容器（虛線邊框區域） |
| `TipCard` | 提示／警告／資訊卡（`info`、`warning`、`tip`、`danger`） |
| `ChapterNav` | 章節頁尾的上一頁／下一頁導覽 |

## 命名慣例

- 檔名採 PascalCase，語意清楚（動詞或名詞組合）。
- 引用時可用 `<UiCodeBlock>` 或 `<CodeBlock>`。

## 典型用法

各 `app/pages/` 下的教學頁面會組合這些元件：

```vue
<template>
  <UiTipCard type="info" title="重點">說明文字</UiTipCard>

  <UiLivePreview title="即時演示">
    <!-- 頁面內嵌的互動範例 -->
  </UiLivePreview>

  <UiCodeBlock :code="sourceCode" language="vue" title="原始碼" />

  <UiChapterNav
    prev-path="/basics"
    prev-title="基礎總覽"
    next-path="/basics/reactivity"
    next-title="響應式"
  />
</template>
```

`ChapterNav` 的 `prev-*` / `next-*` props 為選填；未提供的路向不會顯示連結。
