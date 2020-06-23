<template>
  <div class="auth login">
    <auth-form form-type="forgotPassword" button-label="Remind password">
      <auth-input id="email" label="Email" type="email" v-model="form.email" />
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
        email: ''
      }
    };
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';
</style>
