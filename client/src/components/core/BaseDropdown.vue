<template>
  <div class="base-dropdown">
    <button
      class="base-dropdown__main-button"
      @click="isDropdownMenuActive = !isDropdownMenuActive"
    >
      <i class="fas fa-ellipsis-h"></i>
    </button>

    <div class="base-dropdown__menu" v-show="isDropdownMenuActive">
      <button
        class="base-dropdown__button"
        v-for="option in options"
        :key="option.label"
        @click="$emit(`dropdown${option.label}`)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script>
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
  }

  &__button {
    color: $dropdownMenuButtonColor;
    margin-bottom: 0.1rem;
    background-color: $dropdownMenuButtonBackground;
    border-radius: 0.25rem;
    padding: 0.25rem 0.5rem;
  }
}
</style>
