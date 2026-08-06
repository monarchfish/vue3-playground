<script setup lang="ts">
const cartStore = useCartStore()

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'name-asc'

const selectedCategory = ref('all')
const sortOption = ref<SortOption>('default')
const searchKeyword = ref('')

const categoryOptionList = computed(() =>
  Object.entries(cartStore.categoryLabelMap).map(([value, label]) => ({ value, label })),
)

const filteredProductList = computed(() => {
  let result = [...cartStore.productList]

  if (selectedCategory.value !== 'all') {
    result = result.filter((product) => product.category === selectedCategory.value)
  }

  if (searchKeyword.value.trim()) {
    const keyword = searchKeyword.value.trim().toLowerCase()
    result = result.filter(
      (product) =>
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword),
    )
  }

  switch (sortOption.value) {
    case 'price-asc':
      result.sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      result.sort((a, b) => b.price - a.price)
      break
    case 'name-asc':
      result.sort((a, b) => a.name.localeCompare(b.name, 'zh-TW'))
      break
  }

  return result
})

function handleAddToCart(productId: string) {
  cartStore.addToCart(productId)
}
</script>

<template>
  <div>
    <div class="flex items-start justify-between mb-6">
      <div>
        <h1 class="mb-2">商品列表</h1>
        <p class="text-gray-600 dark:text-gray-400">
          使用 computed 實作即時篩選與排序，展示響應式資料處理模式。
        </p>
      </div>
      <NuxtLink to="/projects/ecommerce/cart" class="btn-primary relative">
        <Icon name="heroicons:shopping-cart" class="w-4 h-4 mr-1.5" />
        購物車 ({{ cartStore.itemCount }})
      </NuxtLink>
    </div>

    <!-- Filters -->
    <div class="section-card mb-6">
      <div class="grid gap-4 sm:grid-cols-3">
        <div>
          <label class="block text-sm font-medium mb-1.5">搜尋</label>
          <input
            v-model="searchKeyword"
            type="text"
            placeholder="搜尋商品名稱或描述..."
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1.5">分類</label>
          <select
            v-model="selectedCategory"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          >
            <option v-for="option in categoryOptionList" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium mb-1.5">排序</label>
          <select
            v-model="sortOption"
            class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          >
            <option value="default">預設順序</option>
            <option value="price-asc">價格：低到高</option>
            <option value="price-desc">價格：高到低</option>
            <option value="name-asc">名稱：A → Z</option>
          </select>
        </div>
      </div>
      <p class="text-sm text-gray-500 mt-3">共 {{ filteredProductList.length }} 件商品</p>
    </div>

    <!-- Product grid -->
    <div v-if="filteredProductList.length > 0" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <div
        v-for="product in filteredProductList"
        :key="product.id"
        class="section-card overflow-hidden p-0 group"
      >
        <div class="aspect-[4/3] overflow-hidden bg-gray-100 dark:bg-gray-800 relative">
          <img
            :src="product.imageUrl"
            :alt="product.name"
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <span
            class="absolute top-3 left-3 text-xs px-2 py-0.5 rounded-full bg-white/90 dark:bg-gray-900/90 text-gray-600 dark:text-gray-400"
          >
            {{ cartStore.categoryLabelMap[product.category] }}
          </span>
        </div>
        <div class="p-4">
          <h3 class="font-semibold">{{ product.name }}</h3>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {{ product.description }}
          </p>
          <div class="flex items-center justify-between mt-4">
            <span class="text-lg font-bold text-primary-600 dark:text-primary-400">
              NT$ {{ product.price.toLocaleString() }}
            </span>
            <button type="button" class="btn-primary" @click="handleAddToCart(product.id)">
              加入購物車
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="section-card text-center py-12 text-gray-500">
      <Icon name="heroicons:magnifying-glass" class="w-12 h-12 mx-auto mb-3 opacity-40" />
      <p>找不到符合條件的商品</p>
    </div>

    <UiChapterNav
      prev-path="/projects/ecommerce"
      prev-title="電商首頁"
      next-path="/projects/ecommerce/cart"
      next-title="購物車"
    />
  </div>
</template>
