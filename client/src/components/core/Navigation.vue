<template>
  <nav class="navigation" :class="{ 'navigation--active': isMenuActive }">
    <button
      class="navigation__hamburger"
      @click="closeNavigation"
      :class="{ 'navigation__hamburger--active': isMenuActive }"
    >
      <span class="navigation__hamburger-line"></span>
      <span class="navigation__hamburger-line"></span>
      <span class="navigation__hamburger-line"></span>
    </button>

    <div class="navigation__add-category-wrapper" v-show="isMenuActive">
      <button
        @click="showAddCategoryInput"
        to="#"
        class="navigation__add-category-link"
      >
        <i class="fas fa-plus navigation__icon"></i> New
      </button>

      <div
        v-show="isAddCategoryActive"
        class="navigation__add-category-input-wrapper"
      >
        <base-input
          id="newCategory"
          less-padding
          label="New category..."
          v-model="newCategoryName"
          @keypressEnter="addNewCategory"
        />
        <button @click="addNewCategory"><i class="fas fa-save"></i></button>
      </div>
    </div>

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
          @click.native="$emit('selectedCategory', category)"
        >
          {{ category.name }}
        </router-link>
        <base-dropdown
          :options="dropdownOptions"
          @dropdownRemove="removeCategory(category._id)"
        ></base-dropdown>
      </li>
    </ul>

    <div class="navigation__bottom" v-show="isMenuActive">
      <img
        class="navigation__user-avatar"
        src="https://image.flaticon.com/icons/svg/848/848006.svg"
        alt=""
      />
      <span class="navigation__user-name">{{
        $store.state.user.data.username
      }}</span>

      <button class="navigation__settings-button" @click="logout">
        <img
          class="navigation__settings-icon"
          src="https://image.flaticon.com/icons/svg/2919/2919706.svg"
          alt=""
        />
      </button>
    </div>
  </nav>
</template>

<script>
import gsap from 'gsap';
import { errors } from '@/assets/consts';
import BaseInput from '@/components/core/BaseInput';
import BaseDropdown from '@/components/core/BaseDropdown';

export default {
  data() {
    return {
      isMenuActive: true,
      isAddCategoryActive: false,
      newCategoryName: '',
      dropdownOptions: [
        {
          label: 'Rename'
        },
        {
          label: 'Remove'
        }
      ]
    };
  },
  props: {
    categories: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseInput,
    BaseDropdown
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

      if (state) animations.every(x => x.play());
    }
  },
  methods: {
    closeNavigation() {
      this.isMenuActive = !this.isMenuActive;
      this.$emit('navigationClosed');
    },
    showAddCategoryInput() {
      this.isAddCategoryActive = !this.isAddCategoryActive;
      this.newCategoryName = '';

      gsap.fromTo(
        '.navigation__add-category-input-wrapper',
        this.isAddCategoryActive ? 0.4 : 0,
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
          this.isAddCategoryActive = false;
          this.$emit('addedCategory');
        } else {
          this.$store.dispatch('notificationActivate', {
            content: errors[exec.data.error.id].message,
            type: 'error'
          });
        }
      }
    },
    async removeCategory(categoryId) {
      const exec = await this.$store.dispatch('removeCategory', categoryId);

      console.log(exec);
    },
    logout() {
      this.$store.dispatch('signOut');
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

  &__hamburger {
    width: 32px;
    height: 24px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__hamburger-line {
    display: block;
    width: 100%;
    height: 3px;
    background-color: $navigationHamburgerColor;
    transition: transform 0.2s ease-in-out, opacity 0.3s ease-in-out;

    &:nth-of-type(2) {
      width: 75%;
    }
  }

  &__hamburger--active &__hamburger-line {
    &:nth-child(1) {
      transform: rotate(45deg) translate(0.45rem, 0.5rem);
    }
    &:nth-child(2) {
      opacity: 0;
      transform: translateX(0.5rem);
    }
    &:nth-child(3) {
      transform: rotate(-45deg) translate(0.45rem, -0.5rem);
    }
  }

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

  &__list {
    margin-top: 1rem;
    min-height: 35vh;
    max-height: 50vh;
    overflow-y: scroll;

    &::-webkit-scrollbar {
      width: 0.25rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: $color3;
    }
    &::-webkit-scrollbar-track {
      background-color: $color4;
    }
  }

  &__element {
    display: flex;
  }

  &__link {
    width: 100%;
    color: $navigationLinkColor;
    padding: 0.5rem;
    font-weight: bold;
    white-space: nowrap;
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

  &__bottom {
    width: calc(100% - 3rem);
    position: absolute;
    bottom: 1rem;
    display: flex;
    align-items: center;
  }

  &__user-name {
    color: $navigationUserNameColor;
  }

  &__user-avatar {
    width: 2rem;
    margin-right: 1rem;
  }

  &__settings-button {
    margin-left: auto;
  }

  &__settings-icon {
    width: 2rem;
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
