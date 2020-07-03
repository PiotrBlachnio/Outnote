<template>
  <div class="page-404">
    <h1 class="page-404__heading">404</h1>
    This page does not exist
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page-404 {
  height: 100vh;
  color: #eee;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  &__heading {
    margin: 0;
    font-size: 5rem;
  }
}
</style>
