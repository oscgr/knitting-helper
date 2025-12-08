<template>
  <v-row>
    <v-col cols="12" style="position: sticky; top: 64px; z-index: 1">
      <v-btn block to="/projects/new">
        Ajouter un projet
      </v-btn>

    </v-col>
    <v-col cols="12">
      <v-card>
        <v-list dense>
          <v-list-item v-if="projects.length === 0" density="compact" title="Aucun projet créé" />
          <v-list-item
            v-for="project in projects"
            :key="project.id"
            :to="`/projects/${project.id}`"
          >
            <template #title>
              {{ project.name }}
            </template>
            <template #subtitle>
              Dernière modif. {{ DateTime.fromISO(project.modified).toLocaleString(DateTime.DATETIME_SHORT) }}
            </template>
            <template #append>
              <v-icon
                :color="(project.current >= project.sections.reduce((acc, curr) => acc + (curr.cols * curr.rows), 0)) ? 'success' : (project.current === 0 ? '' : 'warning')"
                :icon="project.current === 0 ? mdiCircleOutline : mdiCircle"
              />
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-col>
  </v-row>
</template>

<script lang="ts" setup>
  import { mdiCircle, mdiCircleOutline } from '@mdi/js'
  import { orderBy } from 'es-toolkit'
  import { DateTime } from 'luxon'
  import { computed } from 'vue'
  import useProjects from '@/stores/projects.ts'

  const { searchProjects } = useProjects()

  const projects = computed(() => orderBy(searchProjects(), ['name', 'created'], ['asc', 'desc']))
</script>
