<template>
  <div class="confirm-email auth">
    <p class="confirm-email__heading">
      E-mail has been confirmed successfully!
      {{ $route.query.token }}
    </p>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import 'auth';

.confirm-email {
  &__heading {
    color: #ddd;
    margin: 0;
  }
}
</style>
