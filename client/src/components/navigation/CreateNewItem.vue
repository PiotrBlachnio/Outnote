<template>
  <div
    class="new-category"
    :class="{ 'new-category--expanded': isInputVisible && mode === 'category' }"
  >
    <button class="new-category__button" @click="createElement">
      <i class="fas fa-plus new-category__icon"></i>
      Add new {{ mode }}
    </button>

    <form
      v-if="isInputVisible && mode === 'category'"
      class="new-category__form"
      @submit.prevent
    >
      <label for="newCategoryName" class="new-category__label">
        New category name:
      </label>

      <div class="new-category__input-wrapper">
        <input
          type="text"
          class="new-category__input"
          id="newCategoryName"
          ref="input"
          v-model="newCategoryName"
          @keydown.enter="addCategory"
        />

        <button
          type="button"
          class="new-category__save-button"
          @click="addCategory"
        >
          <i class="fas fa-save"></i>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import gsap from 'gsap';
import { errors } from '@/assets/consts';

export default {
  data() {
    return {
      isInputVisible: false,
      newCategoryName: ''
    };
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: 'category',
      validator: value => ['category', 'note'].includes(value)
    },
    categoryId: {
      type: String,
      required: false
    }
  },
  watch: {
    isInputVisible(state) {
      if (state && this.mode === 'category') {
        this.$nextTick(() => {
          gsap.fromTo(
            '.new-category__form',
            state ? 0.3 : 0,
            { x: '-2rem', opacity: 0 },
            { x: 0, opacity: 1 }
          );
        });
      }
    }
  },
  methods: {
    createElement() {
      this.isInputVisible = !this.isInputVisible;

      if (this.mode === 'category') {
        this.$nextTick(() => {
          if (this.$refs.input) this.$refs.input.focus();
        });
      } else {
        this.addNote();
      }
    },
    async addCategory() {
      if (this.newCategoryName.length < 2) return;

      const exec = await this.$store.dispatch(
        'addNewCategory',
        this.newCategoryName
      );

      if (exec.success) {
        this.$emit('added-category');
        this.newCategoryName = '';

        this.$store.dispatch('notificationActivate', {
          content: 'Category has been created.',
          type: 'success'
        });
      } else {
        this.$store.dispatch('notificationActivate', {
          content: errors[exec.data.error.id].message,
          type: 'error'
        });
      }
    },
    async addNote() {
      console.log(this.categoryId);
      const exec = await this.$store.dispatch('addNewNote', this.categoryId);

      if (exec.success) {
        this.$store.dispatch('notificationActivate', {
          content: 'Category has been created.',
          type: 'success'
        });

        this.$emit('added-note');
      } else {
        this.$store.dispatch('notificationActivate', {
          content: errors[exec.data.error.id].message,
          type: 'error'
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.new-category {
  max-height: 3rem;
  border: 1px solid rgba($success, 0.25);
  transition: border-color 0.25s, max-height 0.3s;

  &:hover {
    border-color: $success;
  }

  &--expanded {
    max-height: 10rem;
  }

  &__button {
    width: 100%;
    text-align: left;
    padding: 1rem 2rem;
  }

  &__icon {
    color: $success;
    margin-right: 0.5rem;
  }

  &__form {
    display: flex;
    padding: 0.5rem 2rem;
    flex-direction: column;
  }

  &__label {
    width: 100%;
    margin-bottom: 0.5rem;
    font-size: 0.75rem;
  }

  &__input-wrapper {
    display: flex;
  }

  &__input {
    flex: 1;
    color: $color1;
    padding: 0.5rem;
    background-color: transparent;
    border: 1px solid rgba($primary, 0.5);
    border-radius: 0.25rem;
    transition: border-color 0.25s;

    &:focus {
      border-color: $primary;
    }
  }

  &__save-button {
    padding: 0.5rem 1rem;

    &:hover {
      color: $primary;
    }
  }
}
</style>
