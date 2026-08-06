export type NotificationType = 'info' | 'success' | 'warning' | 'error'

export interface NotificationItem {
  id: number
  message: string
  type: NotificationType
  createdAt: number
}

/**
 * Global notification panel store.
 * Used by demo pages to push transient feedback messages without a toast library.
 */
export const useNotificationStore = defineStore('notification', () => {
  const notificationList = ref<NotificationItem[]>([])
  const nextNotificationId = ref(1)
  const isPanelOpen = ref(true)

  const notificationCount = computed(() => notificationList.value.length)

  const latestNotification = computed(() => notificationList.value.at(-1) ?? null)

  /** Demo-only heuristic: treats notifications from the last 5 seconds as "unread". */
  const unreadCount = computed(
    () => notificationList.value.filter((item) => item.createdAt > Date.now() - 5000).length,
  )

  function pushNotification(message: string, type: NotificationType = 'info') {
    notificationList.value.push({
      id: nextNotificationId.value++,
      message,
      type,
      createdAt: Date.now(),
    })
  }

  function removeNotification(notificationId: number) {
    notificationList.value = notificationList.value.filter((item) => item.id !== notificationId)
  }

  function clearNotificationList() {
    notificationList.value = []
  }

  function togglePanel() {
    isPanelOpen.value = !isPanelOpen.value
  }

  return {
    notificationList,
    isPanelOpen,
    notificationCount,
    latestNotification,
    unreadCount,
    pushNotification,
    removeNotification,
    clearNotificationList,
    togglePanel,
  }
})
