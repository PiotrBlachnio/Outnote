<template>
  <div class="auth login">
    <notification />

    <auth-form
      form-type="login"
      button-label="Sign in"
      @submit="signIn"
      :loading="formLoading"
      :formInactive="isFormEmpty"
    >
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
import authLoadingMixin from '@/mixins/AuthLoadingMixin';

export default {
  components: {
    AuthForm,
    AuthInput,
    AuthCheckbox,
    Notification
  },
  mixins: [authLoadingMixin],
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      rememberPassword: false,
      error: {
        emailInput: false,
        passwordInput: false
      }
    };
  },
  methods: {
    async signIn() {
      if (this.isFormEmpty) return;

      this.enableFormLoading();
      const execute = await this.$store.dispatch('authSignIn', this.form);
      this.disableFormLoading();

      if (!execute.success) {
        if (execute.data.error.id === 304) {
          this.$router.push({
            name: 'Resend Email',
            params: { email: this.form.email }
          });
        } else {
          this.$store.dispatch('notificationActivate', {
            content: error[execute.data.error.id].message,
            type: 'error'
          });
        }

        this.activateInputsError();
      } else {
        this.$store.dispatch('notificationActivate', {
          content: 'Signed In successfully!',
          type: 'success'
        });

        if (this.rememberPassword) {
          this.$store.dispatch('authRememberLoginData');
        }
      }
    },
    activateInputsError() {
      this.error.emailInput = true;
      this.error.passwordInput = true;

      setTimeout(() => {
        this.error.emailInput = false;
        this.error.passwordInput = false;
      }, 2000);
    }
  },
  computed: {
    isFormEmpty() {
      return this.form.email.length < 1 || this.form.password.length < 1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';
</style>
