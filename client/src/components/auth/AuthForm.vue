<template>
  <form class="auth__form" @submit.prevent>
    <h1 class="auth__route-heading">{{ $route.name }}</h1>
    <slot></slot>

    <button
      class="auth__button"
      :class="{ 'auth__button--loading': loading }"
      :disabled="formInactive || loading"
      @click="$emit('submit')"
    >
      <loader v-if="loading" />
      <span v-else>{{ buttonLabel }}</span>
    </button>

    <div class="auth__hr"></div>

    <router-link to="/privacy-policy" class="auth__link">
      Privacy policy
    </router-link>

    <span class="auth__span" v-if="formType === 'login'">
      Don't have an account?
      <router-link to="/auth/register" class="auth__link">
        Create one!
      </router-link>
    </span>

    <span class="auth__span" v-else-if="formType === 'register'">
      Already have an account?
      <router-link to="/auth/login" class="auth__link">
        Sign in
      </router-link>
    </span>

    <!-- <div class="auth__full-width" v-if="formType !== 'forgotPassword'">
      <div class="auth__hr"></div>

      <button class="auth__button auth__button--discord">
        Sign in with Discord
      </button>
    </div> -->
  </form>
</template>

<script>
import Loader from './Loader';

export default {
  components: {
    Loader
  },
  props: {
    formType: {
      type: String,
      required: true,
      validator: value =>
        ['login', 'register', 'confirmEmail', 'forgotPassword'].includes(value)
    },
    buttonLabel: {
      type: String,
      required: true
    },
    loading: {
      type: Boolean,
      required: false
    },
    formInactive: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style lang="scss" scoped>
.auth__hr {
  width: 100%;
  height: 1px;
  margin: 1rem auto;
  background-color: $authHrBackground;
}

.auth__form {
  width: 75%;
  margin: 0 auto;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  @include mq {
    width: 20rem;
  }
}

.auth__route-heading {
  width: 100%;
  text-align: center;
  margin: 0;
  position: absolute;
  font-size: 2.5rem;
  top: 1rem;
  left: 50%;
  transform: translateX(-50%);
  color: $authRouteHeadingColor;

  @include mq {
    width: auto;
    top: auto;
    left: 4rem;
    bottom: 4rem;
    font-size: 5rem;
    transform: translateX(0);
  }
}

.auth__heading {
  width: 100%;
  color: $authHeadingColor;
  margin: 0;
  text-align: center;
  font-size: 2rem;
  letter-spacing: 0.125rem;
}

.auth__button {
  width: 100%;
  padding: 1rem;
  color: $authButtonColor;
  font-size: 1.05rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  border-radius: 0.25rem;
  background-color: transparent;
  border: 1px solid $primary;
  transition: background-color 0.15s ease-in-out, color 0.25s ease-in-out;

  &:disabled {
    color: $authButtonDisabledColor;

    &:hover {
      background-color: transparent;
    }
  }

  &:hover {
    background-color: darken($primary, 5%);
  }

  &--loading {
    position: relative;
    padding-top: 2.2rem;
  }

  &--discord {
    border: none;
    text-transform: initial;
    background-color: $authButtonDiscordBackground;

    &:hover {
      background-color: darken($authButtonDiscordBackground, 5%);
    }
  }
}

.auth__together {
  width: 100%;
  display: flex;
  justify-content: space-between;

  .auth__link {
    margin: 0;
    height: 16px;
  }
}

.auth__link {
  margin: 0 auto 1rem;
  color: $primary;
  font-size: 0.8rem;
}

.auth__span {
  color: $authSpanColor;
  font-size: 0.8rem;
  margin: 0 auto;
}

.auth__full-width {
  width: 100%;
}
</style>
