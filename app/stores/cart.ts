/** Product catalog entry used by the e-commerce demo project. */
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  imageUrl: string
}

/**
 * Minimal cart line item — stores only productId and quantity.
 * Product details are joined at read time via `cartProductList` to avoid stale price/name data.
 */
export interface CartItem {
  productId: string
  quantity: number
}

/** Static seed catalog for the demo; not fetched from an API. */
export const PRODUCT_LIST: Product[] = [
  {
    id: 'p1',
    name: '無線藍牙耳機',
    description: '主動降噪、30 小時續航、IPX5 防水',
    price: 2990,
    category: 'electronics',
    imageUrl: 'https://picsum.photos/seed/headphone/400/400',
  },
  {
    id: 'p2',
    name: '機械式鍵盤',
    description: '青軸手感、RGB 背光、全鍵無衝',
    price: 3490,
    category: 'electronics',
    imageUrl: 'https://picsum.photos/seed/keyboard/400/400',
  },
  {
    id: 'p3',
    name: '人體工學滑鼠',
    description: '垂直設計、減輕腕部壓力',
    price: 1890,
    category: 'electronics',
    imageUrl: 'https://picsum.photos/seed/mouse/400/400',
  },
  {
    id: 'p4',
    name: 'USB-C 集線器',
    description: '7-in-1 擴充、4K HDMI 輸出',
    price: 1590,
    category: 'accessories',
    imageUrl: 'https://picsum.photos/seed/hub/400/400',
  },
  {
    id: 'p5',
    name: '筆電支架',
    description: '鋁合金材質、六段高度調整',
    price: 990,
    category: 'accessories',
    imageUrl: 'https://picsum.photos/seed/stand/400/400',
  },
  {
    id: 'p6',
    name: 'Vue 3 實戰指南',
    description: '從零到一掌握 Composition API 與 Pinia',
    price: 680,
    category: 'books',
    imageUrl: 'https://picsum.photos/seed/vuebook/400/400',
  },
  {
    id: 'p7',
    name: 'TypeScript 進階',
    description: '型別系統、泛型與實務模式',
    price: 720,
    category: 'books',
    imageUrl: 'https://picsum.photos/seed/tsbook/400/400',
  },
  {
    id: 'p8',
    name: '前端面試手冊',
    description: '100+ 道經典面試題詳解',
    price: 550,
    category: 'books',
    imageUrl: 'https://picsum.photos/seed/interview/400/400',
  },
]

export const CATEGORY_LABEL_MAP: Record<string, string> = {
  all: '全部',
  electronics: '電子產品',
  accessories: '配件',
  books: '書籍',
}

/**
 * E-commerce cart store (Setup Store).
 * Demonstrates computed derivations and normalized cart state for the projects/ecommerce chapter.
 */
export const useCartStore = defineStore('cart', () => {
  const productList = ref<Product[]>(PRODUCT_LIST)
  const cartItemList = ref<CartItem[]>([])

  const cartProductList = computed(() =>
    cartItemList.value
      .map((item) => {
        const product = productList.value.find((p) => p.id === item.productId)
        if (!product) return null
        return {
          ...product,
          quantity: item.quantity,
          lineTotal: product.price * item.quantity,
        }
      })
      .filter((item): item is NonNullable<typeof item> => item !== null),
  )

  const itemCount = computed(() => cartItemList.value.reduce((sum, item) => sum + item.quantity, 0))

  const subtotal = computed(() =>
    cartProductList.value.reduce((sum, item) => sum + item.lineTotal, 0),
  )

  /** Free shipping threshold for the demo checkout flow. */
  const shippingFee = computed(() => (subtotal.value >= 3000 ? 0 : 80))

  const total = computed(() => subtotal.value + shippingFee.value)

  function getProductById(productId: string): Product | undefined {
    return productList.value.find((product) => product.id === productId)
  }

  function getCartQuantity(productId: string): number {
    return cartItemList.value.find((item) => item.productId === productId)?.quantity ?? 0
  }

  function addToCart(productId: string, quantity = 1): void {
    const existingItem = cartItemList.value.find((item) => item.productId === productId)
    if (existingItem) {
      existingItem.quantity += quantity
      return
    }
    cartItemList.value.push({ productId, quantity })
  }

  function removeFromCart(productId: string): void {
    cartItemList.value = cartItemList.value.filter((item) => item.productId !== productId)
  }

  function updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    const existingItem = cartItemList.value.find((cartItem) => cartItem.productId === productId)
    if (existingItem) {
      existingItem.quantity = quantity
      return
    }

    cartItemList.value.push({ productId, quantity })
  }

  function incrementQuantity(productId: string): void {
    const current = getCartQuantity(productId)
    updateQuantity(productId, current + 1)
  }

  function decrementQuantity(productId: string): void {
    const current = getCartQuantity(productId)
    updateQuantity(productId, current - 1)
  }

  function clearCart(): void {
    cartItemList.value = []
  }

  return {
    productList,
    cartItemList,
    cartProductList,
    itemCount,
    subtotal,
    shippingFee,
    total,
    categoryLabelMap: CATEGORY_LABEL_MAP,
    getProductById,
    getCartQuantity,
    addToCart,
    removeFromCart,
    updateQuantity,
    incrementQuantity,
    decrementQuantity,
    clearCart,
  }
})
