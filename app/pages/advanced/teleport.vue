<script setup lang="ts">
const isModalOpen = ref(false)
const isTooltipVisible = ref(false)
const tooltipPosition = ref({ x: 0, y: 0 })

function handleOpenModal() {
  isModalOpen.value = true
}

function handleCloseModal() {
  isModalOpen.value = false
}

function handleShowTooltip(event: MouseEvent) {
  tooltipPosition.value = { x: event.clientX, y: event.clientY }
  isTooltipVisible.value = true
}

function handleHideTooltip() {
  isTooltipVisible.value = false
}

const teleportCode = `<!-- Modal: teleport to body -->
<Teleport to="body">
  <div v-if="isOpen" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <h2>Modal Title</h2>
      <p>Modal content here</p>
      <button @click="close">Close</button>
    </div>
  </div>
</Teleport>

<!-- Tooltip: teleport to body with fixed position -->
<Teleport to="body">
  <div
    v-if="visible"
    class="tooltip"
    :style="{ top: y + 'px', left: x + 'px' }"
  >
    Tooltip text
  </div>
</Teleport>

<!-- Teleport to specific selector -->
<Teleport to="#sidebar-portal">
  <NotificationBanner />
</Teleport>

<!-- Disabled: render in place -->
<Teleport to="body" :disabled="!isMobile">
  <MobileMenu />
</Teleport>`
</script>

<template>
  <div>
    <h1 class="mb-2">Teleport</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-6">
      <code>&lt;Teleport&gt;</code> 將元件的子節點渲染到 DOM 中的其他位置，常用於
      Modal、Toast、Tooltip 等需要脫離父元件 CSS 限制（如
      <code>overflow: hidden</code>、<code>z-index</code>）的 UI。
    </p>

    <UiTipCard type="info" title="Teleport 的特性">
      邏輯上仍屬於原元件樹，props、events、provide/inject 完全正常運作。只是 DOM
      節點被移動到目標容器（預設 <code>body</code>）。
    </UiTipCard>

    <h2 class="mt-8 mb-4">Modal 演示</h2>
    <UiLivePreview title="Teleport Modal">
      <div class="space-y-3">
        <p class="text-sm text-gray-500">
          Modal 透過 Teleport 渲染到 body，不受父容器 overflow 限制
        </p>
        <button class="btn-primary" @click="handleOpenModal">開啟 Modal</button>
      </div>
    </UiLivePreview>

    <Teleport to="body">
      <div
        v-if="isModalOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        @click="handleCloseModal"
      >
        <div
          class="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-md w-full mx-4 shadow-2xl"
          @click.stop
        >
          <h3 class="text-lg font-semibold mb-2">Teleport Modal</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
            此 Modal 透過 <code>&lt;Teleport to="body"&gt;</code> 渲染到 document.body，不受父層 CSS
            影響。
          </p>
          <button class="btn-primary" @click="handleCloseModal">關閉</button>
        </div>
      </div>
    </Teleport>

    <h2 class="mt-8 mb-4">Tooltip 演示</h2>
    <UiLivePreview title="Teleport Tooltip">
      <p class="text-sm text-gray-500 mb-3">將滑鼠移到按鈕上顯示 Tooltip（Teleport 到 body）</p>
      <button class="btn-secondary" @mouseenter="handleShowTooltip" @mouseleave="handleHideTooltip">
        Hover 顯示 Tooltip
      </button>
    </UiLivePreview>

    <Teleport to="body">
      <div
        v-if="isTooltipVisible"
        class="fixed z-50 px-3 py-1.5 text-xs text-white bg-gray-900 dark:bg-gray-700 rounded shadow-lg pointer-events-none"
        :style="{ top: `${tooltipPosition.y + 12}px`, left: `${tooltipPosition.x}px` }"
      >
        Teleport Tooltip 提示
      </div>
    </Teleport>

    <UiCodeBlock :code="teleportCode" language="vue" title="Teleport 用法範例" />

    <UiChapterNav
      prev-path="/advanced/render-function"
      prev-title="Render Function"
      next-path="/advanced/suspense"
      next-title="Suspense"
    />
  </div>
</template>
