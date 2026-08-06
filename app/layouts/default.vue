<script setup lang="ts">
const route = useRoute()
const isLargeScreen = useMediaQuery('(min-width: 1024px)')
// Desktop: sidebar visible by default; mobile: closed to avoid a blocking overlay on first paint
const isSidebarOpen = ref(isLargeScreen.value)

function handleToggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}

// Mobile overlay persists across client-side navigations unless explicitly dismissed
watch(
  () => route.path,
  () => {
    if (!isLargeScreen.value) {
      isSidebarOpen.value = false
    }
  },
)
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <LayoutAppHeader @toggle-sidebar="handleToggleSidebar" />

    <!-- pt-16 and lg:ml-64 must stay in sync with AppHeader h-16 and AppSidebar w-64 -->
    <div class="flex flex-1 pt-16">
      <LayoutAppSidebar :is-open="isSidebarOpen" @close="isSidebarOpen = false" />

      <main class="flex-1 transition-all duration-300" :class="isSidebarOpen ? 'lg:ml-64' : ''">
        <div class="page-container">
          <slot />
        </div>
      </main>
    </div>

    <LayoutAppFooter :class="isSidebarOpen ? 'lg:ml-64' : ''" />
  </div>
</template>
