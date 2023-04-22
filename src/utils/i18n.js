import { createI18n } from 'vue-i18n'
import en from '../locales/en.json'
import id from '../locales/id.json'

export default createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  /* `messages: { en, id }` is defining the messages for the `en` and `id` locales. The `en` and `id`
  variables are imported from their respective JSON files located in the `locales` folder. These
  messages are used by the `vue-i18n` library to translate text in the application based on the
  user's selected locale. */
  messages: {
    en,
    id
  },
  /* `numberFormats` is an option in the `createI18n` function that allows you to define number
  formatting options for different locales. In this code, it is defining the currency formatting
  options for the `en` and `id` locales. */
  numberFormats: {
    en: {
      currency: {
        style: 'currency',
        currency: 'USD'
      }
    },
    id: {
      currency: {
        style: 'currency',
        currency: 'IDR'
      }
    }
  }
})
