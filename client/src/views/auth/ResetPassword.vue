<template>
  <div class="auth login">
    <auth-form form-type="forgotPassword" button-label="set new password">
      <auth-input
        id="password"
        label="New Password"
        type="password"
        v-model="form.password"
      />
      <auth-input
        id="repeatPassword"
        label="Repeat Password"
        type="password"
        v-model="form.repeatPassword"
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
        password: '',
        repeatPassword: ''
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';
</style>
