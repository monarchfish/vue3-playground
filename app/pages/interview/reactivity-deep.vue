<script setup lang="ts">
// Manual Proxy demo to show get/set traps
const proxyLogList = ref<string[]>([])

const rawState = { name: 'Vue 3', count: 0 }
const rawStateRecord = rawState as Record<string, unknown>

const proxyState = new Proxy(rawState, {
  get(target, key) {
    proxyLogList.value.unshift(`GET ${String(key)} → ${target[key as keyof typeof target]}`)
    if (proxyLogList.value.length > 8) proxyLogList.value.pop()
    return target[key as keyof typeof target]
  },
  set(target, key, value) {
    proxyLogList.value.unshift(`SET ${String(key)} = ${value}`)
    if (proxyLogList.value.length > 8) proxyLogList.value.pop()
    target[key as keyof typeof target] = value as never
    syncDisplayState()
    return true
  },
})

const displayState = ref({ ...rawState })

function syncDisplayState() {
  displayState.value = { ...rawState }
}

function handleProxyIncrement() {
  proxyState.count++
}

function handleProxyAddKey() {
  ;(proxyState as Record<string, unknown>).newKey = 'dynamic value'
}

const definePropertyLimitList = [
  { issue: '無法偵測新增屬性', example: 'obj.newKey = "value" 不觸發更新' },
  { issue: '無法偵測刪除屬性', example: 'delete obj.key 不觸發更新' },
  { issue: '無法偵測陣列索引/length', example: 'arr[0] = x 或 arr.length = 0' },
  { issue: '需遍歷所有 key', example: '初始化時遞迴 defineProperty，效能較差' },
]

const proxyAdvantageList = [
  { advantage: '攔截任意屬性操作', detail: 'get/set/has/deleteProperty 等 13 種 trap' },
  { advantage: '動態新增/刪除可偵測', detail: '新增屬性自動變成響應式' },
  { advantage: '陣列操作完整支援', detail: '索引修改、length 變更都能追蹤' },
  { advantage: '惰性（Lazy）', detail: '存取時才遞迴代理巢狀物件' },
]

const reactivityCode = `// Vue 2: Object.defineProperty
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() { track(obj, key); return val },
    set(newVal) { val = newVal; trigger(obj, key) },
  })
}

// Vue 3: Proxy
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      track(target, key)
      return Reflect.get(target, key, receiver)
    },
    set(target, key, value, receiver) {
      const result = Reflect.set(target, key, value, receiver)
      trigger(target, key)
      return result
    },
  })
}

// ref uses a wrapper object with .value
// reactive uses Proxy directly on the object`
</script>

<template>
  <div>
    <h1 class="mb-2">響應式原理</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Vue 2 使用 <code>Object.defineProperty</code> 實現響應式；Vue 3 改用 ES6
      <code>Proxy</code>，解決了許多 Vue 2 的限制。這是 Vue 3 面試中最核心的原理題。
    </p>

    <UiTipCard type="info" title="面試答題框架">
      先說明 Vue 2 的做法與限制 → 再說 Vue 3 Proxy 如何解決 → 補充 ref 與 reactive 的差異（ref 用
      <code>.value</code> 包裝原始型別）。
    </UiTipCard>

    <h2 class="mt-8 mb-4">Proxy 互動演示</h2>
    <UiLivePreview title="Proxy get/set trap 攔截">
      <div class="space-y-4">
        <p class="text-sm">
          name = <span class="font-bold">{{ displayState.name }}</span
          >， count = <span class="font-bold">{{ displayState.count }}</span>
        </p>
        <div class="flex gap-2">
          <button class="btn-primary" @click="handleProxyIncrement">count++</button>
          <button class="btn-secondary" @click="handleProxyAddKey">動態新增 newKey</button>
        </div>
        <p v-if="'newKey' in rawState" class="text-sm text-green-600 dark:text-green-400">
          newKey = {{ rawStateRecord.newKey }}（動態新增，Proxy 可攔截 ✅）
        </p>

        <div class="bg-gray-900 rounded-lg p-3 font-mono text-xs max-h-32 overflow-y-auto">
          <div v-if="proxyLogList.length === 0" class="text-gray-500">
            操作上方按鈕觀察 getter/setter 攔截
          </div>
          <div v-for="(log, i) in proxyLogList" :key="i" class="text-green-400 py-0.5">
            {{ log }}
          </div>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">defineProperty vs Proxy 對比</h2>
    <div class="grid sm:grid-cols-2 gap-4">
      <div class="section-card">
        <h3 class="font-semibold text-red-600 dark:text-red-400 mb-3">
          Vue 2 — defineProperty 限制
        </h3>
        <ul class="space-y-2 text-sm">
          <li v-for="item in definePropertyLimitList" :key="item.issue" class="flex flex-col">
            <span class="font-medium">{{ item.issue }}</span>
            <span class="text-gray-500 text-xs">{{ item.example }}</span>
          </li>
        </ul>
      </div>
      <div class="section-card">
        <h3 class="font-semibold text-green-600 dark:text-green-400 mb-3">Vue 3 — Proxy 優勢</h3>
        <ul class="space-y-2 text-sm">
          <li v-for="item in proxyAdvantageList" :key="item.advantage" class="flex flex-col">
            <span class="font-medium">{{ item.advantage }}</span>
            <span class="text-gray-500 text-xs">{{ item.detail }}</span>
          </li>
        </ul>
      </div>
    </div>

    <UiTipCard type="tip" title="ref vs reactive 底層差異" class="mt-6">
      <code>ref</code> 對原始型別建立 <code>{ value: T }</code> 物件再代理；<code>reactive</code>
      直接用 Proxy 代理物件。兩者底層都使用 Proxy，但 ref 需要 <code>.value</code> 存取。
    </UiTipCard>

    <UiCodeBlock :code="reactivityCode" language="typescript" title="響應式實現簡化版" />

    <UiChapterNav
      prev-path="/interview"
      prev-title="CH5：面試題"
      next-path="/interview/diff-algorithm"
      next-title="Diff 演算法"
    />
  </div>
</template>
