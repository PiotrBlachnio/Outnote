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
      :type="type"
      :id="id"
      v-model="inputValue"
      class="auth__field"
      spellcheck="false"
      autocomplete="off"
      :class="{ 'auth__field--error': error }"
      @focus="isInputActive = true"
      @blur="isInputActive = false"
      @input="$emit('input', inputValue)"
    />
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
    }
  },
  data() {
    return {
      inputValue: '',
      isInputActive: false
    };
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
  color: rgb(199, 199, 199);
  transition: all 0.2s ease-in-out;

  &::selection {
    background-color: transparent;
  }

  &--active {
    color: #aaa;
    font-size: 0.75rem;
    transform: translate(1rem, 0.5rem);
  }
}

.auth__field {
  color: #eee;
  border: none;
  padding: 2rem 1rem 1rem;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out;
  border: 1px solid transparent;
  background-color: rgba(255, 255, 255, 0.05);

  &:focus {
    border-color: $primary;
  }

  &--error {
    animation: vibrate 0.25s linear;
    border-color: #ff4444;
  }
}
</style>
