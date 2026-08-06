<script setup lang="ts">
const notificationStore = useNotificationStore()

const messageInput = ref('')
const selectedType = ref<'info' | 'success' | 'warning' | 'error'>('info')

const typeStyleMap: Record<string, string> = {
  info: 'bg-accent-100 text-accent-800 dark:bg-accent-900/30 dark:text-accent-300',
  success: 'bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300',
  warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  error: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
}

function handlePushNotification() {
  if (!messageInput.value.trim()) return
  notificationStore.pushNotification(messageInput.value, selectedType.value)
  messageInput.value = ''
}

const setupStoreCode = `// Setup Store — 組合式函式語法
export const useNotificationStore = defineStore('notification', () => {
  const notificationList = ref<NotificationItem[]>([])
  const isPanelOpen = ref(true)

  // computed 作為 getter
  const notificationCount = computed(() => notificationList.value.length)

  const latestNotification = computed(() =>
    notificationList.value.at(-1) ?? null,
  )

  // function 作為 action
  function pushNotification(message: string, type: NotificationType) {
    notificationList.value.push({
      id: Date.now(),
      message,
      type,
      createdAt: Date.now(),
    })
  }

  function removeNotification(id: number) {
    notificationList.value = notificationList.value.filter(n => n.id !== id)
  }

  // 必須 return 所有要暴露的 state / getter / action
  return {
    notificationList,
    isPanelOpen,
    notificationCount,
    latestNotification,
    pushNotification,
    removeNotification,
  }
})`
</script>

<template>
  <div>
    <h1 class="mb-2">Setup Store | Composable Store</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      Setup Store 使用組合式函式（Composable）語法撰寫，內部直接使用 <code>ref</code>、<code
        >computed</code
      >
      等 Composition API。這種寫法更靈活，特別適合複雜邏輯或需要重用 composable 的場景。
    </p>

    <UiTipCard type="info" title="Options Store vs Setup Store">
      兩者功能等價，選擇取決於團隊偏好。若你熟悉 Composition API，Setup Store 會更自然；若偏好 Vue 2
      風格的結構化寫法，Options Store 更合適。
    </UiTipCard>

    <h2 class="mt-8 mb-4">Setup Store 互動演示</h2>
    <UiLivePreview title="Notification Store 演示">
      <div class="space-y-4">
        <div class="flex items-center gap-3 text-sm">
          <span>通知數量：{{ notificationStore.notificationCount }}</span>
          <span>近期未讀：{{ notificationStore.unreadCount }}</span>
          <button class="btn-secondary text-xs" @click="notificationStore.togglePanel()">
            {{ notificationStore.isPanelOpen ? '收合面板' : '展開面板' }}
          </button>
        </div>

        <div v-if="notificationStore.isPanelOpen" class="flex gap-2">
          <input
            v-model="messageInput"
            placeholder="輸入通知訊息..."
            class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
            @keyup.enter="handlePushNotification"
          />
          <select
            v-model="selectedType"
            class="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-sm"
          >
            <option value="info">info</option>
            <option value="success">success</option>
            <option value="warning">warning</option>
            <option value="error">error</option>
          </select>
          <button class="btn-primary" @click="handlePushNotification">推送</button>
        </div>

        <ul v-if="notificationStore.notificationList.length" class="space-y-2">
          <li
            v-for="item in notificationStore.notificationList"
            :key="item.id"
            class="flex items-center gap-2 p-2 rounded-lg text-sm"
            :class="typeStyleMap[item.type]"
          >
            <span class="font-mono text-xs">[{{ item.type }}]</span>
            <span class="flex-1">{{ item.message }}</span>
            <button
              class="text-xs opacity-60 hover:opacity-100"
              @click="notificationStore.removeNotification(item.id)"
            >
              ✕
            </button>
          </li>
        </ul>
        <p v-else class="text-sm text-gray-400">尚無通知</p>

        <button
          v-if="notificationStore.notificationList.length"
          class="btn-secondary text-xs"
          @click="notificationStore.clearNotificationList()"
        >
          清除全部
        </button>
      </div>
    </UiLivePreview>

    <UiCodeBlock :code="setupStoreCode" language="typescript" title="Setup Store 範例" />

    <UiChapterNav
      prev-path="/pinia/actions"
      prev-title="Actions 與非同步"
      next-path="/pinia/plugins"
      next-title="Plugins 與持久化"
    />
  </div>
</template>
