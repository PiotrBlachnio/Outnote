<template>
  <div
    class="base-dropdown"
    v-click-outside="() => (isDropdownMenuActive = false)"
  >
    <button
      class="base-dropdown__main-button"
      @click="isDropdownMenuActive = !isDropdownMenuActive"
    >
      <i class="fas fa-ellipsis-h"></i>
    </button>

    <transition name="fade">
      <div class="base-dropdown__menu" v-show="isDropdownMenuActive">
        <button
          class="base-dropdown__button"
          v-for="option in options"
          :key="option.label"
          @click="$emit(`dropdown${option.label.split(' ').join('')}`)"
        >
          {{ option.label }}
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
import ClickOutside from 'vue-click-outside';

export default {
  props: {
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDropdownMenuActive: false
    };
  },
  directives: {
    ClickOutside
  }
};
</script>

<style lang="scss" scoped>
.base-dropdown {
  margin-left: auto;
  position: relative;

  &__main-button {
    color: $dropdownMainButtonColor;
    padding: 0 0.5rem;
  }

  &__menu {
    right: 0;
    z-index: 99;
    display: flex;
    flex-direction: column;
    position: absolute;
    box-shadow: 0 0 1rem -0.5rem black;
  }

  &__button {
    white-space: nowrap;
    color: $dropdownMenuButtonColor;
    background-color: $dropdownMenuButtonBackground;
    padding: 0.5rem 1.5rem;
    transition: background-color 0.1s;
    border-bottom: 1px solid $dropdownMenuButtonBorderColor;

    &:hover {
      background-color: $dropdownMenuButtonBackgroundHover;
    }

    &:first-of-type {
      border-radius: 0.25rem 0.25rem 0 0;
    }

    &:last-of-type {
      border-radius: 0 0 0.25rem 0.25rem;
      border-bottom: none;
    }

    @include mq {
      padding: 0.5rem 1rem;
    }
  }
}
</style>
