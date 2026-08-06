<script setup lang="ts">
interface CheckoutForm {
  name: string
  email: string
  phone: string
  address: string
  paymentMethod: string
}

interface FormErrorMap {
  name?: string
  email?: string
  phone?: string
  address?: string
  paymentMethod?: string
}

const cartStore = useCartStore()

const formData = ref<CheckoutForm>({
  name: '',
  email: '',
  phone: '',
  address: '',
  paymentMethod: '',
})

const errorMap = ref<FormErrorMap>({})
const isSubmitted = ref(false)
const isSubmitting = ref(false)

function validateForm(): boolean {
  const errors: FormErrorMap = {}

  if (!formData.value.name.trim()) {
    errors.name = '請輸入姓名'
  }

  if (!formData.value.email.trim()) {
    errors.email = '請輸入電子郵件'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.value.email)) {
    errors.email = '電子郵件格式不正確'
  }

  if (!formData.value.phone.trim()) {
    errors.phone = '請輸入手機號碼'
  } else if (!/^09\d{8}$/.test(formData.value.phone.replace(/\s/g, ''))) {
    errors.phone = '請輸入有效的台灣手機號碼（09xxxxxxxx）'
  }

  if (!formData.value.address.trim()) {
    errors.address = '請輸入收件地址'
  } else if (formData.value.address.trim().length < 5) {
    errors.address = '地址至少需要 5 個字元'
  }

  if (!formData.value.paymentMethod) {
    errors.paymentMethod = '請選擇付款方式'
  }

  errorMap.value = errors
  return Object.keys(errors).length === 0
}

async function handleSubmit() {
  if (cartStore.cartProductList.length === 0) return
  if (!validateForm()) return

  isSubmitting.value = true

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1200))

  cartStore.clearCart()
  isSubmitted.value = true
  isSubmitting.value = false
}

function handleReset() {
  formData.value = {
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: '',
  }
  errorMap.value = {}
  isSubmitted.value = false
}
</script>

<template>
  <div>
    <div class="mb-8">
      <h1 class="mb-2">結帳</h1>
      <p class="text-gray-600 dark:text-gray-400">簡易結帳表單示範，包含前端驗證與錯誤提示。</p>
    </div>

    <!-- Success state -->
    <div v-if="isSubmitted" class="section-card text-center py-16">
      <div
        class="w-16 h-16 rounded-full bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center mx-auto mb-4"
      >
        <Icon
          name="heroicons:check-circle"
          class="w-10 h-10 text-primary-600 dark:text-primary-400"
        />
      </div>
      <h2 class="text-xl font-bold mb-2">訂單已送出！</h2>
      <p class="text-gray-500 mb-6">感謝您的購買，我們會盡快為您出貨。</p>
      <div class="flex justify-center gap-3">
        <NuxtLink to="/projects/ecommerce" class="btn-primary"> 繼續購物 </NuxtLink>
        <NuxtLink to="/projects" class="btn-secondary"> 返回專案總覽 </NuxtLink>
      </div>
    </div>

    <!-- Empty cart redirect -->
    <div v-else-if="cartStore.cartProductList.length === 0" class="section-card text-center py-16">
      <Icon
        name="heroicons:shopping-cart"
        class="w-16 h-16 mx-auto mb-4 text-gray-300 dark:text-gray-600"
      />
      <h2 class="text-lg font-semibold mb-2">購物車是空的</h2>
      <p class="text-gray-500 mb-6">請先加入商品再進行結帳。</p>
      <NuxtLink to="/projects/ecommerce/product-list" class="btn-primary"> 瀏覽商品 </NuxtLink>
    </div>

    <!-- Checkout form -->
    <div v-else class="grid gap-8 lg:grid-cols-5">
      <form class="lg:col-span-3 section-card space-y-5" @submit.prevent="handleSubmit">
        <h2 class="text-lg font-semibold">收件資訊</h2>

        <div>
          <label class="block text-sm font-medium mb-1.5"
            >姓名 <span class="text-red-500">*</span></label
          >
          <input
            v-model="formData.name"
            type="text"
            placeholder="王小明"
            class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-sm transition-colors"
            :class="errorMap.name ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'"
          />
          <p v-if="errorMap.name" class="text-xs text-red-500 mt-1">{{ errorMap.name }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1.5"
            >電子郵件 <span class="text-red-500">*</span></label
          >
          <input
            v-model="formData.email"
            type="email"
            placeholder="example@email.com"
            class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-sm transition-colors"
            :class="errorMap.email ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'"
          />
          <p v-if="errorMap.email" class="text-xs text-red-500 mt-1">{{ errorMap.email }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1.5"
            >手機號碼 <span class="text-red-500">*</span></label
          >
          <input
            v-model="formData.phone"
            type="tel"
            placeholder="0912345678"
            class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-sm transition-colors"
            :class="errorMap.phone ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'"
          />
          <p v-if="errorMap.phone" class="text-xs text-red-500 mt-1">{{ errorMap.phone }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1.5"
            >收件地址 <span class="text-red-500">*</span></label
          >
          <textarea
            v-model="formData.address"
            rows="3"
            placeholder="請輸入完整收件地址"
            class="w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-sm transition-colors resize-none"
            :class="errorMap.address ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'"
          />
          <p v-if="errorMap.address" class="text-xs text-red-500 mt-1">{{ errorMap.address }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium mb-1.5"
            >付款方式 <span class="text-red-500">*</span></label
          >
          <div class="space-y-2">
            <label
              v-for="method in [
                { value: 'credit', label: '信用卡' },
                { value: 'linepay', label: 'LINE Pay' },
                { value: 'cod', label: '貨到付款' },
              ]"
              :key="method.value"
              class="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              :class="
                formData.paymentMethod === method.value
                  ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-300 dark:border-gray-600'
              "
            >
              <input
                v-model="formData.paymentMethod"
                type="radio"
                :value="method.value"
                class="text-primary-600"
              />
              <span class="text-sm">{{ method.label }}</span>
            </label>
          </div>
          <p v-if="errorMap.paymentMethod" class="text-xs text-red-500 mt-1">
            {{ errorMap.paymentMethod }}
          </p>
        </div>

        <div class="flex gap-3 pt-2">
          <button type="submit" class="btn-primary flex-1 justify-center" :disabled="isSubmitting">
            <Icon
              v-if="isSubmitting"
              name="heroicons:arrow-path"
              class="w-4 h-4 mr-1.5 animate-spin"
            />
            {{ isSubmitting ? '處理中...' : '確認下單' }}
          </button>
          <button type="button" class="btn-secondary" @click="handleReset">重設</button>
        </div>
      </form>

      <!-- Order summary -->
      <div class="lg:col-span-2 section-card h-fit sticky top-24">
        <h2 class="text-lg font-semibold mb-4">訂單明細</h2>
        <ul class="space-y-3 mb-4">
          <li
            v-for="item in cartStore.cartProductList"
            :key="item.id"
            class="flex justify-between text-sm"
          >
            <span class="text-gray-600 dark:text-gray-400 truncate mr-2">
              {{ item.name }} × {{ item.quantity }}
            </span>
            <span class="font-medium flex-shrink-0">
              NT$ {{ item.lineTotal.toLocaleString() }}
            </span>
          </li>
        </ul>
        <dl class="space-y-2 text-sm pt-4 border-t border-gray-200 dark:border-gray-700">
          <div class="flex justify-between">
            <dt class="text-gray-500">小計</dt>
            <dd>NT$ {{ cartStore.subtotal.toLocaleString() }}</dd>
          </div>
          <div class="flex justify-between">
            <dt class="text-gray-500">運費</dt>
            <dd>
              {{
                cartStore.shippingFee === 0
                  ? '免運'
                  : `NT$ ${cartStore.shippingFee.toLocaleString()}`
              }}
            </dd>
          </div>
          <div class="flex justify-between font-semibold text-base pt-2">
            <dt>合計</dt>
            <dd class="text-primary-600 dark:text-primary-400">
              NT$ {{ cartStore.total.toLocaleString() }}
            </dd>
          </div>
        </dl>
      </div>
    </div>

    <UiChapterNav
      prev-path="/projects/ecommerce/cart"
      prev-title="購物車"
      next-path="/projects"
      next-title="返回專案總覽"
    />
  </div>
</template>
