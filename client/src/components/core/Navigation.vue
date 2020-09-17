<template>
  <nav class="navigation">
    <div class="navigation__navbar">
      <ul class="navigation__list">
        <li class="navigation__element">
          <a
            href="#"
            data-title="Notes"
            @click="isSubnavigationActive = !isSubnavigationActive"
            class="navigation__link navigation__link--icon"
          >
            <i class="far fa-sticky-note"></i>
          </a>
        </li>
        <li class="navigation__element">
          <a
            href="#"
            data-title="Tags"
            class="navigation__link navigation__link--icon"
          >
            <i class="fas fa-hashtag"></i>
          </a>
        </li>
        <li class="navigation__element">
          <a
            href="#"
            class="navigation__link navigation__link--icon navigation__link--settings"
          >
            <i class="fas fa-cogs"></i>
          </a>
        </li>
      </ul>
    </div>

    <sub-navigation :is-active="isSubnavigationActive" />
  </nav>
</template>

<script>
import gsap from 'gsap';
import { errors } from '@/assets/consts';
import SubNavigation from '@/components/navigation/SubNavigation';
// import BaseDialog from '@/components/core/BaseDialog';

export default {
  data() {
    return {
      isMenuActive: false,
      isCategoryFieldVisible: false,
      newCategoryName: '',
      isSubnavigationActive: false,
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
    SubNavigation
    // BaseDialog,
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
  width: 100%;
  position: absolute;
  color: white;
  bottom: 0;
  display: flex;
  flex-direction: column;
  z-index: 99;
  overflow: hidden;
  background-color: $navigationBackground;

  @include mq {
    width: auto;
    flex-direction: row;
    position: relative;
  }

  &__navbar {
    order: 2;
    z-index: 99;
    padding: 0 3rem;
    width: 100%;
    padding: 1rem 2rem;
    background-color: $navigationBackground;

    @include mq {
      width: 64px;
      padding: 0;
      padding: 2.5rem 0;
      height: 100vh;
      border-top: none;
    }
  }

  &__list {
    display: flex;
    width: 100%;
    justify-content: space-between;

    @include mq {
      height: 100%;
      flex-direction: column;
    }
  }

  &__element {
    display: inline-block;

    &:first-of-type {
      order: 2;
    }
    &:nth-of-type(2) {
      order: 1;
    }
    &:nth-of-type(3) {
      order: 3;
    }

    @include mq {
      margin-bottom: 4rem;

      &:nth-of-type(3) {
        margin-top: auto;
        margin-bottom: 0;
      }

      @for $i from 1 through 3 {
        &:nth-of-type(#{$i}) {
          order: $i;
        }
      }
    }
  }

  &__link {
    display: block;
    text-align: center;
    position: relative;
    color: $navigationLinkColor;

    &--icon {
      font-size: 1.5rem;
    }

    &--settings {
      margin-top: auto;
    }

    @include mq {
      &::after {
        display: block;
        opacity: 0;
        content: attr(data-title);
        position: absolute;
        bottom: -1.5rem;
        width: 100%;
        font-size: 1rem;
        color: $color2;
        transition: opacity 0.2s;
      }

      &:hover::after {
        opacity: 1;
      }
    }
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
