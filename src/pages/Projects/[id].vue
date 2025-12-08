<template>
  <v-card v-if="project" class="w-100">
    <v-card-title class="d-flex align-center">
      {{ project.name }}
      <v-spacer />
      <!--      <v-btn density="compact" :icon="mdiPencil" variant="text" />-->
    </v-card-title>
    <v-card-text class="pt-4">
      <template v-for="(section, sectionIndex) in project.sections" :key="section.id">
        <ProjectSection :project="project" :section="section" />
        <v-divider v-if="sectionIndex < project.sections.length - 1" class="my-2" />
      </template>
    </v-card-text>
  </v-card>
  <v-fab
    app
    :disabled="project.current >= maxCurrent"
    :icon="mdiArrowRight"
    location="bottom center"
    size="large"
    @click="advanceProject(id)"
  />
</template>
<script lang="ts" setup>
  import { mdiArrowRight, mdiPencil } from '@mdi/js'
  import { toNumber } from 'es-toolkit/compat'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import useProjects from '@/stores/projects.ts'

  const route = useRoute()
  const { getProject, advanceProject } = useProjects()

  const id = computed(() => toNumber(route.params.id as string))
  const maxCurrent = computed(() => project.value.sections.reduce((acc, curr) => acc + (curr.rows * curr.cols), 0))
  const project = computed(() => getProject(id.value))

</script>
