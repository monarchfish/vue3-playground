<script setup lang="ts">
const { chapterList } = useChapterList()

const heroFeatureList = [
  { icon: 'heroicons:code-bracket', title: '互動式範例', desc: '每個概念都有即時可操作的演示' },
  { icon: 'heroicons:academic-cap', title: '由淺入深', desc: '從基礎語法到進階模式，循序漸進' },
  { icon: 'heroicons:puzzle-piece', title: '實戰專案', desc: '看板、電商、筆記工具完整實作' },
]

const roadmapList = [
  {
    phase: '基礎',
    chapters: ['CH1 模板與響應式', 'CH2 元件系統', 'CH3 生命週期'],
    color: 'bg-green-500',
  },
  { phase: '進階', chapters: ['CH4 進階應用', 'CH5 面試題'], color: 'bg-blue-500' },
  {
    phase: '生態系',
    chapters: ['CH6 Pinia', 'CH7 Tailwind', 'CH8 生態系工具'],
    color: 'bg-purple-500',
  },
  { phase: '實戰', chapters: ['看板 / 儀表板', '電商 / 購物', '筆記工具'], color: 'bg-orange-500' },
]
</script>

<template>
  <div>
    <!-- Hero Section -->
    <section class="text-center mb-16">
      <div class="flex justify-center mb-6">
        <Icon name="logos:vue" class="w-20 h-20" />
      </div>
      <h1 class="text-4xl font-bold mb-4">Vue 3 Playground</h1>
      <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
        互動式學習 Vue 3 完整生態系 — 從基礎語法到實戰專案，邊學邊練
      </p>
      <div class="flex justify-center gap-4">
        <NuxtLink to="/basics" class="btn-primary text-base px-6 py-3"> 開始學習 </NuxtLink>
        <NuxtLink to="/projects" class="btn-secondary text-base px-6 py-3"> 瀏覽專案 </NuxtLink>
      </div>
    </section>

    <!-- Features -->
    <section class="grid sm:grid-cols-3 gap-6 mb-16">
      <div v-for="feature in heroFeatureList" :key="feature.title" class="section-card text-center">
        <Icon
          :name="feature.icon"
          class="w-10 h-10 mx-auto mb-3 text-primary-600 dark:text-primary-400"
        />
        <h3 class="font-semibold mb-1">{{ feature.title }}</h3>
        <p class="text-sm text-gray-500 dark:text-gray-400">{{ feature.desc }}</p>
      </div>
    </section>

    <!-- Learning Roadmap -->
    <section class="mb-16">
      <h2 class="text-center mb-8">學習路線圖</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div v-for="(stage, index) in roadmapList" :key="stage.phase" class="section-card relative">
          <div class="flex items-center gap-2 mb-3">
            <span
              class="w-6 h-6 rounded-full text-white text-xs flex items-center justify-center font-bold"
              :class="stage.color"
            >
              {{ index + 1 }}
            </span>
            <h3 class="font-semibold text-base">{{ stage.phase }}</h3>
          </div>
          <ul class="space-y-1">
            <li
              v-for="chapter in stage.chapters"
              :key="chapter"
              class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1.5"
            >
              <span class="w-1.5 h-1.5 rounded-full" :class="stage.color" />
              {{ chapter }}
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Chapter List -->
    <section>
      <h2 class="text-center mb-8">全部章節</h2>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <NuxtLink
          v-for="chapter in chapterList"
          :key="chapter.path"
          :to="chapter.path"
          class="section-card hover:border-primary-300 dark:hover:border-primary-700 transition-colors group"
        >
          <h3
            class="font-semibold group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors mb-2"
          >
            {{ chapter.title }}
          </h3>
          <p class="text-xs text-gray-500 dark:text-gray-400">
            {{ chapter.children.length - 1 }} 個小節
          </p>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>
