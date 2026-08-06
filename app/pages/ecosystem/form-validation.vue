<script setup lang="ts">
interface FormField {
  value: string
  errorMessage: string
}

const formData = reactive({
  email: { value: '', errorMessage: '' } as FormField,
  password: { value: '', errorMessage: '' } as FormField,
  confirmPassword: { value: '', errorMessage: '' } as FormField,
})

const isFormSubmitted = ref(false)

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function validateEmailField() {
  const trimmed = formData.email.value.trim()
  if (!trimmed) {
    formData.email.errorMessage = '電子郵件為必填欄位'
    return false
  }
  if (!emailPattern.test(trimmed)) {
    formData.email.errorMessage = '請輸入有效的電子郵件格式'
    return false
  }
  formData.email.errorMessage = ''
  return true
}

function validatePasswordField() {
  const value = formData.password.value
  if (!value) {
    formData.password.errorMessage = '密碼為必填欄位'
    return false
  }
  if (value.length < 8) {
    formData.password.errorMessage = '密碼至少需要 8 個字元'
    return false
  }
  if (!/[A-Z]/.test(value) || !/[0-9]/.test(value)) {
    formData.password.errorMessage = '密碼需包含大寫字母與數字'
    return false
  }
  formData.password.errorMessage = ''
  return true
}

function validateConfirmPasswordField() {
  if (!formData.confirmPassword.value) {
    formData.confirmPassword.errorMessage = '請再次輸入密碼'
    return false
  }
  if (formData.confirmPassword.value !== formData.password.value) {
    formData.confirmPassword.errorMessage = '兩次輸入的密碼不一致'
    return false
  }
  formData.confirmPassword.errorMessage = ''
  return true
}

const canSubmit = computed(() => {
  const email = formData.email.value.trim()
  const password = formData.password.value
  const confirmPassword = formData.confirmPassword.value

  return Boolean(
    email &&
    emailPattern.test(email) &&
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password) &&
    confirmPassword &&
    confirmPassword === password,
  )
})

function handleFieldBlur(fieldName: keyof typeof formData) {
  if (fieldName === 'email') validateEmailField()
  if (fieldName === 'password') validatePasswordField()
  if (fieldName === 'confirmPassword') validateConfirmPasswordField()
}

function handleFormSubmit() {
  const isEmailValid = validateEmailField()
  const isPasswordValid = validatePasswordField()
  const isConfirmValid = validateConfirmPasswordField()

  if (isEmailValid && isPasswordValid && isConfirmValid) {
    isFormSubmitted.value = true
  }
}

function handleFormReset() {
  formData.email.value = ''
  formData.email.errorMessage = ''
  formData.password.value = ''
  formData.password.errorMessage = ''
  formData.confirmPassword.value = ''
  formData.confirmPassword.errorMessage = ''
  isFormSubmitted.value = false
}

const validationCode = `// 即時驗證 + blur 驗證 + submit 驗證
const email = ref('')
const emailError = ref('')

function validateEmail() {
  if (!email.value.trim()) {
    emailError.value = '電子郵件為必填'
    return false
  }
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email.value)) {
    emailError.value = '格式不正確'
    return false
  }
  emailError.value = ''
  return true
}

// 也可使用第三方函式庫：
// - VeeValidate + Zod
// - FormKit
// - Vuelidate`
</script>

<template>
  <div>
    <h1 class="mb-2">表單驗證 | Validation</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      表單驗證（Form Validation）確保使用者輸入符合預期格式。常見策略包含：即時驗證（on
      input）、失焦驗證（on blur）、以及提交驗證（on submit）。以下演示純 Vue 3 實作的基本驗證模式。
    </p>

    <UiTipCard type="warning" title="何時使用函式庫？">
      簡單表單可手動驗證；複雜表單（多步驟、動態欄位、跨欄位規則）建議使用 VeeValidate + Zod 或
      FormKit，可大幅減少樣板程式碼。
    </UiTipCard>

    <h2 class="mt-8 mb-4">註冊表單驗證演示</h2>
    <UiLivePreview title="互動式表單驗證">
      <form v-if="!isFormSubmitted" class="space-y-4" @submit.prevent="handleFormSubmit">
        <div>
          <label class="text-sm font-medium">電子郵件</label>
          <input
            v-model="formData.email.value"
            type="email"
            class="mt-1 block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-sm"
            :class="
              formData.email.errorMessage
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            "
            @blur="handleFieldBlur('email')"
          />
          <p v-if="formData.email.errorMessage" class="mt-1 text-xs text-red-500">
            {{ formData.email.errorMessage }}
          </p>
        </div>

        <div>
          <label class="text-sm font-medium">密碼</label>
          <input
            v-model="formData.password.value"
            type="password"
            class="mt-1 block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-sm"
            :class="
              formData.password.errorMessage
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            "
            @blur="handleFieldBlur('password')"
          />
          <p v-if="formData.password.errorMessage" class="mt-1 text-xs text-red-500">
            {{ formData.password.errorMessage }}
          </p>
        </div>

        <div>
          <label class="text-sm font-medium">確認密碼</label>
          <input
            v-model="formData.confirmPassword.value"
            type="password"
            class="mt-1 block w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-800 text-sm"
            :class="
              formData.confirmPassword.errorMessage
                ? 'border-red-500'
                : 'border-gray-300 dark:border-gray-600'
            "
            @blur="handleFieldBlur('confirmPassword')"
          />
          <p v-if="formData.confirmPassword.errorMessage" class="mt-1 text-xs text-red-500">
            {{ formData.confirmPassword.errorMessage }}
          </p>
        </div>

        <div class="flex gap-2">
          <button type="submit" class="btn-primary" :disabled="!canSubmit">提交</button>
          <button type="button" class="btn-secondary" @click="handleFormReset">重設</button>
        </div>
      </form>

      <div
        v-else
        class="p-4 bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800 rounded-lg"
      >
        <p class="font-semibold text-primary-700 dark:text-primary-300">✅ 驗證通過！</p>
        <p class="text-sm mt-1">email: {{ formData.email.value }}</p>
        <button class="btn-secondary text-xs mt-3" @click="handleFormReset">重新填寫</button>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="validationCode" language="typescript" title="表單驗證模式" />

    <UiChapterNav
      prev-path="/ecosystem/nuxt-features"
      prev-title="Nuxt 特色功能"
      next-path="/api"
      next-title="API 串接"
    />
  </div>
</template>
