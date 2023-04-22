<template>
  <div
    class="text-white text-center font-bold p-4 rounded mb-4"
    v-if="login_show_alert"
    :class="login_alert_variant"
  >
    {{ translate(login_alert_msg) }}
  </div>
  <vee-form :validation-schema="loginSchema" @submit="login">
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.email') }}</label>
      <vee-field
        id="email"
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('auth.enter-email')"
      />
      <ErrorMessage style="color: red" name="email" />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('auth.password') }}</label>
      <vee-field
        id="password"
        name="password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('auth.enter-password')"
      />
      <ErrorMessage style="color: red" name="password" />
    </div>
    <button
      id="submit"
      :disabled="login_in_submission"
      type="submit"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700"
    >
      {{ $t('composition-items.submit-btn') }}
    </button>
  </vee-form>
</template>

<script>
import { mapActions } from 'pinia'
import useUserStore from '../stores/user'
export default {
  name: 'LoginForm',
  data() {
    return {
      loginSchema: {
        email: 'required|email',
        password: 'required|min:7|max:100'
      },
      login_in_submission: false,
      login_show_alert: false,
      login_alert_variant: 'bg-blue-500',
      login_alert_msg: 'alert.wait-login'
    }
  },
  computed: {
    translate() {
      return (data) => this.$t(`${data}`)
    }
  },
  methods: {
    ...mapActions(useUserStore, ['authenticate']),
    async login(values) {
      this.login_show_alert = true
      this.login_in_submission = true
      this.login_alert_variant = 'bg-blue-500'
      this.login_alert_msg = 'alert.wait-login'

      try {
        await this.authenticate(values)
      } catch (error) {
        this.login_in_submission = true
        this.login_alert_variant = 'bg-red-500'
        this.login_alert_msg = 'alert.error-login'
        return
      }
      this.login_alert_variant = 'bg-green-500'
      this.login_alert_msg = 'alert.success-login'
      window.location.reload()
    }
  }
}
</script>
