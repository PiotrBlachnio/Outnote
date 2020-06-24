<template>
  <div class="auth login">
    <notification />

    <auth-form form-type="login" button-label="Sign in" @submit="signIn">
      <auth-input
        id="email"
        label="Email"
        type="email"
        v-model="form.email"
        :error="error.emailInput"
      />
      <auth-input
        id="Password"
        label="Password"
        type="password"
        v-model="form.password"
        :error="error.passwordInput"
      />

      <div class="auth__together">
        <auth-checkbox
          id="rememberMe"
          label="Remember me"
          @change="rememberPassword = !rememberPassword"
        />

        <router-link to="/auth/forgot-password" class="auth__link">
          Forgot password?
        </router-link>
      </div>
    </auth-form>
  </div>
</template>

<script>
import error from './consts';
import AuthInput from '@/components/auth/AuthInput';
import AuthCheckbox from '@/components/auth/AuthCheckbox';
import AuthForm from '@/components/auth/AuthForm';
import Notification from '@/components/core/Notification';

export default {
  components: {
    AuthForm,
    AuthInput,
    AuthCheckbox,
    Notification
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      rememberPassword: false,
      error: {
        active: false,
        emailInput: false,
        passwordInput: false
      }
    };
  },
  methods: {
    async signIn() {
      const execute = await this.$store.dispatch('authSignIn', this.form);

      if (!execute.success) {
        this.error.active = true;
        this.$store.dispatch('notificationActivate', {
          content: error[execute.data.error.id].message,
          type: 'error'
        });
      } else {
        if (this.rememberPassword) {
          this.$store.dispatch('authRememberLoginData');
        }
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';
</style>
