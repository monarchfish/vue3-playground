<script setup lang="ts">
// Text input
const textValue = ref('')

// Textarea
const textareaValue = ref('')

// Checkbox
const isChecked = ref(false)
const checkedNameList = ref<string[]>([])

// Radio
const selectedRadio = ref('')

// Select
const selectedOption = ref('')
const _selectedMultiple = ref<string[]>([])

// Number / Trim / Lazy modifiers
const lazyValue = ref('')
const numberValue = ref(0)
const trimValue = ref('')

const formCode = `<template>
  <!-- 文字輸入 -->
  <input v-model="text" />

  <!-- Textarea -->
  <textarea v-model="message"></textarea>

  <!-- Checkbox（單一） -->
  <input v-model="checked" type="checkbox" />

  <!-- Checkbox（多選） -->
  <input v-model="checkedNames" type="checkbox" value="Jack" />
  <input v-model="checkedNames" type="checkbox" value="Rose" />

  <!-- Radio -->
  <input v-model="picked" type="radio" value="A" />
  <input v-model="picked" type="radio" value="B" />

  <!-- Select -->
  <select v-model="selected">
    <option value="A">選項 A</option>
    <option value="B">選項 B</option>
  </select>

  <!-- 修飾符 -->
  <input v-model.lazy="msg" />    <!-- 在 change 事件後更新 -->
  <input v-model.number="age" />  <!-- 自動轉換為數字 -->
  <input v-model.trim="name" />   <!-- 自動去除首尾空白 -->
</template>`
</script>

<template>
  <div>
    <h1 class="mb-2">表單綁定 | Form Binding</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      <code>v-model</code> 指令在表單輸入元素上建立雙向資料綁定（Two-way Binding），是
      <code>:value</code> + <code>@input</code> 的語法糖。
    </p>

    <h2 class="mt-8 mb-4">文字輸入</h2>
    <UiLivePreview title="input text">
      <div class="space-y-2">
        <input
          v-model="textValue"
          class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          placeholder="輸入文字..."
        />
        <p class="text-sm text-gray-500">綁定值：「{{ textValue }}」</p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">多行文字（Textarea）</h2>
    <UiLivePreview title="textarea">
      <div class="space-y-2">
        <textarea
          v-model="textareaValue"
          rows="3"
          class="block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm resize-none"
          placeholder="輸入多行文字..."
        />
        <p class="text-sm text-gray-500">字數：{{ textareaValue.length }}</p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">核取方塊（Checkbox）</h2>
    <UiLivePreview title="checkbox">
      <div class="space-y-4">
        <div>
          <label class="flex items-center gap-2">
            <input v-model="isChecked" type="checkbox" />
            <span class="text-sm">同意使用條款</span>
          </label>
          <p class="text-sm text-gray-500 mt-1">值：{{ isChecked }}</p>
        </div>

        <div>
          <p class="text-sm font-medium mb-2">選擇你喜歡的框架：</p>
          <div class="flex gap-4">
            <label
              v-for="name in ['Vue', 'React', 'Angular', 'Svelte']"
              :key="name"
              class="flex items-center gap-1.5"
            >
              <input v-model="checkedNameList" type="checkbox" :value="name" />
              <span class="text-sm">{{ name }}</span>
            </label>
          </div>
          <p class="text-sm text-gray-500 mt-1">
            已選：{{ checkedNameList.join(', ') || '（無）' }}
          </p>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">單選按鈕（Radio）</h2>
    <UiLivePreview title="radio">
      <div class="space-y-2">
        <div class="flex gap-4">
          <label
            v-for="option in ['前端', '後端', '全端']"
            :key="option"
            class="flex items-center gap-1.5"
          >
            <input v-model="selectedRadio" type="radio" :value="option" />
            <span class="text-sm">{{ option }}</span>
          </label>
        </div>
        <p class="text-sm text-gray-500">已選：{{ selectedRadio || '（無）' }}</p>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">下拉選單（Select）</h2>
    <UiLivePreview title="select">
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium">單選：</label>
          <select
            v-model="selectedOption"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          >
            <option value="" disabled>請選擇</option>
            <option value="taipei">台北</option>
            <option value="taichung">台中</option>
            <option value="kaohsiung">高雄</option>
          </select>
          <p class="text-sm text-gray-500 mt-1">值：{{ selectedOption || '（未選）' }}</p>
        </div>
      </div>
    </UiLivePreview>

    <h2 class="mt-8 mb-4">v-model 修飾符</h2>
    <UiTipCard type="tip" title="三個內建修飾符">
      <code>.lazy</code> 在 change 事件後才同步（而非 input）、<code>.number</code>
      自動將值轉為數字、<code>.trim</code> 自動去除首尾空白。
    </UiTipCard>

    <UiLivePreview title="修飾符演示">
      <div class="space-y-4">
        <div>
          <label class="text-sm font-medium">v-model.lazy（失焦後才更新）：</label>
          <input
            v-model.lazy="lazyValue"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            placeholder="輸入後按 Tab 或點擊其他地方..."
          />
          <p class="text-sm text-gray-500 mt-1">值：「{{ lazyValue }}」</p>
        </div>

        <div>
          <label class="text-sm font-medium">v-model.number（自動轉數字）：</label>
          <input
            v-model.number="numberValue"
            type="number"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          />
          <p class="text-sm text-gray-500 mt-1">
            值：{{ numberValue }}（型別：{{ typeof numberValue }}）
          </p>
        </div>

        <div>
          <label class="text-sm font-medium">v-model.trim（去除空白）：</label>
          <input
            v-model.trim="trimValue"
            class="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            placeholder="嘗試在前後加入空白..."
          />
          <p class="text-sm text-gray-500 mt-1">
            值：「{{ trimValue }}」（長度：{{ trimValue.length }}）
          </p>
        </div>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="formCode" language="vue" title="表單綁定語法" />

    <UiChapterNav
      prev-path="/basics/event-binding"
      prev-title="事件處理"
      next-path="/components"
      next-title="CH2：元件系統"
    />
  </div>
</template>
