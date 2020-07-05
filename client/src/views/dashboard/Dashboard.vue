<template>
  <div class="dashboard">
    <navigation :categories="navCategories" />
  </div>
</template>

<script>
import Navigation from '@/components/core/Navigation';

export default {
  components: {
    Navigation
  },
  data() {
    return {
      navCategories: ['Private notes', 'Work notes', 'Other notes']
    };
  }
};
</script>

<style lang="scss" scoped></style>
