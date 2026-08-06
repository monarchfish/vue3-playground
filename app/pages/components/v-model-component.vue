<script setup lang="ts">
const singleModel = ref('Hello Vue 3')
const firstName = ref('小明')
const lastName = ref('王')

/* eslint-disable no-useless-escape */
const vModelCode = `<!-- 單一 v-model（Vue 3.4+ 使用 defineModel） -->
<!-- 子元件 -->
<script setup lang="ts">
const model = defineModel<string>()
<\/script>

<template>
  <input v-model="model" />
</template>

<!-- 父元件使用 -->
<CustomInput v-model="searchText" />

<!-- 多個 v-model -->
<!-- 子元件 -->
<script setup lang="ts">
const firstName = defineModel<string>('firstName')
const lastName = defineModel<string>('lastName')
<\/script>

<template>
  <input v-model="firstName" />
  <input v-model="lastName" />
</template>

<!-- 父元件使用 -->
<UserForm v-model:first-name="first" v-model:last-name="last" />

<!-- v-model 修飾符 -->
<!-- 子元件 -->
<script setup lang="ts">
const [model, modifiers] = defineModel<string>({
  set(value) {
    if (modifiers.capitalize) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
    return value
  },
})
<\/script>

<!-- 父元件使用 -->
<CustomInput v-model.capitalize="text" />`
/* eslint-enable no-useless-escape */
</script>

<template>
  <div>
    <h1 class="mb-2">元件 v-model</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      <code>v-model</code> 可以用在自訂元件上，實現雙向資料綁定。Vue 3.4 引入了
      <code>defineModel</code> 巨集，大幅簡化了定義方式。
    </p>

    <UiTipCard type="info" title="背後原理">
      <code>v-model</code> 在元件上是 <code>:modelValue</code> +
      <code>@update:modelValue</code> 的語法糖。<code>defineModel</code> 自動處理這些繫結。
    </UiTipCard>

    <h2 class="mt-8 mb-4">單一 v-model</h2>
    <UiLivePreview title="模擬自訂 Input 元件">
      <div class="space-y-4">
        <div class="p-4 border-2 border-dashed border-accent-300 dark:border-accent-700 rounded-lg">
          <p class="text-xs text-accent-600 dark:text-accent-400 font-medium mb-2">
            CustomInput 元件內部
          </p>
          <input
            :value="singleModel"
            class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            @input="singleModel = ($event.target as HTMLInputElement).value"
          />
        </div>
        <p class="text-sm">
          父元件的 v-model 值：「<span class="font-bold">{{ singleModel }}</span
          >」
        </p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">多個 v-model</h2>
    <UiLivePreview title="模擬 UserForm 元件（多個 v-model）">
      <div class="space-y-4">
        <div class="p-4 border-2 border-dashed border-accent-300 dark:border-accent-700 rounded-lg">
          <p class="text-xs text-accent-600 dark:text-accent-400 font-medium mb-3">
            UserForm 元件內部
          </p>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="text-xs text-gray-500">v-model:first-name</label>
              <input
                v-model="firstName"
                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
              />
            </div>
            <div>
              <label class="text-xs text-gray-500">v-model:last-name</label>
              <input
                v-model="lastName"
                class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
              />
            </div>
          </div>
        </div>
        <p class="text-sm">
          父元件狀態 → 姓：<span class="font-bold">{{ lastName }}</span
          >，名：<span class="font-bold">{{ firstName }}</span>
        </p>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="vModelCode" language="vue" title="元件 v-model 各種用法" />

    <UiChapterNav
      prev-path="/components/dynamic-async"
      prev-title="動態與非同步元件"
      next-path="/lifecycle"
      next-title="CH3：生命週期"
    />
  </div>
</template>
