/**
 * plugins/vuetify.ts
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Composables
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'

import { en, fr } from 'vuetify/locale'
import colors from 'vuetify/util/colors'

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export default createVuetify({
  locale: {
    locale: 'fr',
    fallback: 'en',
    messages: { fr, en },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  theme: {
    defaultTheme: 'system',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.deepOrange.base,
          secondary: colors.lightGreen.lighten3,
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: colors.deepOrange.darken4,
          secondary: colors.lightGreen.darken4,
        },
      },
    },
  },
})
