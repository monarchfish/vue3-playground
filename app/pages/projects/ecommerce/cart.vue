<script setup lang="ts">
const cartStore = useCartStore()

function handleIncrement(productId: string) {
  cartStore.incrementQuantity(productId)
}

function handleDecrement(productId: string) {
  cartStore.decrementQuantity(productId)
}

function handleRemove(productId: string) {
  cartStore.removeFromCart(productId)
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between mb-8">
      <div>
        <h1 class="mb-2">購物車</h1>
        <p class="text-gray-600 dark:text-gray-400">管理購物車商品數量，即時計算小計與運費。</p>
      </div>
      <NuxtLink to="/projects/ecommerce/product-list" class="btn-secondary">
        <Icon name="heroicons:arrow-left" class="w-4 h-4 mr-1.5" />
        繼續購物
      </NuxtLink>
    </div>

    <div v-if="cartStore.cartProductList.length > 0" class="grid gap-8 lg:grid-cols-3">
      <!-- Cart items -->
      <div class="lg:col-span-2 space-y-4">
        <div
          v-for="item in cartStore.cartProductList"
          :key="item.id"
          class="section-card flex gap-4"
        >
          <img
            :src="item.imageUrl"
            :alt="item.name"
            class="w-24 h-24 rounded-lg object-cover flex-shrink-0"
          />
          <div class="flex-1 min-w-0">
            <h3 class="font-semibold">{{ item.name }}</h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
              NT$ {{ item.price.toLocaleString() }} / 件
            </p>

            <div class="flex items-center justify-between mt-3">
              <div class="flex items-center gap-2">
                <button
                  type="button"
                  class="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  @click="handleDecrement(item.id)"
                >
                  <Icon name="heroicons:minus" class="w-4 h-4" />
                </button>
                <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                <button
                  type="button"
                  class="w-8 h-8 rounded-lg border border-gray-300 dark:border-gray-600 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                  @click="handleIncrement(item.id)"
                >
                  <Icon name="heroicons:plus" class="w-4 h-4" />
                </button>
              </div>

              <div class="flex items-center gap-4">
                <span class="font-semibold text-primary-600 dark:text-primary-400">
                  NT$ {{ item.lineTotal.toLocaleString() }}
                </span>
                <button
                  type="button"
                  class="text-gray-400 hover:text-red-500 transition-colors"
                  title="移除商品"
                  @click="handleRemove(item.id)"
                >
                  <Icon name="heroicons:trash" class="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          class="text-sm text-red-500 hover:text-red-600 transition-colors"
          @click="cartStore.clearCart()"
        >
          清空購物車
        </button>
      </div>

      <!-- Order summary -->
      <div class="section-card h-fit sticky top-24">
        <h2 class="text-lg font-semibold mb-4">訂單摘要</h2>
        <dl class="space-y-3 text-sm">
          <div class="flex justify-between">
            <dt class="text-gray-500">小計（{{ cartStore.itemCount }} 件）</dt>
            <dd class="font-medium">NT$ {{ cartStore.subtotal.toLocaleString() }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-gray-500">運費</dt>
            <dd class="font-medium">
              <span v-if="cartStore.shippingFee === 0" class="text-primary-600">免運</span>
              <span v-else>NT$ {{ cartStore.shippingFee.toLocaleString() }}</span>
            </dd>
          </div>
          <div v-if="cartStore.shippingFee > 0" class="text-xs text-gray-400">
            滿 NT$ 3,000 免運，還差 NT$ {{ (3000 - cartStore.subtotal).toLocaleString() }}
          </div>
          <div class="flex justify-between pt-3 border-t border-gray-200 dark:border-gray-700">
            <dt class="font-semibold">合計</dt>
            <dd class="text-lg font-bold text-primary-600 dark:text-primary-400">
              NT$ {{ cartStore.total.toLocaleString() }}
            </dd>
          </div>
        </dl>

        <NuxtLink to="/projects/ecommerce/checkout" class="btn-primary w-full justify-center mt-6">
          前往結帳
        </NuxtLink>
      </div>
    </div>

    <!-- Empty state -->
    <div v-else class="section-card text-center py-16">
      <Icon
        name="heroicons:shopping-cart"
        class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600"
      />
      <h2 class="text-lg font-semibold mb-2">購物車是空的</h2>
      <p class="text-gray-500 mb-6">快去挑選喜歡的商品吧！</p>
      <NuxtLink to="/projects/ecommerce/product-list" class="btn-primary"> 瀏覽商品 </NuxtLink>
    </div>

    <UiChapterNav
      prev-path="/projects/ecommerce/product-list"
      prev-title="商品列表"
      next-path="/projects/ecommerce/checkout"
      next-title="結帳"
    />
  </div>
</template>
