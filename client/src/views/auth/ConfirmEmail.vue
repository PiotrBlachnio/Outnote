<template>
  <auth-response-page
    error-message="Error! Confirmation token is not valid."
    success-message="Your e-mail address has been confirmed."
    :is-success="isSuccess"
  />
</template>

<script>
import axios from 'axios';
import AuthResponsePage from '@/components/auth/AuthResponsePage';

export default {
  components: {
    AuthResponsePage
  },
  data() {
    return {
      isSuccess: 'Loading'
    };
  },
  created() {
    this.confirmEmail();
  },
  methods: {
    async confirmEmail() {
      try {
        await axios({
          method: 'post',
          url: '/confirm-email',
          data: {
            id: this.$route.query.user,
            token: this.$route.query.token,
            uniqueKey: this.$route.query.uniqueKey
          }
        });

        this.isSuccess = true;
      } catch (error) {
        this.isSuccess = false;
      }
    }
  }
};
</script>
