<template>
  <button
    class="navigation__hamburger"
    @click="$emit('click')"
    :class="{ 'navigation__hamburger--active': isMenuActive }"
  >
    <span class="navigation__hamburger-line"></span>
    <span class="navigation__hamburger-line"></span>
    <span class="navigation__hamburger-line"></span>
  </button>
</template>

<script>
export default {
  props: {
    isMenuActive: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.navigation {
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
}
</style>
