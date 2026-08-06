# Layout 元件

應用程式的外殼元件，由 `app/layouts/default.vue` 組裝成完整頁面框架。

## 元件一覽

| 元件 | 說明 |
|------|------|
| `AppHeader` | 固定頂部列：側邊欄切換、品牌連結、深色模式 |
| `AppSidebar` | 左側章節導覽，資料來自 `useChapterList` |
| `AppFooter` | 頁尾版權與說明文字 |

## 命名慣例

- 檔名以 `App` 前綴表示應用層級（非通用 UI 元件）。
- 引用時可用 `<LayoutAppHeader>` 或 `<AppHeader>`。

## 狀態協調

側邊欄開關狀態由 layout 持有，`AppHeader` 透過 `toggleSidebar` 事件通知，`AppSidebar` 以 `isOpen` prop 接收。大螢幕（`lg` 以上）時，主內容與頁尾會依側邊欄狀態加上左側間距（`lg:ml-64`）。

## 使用範例

通常不在個別 page 中直接使用，而是透過 layout 統一套用：

```vue
<!-- app/layouts/default.vue -->
<LayoutAppHeader @toggle-sidebar="handleToggleSidebar" />
<LayoutAppSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />
<LayoutAppFooter />
```
