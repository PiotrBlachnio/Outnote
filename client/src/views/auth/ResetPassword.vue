<template>
  <div class="auth login">
    <notification />

    <auth-form
      form-type="forgotPassword"
      button-label="set new password"
      :loading="formLoading"
      :formInactive="isFormEmpty"
      @submit="resetPassword"
    >
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
import axios from 'axios';
import errors from './consts';
import AuthInput from '@/components/auth/AuthInput';
import AuthForm from '@/components/auth/AuthForm';
import Notification from '@/components/core/Notification';
import authLoadingMixin from '@/mixins/AuthLoadingMixin';

export default {
  components: {
    AuthForm,
    AuthInput,
    Notification
  },
  mixins: [authLoadingMixin],
  data() {
    return {
      form: {
        password: '',
        repeatPassword: ''
      }
    };
  },
  created() {
    // const { token, uniqueKey } = this.$route.query;
    // if (!token || !uniqueKey) this.$router.push('/auth/login');
  },
  methods: {
    async resetPassword() {
      if (this.isFormEmpty) return;
      if (!this.arePasswordsEqual) {
        this.$store.dispatch('notificationActivate', {
          content: 'Passwords are not equal!',
          type: 'error'
        });
        return;
      }

      this.enableFormLoading();

      try {
        await axios({
          method: 'post',
          url: '/reset-password',
          data: {
            id: this.$route.query.uniqueKey,
            token: this.$route.query.token,
            password: this.form.password
          }
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
  },
  computed: {
    isFormEmpty() {
      const { password, repeatPassword } = this.form;

      return password.length < 1 || repeatPassword.length < 1;
    },
    arePasswordsEqual() {
      const { password, repeatPassword } = this.form;

      return password === repeatPassword ? true : false;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';
</style>
