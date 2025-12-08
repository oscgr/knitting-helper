<template>
  <v-form ref="form" novalidate @submit.prevent="saveProject">
    <v-card class="w-100" density="compact">
      <v-card-title>Créer un nouveau projet</v-card-title>
      <v-container fluid>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              v-model="newProject.name"
              color="primary"
              :hint="newProject.name ? '' : `Par défaut : ${defaultName}`"
              label="Nom du projet"
              persistent-hint
              variant="outlined"
            />
          </v-col>
          <v-col v-for="(section, i) in (newProject.sections || [])" :key="i" cols="12">
            <v-card class="pa-4" variant="outlined">
              <div class="mb-4 mt-n1 d-flex justify-space-between">
                <v-badge :content="i + 1" inline />
                <v-btn
                  class="px-2"
                  density="compact"
                  :disabled="(newProject.sections?.length || 0) <= 1"
                  style="text-transform: none"
                  variant="tonal"
                  @click="() => removeSection(i)"
                >Retirer cette section</v-btn>
              </div>
              <v-number-input
                v-model="section.cols"
                density="compact"
                hint="Diminution incluse"
                label="Nombre de rangées"
                :max="99"
                :min="0"
                :rules="[rules.required(), rules.integer(), (v) => (v > 0) || 'Minimum 1']"
                variant="outlined"
              />
              <v-number-input
                v-model="section.rows"
                class="mt-2"
                density="compact"
                hide-details="auto"
                label="Répétitions"
                :max="99"
                :min="0"
                :rules="[rules.required(), rules.integer(), (v) => (v > 0) || 'Minimum 1']"
                variant="outlined"
              />
            </v-card>
          </v-col>
          <v-col cols="12">
            <v-spacer />
            <v-btn block variant="outlined" @click="addSection">Ajouter une section</v-btn>
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn text="Reset" @click="reset" />
        <v-spacer />
        <v-btn text="Annuler" to="/" />
        <v-btn color="primary" text="OK" type="submit" variant="tonal" />
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script lang="ts" setup>

  import type { VForm } from 'vuetify/components'
  import { fakerFR } from '@faker-js/faker'
  import { cloneDeep } from 'es-toolkit'
  import { computed, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useRules } from 'vuetify/labs/rules'
  import useProjects, { type ProjectSectionToCreate, type ProjectToCreate } from '@/stores/projects.ts'

  const form = ref<InstanceType<typeof VForm>>()
  const newProject = ref<ProjectToCreate>({ name: '', sections: [{
    cols: 0,
    rows: 0,
  }] as ProjectSectionToCreate[] })

  const rules = useRules()
  const { addProject } = useProjects()
  const router = useRouter()

  const defaultName = computed(() => `${fakerFR.animal.cat()} ${fakerFR.color.human()}`)

  function reset () {
    form.value?.reset()
    newProject.value.sections = [{ cols: 0, rows: 0 }]
  }

  function addSection () {
    newProject.value.sections.push({ cols: 0, rows: 0 })
  }
  function removeSection (index: number) {
    newProject.value.sections = newProject.value.sections.filter((_, i) => i !== index)
  }

  async function saveProject () {
    const result = await form.value?.validate()
    if (!result?.valid) return
    addProject(cloneDeep({ ...newProject.value, name: newProject.value.name || defaultName.value }))
    reset()
    await router.push('/')
  }
</script>
