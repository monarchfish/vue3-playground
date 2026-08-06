<script setup lang="ts">
const cartStore = useCartStore()

const featuredProductList = computed(() => cartStore.productList.slice(0, 4))

function handleAddToCart(productId: string) {
  cartStore.addToCart(productId)
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between mb-8">
      <div>
        <h1 class="mb-2">電商 | E-Commerce</h1>
        <p class="text-gray-600 dark:text-gray-400">
          迷你電商示範：商品瀏覽、加入購物車、結帳流程。使用 Pinia 管理購物車狀態。
        </p>
      </div>
      <NuxtLink to="/projects/ecommerce/cart" class="btn-primary relative">
        <Icon name="heroicons:shopping-cart" class="w-4 h-4 mr-1.5" />
        購物車
        <span
          v-if="cartStore.itemCount > 0"
          class="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center"
        >
          {{ cartStore.itemCount }}
        </span>
      </NuxtLink>
    </div>

    <div class="flex flex-wrap gap-3 mb-8">
      <NuxtLink to="/projects/ecommerce/product-list" class="btn-secondary">
        <Icon name="heroicons:funnel" class="w-4 h-4 mr-1.5" />
        完整商品列表（篩選 / 排序）
      </NuxtLink>
      <NuxtLink to="/projects/ecommerce/cart" class="btn-secondary"> 查看購物車 </NuxtLink>
    </div>

    <h2 class="text-lg font-semibold mb-4">精選商品</h2>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div
        v-for="product in featuredProductList"
        :key="product.id"
        class="section-card overflow-hidden p-0 group"
      >
        <div class="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div class="p-4">
          <h3 class="font-semibold text-sm">{{ product.name }}</h3>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
            {{ product.description }}
          </p>
          <div class="flex items-center justify-between mt-3">
            <span class="text-primary-600 dark:text-primary-400 font-bold">
              NT$ {{ product.price.toLocaleString() }}
            </span>
            <button
              type="button"
              class="btn-primary text-xs px-3 py-1.5"
              @click="handleAddToCart(product.id)"
            >
              加入購物車
            </button>
          </div>
          <p
            v-if="cartStore.getCartQuantity(product.id) > 0"
            class="text-xs text-primary-600 dark:text-primary-400 mt-2"
          >
            已在購物車 × {{ cartStore.getCartQuantity(product.id) }}
          </p>
        </div>
      </div>
    </div>

    <UiChapterNav
      prev-path="/projects/kanban"
      prev-title="看板 | Kanban"
      next-path="/projects/ecommerce/product-list"
      next-title="完整商品列表"
    />
  </div>
</template>
