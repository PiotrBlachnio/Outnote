<template>
  <div class="response-page auth">
    <transition name="fade-out">
      <div v-if="typeof isSuccess == 'string'" class="response-page__waiting">
        {{ isSuccess }}...
      </div>
    </transition>

    <transition name="fade-in">
      <div v-if="typeof isSuccess == 'boolean'" style="position: absolute">
        <div v-if="isSuccess">
          <img
            src="https://image.flaticon.com/icons/svg/1632/1632599.svg"
            class="response-page__image"
            alt=""
          />

          <h3 class="response-page__heading">
            {{ successMessage }}
          </h3>
        </div>

        <div v-else>
          <img
            src="https://image.flaticon.com/icons/svg/1632/1632600.svg"
            class="response-page__image"
            alt=""
          />

          <h3 class="response-page__heading">
            {{ errorMessage }}
          </h3>
        </div>

        <router-link to="/auth/login" class="response-page__link">
          Back to Log-in page
        </router-link>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    isSuccess: {
      type: [Boolean, String],
      required: true
    },
    successMessage: {
      type: String,
      required: true
    },
    errorMessage: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.response-page {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;

  &__waiting {
    color: $authResponsePageWaitingColor;
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  &__image {
    width: 180px;
  }

  &__heading {
    color: $authResponsePageHeading;
    margin-bottom: 4rem;
  }

  &__link {
    color: $primary;
  }

  transition {
    opacity: 0;
  }
}

.fade-out-enter-active,
.fade-out-leave-active {
  transition: opacity 0.5s;
}
.fade-out-enter-active {
  opacity: 1;
}
.fade-out-enter,
.fade-out-leave-to {
  opacity: 0;
}

.fade-in-enter-active {
  transition: opacity 0.5s;
  transition-delay: 0.5s;
}
.fade-in-enter {
  opacity: 0;
}
.fade-in-enter-to {
  opacity: 1;
}
</style>
