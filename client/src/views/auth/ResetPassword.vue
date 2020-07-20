<template>
  <div class="auth login">
    <notification />

    <auth-form
      form-type="forgotPassword"
      button-label="set new password"
      :loading="formLoading"
      @submit="resetPassword"
      show-back-to-login
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
        password: '',
        repeatPassword: ''
      }
    };
  },
  methods: {
    async resetPassword() {
      if (!this.validateForm(new Array(Object.entries(this.form)[0]))) return;

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
            id: this.$route.query.user,
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
