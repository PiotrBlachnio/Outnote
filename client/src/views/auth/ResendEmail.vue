<template>
  <div class="resend-email">
    <notification />

    <div>
      <img
        src="https://image.flaticon.com/icons/svg/1632/1632600.svg"
        class="resend-email__image"
        alt=""
      />

      <h3 class="resend-email__heading">
        Your e-mail address is not confirmed yet. <br />
        Click
        <router-link to="#" @click.native="resendEmail">here</router-link> to
        resend the link.
      </h3>
    </div>

    <router-link to="/auth/login" class="resend-email__link">
      Back to Log-in page
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';
import { errors } from '@/assets/consts';

export default {
  data() {
    return {
      emailAddress: null
    };
  },
  created() {
    this.emailAddress = this.$route.params.email;
  },
  methods: {
    async resendEmail() {
      try {
        await axios({
          method: 'post',
          url: '/send-confirmation-mail',
          data: {
            email: this.emailAddress
          }
        });

        this.$store.dispatch('notificationActivate', {
          content: 'Confirmation e-mail has been sent.',
          type: 'success'
        });

        this.$router.push('/auth/login');
      } catch (error) {
        this.$store.dispatch('notificationActivate', {
          content: errors[error.response.data.error.id].message,
          type: 'error'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';

.resend-email {
  display: flex;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  &__image {
    width: 180px;
  }

  &__heading {
    color: $authResendEmailColor;
    margin-bottom: 4rem;
  }

  &__link {
    color: $primary;
  }
}
</style>
