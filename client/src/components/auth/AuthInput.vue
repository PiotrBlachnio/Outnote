<template>
  <div class="auth__input">
    <label
      :for="id"
      class="auth__label"
      :class="{ 'auth__label--active': inputValue || isInputActive }"
    >
      {{ label }}
    </label>
    <input
      :type="passwordVisible ? 'text' : type"
      :id="id"
      v-model="inputValue"
      class="auth__field"
      spellcheck="false"
      autocomplete="off"
      :class="{ 'auth__field--error': isErrorActive }"
      @focus="isInputActive = true"
      @blur="isInputActive = false"
      @input="$emit('input', inputValue)"
    />

    <transition name="fade-password">
      <button
        type="button"
        class="auth__show-password"
        :class="{ 'auth__show-password--active': passwordVisible }"
        @click="passwordVisible = !passwordVisible"
        v-if="inputValue.length > 0 && type === 'password'"
      >
        👁
      </button>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    id: {
      required: true,
      type: String
    },
    label: {
      required: false,
      type: String
    },
    type: {
      required: false,
      type: String,
      default: 'text'
    },
    error: {
      type: Boolean,
      required: false,
      default: false
    },
    activeDuration: {
      type: Number,
      required: false,
      default: 3000
    }
  },
  data() {
    return {
      inputValue: '',
      isInputActive: false,
      passwordVisible: false,
      isErrorActive: false
    };
  },
  watch: {
    error() {
      this.activateError();
    }
  },
  methods: {
    activateError() {
      this.isErrorActive = true;

      setTimeout(() => {
        this.isErrorActive = false;
      }, this.activeDuration || 3000);
    }
  }
};
</script>

<style lang="scss" scoped>
.auth__input {
  display: flex;
  width: 100%;
  position: relative;
  margin-bottom: 2rem;
  flex-direction: column;
}

.auth__label {
  cursor: text;
  position: absolute;
  transform: translate(1rem, 1.5rem);
  color: $authInputLabelColor;
  transition: all 0.2s ease-in-out;

  &::selection {
    background-color: transparent;
  }

  &--active {
    color: $authInputLabelActiveColor;
    font-size: 0.75rem;
    transform: translate(1rem, 0.5rem);
  }
}

.auth__field {
  color: $authInputFieldColor;
  border: none;
  padding: 2rem 1rem 1rem;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out;
  border: 1px solid transparent;
  background-color: $authInputFieldBackground;

  &:focus {
    border-color: $primary;
  }

  &--error {
    animation: vibrate 0.25s linear;
    border-color: $error;
  }
}

.auth__show-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  color: $authInputShowPasswordButtonColor;
  font-size: 2rem;
  transform: translateY(-50%);
  cursor: pointer;

  &--active::after {
    content: '';
    display: block;
    position: absolute;
    width: 3px;
    height: 2rem;
    background-color: $authInputShowPasswordButtonColor;
    transform: translate(0.9rem, -2.1rem) rotate(45deg);
  }
}

.fade-password-enter-active,
.fade-password-leave-active {
  transition: opacity 0.2s;
}
.fade-password-enter-active {
  opacity: 1;
}
.fade-password-enter,
.fade-password-leave-to {
  opacity: 0;
}
</style>
