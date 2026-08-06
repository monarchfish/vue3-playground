import type { PiniaPluginContext } from 'pinia'

/** Store IDs opted into localStorage persistence. Extend this list to enable restore/subscribe for new stores. */
const PERSISTED_STORE_KEY_LIST = ['progress'] as const

type PersistedStoreId = (typeof PERSISTED_STORE_KEY_LIST)[number]

function getStorageKey(storeId: string) {
  return `pinia-${storeId}`
}

/** Client-only Pinia plugin that hydrates and persists selected stores via localStorage. */
export default defineNuxtPlugin(({ $pinia }) => {
  $pinia.use((context: PiniaPluginContext) => {
    const storeId = context.store.$id as PersistedStoreId

    if (!PERSISTED_STORE_KEY_LIST.includes(storeId)) return

    const storageKey = getStorageKey(storeId)

    if (import.meta.client) {
      const savedState = localStorage.getItem(storageKey)
      if (savedState) {
        try {
          const parsedState = JSON.parse(savedState)
          // Set is not JSON-serializable; progress store persists completedPageList and rehydrates into a Set.
          if (storeId === 'progress' && Array.isArray(parsedState.completedPageList)) {
            context.store.$patch({
              completedPageSet: new Set(parsedState.completedPageList),
            })
          }
        } catch (error) {
          console.error('Failed to restore Pinia state:', error)
        }
      }
    }

    context.store.$subscribe((_mutation, state) => {
      if (!import.meta.client) return

      if (storeId === 'progress') {
        const serializableState = {
          completedPageList: Array.from(state.completedPageSet as Set<string>),
        }
        localStorage.setItem(storageKey, JSON.stringify(serializableState))
      }
    })
  })
})
