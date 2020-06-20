<template>
  <div class="auth login">
    <auth-form />
  </div>
</template>

<script>
import AuthForm from '@/components/auth/AuthForm';

export default {
  components: {
    AuthForm
  }
};
</script>

<style lang="scss" scoped>
@import 'auth';
</style>
