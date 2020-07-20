<template>
  <div class="auth login">
    <notification />

    <auth-form
      form-type="forgotPassword"
      button-label="Remind password"
      @submit="remindPassword"
      :loading="formLoading"
      show-back-to-login
    >
      <auth-input id="email" label="Email" v-model="form.email" />
    </auth-form>
  </div>
</template>

<script>
import axios from 'axios';
import { errors } from '@/assets/consts';
import AuthInput from '@/components/auth/AuthInput';
import AuthForm from '@/components/auth/AuthForm';
import authLoadingMixin from '@/mixins/AuthLoadingMixin';
import authValidator from '@/mixins/AuthValidatorMixin';

export default {
  components: {
    AuthForm,
    AuthInput
  },
  mixins: [authLoadingMixin, authValidator],
  data() {
    return {
      form: {
        email: ''
      }
    };
  },
  methods: {
    async remindPassword() {
      if (!this.validateForm()) return;
      this.enableFormLoading();

      try {
        await axios({
          method: 'post',
          url: '/forgot-password',
          data: this.form
        });

        this.$store.dispatch('notificationActivate', {
          content: 'Reset password link has been sent!',
          type: 'success'
        });

        this.disableFormLoading();
      } catch (error) {
        this.$store.dispatch('notificationActivate', {
          content: errors[error.response.data.error.id].message,
          type: 'error'
        });

        this.disableFormLoading();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';
</style>
