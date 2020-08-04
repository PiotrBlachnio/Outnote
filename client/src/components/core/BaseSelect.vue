<template>
  <div class="base-select" :class="{ 'base-select--active': isActive }">
    <button class="base-select__placeholder" @click="isActive = !isActive">
      <i class="fas fa-chevron-down"></i>
      <span v-if="!selectedOption">{{ placeholder }}</span>
      <span v-else>{{ selectedOption.label }}</span>
    </button>

    <div class="base-select__options">
      <button
        class="base-select__option"
        v-for="option in options"
        :key="option.label"
        @click="selectOption(option)"
      >
        {{ option.label }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      required: false,
      default: 'Choose an option...'
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isActive: false,
      selectedOption: null
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      this.isActive = false;
      this.$emit('selectedOption', option);
    }
  }
};
</script>

<style lang="scss" scoped>
.base-select {
  border: 1px solid $baseSelectBorderColor;
  border-radius: 0.25rem;
  transition: border-color 0.2s;

  &:hover {
    border-color: $baseSelectBorderColorHover;
  }

  &__placeholder {
    width: 100%;
    text-align: left;
    cursor: pointer;
    color: $baseSelectPlaceholderColor;
    padding: 1rem;

    span {
      margin-left: 0.5rem;
    }
  }

  &__options {
    max-height: 0;
    overflow-y: hidden;
    transition: max-height 0.5s;
  }

  &--active &__options {
    max-height: 10rem;
  }

  &__option {
    width: 100%;
    text-align: left;
    cursor: pointer;
    color: $baseSelectOptionColor;
    padding: 1rem;
    transition: all 0.2s;

    &:hover {
      color: $color1;
      background-color: $baseSelectOptionBackgroundHover;
    }
  }
}
</style>
