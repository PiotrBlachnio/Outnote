<template>
  <div class="auth login">
    <auth-form form-type="login" button-label="Sign in">
      <auth-input id="email" label="Email" type="email" v-model="form.email" />
      <auth-input
        id="Password"
        label="Password"
        type="password"
        v-model="form.password"
      />

      <div class="auth__together">
        <auth-checkbox
          id="rememberMe"
          label="Remember me"
          @change="form.rememberPassword = !form.rememberPassword"
        />

        <router-link to="/auth/forgot-password" class="auth__link">
          Forgot password?
        </router-link>
      </div>
    </auth-form>
  </div>
</template>

<script>
import AuthInput from '@/components/auth/AuthInput';
import AuthCheckbox from '@/components/auth/AuthCheckbox';
import AuthForm from '@/components/auth/AuthForm';

export default {
  components: {
    AuthForm,
    AuthInput,
    AuthCheckbox
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        rememberPassword: false
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';
</style>
