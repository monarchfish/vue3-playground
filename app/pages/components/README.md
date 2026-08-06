# CH2 元件系統

學習 Vue 元件的組合、重用與溝通模式，從父子傳值到跨層級依賴注入，掌握可維護的元件架構。

## 頁面列表

| 檔案 | 標題 |
|------|------|
| `index.vue` | 章節總覽 |
| `props-emits.vue` | Props & Emits |
| `slots.vue` | 插槽（Slots） |
| `provide-inject.vue` | Provide / Inject |
| `dynamic-async.vue` | 動態與非同步元件 |
| `v-model-component.vue` | 元件 v-model |

## 核心概念

- **Props & Emits**：單向資料流、型別定義、`defineProps` / `defineEmits`
- **Slots**：預設插槽、具名插槽、作用域插槽（Scoped Slots）
- **Provide / Inject**：祖先元件向後代注入依賴，避免 prop drilling
- **動態元件**：`<component :is>` 切換、`defineAsyncComponent` 延遲載入
- **元件 v-model**：`modelValue` + `update:modelValue`、多 v-model 綁定

## 建議學習順序

先理解 Props/Emits 單向資料流，再學 Slots 與 Provide/Inject 處理複雜 UI 組合。
