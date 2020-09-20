<template>
  <div class="page-404">
    <h1 class="page-404__heading">404</h1>
    This page does not exist
    <button class="page-404__button" @click="changeRoute">
      Back to {{ mode }}
    </button>
  </div>
</template>

<script>
export default {
  computed: {
    mode() {
      if (this.$store.state.auth.status) {
        return 'Dashboard';
      } else {
        return 'Login';
      }
    }
  },
  methods: {
    changeRoute() {
      const mode = this.mode;

      this.$router.push(mode === 'Dashboard' ? '/dashboard' : '/auth/login');
    }
  }
};
</script>

<style lang="scss" scoped>
.page-404 {
  height: 100vh;
  color: $page404Color;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__heading {
    margin: 0;
    font-size: 5rem;
  }

  &__button {
    margin-top: 2rem;
    padding: 1rem 2rem;
    border-radius: 0.25rem;
    border: 1px solid $page404BorderColor;
    transition: all 0.2s ease-in-out;

    &:hover {
      font-weight: bold;
      color: $page404ButtonColorHover;
      background-color: $page404ButtonBackgroundHover;
    }
  }
}
</style>
