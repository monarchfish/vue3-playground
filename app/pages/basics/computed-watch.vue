<script setup lang="ts">
// Computed
const firstName = ref('小明')
const lastName = ref('王')
const fullName = computed(() => `${lastName.value}${firstName.value}`)

// Writable computed
const firstNameWritable = ref('小華')
const lastNameWritable = ref('李')
const fullNameWritable = computed({
  get: () => `${lastNameWritable.value}${firstNameWritable.value}`,
  set: (newValue: string) => {
    lastNameWritable.value = newValue.charAt(0)
    firstNameWritable.value = newValue.slice(1)
  },
})

// Watch
const watchCount = ref(0)
const watchLog = ref<string[]>([])

watch(watchCount, (newVal, oldVal) => {
  watchLog.value.push(`值從 ${oldVal} 變為 ${newVal}`)
  if (watchLog.value.length > 5) watchLog.value.shift()
})

// WatchEffect
const effectInput = ref('')
const effectLog = ref<string[]>([])

watchEffect(() => {
  if (effectInput.value) {
    effectLog.value.push(`偵測到輸入：「${effectInput.value}」`)
    if (effectLog.value.length > 5) effectLog.value.shift()
  }
})

const computedCode = `// 唯讀 computed
const fullName = computed(() => \`\${lastName.value}\${firstName.value}\`)

// 可寫入 computed
const fullName = computed({
  get: () => \`\${lastName.value}\${firstName.value}\`,
  set: (val) => {
    lastName.value = val.charAt(0)
    firstName.value = val.slice(1)
  },
})

// watch - 偵聽特定資料源
watch(count, (newVal, oldVal) => {
  console.log(\`從 \${oldVal} 變為 \${newVal}\`)
})

// watchEffect - 自動追蹤依賴
watchEffect(() => {
  console.log(\`目前輸入：\${input.value}\`)
})`
</script>

<template>
  <div>
    <h1 class="mb-2">Computed & Watch</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      <code>computed</code> 用於宣告衍生狀態，<code>watch</code> /
      <code>watchEffect</code> 用於在資料變更時執行副作用（Side Effect）。
    </p>

    <h2 class="mt-8 mb-4">computed — 計算屬性</h2>
    <UiTipCard type="tip" title="效能優勢">
      computed 具有快取機制，只有當依賴的響應式資料改變時才會重新計算。相比在模板中使用
      method，效能更好。
    </UiTipCard>

    <UiLivePreview title="唯讀 computed">
      <div class="space-y-3">
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-sm font-medium">姓：</label>
            <input
              v-model="lastName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            />
          </div>
          <div>
            <label class="text-sm font-medium">名：</label>
            <input
              v-model="firstName"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            />
          </div>
        </div>
        <p>
          全名（computed）：<span class="font-bold">{{ fullName }}</span>
        </p>
      </div>
    </UiLivePreview>

    <UiLivePreview title="可寫入 computed">
      <div class="space-y-3">
        <div>
          <label class="text-sm font-medium">直接修改全名：</label>
          <input
            v-model="fullNameWritable"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
        </div>
        <p class="text-sm text-gray-500">
          拆解結果 → 姓：{{ lastNameWritable }}，名：{{ firstNameWritable }}
        </p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">watch — 偵聽器</h2>
    <UiLivePreview title="watch 演示">
      <div class="space-y-3">
        <div class="flex items-center gap-3">
          <span>計數：{{ watchCount }}</span>
          <button class="btn-primary" @click="watchCount++">+1</button>
          <button class="btn-secondary" @click="watchCount--">-1</button>
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          <p class="font-medium mb-1">Watch 紀錄：</p>
          <ul class="list-disc list-inside space-y-0.5">
            <li v-for="(log, index) in watchLog" :key="index">{{ log }}</li>
          </ul>
          <p v-if="watchLog.length === 0" class="text-gray-400">（尚無紀錄，請操作計數器）</p>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">watchEffect — 自動追蹤</h2>
    <UiTipCard type="info" title="watch vs watchEffect">
      <code>watch</code> 需明確指定偵聽來源；<code>watchEffect</code>
      會自動追蹤回呼函式中所使用的響應式依賴。
    </UiTipCard>

    <UiLivePreview title="watchEffect 演示">
      <div class="space-y-3">
        <div>
          <label class="text-sm font-medium">輸入任何文字：</label>
          <input
            v-model="effectInput"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            placeholder="試著輸入..."
          />
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400">
          <p class="font-medium mb-1">Effect 紀錄：</p>
          <ul class="list-disc list-inside space-y-0.5">
            <li v-for="(log, index) in effectLog" :key="index">{{ log }}</li>
          </ul>
          <p v-if="effectLog.length === 0" class="text-gray-400">（等待輸入...）</p>
        </div>
      </div>
    </UiLivePreview>

    <UiCodeBlock
      :code="computedCode"
      language="typescript"
      title="computed / watch / watchEffect 範例"
    />

    <UiChapterNav
      prev-path="/basics/reactivity"
      prev-title="響應式 | Reactivity"
      next-path="/basics/conditional-loop"
      next-title="條件與迴圈"
    />
  </div>
</template>
