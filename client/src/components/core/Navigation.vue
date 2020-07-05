<template>
  <nav class="navigation" :class="{ 'navigation--active': isMenuAvtive }">
    <button
      class="navigation__hamburger"
      @click="isMenuAvtive = !isMenuAvtive"
      :class="{ 'navigation__hamburger--active': isMenuAvtive }"
    >
      <span class="navigation__hamburger-line"></span>
      <span class="navigation__hamburger-line"></span>
      <span class="navigation__hamburger-line"></span>
    </button>

    <ul class="navigation__list">
      <li
        class="navigation__element"
        v-for="category in categories"
        :key="category"
        v-show="isMenuAvtive"
      >
        <router-link to="#" class="navigation__link">
          {{ category }}
        </router-link>
      </li>
    </ul>

    <div class="navigation__bottom" v-show="isMenuAvtive">
      <img
        class="navigation__user-avatar"
        src="https://image.flaticon.com/icons/svg/848/848006.svg"
        alt=""
      />
      <span class="navigation__user-name">Username</span>

      <button class="navigation__settings-button">
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
export default {
  data() {
    return {
      isMenuAvtive: false
    };
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  padding: 24px;
  width: 80px;
  height: 0;
  position: relative;
  background-color: transparent;
  transition: background 0.2s ease-in-out;

  @include mq {
    height: 100vh;
    transition: width 0.2s ease-in-out;
    background-color: $navigationBackground;
  }

  &--active {
    width: 100%;
    height: 100vh;
    background-color: $navigationBackground;

    @include mq {
      width: 20rem;
      height: 100vh;
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

  &__list {
    margin-top: 5rem;
    opacity: 0;
    transition: all 0.2s ease-in-out;
  }

  &--active &__list {
    opacity: 1;
  }

  &__link {
    display: block;
    color: $navigationLinkColor;
    padding: 0.5rem;
    opacity: 0;
    font-weight: bold;
    white-space: nowrap;
    transition: border-left 0.1s ease-in-out, opacity 0.3s ease-in-out;

    &:hover {
      border-left: 2px solid $navigationLinkActiveBorderColor;
    }
  }

  &--active &__link {
    opacity: 1;
  }

  &--active &__bottom {
    opacity: 1;
  }

  &__bottom {
    width: calc(100% - 3rem);
    color: #eee;
    position: absolute;
    bottom: 1rem;
    display: flex;
    opacity: 1;
    align-items: center;
    transition: opacity 0.3s ease-in-out;
  }

  &__user-avatar {
    width: 2rem;
    margin-right: 1rem;
  }

  &__user-name {
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
