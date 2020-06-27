<template>
  <div class="auth login">
    <notification />

    <auth-form
      form-type="register"
      button-label="Sign up"
      @submit="signUp"
      :loading="formLoading"
      :formInactive="isFormEmpty"
    >
      <auth-input id="username" label="Username" v-model="form.username" />
      <auth-input id="email" label="Email" type="email" v-model="form.email" />
      <auth-input
        id="Password"
        label="Password"
        type="password"
        v-model="form.password"
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

export default {
  components: {
    AuthForm,
    AuthInput,
    Notification
  },
  data() {
    return {
      form: {
        username: '',
        email: '',
        password: ''
      },
      formLoading: false
    };
  },
  methods: {
    async signUp() {
      if (this.isFormEmpty) return;
      this.formLoading = true;

      try {
        await axios({
          url: '/register',
          method: 'post',
          data: {
            username: this.form.username,
            email: this.form.email,
            password: this.form.password
          }
        });

        this.$store.dispatch('notificationActivate', {
          content: 'Account created! Now please confirm your e-mail.',
          type: 'success'
        });

        this.formLoading = false;
      } catch (error) {
        this.$store.dispatch('notificationActivate', {
          content: errors[error.response.data.error.id].message,
          type: 'error'
        });

        this.formLoading = false;
      }
    }
  },
  computed: {
    isFormEmpty() {
      const { username, email, password } = this.form;

      return username.length < 1 || email.length < 1 || password.length < 1;
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';
</style>
