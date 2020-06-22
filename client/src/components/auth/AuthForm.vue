<template>
  <form class="auth__form" @submit.prevent>
    <slot></slot>

    <button class="auth__button">{{ buttonLabel }}</button>

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

    <div class="auth__full-width" v-if="formType !== 'forgotPassword'">
      <div class="auth__hr"></div>

      <button class="auth__button auth__button--discord">
        Sign in with Discord
      </button>
    </div>
  </form>
</template>

<script>
export default {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.auth__hr {
  width: 100%;
  height: 1px;
  margin: 1rem auto;
  background-color: #444;
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

.auth__heading {
  width: 100%;
  color: #eee;
  margin: 0;
  text-align: center;
  font-size: 2rem;
  letter-spacing: 0.125rem;
}

.auth__button {
  width: 100%;
  padding: 1rem;
  color: #eee;
  font-size: 1.05rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
  border-radius: 0.25rem;
  background-color: transparent;
  border: 1px solid $primary;
  transition: background-color 0.15s ease-in-out;

  &:hover {
    background-color: darken($primary, 5%);
  }

  &--discord {
    border: none;
    text-transform: initial;
    background-color: #7289da;

    &:hover {
      background-color: darken(#7289da, 5%);
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
  color: #ddd;
  font-size: 0.8rem;
  margin: 0 auto;
}

.auth__full-width {
  width: 100%;
}
</style>
