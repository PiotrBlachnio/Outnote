<template>
  <div class="auth register">
    <notification />

    <transition name="fade-out">
      <auth-form
        v-if="!isSuccess"
        class="register__form"
        form-type="register"
        button-label="Sign up"
        @submit="signUp"
        :loading="formLoading"
      >
        <auth-input
          id="username"
          label="Username"
          v-model="form.username"
          :error="isInputInvalid"
        />
        <auth-input
          id="email"
          label="Email"
          v-model="form.email"
          :error="isInputInvalid"
        />
        <auth-input
          id="Password"
          label="Password"
          type="password"
          v-model="form.password"
          :error="isInputInvalid"
        />
      </auth-form>
    </transition>

    <transition name="fade-in">
      <div
        v-if="isSuccess"
        class="register__success"
        :class="{ 'register__success--active': isSuccess }"
      >
        <img
          src="https://image.flaticon.com/icons/svg/1632/1632599.svg"
          class="register__image"
          alt=""
        />

        <h3 class="register__heading">
          Your account has been created! Now please confirm your e-mail address.
        </h3>

        <router-link to="/auth/login" class="register__link">
          Back to Log-in page
        </router-link>
      </div>
    </transition>
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
        username: '',
        email: '',
        password: ''
      },
      isSuccess: false,
      isInputInvalid: false
    };
  },
  methods: {
    async signUp() {
      if (!this.validateForm()) return;
      this.enableFormLoading();

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

        this.isSuccess = true;
        this.disableFormLoading();
      } catch (error) {
        this.$store.dispatch('notificationActivate', {
          content: errors[error.response.data.error.id].message,
          type: 'error'
        });

        this.disableFormLoading();
        this.isInputInvalid = true;

        setTimeout(() => {
          this.isInputInvalid = false;
        }, 3000);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';

.register {
  display: flex;
  align-items: center;
  justify-content: center;

  &__success {
    position: absolute;
    text-align: center;
  }

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
