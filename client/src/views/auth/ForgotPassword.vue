<template>
  <div class="auth login">
    <auth-form
      form-type="forgotPassword"
      button-label="Remind password"
      @submit="remindPassword"
      :loading="formLoading"
      :formInactive="isFormEmpty"
    >
      <auth-input id="email" label="Email" type="email" v-model="form.email" />
    </auth-form>
  </div>
</template>

<script>
import axios from 'axios';
import errors from './consts';
import AuthInput from '@/components/auth/AuthInput';
import AuthForm from '@/components/auth/AuthForm';
import authLoadingMixin from '@/mixins/AuthLoadingMixin';

export default {
  components: {
    AuthForm,
    AuthInput
  },
  mixins: [authLoadingMixin],
  data() {
    return {
      form: {
        email: ''
      }
    };
  },
  methods: {
    async remindPassword() {
      this.enableFormLoading();

      try {
        await axios({
          method: 'post',
          url: '/forgot-password',
          data: this.form
        });

        this.$store.dispatch('notificationActivate', {
          content: 'Reset password link has been sent!',
          type: 'error'
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
  },
  computed: {
    isFormEmpty() {
      return this.form.email.length < 1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';
</style>
