<template>
  <div class="auth login">
    <auth-form form-type="register" button-label="Sign up">
      <auth-input id="email" label="Email" type="email" v-model="form.email" />
      <auth-input
        id="Password"
        label="Password"
        type="password"
        v-model="form.password"
      />
      <auth-input
        id="repeatPassword"
        label="Repeat Password"
        type="password"
        v-model="form.passwordRepeat"
      />
    </auth-form>
  </div>
</template>

<script>
import AuthInput from '@/components/auth/AuthInput';
import AuthForm from '@/components/auth/AuthForm';

export default {
  components: {
    AuthForm,
    AuthInput
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
        passwordRepeat: '',
        rememberPassword: false
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';
</style>
