<script setup lang="ts">
const projectList = [
  {
    path: '/projects/kanban',
    title: '看板 | Kanban',
    icon: 'heroicons:view-columns',
    description: '使用 Pinia 管理多欄位看板狀態，示範跨欄位移動卡片、新增刪除與排序等實務模式。',
    tagList: ['Pinia', '狀態管理', 'CRUD'],
  },
  {
    path: '/projects/ecommerce',
    title: '電商 | E-Commerce',
    icon: 'heroicons:shopping-bag',
    description:
      '完整的迷你電商流程：商品列表、篩選排序、購物車、結帳表單驗證，展示 computed 與 store 協作。',
    tagList: ['Pinia', '表單驗證', '路由'],
  },
  {
    path: '/projects/notes',
    title: '筆記工具 | Notes',
    icon: 'heroicons:document-text',
    description: '以 VueUse useStorage 持久化筆記，支援 Markdown 預覽、搜尋篩選與 CRUD 操作。',
    tagList: ['VueUse', 'localStorage', 'Markdown'],
  },
]
</script>

<template>
  <div>
    <h1 class="mb-2">CH9：實戰專案 | Projects</h1>
    <p class="text-gray-600 dark:text-gray-400 mb-8">
      將前面所學的 Vue 3
      知識整合到三個迷你應用中。每個專案都是可互動的完整功能示範，幫助你理解真實開發中的模式與最佳實踐。
    </p>

    <UiTipCard type="info" title="學習重點">
      這些專案涵蓋 Pinia 狀態管理、Composition API、VueUse 工具、表單驗證與 Tailwind CSS
      排版。建議先完成 CH1–CH8 的基礎章節後再動手操作。
    </UiTipCard>

    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-8">
      <NuxtLink
        v-for="project in projectList"
        :key="project.path"
        :to="project.path"
        class="section-card hover:border-primary-300 dark:hover:border-primary-700 transition-all group hover:shadow-md"
      >
        <div class="flex items-start gap-4">
          <div
            class="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/40 flex items-center justify-center"
          >
            <Icon :name="project.icon" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div class="flex-1 min-w-0">
            <h3
              class="text-base font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors"
            >
              {{ project.title }}
            </h3>
            <p class="text-sm text-gray-500 dark:text-gray-400 mt-2 leading-relaxed">
              {{ project.description }}
            </p>
            <div class="flex flex-wrap gap-1.5 mt-3">
              <span
                v-for="tag in project.tagList"
                :key="tag"
                class="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>

    <UiChapterNav
      prev-path="/api/data-flow"
      prev-title="Data Flow"
      next-path="/projects/kanban"
      next-title="看板 | Kanban"
    />
  </div>
</template>
