<template>
  <v-app>
    <v-app-bar :color="current.dark ? 'deep-orange-darken-4' : 'deep-orange-lighten-4'">
      <template #prepend>
        <router-link to="/">
          <v-img height="48px" src="/favicon.svg" width="48px" />
        </router-link>
      </template>
      <template #title>
        <router-link to="/">Knitting Helper</router-link>
      </template>
      <template #append>
        <v-btn
          :icon="current.dark ? mdiWeatherNight : mdiWeatherSunny"
          text="Cycle All Themes"
          @click="cycle()"
        />
      </template>
    </v-app-bar>
    <v-main>
      <router-view v-slot="{ Component }">
        <v-fade-transition>
          <v-container class="fill-height" max-width="500">
            <component :is="Component" />
          </v-container>
        </v-fade-transition>
      </router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>

  import { mdiWeatherNight, mdiWeatherSunny } from '@mdi/js'
  import { useTheme } from 'vuetify/framework'

  const { current, cycle } = useTheme()
</script>
