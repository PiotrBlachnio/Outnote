<template>
  <div class="auth login">
    <notification />

    <auth-form
      form-type="login"
      button-label="Sign in"
      @submit="signIn"
      :loading="formLoading"
    >
      <auth-input
        id="email"
        label="Email"
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
import { errors } from './consts';
import AuthInput from '@/components/auth/AuthInput';
import AuthCheckbox from '@/components/auth/AuthCheckbox';
import AuthForm from '@/components/auth/AuthForm';
import authLoadingMixin from '@/mixins/AuthLoadingMixin';
import authValidator from '@/mixins/AuthValidatorMixin';

export default {
  components: {
    AuthForm,
    AuthInput,
    AuthCheckbox
  },
  mixins: [authLoadingMixin, authValidator],
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
      if (!this.validateForm()) return;

      this.enableFormLoading();
      const execute = await this.$store.dispatch('authSignIn', this.form);
      this.disableFormLoading();

      if (!execute.success) {
        console.log(execute);
        if (execute.data.error.id === 304) {
          this.$router.push({
            name: 'Resend Email',
            params: { email: this.form.email }
          });
        } else {
          this.$store.dispatch('notificationActivate', {
            content: errors[execute.data.error.id].message,
            type: 'error'
          });
        }

        this.activateInputsError();
      } else {
        this.$store.dispatch('notificationActivate', {
          content: 'Signed In successfully!',
          type: 'success'
        });

        this.$store
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
  computed: {}
};
</script>

<style lang="scss" scoped>
@import 'auth';
</style>
