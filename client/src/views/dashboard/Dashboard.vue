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
      navCategories: [
        'Private notes',
        'Work notes',
        'Other notes',
        'Other notes2',
        'Other notes3',
        'Other notes4',
        'Other notes5'
      ]
    };
  }
};
</script>

<style lang="scss" scoped></style>
