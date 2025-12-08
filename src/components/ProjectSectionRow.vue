<template>
  <div class="d-flex my-1">
    <div class="flex-grow-1">
      <v-icon :color="started ? (finished ? 'secondary' : 'deep-orange-lighten-2') : 'grey-lighten-1'" :icon="started ? mdiCircle : mdiCircleOutline" />
    </div>
    <div class="d-flex justify-center">
      <ProjectSectionCol
        v-for="col in section.cols"
        :key="`${section.id}_${row}_${col}`"
        :col="col"
        :current="project.current"
        :finished="finished"
        :last="col === section.cols"
        :row="row"
        :section="section"
        :start-index="startIndex"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import type { Project, ProjectSection } from '@/stores/projects.ts'
  import { mdiCircle, mdiCircleOutline } from '@mdi/js'
  import { computed } from 'vue'
  import ProjectSectionCol from '@/components/ProjectSectionCol.vue'

  const props = defineProps<{ startIndex: number, project: Readonly<Project>, section: Readonly<ProjectSection>, row: number }>()
  const started = computed(() => (props.project.current - props.startIndex) > (props.section.cols * (props.row - 1)))
  const finished = computed(() => (props.project.current - props.startIndex) >= (props.section.cols * props.row))

</script>
