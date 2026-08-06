# Layouts

Nuxt 的 layout 系統，用來包裹頁面內容並提供共用的頁面框架。`app/app.vue` 透過 `<NuxtLayout>` 渲染當前 layout，`<NuxtPage>` 的內容會插入 layout 的 `<slot />`。

## 運作方式

- 檔名即 layout 名稱（例如 `default.vue` → `'default'`）
- 未指定時自動使用 `default`
- 在 page 中以 `definePageMeta` 切換：

```vue
<script setup lang="ts">
definePageMeta({ layout: 'fullscreen' })
</script>
```

## 可用 Layout

| 檔案 | 名稱 | 用途 |
|------|------|------|
| `default.vue` | `default` | 教學頁面主框架：頂部列、側邊章節導覽、頁尾 |
| `fullscreen.vue` | `fullscreen` | 精簡全螢幕框架，供 Kanban、筆記等 demo 專案自行管理 UI |

## 與 components/layout 的關係

Layout 檔案負責**組裝**頁面結構；實際的 Header、Sidebar、Footer 元件位於 [`app/components/layout/`](../components/layout/)。`default.vue` 持有側邊欄開關狀態，並協調各子元件間的事件與間距。
