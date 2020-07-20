<template>
  <auth-response-page
    error-message="Error! Confirmation token is not valid."
    success-message="Your IP address is trusted right now."
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
          url: '/account/add-location',
          data: {
            id: this.$route.query.user,
            token: this.$route.query.token,
            uniqueKey: this.$route.query.uniqueKey,
            password: '7nm#VxkG'
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
