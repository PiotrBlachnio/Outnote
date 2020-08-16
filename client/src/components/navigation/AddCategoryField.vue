<template>
  <div class="navigation__add-category-wrapper">
    <button
      @click="$emit('click')"
      to="#"
      class="navigation__add-category-link"
    >
      <i class="fas fa-plus navigation__icon"></i> New
    </button>

    <div v-show="isVisible" class="navigation__add-category-input-wrapper">
      <base-input
        id="newCategory"
        less-padding
        label="New category..."
        v-model="newCategoryName"
        @input="$emit('input', newCategoryName)"
        @keypressEnter="$emit('keypress-enter')"
      />
      <button @click="$emit('click-save')"><i class="fas fa-save"></i></button>
    </div>
  </div>
</template>

<script>
import BaseInput from '@/components/core/BaseInput';

export default {
  data() {
    return {
      newCategoryName: ''
    };
  },
  props: {
    isVisible: {
      type: Boolean,
      required: true
    }
  },
  components: {
    BaseInput
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  &__add-category-wrapper {
    margin-top: 3rem;
    text-align: right;
    margin-left: auto;
  }

  &__add-category-link {
    font-size: 0.7rem;
    display: inline-block;
    color: $navigationAddLinkColor;
    padding: 0.25rem 0.5rem;
    border-radius: 0.25rem;
    transition: border-color 0.2s;
    border: 1px solid $navigationAddLinkBorderColor;

    &:hover {
      border-color: $success;
    }
  }

  &__add-category-link:hover &__icon {
    color: $success;
  }

  &__icon {
    margin-right: 0.5rem;
    transition: color 0.2s;
    transform: translateX(1px);
  }

  &__add-category-input-wrapper {
    display: flex;
    margin-top: 1rem;

    .base__input {
      margin: 0;
    }
    button {
      color: $primary;
      height: auto;
      padding: 0 1rem;
      font-size: 1rem;
    }
  }
}
</style>
