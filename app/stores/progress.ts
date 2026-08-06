/**
 * Learning progress tracker (Option Store).
 * Uses a Set so page paths are deduplicated and membership checks stay O(1).
 */
export const useProgressStore = defineStore('progress', {
  state: () => ({
    completedPageSet: new Set<string>(),
  }),

  getters: {
    completedCount: (state) => state.completedPageSet.size,

    isPageCompleted: (state) => (pagePath: string) => state.completedPageSet.has(pagePath),

    completionRate: (state) => (totalPageCount: number) => {
      if (totalPageCount === 0) return 0
      return Math.round((state.completedPageSet.size / totalPageCount) * 100)
    },
  },

  actions: {
    markPageCompleted(pagePath: string) {
      this.completedPageSet.add(pagePath)
    },

    unmarkPageCompleted(pagePath: string) {
      this.completedPageSet.delete(pagePath)
    },

    togglePageCompleted(pagePath: string) {
      if (this.completedPageSet.has(pagePath)) {
        this.completedPageSet.delete(pagePath)
      } else {
        this.completedPageSet.add(pagePath)
      }
    },

    resetProgress() {
      this.completedPageSet.clear()
    },
  },
})
