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

    <ul class="navigation__list">
      <li
        class="navigation__element"
        v-for="category in categories"
        :key="category.name"
        v-show="isMenuActive"
      >
        <router-link
          to="#"
          class="navigation__link"
          @click.native="$emit('selectedCategory', category)"
        >
          {{ category.name }}
          <button class="navigation__add-button">+</button>
        </router-link>
      </li>
    </ul>

    <div class="navigation__bottom" v-show="isMenuActive">
      <img
        class="navigation__user-avatar"
        src="https://image.flaticon.com/icons/svg/848/848006.svg"
        alt=""
      />
      <span class="navigation__user-name">{{ $store.state.user.data.username }}</span>

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

export default {
  data() {
    return {
      isMenuActive: false
    };
  },
  props: {
    categories: {
      type: Array,
      required: true
    }
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
  }

  &__link {
    display: flex;
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
    color: #eee;
    position: absolute;
    bottom: 1rem;
    display: flex;
    align-items: center;
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
