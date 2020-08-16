<template>
  <nav class="navigation" :class="{ 'navigation--active': isMenuActive }">
    <base-dialog
      @dialog-save="saveCategory"
      v-model="renameData.categoryName"
    />

    <hamburger @click="closeNavigation" :isMenuActive="isMenuActive" />

    <add-category-field
      v-show="isMenuActive"
      :is-visible="isCategoryFieldVisible"
      @click="showAddCategoryInput"
      v-model="newCategoryName"
      @click-save="addNewCategory"
      @keypress-enter="addNewCategory"
    />

    <ul class="navigation__list">
      <li
        class="navigation__element"
        v-for="category in categories"
        :key="category._id"
        v-show="isMenuActive"
      >
        <router-link
          to="#"
          class="navigation__link"
          @click.native="$emit('selected-category', category)"
        >
          {{ category.name }}
        </router-link>

        <base-dropdown
          :options="dropdownOptions"
          @dropdownRename="renameCategory(category._id)"
          @dropdownAddNote="addNote(category._id)"
          @dropdownRemove="removeCategory(category._id)"
        />
      </li>
    </ul>

    <navigation-bottom v-show="isMenuActive" />
  </nav>
</template>

<script>
import gsap from 'gsap';
import { errors } from '@/assets/consts';
import BaseDropdown from '@/components/core/BaseDropdown';
import BaseDialog from '@/components/core/BaseDialog';
import Hamburger from '@/components/navigation/Hamburger';
import NavigationBottom from '@/components/navigation/NavigationBottom';
import AddCategoryField from '@/components/navigation/AddCategoryField';

export default {
  data() {
    return {
      isMenuActive: true,
      isCategoryFieldVisible: false,
      newCategoryName: '',
      renameData: {
        categoryName: '',
        categoryId: null
      },
      dropdownOptions: ['Add Note', 'Rename', 'Remove']
    };
  },
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseDropdown,
    BaseDialog,
    Hamburger,
    NavigationBottom,
    AddCategoryField
  },
  watch: {
    isMenuActive(state) {
      const animations = [
        gsap.fromTo(
          '.navigation__element',
          state ? 0.5 : 0,
          { opacity: 0, x: '-2rem' },
          { stagger: 0.1, x: 0, opacity: 1, delay: 0.2 }
        ),
        gsap.fromTo(
          '.navigation__bottom',
          state ? 0.6 : 0,
          { opacity: 0 },
          { opacity: 1, ease: 'none' }
        ),
        gsap.fromTo(
          '.navigation__add-category-wrapper',
          state ? 0.4 : 0,
          { opacity: 0 },
          { opacity: 1, ease: 'none' }
        )
      ];

      if (state) animations.forEach(a => a.play());
    }
  },
  methods: {
    closeNavigation() {
      this.isMenuActive = !this.isMenuActive;
      this.$emit('navigationClosed');
    },
    showAddCategoryInput() {
      this.isCategoryFieldVisible = !this.isCategoryFieldVisible;
      this.newCategoryName = '';

      gsap.fromTo(
        '.navigation__add-category-input-wrapper',
        this.isCategoryFieldVisible ? 0.4 : 0,
        { opacity: 0, x: '-2rem', maxHeight: 0 },
        { opacity: 1, x: 0, maxHeight: 100 }
      );
    },
    async addNewCategory() {
      if (this.newCategoryName.length > 0) {
        const exec = await this.$store.dispatch(
          'addNewCategory',
          this.newCategoryName
        );

        if (exec.success) {
          this.$store.dispatch('notificationActivate', {
            content: 'New category has been added!',
            type: 'success'
          });

          this.newCategoryName = '';
          this.isCategoryFieldVisible = false;
          this.$emit('addedCategory');
        } else {
          this.$store.dispatch('notificationActivate', {
            content: errors[exec.data.error.id].message,
            type: 'error'
          });
        }
      }
    },
    async addNote(categoryId) {
      const exec = await this.$store.dispatch('addNewNote', categoryId);

      if (exec.success) {
        this.$store.dispatch('notificationActivate', {
          content: 'Note has been added.',
          type: 'success'
        });
        this.$emit('addedNote');
      } else {
        this.$store.dispatch('notificationActivate', {
          content: errors[exec.data.error.id].message,
          type: 'error'
        });
      }
    },
    async removeCategory(categoryId) {
      const exec = await this.$store.dispatch('removeCategory', categoryId);

      if (!exec.success) {
        this.$store.dispatch('notificationActivate', {
          content: errors[exec.data.error.id].message,
          type: 'error'
        });
      } else {
        this.$store.dispatch('notificationActivate', {
          content: 'Category has been deleted.',
          type: 'success'
        });
      }
    },
    renameCategory(categoryId) {
      const categoryName = this.$store.state.cache.categories[categoryId].name;

      this.renameData.categoryId = categoryId;

      this.$store.dispatch('openDialog', {
        title: 'Enter new category name:',
        defaultValue: categoryName,
        type: 'prompt',
        mode: 'save'
      });
    },
    async saveCategory() {
      const { categoryId, categoryName } = this.renameData;

      const newName =
        categoryName || this.$store.state.cache.categories[categoryId].name;

      const exec = await this.$store.dispatch('renameCategory', {
        categoryId,
        newName
      });

      if (exec.success) {
        this.$store.dispatch('notificationActivate', {
          content: `Category has been renamed.`,
          type: 'success'
        });
      } else {
        this.$store.dispatch('notificationActivate', {
          content: errors[exec.data.error.id].message,
          type: 'error'
        });
      }

      this.$store.dispatch('closeDialog');
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  padding: 24px;
  width: 80px;
  height: 0;
  z-index: 99;
  position: absolute;
  background-color: transparent;
  transition: background 0.2s ease-in-out;

  @include mq {
    height: 100vh;
    position: relative;
    transition: width 0.2s ease-in-out;
    background-color: $navigationBackground;
  }

  &--active {
    width: 100%;
    height: 100vh;
    background-color: $navigationBackground;

    @include mq {
      width: 20rem;
      flex-shrink: 0;
    }
  }

  &__list {
    margin-top: 1rem;
    min-height: 35vh;
    max-height: 50vh;
    overflow-y: auto;

    &::-webkit-scrollbar {
      display: none;
      width: 0.25rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $color3;
    }
    &::-webkit-scrollbar-track {
      background-color: $color4;
    }
  }

  &--active &__list::-webkit-scrollbar {
    display: inherit;
  }

  &__element {
    display: flex;
  }

  &__link {
    width: 100%;
    color: $navigationLinkColor;
    padding: 0.5rem;
    font-weight: bold;
    transition: border-left 0.1s ease-in-out;

    &:hover {
      border-left: 2px solid $navigationLinkActiveBorderColor;
    }
  }

  &__add-button {
    opacity: 0;
    font-weight: bold;
    margin-left: auto;
    transition: opacity 0.1s;
  }

  &__link:hover &__add-button {
    opacity: 1;
  }
}

.fade-navigation-enter-active,
.fade-navigation-leave-active {
  transition: all 0.2s ease;
}
.fade-navigation-enter-to,
.fade-navigation-leave {
  opacity: 1;
}
.fade-navigation-enter,
.fade-navigation-leave-to {
  opacity: 0;
}
</style>
