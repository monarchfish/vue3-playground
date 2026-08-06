# 電商範例（E-Commerce）

迷你電商流程示範：瀏覽商品、篩選排序、加入購物車、結帳表單驗證。以 Pinia `useCartStore` 集中管理商品與購物車狀態。

## 頁面列表

| 檔案 | 標題 |
|------|------|
| `index.vue` | 電商首頁（精選商品） |
| `product-list.vue` | 完整商品列表（篩選 / 排序） |
| `cart.vue` | 購物車 |
| `checkout.vue` | 結帳 |

## 核心概念

- **Pinia Store**：`app/stores/cart.ts` 管理商品目錄、購物車項目與數量
- **Computed 衍生**：篩選、排序、小計與總價的計算屬性
- **路由導覽**：首頁 → 商品列表 → 購物車 → 結帳的完整動線
- **表單驗證**：結帳頁必填欄位、格式檢查與錯誤提示

## 相關檔案

- Store：`app/stores/cart.ts`
- 前置章節：CH6 Pinia、CH8 表單驗證、CH7 Tailwind 排版
