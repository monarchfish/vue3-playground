# CH5 面試題

整理 Vue 3 前端面試常見的深層主題：響應式原理、虛擬 DOM Diff、Key 機制、版本差異與效能優化。

## 頁面列表

| 檔案 | 標題 |
|------|------|
| `index.vue` | 章節總覽 |
| `reactivity-deep.vue` | 響應式原理 |
| `diff-algorithm.vue` | Diff 演算法 |
| `key-usage.vue` | Key 的作用 |
| `vue2-vs-vue3.vue` | Vue 2 vs Vue 3 |
| `performance.vue` | 效能優化 |

## 核心概念

- **響應式原理**：Proxy、`track` / `trigger`、effect 依賴收集
- **Diff 演算法**：同層比對、最長遞增子序列、patch flag 優化
- **Key**：列表 diff 的身份識別、錯用 key 導致的狀態錯亂
- **Vue 2 vs 3**：Options API vs Composition API、Vuex vs Pinia、破壞性變更
- **效能優化**：`v-memo`、`shallowRef`、非同步元件、Tree-shaking

## 建議學習順序

完成 CH1–CH4 後再閱讀，可將原理與先前所學 API 對照理解。
