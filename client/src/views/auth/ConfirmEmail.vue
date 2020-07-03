<template>
  <div class="confirm-email auth">
    <div v-if="isSuccess">
      <img
        src="https://image.flaticon.com/icons/svg/1632/1632599.svg"
        class="confirm-email__image"
        alt=""
      />

      <h3 class="confirm-email__heading">
        Your e-mail address has been confirmed.
      </h3>
    </div>

    <div v-else>
      <img
        src="https://image.flaticon.com/icons/svg/1632/1632600.svg"
        class="confirm-email__image"
        alt=""
      />

      <h3 class="confirm-email__heading">
        Error! Confirmation token is not valid.
      </h3>
    </div>

    <router-link to="/auth/login" class="confirm-email__link">
      Back to Log-in page
    </router-link>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isSuccess: true
    };
  },
  created() {
    this.confirmEmail();
  },
  methods: {
    confirmEmail() {
      try {
        axios({
          method: 'post',
          url: '/confirm-email',
          data: {
            id: this.$route.query.user,
            token: this.$route.query.token,
            uniqueKey: this.$route.query.uniqueKey
          }
        });
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';

.confirm-email {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  &__image {
    width: 180px;
  }

  &__heading {
    color: #ddd;
    margin-bottom: 4rem;
  }

  &__link {
    color: $primary;
  }
}
</style>
