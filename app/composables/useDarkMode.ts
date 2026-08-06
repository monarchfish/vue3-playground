/**
 * Project-scoped dark mode toggle backed by VueUse.
 * Wraps `useDark` / `useToggle` so pages share one import surface instead of `@vueuse/core`.
 */
export function useDarkMode() {
  const isDark = useDark()
  const toggleDark = useToggle(isDark)

  return {
    isDark,
    toggleDark,
  }
}
