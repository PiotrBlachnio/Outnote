<template>
  <div class="navigation__bottom">
    <img
      class="navigation__user-avatar"
      src="https://image.flaticon.com/icons/svg/848/848006.svg"
      alt=""
    />
    <span class="navigation__user-name">{{
      $store.state.user.data.username
    }}</span>

    <button class="navigation__settings-button">
      <img
        class="navigation__settings-icon"
        src="https://image.flaticon.com/icons/svg/2919/2919706.svg"
        alt=""
      />
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.navigation {
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
</style>
