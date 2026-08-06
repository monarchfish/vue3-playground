<script setup lang="ts">
const activeTab = ref<'reactivity' | 'api' | 'features' | 'breaking'>('reactivity')

const comparisonMap = {
  reactivity: [
    { aspect: '響應式實現', vue2: 'Object.defineProperty', vue3: 'Proxy', highlight: true },
    {
      aspect: '新增/刪除屬性',
      vue2: 'Vue.set / Vue.delete',
      vue3: '直接賦值即可',
      highlight: true,
    },
    {
      aspect: '陣列索引修改',
      vue2: 'Vue.set(arr, index, val)',
      vue3: '直接 arr[index] = val',
      highlight: false,
    },
    { aspect: 'Map / Set 支援', vue2: '不支援', vue3: 'reactive(new Map()) 支援', highlight: true },
  ],
  api: [
    {
      aspect: '邏輯組織',
      vue2: 'Options API（data/methods/mounted）',
      vue3: 'Composition API（setup/ref/computed）',
      highlight: true,
    },
    {
      aspect: '邏輯重用',
      vue2: 'Mixins（命名衝突、來源不明）',
      vue3: 'Composables（清晰、型別安全）',
      highlight: true,
    },
    {
      aspect: 'TypeScript',
      vue2: '支援有限，需額外設定',
      vue3: '原生支援，型別推斷完整',
      highlight: true,
    },
    {
      aspect: '多根節點',
      vue2: '不支援（需包裹 div）',
      vue3: 'Fragment 支援多根節點',
      highlight: false,
    },
  ],
  features: [
    { aspect: 'Teleport', vue2: '無', vue3: '內建 Teleport 元件', highlight: true },
    { aspect: 'Suspense', vue2: '無', vue3: '內建 Suspense（實驗性）', highlight: false },
    { aspect: 'Tree-shaking', vue2: '整包引入', vue3: '按需引入，打包更小', highlight: true },
    {
      aspect: 'Custom Renderer',
      vue2: '有限支援',
      vue3: '@vue/runtime-core 可渲染到 Canvas/WebGL',
      highlight: false,
    },
    {
      aspect: 'v-model',
      vue2: '元件上一個 v-model',
      vue3: '多個 v-model + 修飾符',
      highlight: true,
    },
  ],
  breaking: [
    {
      aspect: 'filter 語法',
      vue2: '{{ msg | capitalize }}',
      vue3: '已移除，改用 method/computed',
      highlight: true,
    },
    {
      aspect: '$on / $off / $once',
      vue2: '事件匯流排',
      vue3: '已移除，改用 mitt 等函式庫',
      highlight: true,
    },
    { aspect: '$children', vue2: '存取子元件', vue3: '已移除，改用 ref', highlight: false },
    { aspect: 'inline-template', vue2: '支援', vue3: '已移除', highlight: false },
    {
      aspect: 'Global API',
      vue2: 'Vue.component() 等',
      vue3: 'app.component() 等（需 createApp）',
      highlight: true,
    },
  ],
}

const tabList = [
  { id: 'reactivity' as const, label: '響應式' },
  { id: 'api' as const, label: 'API 風格' },
  { id: 'features' as const, label: '新特性' },
  { id: 'breaking' as const, label: 'Breaking Changes' },
]

/* eslint-disable no-useless-escape */
const vue2vs3Code = `// Vue 2 Options API
export default {
  data() {
    return { count: 0 }
  },
  computed: {
    double() { return this.count * 2 }
  },
  methods: {
    increment() { this.count++ }
  },
  mounted() {
    console.log('mounted')
  },
}

// Vue 3 Composition API（Nuxt 自動匯入 ref、computed、onMounted）
<script setup lang="ts">
const count = ref(0)
const double = computed(() => count.value * 2)

function increment() { count.value++ }

onMounted(() => console.log('mounted'))
<\/script>

// Vue 3 createApp (Global API change)
// Vue 2: Vue.component('MyComp', {})
// Vue 3:
const app = createApp(App)
app.component('MyComp', {})
app.mount('#app')`
/* eslint-enable no-useless-escape */
</script>

<template>
  <div>
    <h1 class="mb-2">Vue 2 vs Vue 3</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Vue 3
      不是簡單的「升級版」，而是架構層面的重寫。理解兩者差異是面試必考題，也是決定是否遷移的關鍵。
    </p>

    <UiTipCard type="info" title="效能資料（官方基準）">
      Vue 3 更新速度約為 Vue 2 的 <strong>1.3~2 倍</strong>，記憶體使用減少約
      <strong>54%</strong>，打包體積（tree-shaking 後）減少約 <strong>41%</strong>。
    </UiTipCard>

    <h2 class="mt-8 mb-4">對比表格</h2>
    <UiLivePreview title="Vue 2 vs Vue 3 互動對比">
      <div class="space-y-4">
        <div class="flex flex-wrap gap-2">
          <button
            v-for="tab in tabList"
            :key="tab.id"
            class="px-3 py-1.5 text-sm rounded-lg transition-colors"
            :class="
              activeTab === tab.id
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            "
            @click="activeTab = tab.id"
          >
            {{ tab.label }}
          </button>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="border-b border-gray-200 dark:border-gray-700">
                <th class="text-left py-2 pr-4 font-medium">面向</th>
                <th class="text-left py-2 pr-4 font-medium text-orange-600 dark:text-orange-400">
                  Vue 2
                </th>
                <th class="text-left py-2 font-medium text-green-600 dark:text-green-400">Vue 3</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in comparisonMap[activeTab]"
                :key="row.aspect"
                class="border-b border-gray-100 dark:border-gray-800"
                :class="row.highlight ? 'bg-primary-50/50 dark:bg-primary-900/10' : ''"
              >
                <td class="py-2.5 pr-4 font-medium">{{ row.aspect }}</td>
                <td class="py-2.5 pr-4 text-gray-600 dark:text-gray-400">{{ row.vue2 }}</td>
                <td class="py-2.5 text-gray-600 dark:text-gray-400">{{ row.vue3 }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">遷移工具</h2>
    <UiTipCard type="tip" title="@vue/compat 漸進式遷移">
      Vue 3 提供 <code>@vue/compat</code>（Migration Build），讓 Vue 2 專案可以漸進式遷移。大部分
      Vue 2 程式碼可直接運行，並在 console 中提示需修改的部分。
    </UiTipCard>

    <UiCodeBlock :code="vue2vs3Code" language="typescript" title="API 風格對比" />

    <UiChapterNav
      prev-path="/interview/key-usage"
      prev-title="Key 的作用"
      next-path="/interview/performance"
      next-title="效能優化"
    />
  </div>
</template>
