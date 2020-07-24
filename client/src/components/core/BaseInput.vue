<template>
  <div class="base__input">
    <label
      :for="id"
      class="base__label"
      :class="{
        'base__label--active': inputValue || isInputActive,
        'base__label--smaller': lessPadding
      }"
    >
      {{ label }}
    </label>
    <input
      :type="passwordVisible ? 'text' : type"
      :id="id"
      v-model="inputValue"
      class="base__field"
      spellcheck="false"
      autocomplete="off"
      :class="{
        'base__field--error': error,
        'base__field--less-padding': lessPadding
      }"
      @focus="isInputActive = true"
      @blur="isInputActive = false"
      @input="$emit('input', inputValue)"
      @keypress.enter="$emit('keypressEnter')"
    />

    <transition name="fade-password">
      <button
        type="button"
        class="base__show-password"
        :class="{ 'base__show-password--active': passwordVisible }"
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
    },
    lessPadding: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data() {
    return {
      inputValue: '',
      isInputActive: false,
      passwordVisible: false
    };
  }
};
</script>

<style lang="scss" scoped>
.base__input {
  display: flex;
  width: 100%;
  position: relative;
  margin-bottom: 2rem;
  flex-direction: column;
}

.base__label {
  cursor: text;
  position: absolute;
  transform: translate(1rem, 1.5rem);
  color: $baseInputLabelColor;
  transition: all 0.2s ease-in-out;

  &::selection {
    background-color: transparent;
  }

  &--active {
    color: $baseInputLabelActiveColor;
    font-size: 0.75rem;
    transform: translate(1rem, 0.5rem);
  }

  &--smaller {
    font-size: 0.85rem;
    transform: translate(0.5rem, 0.85rem);
  }

  &--active.base__label--smaller {
    font-size: 0.65rem;
    transform: translate(0.5rem, 0.2rem);
  }
}

.base__field {
  color: $baseInputFieldColor;
  border: none;
  padding: 2rem 1rem 1rem;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out;
  border: 1px solid transparent;
  background-color: $baseInputFieldBackground;

  &:focus {
    border-color: $primary;
  }

  &--less-padding {
    padding: 1rem 0.5rem 0.5rem;
  }

  &--error {
    animation: vibrate 0.25s linear;
    border-color: $error;

    &:focus {
      border-color: $error;
    }
  }
}

.base__show-password {
  position: absolute;
  right: 1rem;
  top: 50%;
  color: $baseInputShowPasswordButtonColor;
  font-size: 2rem;
  transform: translateY(-50%);
  cursor: pointer;

  &--active::after {
    content: '';
    display: block;
    position: absolute;
    width: 3px;
    height: 2rem;
    background-color: $baseInputShowPasswordButtonColor;
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
