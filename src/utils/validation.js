import {
  Form as VeeForm,
  Field as VeeField,
  defineRule,
  ErrorMessage,
  configure
} from 'vee-validate'
import {
  required,
  min,
  max,
  alpha_spaces as alphaSpaces,
  email,
  min_value as minVal,
  max_value as maxVal,
  confirmed,
  not_one_of as excluded
} from '@vee-validate/rules'
import i18n from './i18n'

export default {
  /**
   * The function installs and configures validation rules and messages for a VeeValidate form in a
   * Vue.js application.
   * @param app - `app` is an instance of a Vue.js application. It is used to register global
   * components and configure the validation behavior for the VeeValidate library.
   */
  install(app) {
    /* `app.component('VeeForm', VeeForm)` is registering a global component called `VeeForm` in the
    Vue.js application using the `app` instance. This component is imported from the `vee-validate`
    library and is used to create forms with validation rules. By registering it globally, it can be
    used in any component without the need to import it again. */
    app.component('VeeForm', VeeForm)
    app.component('VeeField', VeeField)
    app.component('ErrorMessage', ErrorMessage)

    /* `defineRule('required', required)` is defining a new validation rule called "required" using the
    `required` rule from the `@vee-validate/rules` library. This allows the "required" rule to be used
    in VeeValidate forms to validate that a field is not empty. */
    defineRule('required', required)
    defineRule('tos', required)
    defineRule('min', min)
    defineRule('max', max)
    defineRule('alpha_spaces', alphaSpaces)
    defineRule('email', email)
    defineRule('min_value', minVal)
    defineRule('max_value', maxVal)
    defineRule('confirmed', confirmed)
    defineRule('password_missmatch', confirmed)
    defineRule('excluded', excluded)
    defineRule('country_exclude', excluded)

    /* `configure()` is a function from the VeeValidate library that allows you to configure the
    validation behavior. In this code, it is being used to set the validation messages for each rule
    and to enable/disable validation triggers. */
    configure({
      generateMessage: (ctx) => {
        const messages = {
          required: i18n.global.t('validation.required', { value: `${ctx.field}` }),
          min: i18n.global.t('validation.too-short', { value: `${ctx.field}` }),
          max: i18n.global.t('validation.too-long', { value: `${ctx.field}` }),
          alpha_spaces: i18n.global.t('validation.alpha-spaces', { value: `${ctx.field}` }),
          email: i18n.global.t('validation.valid-email', { value: `${ctx.field}` }),
          min_value: i18n.global.t('validation.age-low', { value: `${ctx.field}` }),
          max_value: i18n.global.t('validation.age-high', { value: `${ctx.field}` }),
          excluded: i18n.global.t('validation.exclude'),
          country_exclude: i18n.global.t('validation.country-exclude'),
          password_missmatch: i18n.global.t('validation.password-miss'),
          tos: i18n.global.t('validation.accept-tos')
        }
        const message = messages[ctx.rule.name]
          ? messages[ctx.rule.name]
          : i18n.global.t('validation.name-invalid', { value: `${ctx.field}` })
        return message
      },
      validateOnBlur: true,
      validateOnChange: true,
      validateOnInput: false,
      validateOnModelUpdate: true
    })
  }
}
