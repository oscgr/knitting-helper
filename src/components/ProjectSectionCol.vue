<template>
  <v-icon
    class="ml-2"
    :color="checked ? (finished ? 'secondary' : 'deep-orange-lighten-2') : 'grey-lighten-1'"
    :content="row"
    :icon="checked ? (last ? mdiSquareRoundedBadge : mdiSquareRounded) : (last ? mdiSquareRoundedBadgeOutline : mdiSquareRoundedOutline)"
    size="24px"
  />
</template>
<script lang="ts" setup>
  import type { ProjectSection } from '@/stores/projects.ts'
  import { mdiSquareRounded, mdiSquareRoundedBadge, mdiSquareRoundedBadgeOutline, mdiSquareRoundedOutline } from '@mdi/js'
  import { computed } from 'vue'

  const props = defineProps<{
    last: boolean
    current: number
    section: ProjectSection
    startIndex: number
    row: number
    col: number
    finished: boolean
  }>()
  const checked = computed(() => props.current >= (((props.section.cols) * (props.row - 1)) + props.col + props.startIndex))
</script>
