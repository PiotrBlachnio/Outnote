<template>
  <div class="dashboard">
    <navigation :categories="navCategories" />
    <sub-navigation :is-active="submenuActive" />
  </div>
</template>

<script>
import Navigation from '@/components/core/Navigation';
import SubNavigation from './SubNavigation.vue';

export default {
  components: {
    Navigation,
    SubNavigation
  },
  data() {
    return {
      submenuActive: false,
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

<style lang="scss" scoped>
.dashboard {
  display: flex;
}
</style>
