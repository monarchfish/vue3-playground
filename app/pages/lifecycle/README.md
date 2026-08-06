# CH3 生命週期

認識 Vue 元件從建立到銷毀的完整生命週期，以及 `nextTick` 與錯誤邊界的實務應用。

## 頁面列表

| 檔案 | 標題 |
|------|------|
| `index.vue` | 章節總覽 |
| `hooks-demo.vue` | Lifecycle Hooks 演示 |
| `next-tick.vue` | nextTick 應用 |
| `error-handling.vue` | 錯誤處理 |

> 同目錄下的 `LifecycleHooksChild.vue`、`LifecycleErrorChild.vue`、`LifecycleErrorBoundary.vue` 為輔助示範元件，不產生獨立路由。

## 核心概念

- **Setup 階段**：`<script setup>` 執行時機與 `onMounted` 等 hook 的差異
- **常用 Hooks**：`onMounted`、`onUpdated`、`onUnmounted`、`onBeforeUnmount`
- **nextTick**：DOM 更新後再讀取或操作 DOM 的時機
- **錯誤處理**：`onErrorCaptured` 錯誤邊界、子元件錯誤的攔截與回復

## 建議學習順序

先看 Hooks 演示理解各階段觸發順序，再學 nextTick 與錯誤處理。
