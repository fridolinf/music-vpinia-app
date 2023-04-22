<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="reg_show_alert"
    :class="reg_alert_variant"
  >
    {{ translate(reg_alert_msg) }}
  </div>
  <vee-form @submit="register" :validation-schema="schema" :initial-values="userData">
    <!-- using schema from schema object -->
    <!-- using inital value for form on userData object -->
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.name') }}</label>
      <!-- using vee-validate tag for validation -->
      <!-- :rules if from validation.js it's mean using rules from @vue-validate/rules, which is defined in validation.js on defineRule() -->
      <vee-field
        id="name"
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('auth.enter-name')"
      >
      </vee-field>
      <ErrorMessage style="color: red" name="name" />
      <!-- ErrorMessage is from vee-validate where is automatic appears when any input not passed right -->
      <!-- name is much same for the vee-field name -->
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.email') }}</label>
      <vee-field
        id="email"
        type="email"
        name="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('auth.enter-email')"
      />

      <ErrorMessage style="color: red" name="email" />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.age') }}</label>
      <vee-field
        id="age"
        type="number"
        name="age"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage style="color: red" name="age" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.password') }}</label>
      <vee-field v-slot="{ field, errors }" name="password" :bails="false">
        <input
          id="password"
          :placeholder="$t('auth.password')"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
          type="password"
          v-bind="field"
        />
        <div style="color: red" class="text-red-600" v-for="error in errors" :key="error">
          {{ error }}
        </div>
      </vee-field>
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.confirm-password') }}</label>
      <vee-field
        id="confirm_password"
        type="password"
        name="confirm_password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('auth.enter-confirm-password')"
      />
      <ErrorMessage style="color: red" name="confirm_password" />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.country') }}</label>
      <vee-field
        id="country"
        name="country"
        as="select"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
      >
        <option value="USA">USA</option>
        <option value="Mexico">Mexico</option>
        <option value="Germany">Germany</option>
        <option value="Antarctica">Indonesia</option>
        <option value="Antarctica">Antarctica</option>
      </vee-field>
      <ErrorMessage style="color: red" name="country" />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        id="tos"
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <!-- Translating a html component using i18n Component Interpolation -->
      <i18n-t class="inline-block" keypath="auth.accept" tag="label"
        ><a href="#">{{ $t('auth.tos') }}</a></i18n-t
      >
      <br />
      <ErrorMessage style="color: red" name="tos" />
    </div>
    <button
      id="submit-register"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
      :disabled="reg_in_submission"
    >
      {{ $t('composition-items.submit-btn') }}
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '../stores/user'
export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:7|max:100|excluded: password',
        confirm_password: 'password_missmatch:@password', //@password must match for the previous value for validate
        country: 'required|country_exclude:Antarctica', //excluded can validate more than one value with "," Antarctica, Brazil ...
        tos: 'tos'
      },
      userData: {
        country: 'USA'
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'alert.wait-register'
    }
  },
  computed: {
    translate() {
      return (data) => this.$t(`${data}`)
    }
  },
  methods: {
    ...mapActions(useUserStore, {
      createUser: 'register'
    }),
    // mapActions is using actions method from Pinia,
    // createUser is aliases for "register function" in store "user.js"
    async register(values) {
      this.reg_show_alert = true
      this.reg_in_submission = true
      this.reg_alert_variant = 'bg-blue-500'
      this.reg_alert_msg = 'alert.wait-register'
      try {
        await this.createUser(values)
      } catch (error) {
        this.reg_in_submission = false
        this.reg_alert_variant = 'bg-red-500'
        this.reg_alert_msg = 'alert.error-register'
        return
      }
      this.reg_alert_variant = 'bg-blue-500'
      this.reg_alert_msg = 'alert.success-register'
      window.location.reload()
    }
  }
}
</script>
