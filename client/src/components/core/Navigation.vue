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
        v-for="category in navCategories"
        :key="category"
        v-show="isMenuAvtive"
      >
        <router-link to="#" class="navigation__link">
          {{ category }}
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isMenuAvtive: false,
      navCategories: ['Private notes', 'Work notes', 'Other notes']
    };
  }
};
</script>

<style lang="scss" scoped>
.navigation {
  padding: 24px;
  width: 80px;
  background-color: transparent;
  transition: width 0.2s ease-in-out, background 0.2s ease-in-out;

  @include mq {
    height: 100vh;
    background-color: $navigationBackground;
  }

  &--active {
    width: 100%;
    height: 100%;
    background-color: $navigationBackground;

    @include mq {
      width: 400px;
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
}
</style>
